import Container from "./container";
import Component from "../basic/component";

export default class ModalContainer extends Container {
    constructor(children: Component[]=[]) {
        super(["0px"], ["0px"], {
            "role": "dialog",
            "aria-modal": "true"
        }, children);
        this.setStyles({
            "position": "fixed",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "background-color": "rgba(0,0,0,0.5)",
            "z-index": "9999",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        });
    }
}
