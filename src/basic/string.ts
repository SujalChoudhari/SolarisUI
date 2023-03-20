import Component from './component'

export default class String extends Component {
    public content: string;

    public constructor(content: string = "") {
        super("string");
        this.content = content; 
    }

    public override toString(): string {
        return this.content;
    }
};