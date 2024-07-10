export class RegExpFormatter {
    constructor(title, regexp, formatCb) {
        this._title = title;
        this._regexp = regexp;
        this._formatCb = formatCb;
    }

    get title() {
        return this._title;
    }

    match(text) {
        return this._regexp.test(text);
    }

    format(text) {
        return this._formatCb(text);
    }
}
