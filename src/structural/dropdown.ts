import Component from "../basic/component";
import String from "../basic/string";

export default class Dropdown extends Component {
    constructor(name: string,icon: string,items: Component[]) {
        super("div");
        this.addClass("_dropdown")

        this.addChild(new Component("button",{"class":"_dropdown-button"},[new String(name)]));
        var dropdownContent = new Component("div",{"class":"_dropdown-content"});
        items.forEach((item)=>{
            dropdownContent.addChild(item);
        });
        this.addChild(dropdownContent);
    }
};


