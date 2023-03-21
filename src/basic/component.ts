import FileManager from "../filemanager";

export interface ThemeComponent {
    Tag: string,
    Attributes: Record<string, string>,
    Children: ThemeComponent[]
}

export default class Component {
    protected pmTag: string;
    protected pmAttributes: { [key: string]: string };
    protected pmChildren: Component[];
    protected pmId: string;
    protected pmCss: string = "";

    constructor(
        tag: string,
        attributes: { [key: string]: string } = {},
        children: Component[] = []
    ) {
        this.pmTag = tag;
        this.pmAttributes = attributes;
        this.pmChildren = children;
        this.pmId = "__" + tag + Math.floor(100000 + Math.random() * 900000);
    }

    public getId(): string {
        return this.pmId;
    }

    public getTag(): string {
        return this.pmTag;
    }

    public getAttributes(): { [key: string]: string } {
        return this.pmAttributes;
    }

    public getChildren(): Component[] {
        return this.pmChildren;
    }

    public addChild(child: Component): void {

        this.pmChildren.push(child);
    }

    public addChildren(...childrenToAdd: Component[]): void {
        this.pmChildren.push(...childrenToAdd);
    }

    public removeChild(child: Component): void {
        const index = this.pmChildren.indexOf(child);
        if (index !== -1) {
            this.pmChildren.splice(index, 1);
        }
    }

    public setAttribute(name: string, value: string): void {
        this.pmAttributes[name] = value;
    }

    public getAttribute(name: string): string | undefined {
        return this.pmAttributes[name];
    }

    public removeAttribute(name: string): void {
        delete this.pmAttributes[name];
    }


    public addClass(className: string): void {
        let classes = this.getAttribute("class");
        if (classes !== undefined) {
            let classArray = [... new Set(classes.split(','))]
            classArray.push(className);
            classes = classArray.join(" ");
            this.setAttribute("class", classes);
        }
        else {
            this.setAttribute("class", className);
        }
    }

    public addClasses(...classNames: string[]): void {
        let classes = this.getAttribute("class");
        if (classes !== undefined) {
            let classArray = [... new Set(classes.split(','))]
            classArray = [...classArray, ...classNames];
            classes = classArray.join(" ");
            this.setAttribute("class", classes);
        }
        else {
            this.setAttribute("class", classNames.join(" "));
        }
    }


    public toString(): string {
        const attrs = Object.entries(this.pmAttributes)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join("");

        const content = this.pmChildren
            .map((child) => (child instanceof Component ? child.toString() : child))
            .join("");

        return `<${this.pmTag} id="${this.pmId}"${attrs}>${content}</${this.pmTag}>\n`;
    }

    public customCss(): string {
        const css = this.pmChildren
            .map((child) => (child instanceof Component ? child.customCss() : child))
            .join("");

        return this.pmCss + css;
    }

};

