import Component from './component'
import Head from './head';

export default class Page extends Component {
    public url: string;
    constructor(url: string = "./page.html") {
        super("html");
        this.url = url;

        this.pmCss = `*,
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        `;
    }

    public override addChild(child: Component): void {
        if (child instanceof Head)
            child.addChild(new Component("link", { rel: "stylesheet", "href": `style/${this.url.split(".")[0]}.css` }))

        this.pmChildren.push(child);
    }

    public override addChildren(...childrenToAdd: Component[]): void {
        childrenToAdd.forEach(child => {
            if (child instanceof Head)
                child.addChild(new Component("link", { rel: "stylesheet", "href": `style/${this.url.split(".")[0]}.css` }))
        });
        this.pmChildren.push(...childrenToAdd);
    }

};

module.exports = Page;