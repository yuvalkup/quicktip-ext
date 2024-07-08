import { addStyle } from "./add-style.js"
import { ToolTip } from "./tooltip.js"
import { Formatter } from "./formatter.js";
import { KeyboardListener } from "./keyboard-listener.js";


function addSelectionListener(tooltip, formatter) {
    document.addEventListener('selectionchange', () => {
        tooltip.hide();

        const selection = document.getSelection();
        const text = selection.toString().replaceAll(',', '').trim();

        if (selection.rangeCount !== 1 || !text) {
            return;
        }

        const formatted = formatter.format(text);

        const anchor = selection.isCollapsed ? document.activeElement : selection.getRangeAt(0);
        const rect = anchor.getBoundingClientRect();

        tooltip.show(rect, formatted);
    });
}

function onDocumentReady(cb) {
    if (document.readyState !== 'loading') {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", cb);
    }
}

function main() {
    const listener = new KeyboardListener();
    const tooltip = new ToolTip(listener);
    const formatter = new Formatter();

    addStyle();

    onDocumentReady(() => {
        addSelectionListener(tooltip, formatter);
    });
}

main();
