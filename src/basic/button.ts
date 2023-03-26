import Component from './component'
import String from './string';


// export interface ButtonProps {
//     text: string,
//     children: Component
// }

// type EitherField<T, TKey extends keyof T = keyof T> =
//     TKey extends keyof T ? { [P in TKey]-?:T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>>: never

export default class Button extends Component {
    /**
     * Create a instance of a Button Component
     * @param text The text a button should have
     * @param children The children a button should have
     */
    constructor(text: string, ...children:Component[]) {
        super("button");
        if (text) {
            this.addChild(new String(text));
        }
        else if (children) {
            this.addChildren(...children);
        }
        
    }
};

