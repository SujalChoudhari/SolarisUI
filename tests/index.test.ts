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

        let c = sui.SolarisUI.loadComponent("./tests/test.component.html",
            { name: "And I am", b: "idk" })

        indexPage.body?.addChildren(navbar, c);
        sui.SolarisUI.build(indexPage);
    });
});

