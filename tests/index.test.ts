import SolarisUI from "../src/index";
import Page from "../src/basic/page";
import Head from "../src/basic/head";
import Body from "../src/basic/body";
import String from "../src/basic/string";
import Container from "../src/container/container";
import Heading from "../src/basic/heading";
import Component from "../src/basic/component";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        // Demo example
        var solaris = new SolarisUI("my-test-project", "en", "utf-8");

        // Creating Landing Page
        var indexPage = new Page("index");
        let pageHead = new Head("My Demo Store",
            "developer",
            "description",
            "shop,store,products");
        let pageBody = new Body()
        indexPage.addChild(pageHead);
        indexPage.addChild(pageBody);

        let title = new Heading(1, "My Demo Store");
        title.align("middle", "center");
        title.setStyles({ "font-size": "60px" });
        let textContainer = new Container();
        textContainer.addChild(new Component("p", {}, [new String("NOT Welcome to my demo store")]));
        textContainer.addChild(new Component("p", {}, [new String("Welcome to my demo store")]));
        textContainer.addChild(new Component("p", {}, [new String("Welcome to my demo store")]));
        textContainer.addChild(new Component("p", {}, [new String("Welcome to my demo store")]));
        textContainer.getChildren()[0].align("middle", "right");
        textContainer.getChildren()[0].fill("vertical");
        textContainer.setStyles({ "color": "white", "background-color": "green" });

        let textContainer2 = new Container();
        textContainer2.addChild(new Component("p", {}, [new String("Part 2?")]));
        textContainer2.fill("both");
        textContainer2.getChildren()[0].align("middle", "center");
        textContainer2.getChildren()[0].fill("vertical");
        pageBody.addChildren(title, textContainer, textContainer2);


        solaris.build(indexPage);

    });
});

