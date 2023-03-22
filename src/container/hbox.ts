import Container from "./Container";
import Component from "../basic/component";

export default class HorizontalAlignContainer extends Container {

    constructor(
        padding?: string[],
        margin?: string[],
        attributes?: { [key: string]: string },
        children?: Component[]) {

        super(padding, margin, attributes, children);

        this.setStyles({
            "flex-direction": "row"
        });
    }
};
