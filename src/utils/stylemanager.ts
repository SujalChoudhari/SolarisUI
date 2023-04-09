import Style from "../components/styles";
import Logger from "./logger";

/**
 * The StyleManager class manages styles that are added to the page dynamically.
 */
export default class StyleManager {

    /**
     * An array of styles that have been added to the page.
     */
    public static styles: Style[] = [];

    /**
     * Adds a style to the page.
     * @param {Style} style - The style to add.
     */
    public static addStyle(style: Style): void {
        if (this.isStyleAdded(style)) return;
        Logger.info(__filename, "Adding style", style.url || " ");
        this.styles.push(style);
    }

    /**
     * Removes a style from the page.
     * @param {Style} style - The style to remove.
     */
    public static removeStyle(style: Style): void {
        this.styles = this.styles.filter(s => s != style);
    }

    /**
     * Returns the CSS text for all styles that have been added to the page.
     * @returns {string} - The CSS text for all styles.
     */
    public static toString(): string {
        let css = "";
        this.styles.forEach(style => {
            if (!style.type || style.type == "external") return;
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

    /**
     * Checks if a style has already been added to the page.
     * @param {Style} style - The style to check.
     * @returns {boolean} - true if the style has already been added, false otherwise.
        */
    public static isStyleAdded(style: Style): boolean {
        return this.styles.find(s => s == style) != undefined;
    }

    /**
     * Returns an array of all external styles that have been added to the page.
     * @returns {Array<Style>} - An array of all external styles.
     */
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
