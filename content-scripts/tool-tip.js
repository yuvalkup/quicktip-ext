
var gFormats = {
    epochToHuman: function(tz, epoch) {
        var options = {
            year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
            timeZone: tz,
            timeZoneName: 'short'
        };

        var date = new Date(epoch);
        return new Intl.DateTimeFormat('en-UK', options).format(date);
    },

    epochTimeDiff: function(epoch) {

        /**
         * Copied from https://github.com/ZitRos/datetime-difference
         */
        function datetimeDiff (from, to) {

            const min = [-Infinity, 1, 1, 0, 0, 0, 0];
            const max = [Infinity, 12, null, 24, 60, 60, 1000];

            if (to < from) {
                const temp = to;
                to = from;
                from = temp;
            }

            let start = [from.getUTCFullYear(), from.getUTCMonth() + 1, from.getUTCDate(), from.getUTCHours(),
                    from.getUTCMinutes(), from.getUTCSeconds(), from.getUTCMilliseconds()],
                end = [to.getUTCFullYear(), to.getUTCMonth() + 1, to.getUTCDate(), to.getUTCHours(), to.getUTCMinutes(),
                    to.getUTCSeconds(), to.getUTCMilliseconds()],
                i = 7;

            const dec = (i) => {
                --end[i];
                while (end[i] < min[i]) {
                    const r = dec(i - 1);
                    end[i] += max[i] === null
                        ? r
                        : max[i];
                }
                return i === 1 ? new Date(Date.UTC(end[0], end[1], 0)).getUTCDate() : max[i + 1];
            };

            while (i > 0) {
                --i;
                let diff = end[i] - start[i];
                while (diff < 0) {
                    end[i] += dec(i - 1);
                    diff = end[i] - start[i];
                }
                end[i] = diff;
            }

            return {
                date: {
                    Y: end[0],
                    M: end[1],
                    D: end[2],
                },
                time: {
                    h: end[3],
                    m: end[4],
                    s: end[5],
                    ms: end[6],
                },
            };
        };

        function formatDiff(d) {
            return Object.keys(d).filter((i)=>d[i] !== 0).map((i)=>`${d[i]}${i}`).join(' ');
        }

        var diff = datetimeDiff(new Date(epoch), new Date());
        return formatDiff(diff.date) + ' [' + formatDiff(diff.time) + ']';
    },

    epochToISO: function(epoch) {
        return new Date(epoch).toISOString();
    }
}

var gFormatter = {
    _formats: [
        gFormats.epochToHuman.bind(gFormats, 'UTC'),
        gFormats.epochToHuman.bind(gFormats, 'Asia/Jerusalem'),
        gFormats.epochToISO,
        gFormats.epochTimeDiff,
    ],

    _formatted: [],

    _defaultFormatsShowCount: 2,
    _formatsShowCount: 2,
    _currentText: '',

    reset: function (text) {
        this._currentText = text.trim();
        this._formatsShowCount = this._defaultFormatsShowCount;
        this._calcFormats();
    },

    toggleFullMode: function() {
        this._formatsShowCount = (this._formatsShowCount === this._defaultFormatsShowCount
            ? this._formats.length
            : this._defaultFormatsShowCount);
    },

    _calcFormats: function() {
        var text = this._currentText;

        /**
         * Milliseconds -> Microseconds
         */
        if (text.length < 13) {
            text += '000';
        }

        var epoch = Number(text);

        this._formatted = this._formats.map((f)=>f(epoch));
        return this._formatted;
    },

    getFormatsString: function() {
        var relevant = this._formatted.slice(0, this._formatsShowCount);

        return relevant.map((s, i)=>`<div id='epoch-${i}'>${s}</div>`).join("");
    },

    getFormattedByIndex: function(i) {
        return this._formatted[i];
    }
}

var gListener = {
    _listener: function(ev) {
        if (ev.key.toLowerCase() === 'f') {
            gFormatter.toggleFullMode();
            gTooltip.setTooltipText(gFormatter.getFormatsString());
        }

        if (!isNaN(Number(ev.key))) {
            copyFormatToClipboard(Number(ev.key) - 1);
        }
    },

    start: function() {
        document.addEventListener('keydown', this._listener);
    },

    stop: function() {
        document.removeEventListener('keydown', this._listener);
    }
};

var gTooltip = {
    _elem: null,

    _createTooltipElement: function(rect) {
        this._elem = document.createElement('div');

        this._elem.style.position = 'fixed';
        this._elem.style.top = (rect.top + rect.height) + 'px'; // set coordinates
        this._elem.style.left = (rect.left) + 'px';
        this._elem.style.display = 'block';
        this._elem.classList.add('cteTooltip');
        this._elem.classList.add('bottom');

        return this._elem;
    },

    setTooltipText: function(text) {
        this._elem.innerHTML = ''
            // + '<div class="arrow">'
            + '</div><h3 class="cteTooltip-title">Unix Time</h3>'
            + `<div class="cteTooltip-content" id="tooltip">${text}</div>`
        ;
    },

    show: function(rect, text) {
        if (!text) {
            return;
        }

        this._createTooltipElement(rect);
        this.setTooltipText(text);

        document.body.appendChild(this._elem);
        gListener.start();
    },

    hide: function() {
        if (this._elem) {
            gListener.stop();
            this._elem.parentNode.removeChild(this._elem);
            this._elem = null;
        }
    }
};

function copyFormatToClipboard(idx) {
    var str = gFormatter.getFormattedByIndex(idx);
    GM_setClipboard(str);

    // blink element
    var elem = document.querySelector(`#epoch-${idx}`);
    if (!elem) {
        return;
    }

    elem.style.background = 'LightGrey';
    setTimeout(() => {
        elem.style.background = 'none';
    }, 300);
}

function addSelectionListener() {
    document.addEventListener('selectionchange', () => {
        gTooltip.hide();
    
        var selection = document.getSelection();
        var text = selection.toString().replaceAll(',', '');
    
        /**
         * Not epoch time
         */
        if (selection.rangeCount !== 1 || !text || text.length < 9 || isNaN(Number(text))) {
            return;
        }
    
        gFormatter.reset(text);
        var tooltipText = gFormatter.getFormatsString();

        var anchor = selection.isCollapsed ? document.activeElement : selection.getRangeAt(0);
        var rect = anchor.getBoundingClientRect();

        gTooltip.show(rect, tooltipText);
    });
}

function onDocumentReady(cb) {
    if (document.readyState !== 'loading') {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", cb);
    }
}

onDocumentReady(() => {
    addSelectionListener();
});
