import Component from "../basic/component";
import Link from "../basic/link";

export default class Navbar extends Component {
    constructor(...items: (Component)[]) {
        super("nav");
        this.addClass("_navbar");
        let ribbon = new Component("div", { class: "_navbar-desktop" });
        ribbon.addChildren(...items);

        let mobile = new Component("div", { class: "_navbar-mobile" });
        mobile.addChildren(...items);

        this.addChildren(ribbon, mobile);
        this.pmCss = `@media screen and (max-width:600px) {
            ._navbar-desktop {
                display: none;
            }
        }
        
        @media screen and (min-width:601px) {
            ._navbar-mobile {
                display: none;
            }
        }`;
    }


}