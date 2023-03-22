import SolarisUI from "../src/index";
import Page from "../src/basic/page";
import Head from "../src/basic/head";
import Body from "../src/basic/body";
import String from "../src/basic/string";
import Container from "../src/container/container";
import Heading from "../src/basic/heading";
import Component from "../src/basic/component";
import ModalContainer from "../src/container/modalcontainer";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        var project = new SolarisUI("Test");
        var page = new Page("index.html");
        var head = new Head("Test Page");
        var body = new Body();
        var container = new Container();
        var text = new Heading(3, "Test Page");
        // text.fill("vertical");
        // text.align("center","middle");
        container.addChild(text);
        container.fill("vertical");
        body.addChild(container);
        page.addChildren(head, body);
        project.build(page);
    });
});

