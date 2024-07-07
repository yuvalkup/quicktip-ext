import { EpochFormatter } from "./formatters/epoch.js"
import { Base64Formatter } from "./formatters/base64.js"

export const ALL_FORMATTERS = [
    new EpochFormatter(),
    new Base64Formatter(),
];

export class Formatter {
    constructor(formatters) {
        this._formatters = formatters || ALL_FORMATTERS;
    }

    format(text) {
        const matched = this._formatters.filter(i => i.match(text));
        if (matched.length == 0) {
            return [];
        }

        const chosen = matched[0];

        return {
            title: chosen.title,
            text: chosen.format(text).flat(),
        };
    }
}
