import FileManager from "../filemanager";

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
        this.pmId = "__" + tag;
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


    public setStyles(properties: { [key: string]: string }): void {
        const styles = this.getAttribute("style") || "";
        const updatedStyles = Object.keys(properties).reduce((result, key) => {
            return result + key + ": " + properties[key] + "; ";
        }, styles);
        this.setAttribute("style", updatedStyles.trim());
    }

    public deleteStyles(...properties: string[]): void {
        const styleAttribute = this.getAttribute("style");
        if (styleAttribute !== undefined) {
            let styles = styleAttribute.trim();
            properties.forEach(property => {
                const regex = new RegExp(`(^|\\s)${property}:\\s*[^;]+;?`, "g");
                styles = styles.replace(regex, "");
            });
            styles = styles.replace(/\s+/g, " ").trim();
            if (styles === "") {
                this.removeAttribute("style");
            } else {
                this.setAttribute("style", styles);
            }
        }
    }


    public toString(): string {
        const attrs = Object.entries(this.pmAttributes)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join("");

        const content = this.pmChildren
            .map((child) => (child instanceof Component ? child.toString() : child))
            .join("");

        return `<${this.pmTag} id="${this.pmId}${Math.floor(100000 + Math.random() * 900000)}"${attrs}>${content}</${this.pmTag}>\n`;
    }

    public fill(direction: "vertical" | "horizontal" | "both"): void {
        let newWidth = direction === "horizontal" || direction === "both" ? "100%" : "";
        let newHeight = direction === "vertical" || direction === "both" ? "100%" : "";
        this.setStyles({
            height: newHeight,
            width: newWidth,
            "flex-grow": "1",
        });
        if (newWidth == "") {
            this.deleteStyles("width");
        }
        if (newHeight == "") {
            this.deleteStyles("height");
        }
    }

    public align(vertical: "top" | "bottom" | "middle", horizontal: "left" | "right" | "center"): void {
        let align = "";
        let justify = "";
        switch (vertical) {
            case "top":
                align = "flex-start";
                break;
            case "middle":
                align = "center";
                break;
            case "bottom":
                align = "flex-end";
                break;
        }
        switch (horizontal) {
            case "left":
                justify = "flex-start";
                break;
            case "center":
                justify = "center";
                break;
            case "right":
                justify = "flex-end";
                break;
        }
        this.setStyles({
            display: "flex",
            "align-items": align,
            "justify-content": justify,
        });
    }


};

