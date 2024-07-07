import "./add-style.js"
import { ToolTip } from "./tooltip.js"
import { Formatter } from "./formatter.js";

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

var gTooltip = new ToolTip();
var gFormatter = new Formatter();

function addSelectionListener() {
    document.addEventListener('selectionchange', () => {
        gTooltip.hide();

        const selection = document.getSelection();
        const text = selection.toString().replaceAll(',', '').trim();

        if (selection.rangeCount !== 1 || !text) {
            return;
        }

        const formatted = gFormatter.format(text);

        const anchor = selection.isCollapsed ? document.activeElement : selection.getRangeAt(0);
        const rect = anchor.getBoundingClientRect();

        gTooltip.show(rect, formatted);
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
