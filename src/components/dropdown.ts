import { Button, Component, Link, Style } from "../basic";
import { SolarisUI } from "../solaris";

export default class Dropdown extends Component {
    protected activeLinkIndex: number = 0;
    constructor(menuText: string, ...links: Link[]) {
        super("div", { class: "dropdown" });

        this.addChildren(new Button(menuText,{class: "dropdown-button"}));
        let content = new Component("div",{class:"dropdown-content"});
        content.addChildren(...links);
        this.addChildren(content);
    }
}
