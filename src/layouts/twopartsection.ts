import { Component } from "../basic";
import { HorizontalAlignContainer, VerticalAlignContainer } from "../container";
import Logger from "../logger";
import Section from "./section";

export default class TwoPartSection extends Section {
    public left: VerticalAlignContainer;
    public right: VerticalAlignContainer;
    constructor() {
        super();

        const alignContainers = (container: VerticalAlignContainer) => {
            container.fill("both");
            container.align("middle", "center");
        };

        this.left = new VerticalAlignContainer();
        alignContainers(this.left);

        this.right = new VerticalAlignContainer();
        alignContainers(this.right);

        const main = new HorizontalAlignContainer();
        main.addChildren(...[this.left, this.right]);
        main.fill("both");
        this.addChildren(main);
    }

   

}