export class ExampleFormatter {
    /**
     * The title of the tooltip
     */
    get title() {
        return "Example";
    }

    /**
     * Returns a boolean indicating if this formatter should format a selected text
     */
    match(text) {
        return false;
    }

    /**
     * Formats the text into a list of displayable strings
     */
    format(text) {
        return "";
    }
}