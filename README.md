# QuickTip
Quicktip is a browser extension that enhances your browsing experience by adding tooltips to selected text. Simply highlight any text on a webpage, and if it matches a supported format, Quicktip will instantly display a tooltip with useful information such as decoded text, links, and more!

Custom formats are also supported using manual configuration.

GIF-HERE

## Supported Formats

* Epoch Time translation to readable formats
* Base64 decoding to readable text
* IPv4 addresses to IP searching tools
* Any custom formats (requires manual configuration, see below)

## Features

* Displaying a custom by-format tooltip to highlighted text.
* Displaying multiple results for a single highlighted text (displaying first 2 results by default).
* Adding a custom tooltip for your own format.
* While the tooltip is open:
    * Pressing `f` key will display all results.
    * Pressing one of the number keys will copy the result with that index to the clipboard (e.g pressing `2` will copy the 2nd result).


## Adding custom tooltip to your format

### For well known formats - contribute to this repository

1. Add your custom formatter, See src/formatters/example.js
2. Add it to the default formatters, see src/formatters/default.js
3. Open a PR with a me as reviewer

Only well known and well defined formats will be accepted.


### For propietary formats - Add a custom JS to your extension settings

1. Open options page
2. Write down code
3. Save and refresh pages
