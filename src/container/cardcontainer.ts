import Component from "../basic/component";
import Container from "./container";
export default class CardContainer extends Container {
    constructor(cards: Component[]) {
        super(["0px"], ["0px"], {}, cards);
        this.addClass("card-container");
    }
};