import Container from "./container";
import Component from "../basic/component";
export default class GridContainer extends Container {

    constructor(
        padding?: string[],
        margin?: string[],
        attributes?: { [key: string]: string },
        children?: Component[],
        columns?: string,
        rows?: string
    ) {

        super(padding, margin, attributes, children);

        this.setStyles({
            "grid-template-columns": columns ?? "1fr",
            "grid-template-rows": rows ?? "auto"
        });

        this.addClasses("grid-container")
    }
};
