import Navbar from "../src/structural/navbar";
import Dropdown from "../src/structural/dropdown"
import Link from "../src/basic/link";


describe("Navbar", () => {
    it("should create the hirarchy as required",()=>{
        let navbar = new Navbar(
            new Link("link1","urls"),
            new Link("link2","urls"),
            new Dropdown("dropdown1","",[
                new Link("dropdownLink1","urls"),
                new Link("dropdownLink2","urls"),
                new Link("dropdownLink3","urls"),
            ]),
            );

        expect(navbar.getChildren().length).toBe(2);
        expect(navbar.getChildren()[1].getChildren().length).toBe(3);
    });
});