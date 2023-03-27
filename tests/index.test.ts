import { Component } from "../src/basic";
import * as sui from "../src/index";

import Logger, { LogLevel } from "../src/logger";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        sui.SolarisUI.init("Test", "en", "utf-8", {
            globalCss: true
        });

        const head = new sui.Head("Head");

        // creating index page
        const indexPage = new sui.Page("index.html");
        indexPage.addChild(head);
        indexPage.addChild(new sui.Body());
        const navbar = new sui.Components.Navbar(
            new sui.Link("SUI", "https://solarisui.vercel.app"),
            new sui.Link("Home", "https://solarisui.vercel.app"),
            new sui.Link("Github", "#"),
            new sui.Link("Docs", "#"),
            new sui.Components.Dropdown(
                "Menu",
                new sui.Link("Home", "https://solarisui.vercel.app"),
                new sui.Link("Github", "#"),
                new sui.Link("Docs", "#"),),

        );

        indexPage.body?.addChildren(navbar);

        for (let i = 1; i < 10; i++) {
            const heading = new sui.Text(`h${i}`, "Heading " + i);
            heading.addClasses("info");

            indexPage.body?.addChild(heading);
        }
        sui.SolarisUI.build(indexPage);
    });
});

