import Body from './body';
import Component from './component'
import Head from './head';

export default class Page extends Component {
    /**
     * Url at which the page will be rendered.
     */
    public url: string;
    /**
     * The Head of the page.
     */
    public head: Head|undefined;

    /**
     * The Body of the page.
     */
    public body: Body = new Body();
    constructor(url: string = "./page.html") {
        super("html");
        this.url = url;
        // this.head = new Head("url");
    }


    /**
     * Add a new child to the component
     * @param child Add a child to the component. Child can be of any level of inheritance of component.
     */
    public override addChild(child: Component): void {
        if (child instanceof Head) {
            this.head = child;
        }
        else if (child instanceof Body) {
            this.body = child;
        }
        this.children.push(child);
    }

    /**
     * Add multiple children to the component
     * @param childrenToAdd  A destructured list of components to add as children 
     */
    public override addChildren(...childrenToAdd: Component[]): void {
        childrenToAdd.forEach(child => this.addChild(child));
    }
};
