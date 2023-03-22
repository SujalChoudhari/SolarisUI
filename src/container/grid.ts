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
            "display": "grid",
            "grid-template-columns": columns ?? "1fr",
            "grid-template-rows": rows ?? "auto",
            "grid-gap": "0"
        });
    }
};
