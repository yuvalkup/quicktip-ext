export class KeyboardListener {
    constructor() {
        this._eventHandler = null;
    }

    start(tooltip) {
        this._eventHandler = this._onKbEvent.bind(this, tooltip);
        document.addEventListener('keydown', this._eventHandler);
    }

    stop() {
        document.removeEventListener('keydown', this._eventHandler);
    }

    _onKbEvent(tooltip, event) {
        if (event.key.toLowerCase() === 'f') {
            tooltip.toggleFullMode();
            return;
        }

        const index = Number(event.key);
        if (!isNaN(index)) {
            this._copyToClipboard(tooltip, index - 1);
        }
    }

    _copyToClipboard(tooltip, index) {
        const text = tooltip.getTextByIndex(index);
        if (!text) {
            return;
        }

        navigator.clipboard.writeText(text);
        tooltip.blinkText(index);
    }
}
