import { EpochFormatter } from "./epoch-formatter.js";
import { urlElement } from "./formats.js";
import { RegExpFormatter } from "./regexp-formatter.js";


export const DEFAULT_FORMATTERS = [
    // new ExampleFormatter(),
    new EpochFormatter(),
    new RegExpFormatter("Base64", /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, (text) => atob(text)),
    new RegExpFormatter("IPv4", /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, (text) => [
        urlElement(`https://ipinfo.io/${text}`, 'ipinfo.io'),
        urlElement(`https://who.is/whois-ip/ip-address/${text}`, 'who.is'),
    ]),
    new RegExpFormatter("Encoded URI", /%[0-9a-fA-F]{2}/, (text) => decodeURIComponent(text)),
];
