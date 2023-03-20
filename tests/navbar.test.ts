import Navbar from "../src/structural/navbar";
import Dropdown from "../src/structural/dropdown"
import Link from "../src/basic/link";


describe("Navbar", () => {
    it("should create the hirarchy as required",()=>{
        let navbar = new Navbar(
            new Link("link1"),
            new Link("link2"),
            new Dropdown("dropdown1","",[
                new Link("dropdownLink1"),
                new Link("dropdownLink2"),
                new Link("dropdownLink3"),
            ]),
            );

        expect(navbar.children.length).toBe(3);
        expect(navbar.children[2].children.length).toBe(2);
    });
});