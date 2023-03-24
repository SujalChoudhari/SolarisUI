import {SolarisUI,Page,Head,Body,String,Container,Heading,Component,ModalContainer} from "../src/index";

import Logger, { LogLevel } from "../src/logger";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        var project = new SolarisUI("Test");
        var page = new Page("index.html");
        var head = new Head("Test Page");
        var body = new Body();
        var container = new Container();
        var text = new Heading(3, "Test Page");
        Logger.logLevel = LogLevel.DEBUG;
        Logger.info(__filename,"Creating a test page");
        // text.fill("vertical");
        // text.align("center","middle");
        container.addChild(text);
        container.fill("vertical");
        body.addChild(container);
        page.addChildren(head, body);
        project.build(page);
    });
});

