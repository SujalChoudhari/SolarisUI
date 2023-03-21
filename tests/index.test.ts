import SolarisUI from "../src/index";
import Page from "../src/basic/page";
import Head from "../src/basic/head";
import Body from "../src/basic/body";
import Link from "../src/basic/link";
import FileManager from "../src/filemanager";
import Heading from "../src/basic/heading";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        var project = new SolarisUI("Test");
        var page = new Page("index.html");
        var head = new Head("Test Page", "Me", "idk", "a,b,c");
        var body = new Body();
        page.addChildren(head, body);
        project.build(page);
    });
});

