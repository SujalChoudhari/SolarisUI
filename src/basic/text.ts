import Logger from "../logger";
import Component from "./component";
import String from "./string";


export type textType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "b" | "i" | "u" | "s" | "strong" | "em" | "small" | "mark" | "del" | "ins" | "sub" | "sup" | "pre" | "code" | "kbd" | "samp" | "var" | "cite" | "abbr" | "dfn" | "time" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "s" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "legend" | "label" | "meter" | "details" | "summary" | "blockquote" | "q" | "cite" | "dfn" | `h${number}`;

export default class Text extends Component {
    constructor(type: textType = "p", text: string) {
        
        
        if(parseInt(type.substring(1)) > 6) {
            Logger.warn("Invalid heading type. Defaulting to 'h6'.")
            type = "h6";
        }
        else if (parseInt(type.substring(1)) < 1) {
            Logger.warn("Invalid heading type. Defaulting to 'h1'.")
            type = "h1";
        }
        if(type.split("")[0] === "h" && (type.split("")[1] !== undefined && type.split("")[1] !== "1" && type.split("")[1] !== "2" && type.split("")[1] !== "3" && type.split("")[1] !== "4" && type.split("")[1] !== "5" && type.split("")[1] !== "6")) {
            Logger.warn("Invalid heading type. Defaulting to 'p'.")
            
            type = "p";
        }
        super(type, {}, [new String(text)]);
    }
}