import { Component } from "../basic";
/**
 * Section
 * -----
 * Section Is a Base class for all the layout components.
 * 
 * @remarks
 * This is similar to the `Container` class, except user has 
 * less control over the padding and margin.
 * Instead of margin and padding, 
 * Sections use alignment and fill properties to lay the items out.
 * 
 * Note: Sections might use Container within.
 */
export default class Section extends Component {
    /**
    * A custom Component class representing a section element.
    * @constructor
    * @param {string} height - The height of the section element in a string format (e.g. "80vh").
    */
    constructor(height: string = "80vh") {
        super("section");
        this.setStyles({
            "height": height,
            "display": "flex",
        })
    }
}