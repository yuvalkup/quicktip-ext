const DEFAULT_SHOW_COUNT = 2;
const MAX_SHOW_COUNT = 1000;

export class ToolTip {
    constructor(listener) {
        this._listener = listener;
        this._elem = null;
        this._formatted = null;
        this._showCount = DEFAULT_SHOW_COUNT;
    }

    show(rect, formatted) {
        if (!formatted?.text) {
            return;
        }

        this._formatted = formatted;

        this._createTooltipElement(rect);
        this._setTooltipText();

        document.body.appendChild(this._elem);
        this._listener.start(this);
    }

    hide() {
        if (this._elem) {
            this._listener.stop();
            this._elem.parentNode.removeChild(this._elem);
            this._elem = null;
        }
    }

    blinkText(index) {
        var elem = document.querySelector(`#qteResult-${index}`);
        if (!elem) {
            return;
        }

        elem.style.background = 'LightGrey';
        setTimeout(() => {
            elem.style.background = 'none';
        }, 300);
    }

    getTextByIndex(index) {
        return this._formatted?.text?.length > index ? this._formatted?.text?.[index] : '';
    }

    toggleFullMode() {
        if (this._showCount === DEFAULT_SHOW_COUNT) {
            this._showCount = MAX_SHOW_COUNT;
        } else {
            this._showCount = DEFAULT_SHOW_COUNT;
        }

        this._setTooltipText();
    }

    _createTooltipElement(rect) {
        this._elem = document.createElement('div');

        this._elem.style.position = 'fixed';
        this._elem.style.top = (rect.top + rect.height) + 'px'; // set coordinates
        this._elem.style.left = (rect.left) + 'px';
        this._elem.style.display = 'block';
        this._elem.classList.add('qteTooltip');
        this._elem.classList.add('bottom');

        return this._elem;
    }

    _setTooltipText() {
        const showCount = this._showCount || undefined;
        const text = this._formatted?.text?.slice(0, showCount);
        const textElems = text?.map((s, i)=>`<div id='qteResult-${i}'>${s}</div>`).join("");

        this._elem.innerHTML = ''
            + `</div><h3 class="qteTooltip-title">${this._formatted?.title}</h3>`
            + `<div class="qteTooltip-content" id="tooltip">${textElems}</div>`
        ;
    }
}

