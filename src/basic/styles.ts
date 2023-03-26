/**
 * Style
 * -----
 * A representation of Style tag.
 *
 * @author Ansh Sharma
 *
 * TODO:
 *  - Instead of using classes from public/style/index.css
 *      every component will have its own exportCss function.
 *  - These generated classes will be dumped into the `build/[name]/style/` folder.
 *  - Style folder will be created for each page or for each style component.
 *  - And included into head of page that contains that style component.
 */

export default class Style {
  /**
   * The CSS classes and their properties.
   */
  public cssClasses: { [key: string]: { [key: string]: string } };

  /**
   * URL to an external source file.
   */
  public url: string = "";

  /**
   * Type of the CSS attachment. Either inline or external.
   * Note: inline attachments are supported under Attributes, and Style functions under Component.
   */
  public type: string = "";

  /**
   * Create a new instance of Style.
   * @param type The type of the CSS attachment. Either inline or external.
   * @param url URL to an external source file. Optional.
   * @param cssClasseses The CSS classes and their properties.
   */
  constructor(
    type: "infile" | "external",
    url = "",
    cssClasseses: { [key: string]: { [key: string]: string } } = {}
  ) {
    this.cssClasses = cssClasseses;
    this.url = url;
    this.type = type;
  }

  /**
   * Adds a new CSS class with the specified properties.
   * @param className The name of the CSS class to add.
   * @param properties The properties to associate with the new CSS class.
   */
  public addClass(
    className: string,
    properties: { [key: string]: string }
  ): void {
    this.cssClasses[className] = properties;
  }

  /**
   * Updates the properties of an existing CSS class.
   * @param className The name of the CSS class to update.
   * @param properties The updated properties to associate with the CSS class.
   */
  public updateClass(
    className: string,
    properties: { [key: string]: string }
  ): void {
    if (this.cssClasses[className]) {
      this.cssClasses[className] = properties;
    } else {
      throw new Error(`Class ${className} does not exist.`);
    }
  }

  /**
   * Removes an existing CSS class.
   * @param className The name of the CSS class to remove.
   */
  public removeClass(className: string): void {
    if (this.cssClasses[className]) {
      delete this.cssClasses[className];
    } else {
      throw new Error(`Class ${className} does not exist.`);
    }
  }

  /**
   * Adds the given properties to the specified class. If the class does not exist, it will be created.
   * @param className The name of the class to add properties to.
   * @param properties An object containing the properties to add, where the key is the property name and the value is the property value.
   */
  public addClassProperty(
    className: string,
    properties: { [key: string]: string }
  ): void {
    if (!(className in this.cssClasses)) {
      this.cssClasses[className] = {};
    }
    Object.keys(properties).forEach((propertyName) => {
      this.cssClasses[className][propertyName] = properties[propertyName];
    });
  }

  /**
   * Removes the given properties from the specified class. If the class no longer has any properties, it will be removed.
   * @param className The name of the class to remove properties from.
   * @param properties An object containing the properties to remove, where the key is the property name and the value is the property value.
   */
  public removeClassProperty(
    className: string,
    properties: { [key: string]: string }
  ): void {
    if (className in this.cssClasses) {
      Object.keys(properties).forEach((propertyName) => {
        if (propertyName in this.cssClasses[className]) {
          delete this.cssClasses[className][propertyName];
        }
      });
      if (Object.keys(this.cssClasses[className]).length === 0) {
        delete this.cssClasses[className];
      }
    }
  }

  /**
   * Updates the given properties of the specified class. If the class does not exist, it will be created.
   * @param className The name of the class to update properties of.
   * @param properties An object containing the properties to update, where the key is the property name and the value is the property value.
   */
  public updateClassProperty(
    className: string,
    properties: { [key: string]: string }
  ): void {
    if (!(className in this.cssClasses)) {
      this.cssClasses[className] = {};
    }
    Object.keys(properties).forEach((propertyName) => {
      this.cssClasses[className][propertyName] = properties[propertyName];
    });
  }

  /**
   * Gets the properties of an existing CSS class.
   * @param className The name of the CSS class to get the properties of.
   * @returns The properties of the specified CSS class, or undefined if the CSS class does not exist.
   */
  public getClassProperties(
    className: string
  ): { [key: string]: string } | undefined {
    return this.cssClasses[className];
  }

  /**
   * Exports the CSS classes and their properties as a string.
   * @returns A string representation of the CSS classes and their properties.
   */
  public toString(): string {
    let cssString = "";
    Object.keys(this.cssClasses).forEach((className) => {
      cssString += `.${className} {\n`;
      Object.keys(this.cssClasses[className]).forEach((property) => {
        cssString += `  ${property}: ${this.cssClasses[className][property]};\n`;
      });
      cssString += "}\n\n";
    });
    return cssString.trim();
  }
}
