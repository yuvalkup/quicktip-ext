import { DEFAULT_FORMATTERS } from "./formatters/default.js";


export class FormatterChain {
    constructor(formatters) {
        this._formatters = formatters || DEFAULT_FORMATTERS;
    }

    format(text) {
        const matched = this._formatters.filter(i => i.match(text));
        if (matched.length == 0) {
            return [];
        }

        const chosen = matched[0];
        const formatted = chosen.format(text);

        return {
            title: chosen.title,
            text: formatted?.flat ? formatted.flat() : [formatted]
        };
    }
}
