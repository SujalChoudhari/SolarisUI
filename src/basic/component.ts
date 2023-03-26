import FileManager from "../filemanager";
import Logger from "../logger";
import Style from "./styles";

/**
 * Component
 * -----
 * Represents the entire hirarchy of HTML elements
 * Each and every html element can be expressed as a single
 * Component or A hirarchy of components.
 *
 * @remarks
 * This class hirarchy is then compiled into normal HTML code.
 * This Component can be inherited to create newer more complex components.
 *
 * @example
 * Creating A component
 * ```js
 *
 * var myComponent = new Component("div",{"id":"my-component"});
 * ```
 *
 * @author Sujal Choudhari <sjlchoudhari@gmail.com>
 */
export default class Component {
  /**
   * The html tag it is supposed to represent.
   */
  public tag: string;

  /**
   * HTMl attributes in the form of key value pairs.
   */
  public attribute: { [key: string]: string };

  /**
   * An array of `Component` which would be rendered as
   * child elements of the current element
   */
  public children: Component[];

  private parent: Component | null;
  /**
   * A refrence of the css class.
   */
  public css: Style = new Style("external");

  /**
   * Create a new Component instance
   * @param tag  The tag the Component belongs to. For example div,p,a,strong,etc.
   * @param attributes The html attributes in the form of key value pairs
   * @param children The children of the Component
   */
  constructor(
    tag: string,
    attributes: { [key: string]: string } = {},
    children: Component[] = [],
    parent: Component | null = null
  ) {
    this.tag = tag;
    this.attribute = attributes;
    this.children = children;
    this.parent = parent;
    Logger.info(__filename, "Created an new Component", this.tag);
  }

  /**
   * Get the tag name
   * @returns the tag of the component
   *
   * @example
   * ```js
   * var tag = myComponent.getTag(); // a div component
   * console.log(tag); // div
   * ```
   */
  public getTag(): string {
    return this.tag;
  }

  /**
     * Get the attributes of the component
     * @returns Object containing all the attributes of the component
     * 
     * @example
     * ```js
     * var myComponent = new Component("div",{"id":"my-component"});

     * var attributes = myComponent.getAttributes(); // a div component
     * console.log(attributes); // {"id":"my-component"}; 
     * 
     * ```
     */
  public getAttributes(): { [key: string]: string } {
    return this.attribute;
  }

  /**
   * Get the children of the component
   * @returns List of all the Childrens of the component
   */
  public getChildren(): Component[] {
    return this.children;
  }
  
  public getParent(): Component | null {
    return this.parent;
  }
  /**
   * Sets or Creates a new attribute on the component
   * @param name nmae of the attribute to set
   * @param value the value of the attribute to set
   *
   * @example
   * ```js
   *
   * var myComponent = new Component("p");
   * myComponent.setAttribute("class", "my-component para lg:mx-5 sm:mx-1");
   * myComponent.setAttribute("id","my-unique-id");
   *
   * ```
   */
  public setAttribute(name: string, value: string): void {
    this.attribute[name] = value;
  }

  /**
   * Get the value of the attribute at the specified name
   * @param name the value of the attribute to get
   * @returns the value of the attribute
   */
  public getAttribute(name: string): string | undefined {
    return this.attribute[name];
  }

  /**
   * Remove the attribute at the specified name
   * @param name Attribute to remove from the component
   */
  public removeAttribute(name: string): void {
    delete this.attribute[name];
  }

  /**
   * Add a new child to the component
   * @param child Add a child to the component. Child can be of any level of inheritance of component.
   *
   * @example
   * ```js
   *  var component1 = new Component("div"); // parent component
   *  var component2 = new Component("p"); // child component
   *  component1.addChild(component2);
   *
   * ```
   * @deprecated Use `addChildren` instead
   */
  public addChild(child: Component): void {
    child.parent = this;
    this.children.push(child);
    Logger.info(
      __filename,
      "Adding " + child.getTag() + " to component ",
      this.tag
    );
    Logger.warn(__filename, "addChild is deprecated");
  }

  /**
   * Add multiple children to the component
   * @param childrenToAdd  A destructured list of components to add as children
   *
   * @example
   * ```js
   *  var component1 = new Component("div"); // parent component
   *  var component2 = new Component("p"); // child component
   *  component1.addChildren(component2);
   *
   * ```
   */
  public addChildren(...childrenToAdd: Component[]): void {
    childrenToAdd.forEach((child) => {
      child.parent = this;
    });
    this.children.push(...childrenToAdd);
    Logger.info(
      __filename,
      "Adding " + childrenToAdd.length + " children to component ",
      this.tag
    );
  }

