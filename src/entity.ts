type Content = Entity[] | string;

export default class Entity {
    public tag: string;
    public attributes: { [key: string]: string };
    public children: Content[];
    private mId: string;

    constructor(tag: string, attributes: { [key: string]: string } = {}, children: Content[] = []) {
        this.tag = tag;
        this.attributes = attributes;
        this.children = children || [];
        this.mId = "__" + tag + Math.floor(100000 + Math.random() * 900000);
    }

    getId(): string {
        return this.mId;
    }

    getTag(): string {
        return this.tag;
    }

    getAttributes(): { [key: string]: string } {
        return this.attributes;
    }

    getChildren(): Content[] {
        return this.children;
    }

    addChild(child: Content): void {
        this.children.push(child);
    }

    removeChild(child: Content): void {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    setAttribute(name: string, value: string): void {
        this.attributes[name] = value;
    }

    getAttribute(name: string): string | undefined {
        return this.attributes[name];
    }

    removeAttribute(name: string): void {
        delete this.attributes[name];
    }

    public toString(): string {
        let attrs = '';
        for (const key in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, key)) {
            attrs += ` ${key}="${this.attributes[key]}"`;
          }
        }
        const content = Array.isArray(this.children)
          ? this.children.map((child) => child instanceof Entity ? child.toString() : child).join('')
          : this.children;
        return `<${this.tag} id="${this.mId}"${attrs}>${content}</${this.tag}>`;
      }
      
}


module.exports = Entity; 