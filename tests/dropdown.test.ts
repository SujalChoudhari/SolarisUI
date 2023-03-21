import Dropdown from "../src/structural/dropdown"
import Link from "../src/basic/link"
import console from "console";


describe("Dropdown", () => {
    it("should create a hirary of the dropdown", () => {
        let dropdown = new Dropdown("Test", "", [new Link("link", "_blank"), new Link("link2", "_blank"), new Link("link3", "_blank")]);
        expect(dropdown.getChildren()[1].getChildren().length).toBe(3)// 3 links under the dropdown-content
    });
});