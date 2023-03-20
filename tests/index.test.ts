import SolarisUI from "../src/index";
import Page from "../src/basic/page";
import Head from "../src/basic/head";
import Body from "../src/basic/body";
import Navbar from "../src/structural/navbar";
import Link from "../src/basic/link";
import Dropdown from "../src/structural/dropdown";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        var project = new SolarisUI("Test");
        var page = new Page("index.html");
        var head = new Head("Test Page", "Me", "idk", "a,b,c");
        var body = new Body();

        let navbar = new Navbar(
            new Link("link1","url"),
            new Link("link2","url2"),
            new Dropdown("dropdown1", "", [
                new Link("dropdownLink1","AAa"),
                new Link("dropdownLink2","VV"),
                new Link("dropdownLink3","AKK"),
            ]),
        );
        body.addChild(navbar);
        page.addChildren(head, body);
        
        project.build(page);
    });
});