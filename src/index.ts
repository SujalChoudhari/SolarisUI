/**
 * @packageDocumentation
 * 
 * SolarisUI is a UI component-based framework that allows you to easily create static 
 * websites without worrying about writing your own HTML or CSS files.
 * 
 * ## Index.ts
 * The `Index.ts` file imports and 
 * re-exports all the underlying classes.
 * 
 * ## SolarisUI class
 * The `SolarisUI` class provides the main functionality of the framework. 
 * It allows you to create and manage UI components for your static website.
 * 
 * @license MIT license
 * [[include:Example.md]]
 */


import {
    Component,
    Script,
    String,
    Style
}  from "./components";

import {
    Atom,
    Atomizer,
    AtomizerTemplate
} from "./atom";

import {
    SolarisUI

} from "./solaris"

import {
    FileManager,
    Logger,
    LogLevel
} from "./utils";



export default SolarisUI;
export {
    SolarisUI,

    FileManager,
    Logger,
    LogLevel,

    Component,
    Script,
    String,
    Style,

    Atom,
    Atomizer,
    AtomizerTemplate
}

