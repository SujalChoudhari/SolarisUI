import { Component } from "../src/components";
import * as sui from "../src/index";


describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        sui.Logger.logLevel = sui.LogLevel.TIME;
        const page = sui.SolarisUI.createPage("Test Page", "index.html", {
            "name": "Sujal Choudhari",
            "description": "This is a test page",
            "keywords": "test,page,solarisui"
        });
        sui.Logger.warn("index.test.ts", "Page created successfully");
        sui.Logger.error("index.test.ts", "Page created successfully");
        sui.Logger.time("index.test.ts", "Page created successfully");
        // const temp = sui.Atomizer.preloadTemplates();
        const dropdown = new sui.Atom(sui.Atomizer.templates.dropdown, {
            text: "Dropdown",
            links: [{
                href: "index.html",
                text: "Home"
            }, {
                href: "about.html",
                text: "About"
            }, {
                href: "contact.html",
                text: "Contact"
            }
            ]
        });

        new sui.Style("infile", "", {
            ".a":{
                "color": "red"
            },
            ".b":{
                "color": "blue"
            }
        });

        
        new sui.Style("infile", "", {
            ".c":{
                "color": "red"
            },
            ".d":{
                "color": "blue"
            }
        });
        new sui.Style("external", "https://example.com/");

        new sui.Script("infile", "", "console.log('Hello World')" ,{
            "a": "b"
        });
        new sui.Script("infile", "", "console.log('Hello World')" ,{
            "a": "b"
        });
        new sui.Script("external", "https://example.com/", "" ,{
            "a": "b"
        });

        

        const navbar = new sui.Atom(sui.Atomizer.templates.navbar, {
            title: "Navv Barr",
            links: [{
                href: "index.html",
                text: "Home"
            }, {
                href: "about.html",
                text: "About"
            }, {
                href: "contact.html",
                text: "Contact"
            }
            ], children: [dropdown]
        });

        page.getChildren()[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(navbar));
        page.addClasses("a");
        sui.SolarisUI.buildProject("Test", [page]);

    });
});

