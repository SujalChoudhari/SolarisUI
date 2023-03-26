import Component from './component'
import String from './string';


export default class Button extends Component {
    /**
     * Create a instance of a Button Component
     * @param text The text a button should have
     * @param children The children a button should have
     */
    constructor(text: string, ...children:Component[]) {
        super("button");
        if (text) {
            this.addChildren(new String(text));
        }
        else if (children) {
            this.addChildren(...children);
        }
        
    }
};

