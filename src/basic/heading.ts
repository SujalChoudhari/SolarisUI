import Component from "./component";
import String from "./string";


export default class Heading extends Component {
    constructor(type: number, text: string) {
        if (type < 1) type = 1;
        if (type > 6) type = 6;
        super("h" + type, {}, [new String(text)]);
    }
}