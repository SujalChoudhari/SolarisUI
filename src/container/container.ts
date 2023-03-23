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

        this.addClass("container");
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


};