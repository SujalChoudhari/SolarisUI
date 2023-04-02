import Style from "./styles";

export default class StyleManager{
    public static styles: Style[] = [];

    public static addStyle(style: Style): void{
        this.styles.push(style);
    }
    public static removeStyle(style: Style): void{
        this.styles = this.styles.filter(s => s != style);
    }

    public static toString(): string{
        let css = "";
        this.styles.forEach(style => {
            if(!style.type || style.type == "external") return;
            Object.keys(style.cssClasses).forEach((className) => {
                css += `${className} {\n`;
                Object.keys(style.cssClasses[className]).forEach((property) => {
                    css += `  ${property}: ${style.cssClasses[className][property]};\n`;
                });
                css += "}\n\n";
            });
        });
        return css;
    }

    public static getExternalStyles(): Array<Style> {
        let styles: Array<Style> = [];
        this.styles.forEach(style => {
            if (!style.type || style.type !== "external") return;
            if (!style.url) return;
            styles.push(style);
        });
        return styles;
    }
}