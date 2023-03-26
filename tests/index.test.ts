import { Component } from "../src/basic";
import * as sui from "../src/index";

import Logger, { LogLevel } from "../src/logger";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        const project = new sui.SolarisUI("Test", "en", "utf-8", {
            globalCss: true
        });

        const head = new sui.Head("Head");

        // creating index page
        const indexPage = new sui.Page("index.html");
        indexPage.addChild(head);
        indexPage.addChild(new sui.Body());
        const navbar = new sui.Components.Navbar(new sui.Link("SUI", "https://solarisui.vercel.app"), new sui.Link("Home", "https://solarisui.vercel.app"),new sui.Link("Github", "#"), new sui.Link("Docs", "#"));

        indexPage.body?.addChildren(navbar);
        for (let i = 1; i <= 7; i++) {
            const heading =new sui.Text(`h${i}`, "Heading " + i);
            heading.setInlineStyles({
                color:`#f${i}${i}${i}cc`,
                "background-color": `#${i}f${i}0${i}f`
            })
            indexPage.body?.addChild(heading);
        }

        // Hero 
        const hero = new sui.HorizontalAlignContainer(["20px"]);
        hero.align("middle", "center");
        hero.addChild(new sui.Text(`h${1}`, "Hero Test"));
        hero.addChild(new sui.Button("Button"));
        hero.addChild(new sui.Button("", new sui.Link("","https://google.com"), new sui.Link("","https://google.com")));
        
        // Full height Container
        const container = new sui.VerticalAlignContainer(["20px"]);
        container.align("middle", "center");
        container.fill("vertical");
        for (let i = 0; i < 10; i++) {
            container.addChild(new sui.String(`Hello ${i}`) );
        }

        indexPage.body?.addChildren(hero,container);

        console.log(hero.getParent())
        project.build(indexPage);
    });
});

