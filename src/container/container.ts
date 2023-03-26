import Component from "../basic/component";

/**
 * Container
 * -----
 * Containers are special Components that have Padding and Margin properties.
 * 
 * @author Sujal Choudhari <sjlchoudhari@gmail.com>
 */
export default class Container extends Component {
    /**
     * Create a new Container
     * @param padding The padding of the container
     * @param margin The margin of the container
     * @attributes the attributes of the `component`
     * @children the children of the `component`
     */
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

        this.addClasses("container");
    }

    /**
     * Set the padding of the container.
     * If right is not specified, then top is applied everywhere.
     * Hence, it follows the the css rules of compact layouts.
     * @param top Padding from top of container
     * @param right Padding from right of container
     * @param bottom Padding from bottom of container
     * @param left Padding from left of container
     */
    public setPadding(
        top: string,
        right: string = "",
        bottom: string = "",
        left: string = ""): void {
        this.setInlineStyles({
            "padding": `${top} ${right} ${bottom} ${left}`
        })
    }

    /**
     * Set the margin of the container.
     * If right is not specified, then top is applied everywhere.
     * Hence, it follows the the css rules of compact layouts.
     * @param top Margin from top of container
     * @param right Margin from right of container
     * @param bottom Margin from bottom of container
     * @param left Margin from left of container
     */
    public setMargin(
        top: string,
        right: string = "",
        bottom: string = "",
        left: string = ""): void {
        this.setInlineStyles({
            "margin": `${top} ${right} ${bottom} ${left}`
        })
    }


};