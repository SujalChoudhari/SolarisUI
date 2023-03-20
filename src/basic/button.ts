import Component from './component'
import String from './string';

export default class Button extends Component {
    constructor(text: string = "",) {
        super("button");
        this.addChild(new String(text));
    }
};

