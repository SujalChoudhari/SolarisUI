import SolarisUI from "../src/index";
import Page from "../src/basic/page";
import Head from "../src/basic/head";
import Body from "../src/basic/body";
import String from "../src/basic/string";
import Container from "../src/container/container";
import Heading from "../src/basic/heading";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        
        var project = new SolarisUI("My Test Project");
        var head = new Head("Head Common for all pages");
        // pages
        var indexPage = new Page("index.html");
        var aboutPage = new Page("about.html");
        var contactPage = new Page("contact.html");
        
        var indexBody = new Body();
        var headingHolder = new Container();
        var pageNameH3 = new Heading(3,"Test Page");
                indexPage.addChildren(head, indexBody);
                aboutPage.addChildren(head);
                contactPage.addChildren(head);

        headingHolder.fill("vertical");
        pageNameH3.align("bottom","right");
        pageNameH3.fill("vertical");
        headingHolder.addChild(pageNameH3);
        indexBody.addChildren(headingHolder,headingHolder);
        project.build(indexPage,aboutPage,contactPage);
        
    });
});