  /**
   * Remove the child from the parent.
   * Note if the child is not refrenced anywhere but only by the parent, then remove it will delete it.
   * @param child The children component to remove as a child
   */
  public removeChild(child: Component): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  /**
   * Add new class to the `class` attribute
   * @param className add a new class to the attributes
   *
   * @example
   * ```
   * var myComponent = new Component("div");
   * myComponent.addClass("mx-5"); // class = "mx-5"
   * myComponent.addClass("my-1"); // class = "my-1" "mx-5"
   *
   * ```
   *
   * @deprecated
   * Use `addClasses` instead.
   */
  public addClass(className: string): void {
    Logger.warn(__filename, "addClass is deprecated");

    let classes = this.getAttribute("class");
    if (classes !== undefined) {
      let classArray = [...new Set(classes.split(","))];
      classArray.push(className);
      classes = classArray.join(" ");
      this.setAttribute("class", classes);
    } else {
      this.setAttribute("class", className);
    }
  }

  /**
   * Add multiple classes to the list of classes
   * @param classNames the destructured string array of class names to add to the component
   *
   * @example
   * ```js
   *  var myComponent = new Component("div");
   *  myComponent.addClasses("mx-5"); // class = "mx-5"
   *  myComponent.addClasses("my-1"); // class = "my-1" "mx-5"
   * ```
   */
  public addClasses(...classNames: string[]): void {
    let classes = this.getAttribute("class");
    if (classes !== undefined) {
      let classArray = [...new Set(classes.split(","))];
      classArray = [...classArray, ...classNames];
      classes = classArray.join(" ");
      this.setAttribute("class", classes);
    } else {
      this.setAttribute("class", classNames.join(" "));
    }
  }

  /**
   * Set styles for the Component
   * @param properties style properties to set
   */
  public setInlineStyles(properties: { [key: string]: string }): void {
    const styles = this.getAttribute("style") || "";
    const updatedStyles = Object.keys(properties).reduce((result, key) => {
      return result + key + ": " + properties[key] + "; ";
    }, styles);
    this.setAttribute("style", updatedStyles.trim());
  }

  /**
   * Delete the specified css properties
   * @param properties Destructured list of properties to delete
   */
  public deleteInlineStyles(...properties: string[]): void {
    const styleAttribute = this.getAttribute("style");
    if (styleAttribute !== undefined) {
      let styles = styleAttribute.trim();
      properties.forEach((property) => {
        const regex = new RegExp(`(^|\\s)${property}:[^;]+;?`, "g");
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

  /**
   * Get the string version of the entire component
   * @returns converted string representation
   */
  public toString(): string {
    return this.compileHtml();
  }

  /**
   * Convert this object into a string representation.
   * This includes the children as well.
   * @returns converted string representation
   */
  public compileHtml(): string {
    const attrs = Object.entries(this.attribute)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join("");

    const content = this.children
      .map((child) => (child instanceof Component ? child.toString() : child))
      .join("");

    return `<${this.tag} ${attrs}>${content}</${this.tag}>\n`;
  }

  /**
   * Fills the component in the specified direction.
   * @param direction - The direction to fill. Can be "vertical", "horizontal", or "both".
   */
  public fill(direction: "vertical" | "horizontal" | "both"): void {
    let newWidth =
      direction === "horizontal" || direction === "both" ? "0" : "1";
    let newHeight =
      direction === "vertical" || direction === "both" ? "0" : "1";
    this.setInlineStyles({
      "min-height": newHeight,
      "min-width": newWidth,
      "flex-grow": "1",
    });
    if (newWidth == "") {
      this.deleteInlineStyles("width");
    }
    if (newHeight == "") {
      this.deleteInlineStyles("height");
    }
  }

  /**
   * Aligns the component vertically and horizontally.
   * @param vertical - The vertical alignment. Can be "top", "bottom", or "middle".
   * @param horizontal - The horizontal alignment. Can be "left", "right", or "center".
   */
  public align(
    vertical: "top" | "bottom" | "middle",
    horizontal: "left" | "right" | "center"
  ): void {
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
    this.setInlineStyles({
      display: "flex",
      "align-items": align,
      "justify-content": justify,
    });
  }
}
