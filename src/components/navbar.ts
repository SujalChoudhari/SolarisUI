import { Component, Link, Style } from "../basic";
import { SolarisUI } from "../solaris";

export default class Navbar extends Component {
    protected activeLinkIndex: number = 0;
    constructor(brand: Component | Link, ...links: Link[]) {
        super("div", { id: "myTopnav" });
        this.addClasses("topnav");
        console.log(this.getParent())

        const hamburger = new Component("a", { class: "icon", onclick: `document.getElementById('myTopnav').classList.toggle('responsive')` });
        const icon = new Component("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: "16", height: "16", fill: "#fff" });
        const path = new Component("path", { d: "M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z" })
        icon.addChildren(path);
        hamburger.addChildren(icon);
        this.addChildren(brand);
        this.addChildren(...links);
        this.addChildren(hamburger);
    }
}