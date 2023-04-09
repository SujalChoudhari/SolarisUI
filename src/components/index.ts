/**
 * @packageDocumentation
 * 
 * Components
 * -----
 * 
 * ### Component
 * Component is the representation of a single HTML element.
 * A component tree can be built using the Component class.
 * A vDom is created using the Component class, which is then compiled to HTML.
 * 
 * ### Script
 * Script is the representation of a single JavaScript script.
 * A script can be either infile or external.
 * 
 * ### String
 * String is the representation of a single string.
 * Text in Html, other than tags and attributes, is represented by String.
 * 
 * ### Style
 * Style is the representation of a single CSS style.
 * A style can be either inline or external.
 * 
 * @license MIT license
 */

import Component from "./component";
import Script from "./scripts";
import String from "./string";
import Style from "./styles";

export {
    Component,
    Script,
    String,
    Style
}; 