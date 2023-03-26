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
    Body,
    Button,
    Component,
    Head,
    Text,
    Link,
    Page,
    Script,
    String,
    Style
} from "./basic";


import {
    CardContainer,
    Container,
    GridContainer,
    HorizontalAlignContainer,
    ModalContainer,
    VerticalAlignContainer
} from "./container";

import {
    Section,
    TwoPartSection
} from "./layouts";

import {
    SolarisUI,
    SolarisUIConfig

} from "./solaris"

import FileManager from "./filemanager";
import Logger, { LogLevel } from "./logger";


export default SolarisUI;
export {
    SolarisUI,
    SolarisUIConfig,

    FileManager,
    Logger,
    LogLevel,

    Body,
    Button,
    Component,
    Head,
    Text,
    Link,
    Page,
    Script,
    String,
    Style,

    CardContainer,
    Container,
    GridContainer,
    HorizontalAlignContainer,
    ModalContainer,
    VerticalAlignContainer,

    Section,
    TwoPartSection
}