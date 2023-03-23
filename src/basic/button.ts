import Component from './component'
import String from './string';

export default class Button extends Component {
    /**
     * Create a instance of a Button Component
     * @param text The text a button should have
     */
    constructor(text: string = "") {
        super("button");
        this.addChild(new String(text));
    }
};

