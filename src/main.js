import { ToolTip } from "./tooltip.js";
import { FormatterChain } from "./formatter-chain.js";
import { KeyboardListener } from "./keyboard-listener.js";
import { RegExpFormatter } from "./formatters/regexp-formatter.js";


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

async function getFromStorage() {
    const { json } = await chrome.storage.local.get({
        json: "[]"
      });

    const escaped = json.replaceAll('\\', '\\\\');
    return JSON.parse(escaped);
}

function addUserFormatters(chain) {
    getFromStorage().then((json) => {
        const formatters = [];

        for (const i of json) {
            const formatter = new RegExpFormatter(i.title, new RegExp(i.match), (t) => i.format.replaceAll('${text}', t));
            formatters.push(formatter);
        }

        chain.register(formatters);
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
    const formatter = new FormatterChain();

    addUserFormatters(formatter);

    onDocumentReady(() => {
        addSelectionListener(tooltip, formatter);
    });
}

main();
