export class Base64Formatter {
    get title() {
        return "Base64";
    }

    match(text) {
        const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return regex.test(text);
    }

    format(text) {
        return [atob(text)];
    }
}