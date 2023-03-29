import Component from './component'

export default class String extends Component {
    /**
     * The Content to be rendered as a string
     */
    public content: string;

    public constructor(content: string = "") {
        super("string");
        this.content = content; 
    }

    public override toString(): string {
        return this.content;
    }
};