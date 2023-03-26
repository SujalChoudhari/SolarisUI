import Container from "./container";
import Component from "../basic/component";

export default class ModalContainer extends Container {
    constructor(children: Component[]=[]) {
        super(["0px"], ["0px"], {
            "role": "dialog",
            "aria-modal": "true"
        }, children);
        this.addClasses("modal-container");
    }
}
