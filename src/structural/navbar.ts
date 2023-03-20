import Component from "../basic/component";
import Link from "../basic/link";

export default class Navbar extends Component {
    constructor(...items: (Component)[]) {
        super("nav");
        this.addClass("_navbar");
        this.addChildren(...items);
    }
}