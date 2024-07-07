export class ToolTip {
    constructor() {
        this._elem = null;
    }

    show(rect, formatted) {
        if (!formatted?.text) {
            return;
        }

        this._createTooltipElement(rect);
        this._setTooltipText(formatted.text, formatted.title);

        document.body.appendChild(this._elem);
        // gListener.start();
    }

    hide() {
        if (this._elem) {
            // gListener.stop();
            this._elem.parentNode.removeChild(this._elem);
            this._elem = null;
        }
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

    _setTooltipText(text, title) {
        const textElems = text?.map((s, i)=>`<div id='qteFormatted-${i}'>${s}</div>`).join("");

        this._elem.innerHTML = ''
            + `</div><h3 class="qteTooltip-title">${title}</h3>`
            + `<div class="qteTooltip-content" id="tooltip">${textElems}</div>`
        ;
    }
}

