export default class Component {
    public tag: string;
    public attributes: { [key: string]: string };
    public children: Component[];
    private mId: string;

    constructor(
        tag: string,
        attributes: { [key: string]: string } = {},
        children: Component[] = []
    ) {
        this.tag = tag;
        this.attributes = attributes;
        this.children = children;
        this.mId = "__" + tag + Math.floor(100000 + Math.random() * 900000);
    }

    public getId(): string {
        return this.mId;
    }

    public getTag(): string {
        return this.tag;
    }

    public getAttributes(): { [key: string]: string } {
        return this.attributes;
    }

    public getChildren(): Component[] {
        return this.children;
    }

    public addChild(child: Component): void {

        this.children.push(child);
    }

    public addChildren(...childrenToAdd: Component[]): void {
        this.children.push(...childrenToAdd);
    }

    public removeChild(child: Component): void {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public setAttribute(name: string, value: string): void {
        this.attributes[name] = value;
    }

    public getAttribute(name: string): string | undefined {
        return this.attributes[name];
    }

    public removeAttribute(name: string): void {
        delete this.attributes[name];
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
        const attrs = Object.entries(this.attributes)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join("");

        const content = this.children
            .map((child) => (child instanceof Component ? child.toString() : child))
            .join("");

        return `<${this.tag} id="${this.mId}"${attrs}>${content}</${this.tag}>\n`;
    }


};

