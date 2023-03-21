import Component from "../basic/component";
import String from "../basic/string";

export default class Dropdown extends Component {
    constructor(name: string, icon: string, items: Component[]) {
        super("div");
        this.addClass("_dropdown")

        this.addChild(new Component("button", { "class": "_dropdown-button" }, [new String(name)]));
        var dropdownContent = new Component("div", { "class": "_dropdown-content" });
        items.forEach((item) => {
            dropdownContent.addChild(item);
        });
        this.addChild(dropdownContent);


        this.pmCss = `._dropdown {
            position: relative;
            display: inline-block;
        }
        
        ._dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            padding: 12px 16px;
            z-index: 1;
        }
        
        ._dropdown:hover ._dropdown-content {
            display: block;
        }`;
    }

};


