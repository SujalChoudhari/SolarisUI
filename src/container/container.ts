import Component from "../basic/component";

export default class Container extends Component {

    constructor(
        padding?: string[],
        margin?: string[],
        attributes?: { [key: string]: string },
        children?: Component[]) {

        super("div", attributes, children);

        if (padding)
            this.setPadding(padding[0], padding[1], padding[2], padding[3]);
        if (margin)
            this.setMargin(margin[0], margin[1], margin[2], margin[3]);

        this.setStyles({
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",

        });
    }

    public setPadding(
        top: string,
        right: string = "",
        bottom: string = "",
        left: string = ""): void {
        this.setStyles({
            "padding": `${top} ${right} ${bottom} ${left}`
        })
    }

    public setMargin(
        top: string,
        right: string = "",
        bottom: string = "",
        left: string = ""): void {
        this.setStyles({
            "margin": `${top} ${right} ${bottom} ${left}`
        })
    }

    public fill(direction: string): void {
        if (direction === "vertical") {
            this.setStyles({ height: "100%", flexGrow: "1" });
        } else if (direction === "horizontal") {
            this.setStyles({ width: "100%", flexGrow: "1" });
        } else if (direction === "both") {
            this.setStyles({ width: "100%", height: "100%", flexGrow: "1" });
        }
    }

    public align(vertical: string, horizontal: string): void {
        let alignItems = "stretch";
        let justifyContent = "flex-start";
        if (vertical === "top") {
            alignItems = "flex-start";
        } else if (vertical === "bottom") {
            alignItems = "flex-end";
        } else if (vertical === "middle") {
            alignItems = "center";
        }
        if (horizontal === "left") {
            justifyContent = "flex-start";
        } else if (horizontal === "right") {
            justifyContent = "flex-end";
        } else if (horizontal === "center") {
            justifyContent = "center";
        }
        this.setStyles({ alignItems, justifyContent });
    }


};