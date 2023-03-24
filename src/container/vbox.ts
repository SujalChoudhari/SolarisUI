import Container from "./container";
import Component from "../basic/component";

export default class VerticalAlignContainer extends Container {

    constructor(
        padding?: string[],
        margin?: string[],
        attributes?: { [key: string]: string },
        children?: Component[]) {

        super(padding, margin, attributes, children);

        this.addClass("vertical-container");
    }
};