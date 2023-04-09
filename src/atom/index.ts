/**
 * @packageDocumentation
 * 
 * Atoms
 * -----
 * 
 * Atom and Atomizer are the core classes of the Atoms library.
 * This provides a way to load components from the templates efficiently.
 * 
 * ### Atomizer
 * Atomizer is the class that loads the templates and provides the AtomizerTemplate object.
 * Atomizer is responsible for preloading the templates and providing the AtomizerTemplate object.
 * It keeps track of which template is loaded and which is not.
 * 
 * ### Atom
 * Atom is the class that represents a single HTML element with its properties.
 * The Atom is just awar version of the Mustache template.
 * When the toString is called, the Atom renders the template with the props.
 * 
 * ### AtomizerTemplate
 * AtomizerTemplate is the class that represents a single template.
 * It is a wrapper around the Mustache template.
 * 
 * @license MIT license
 */



import Atom from "./atom";
import Atomizer, { AtomizerTemplate } from "./atomizer";
export {
    Atom, Atomizer, AtomizerTemplate
}