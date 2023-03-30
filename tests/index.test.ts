import { Component } from "../src/components";
import * as sui from "../src/index";


describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        const page = sui.SolarisUI.createPage("Test Page", "index.html", {
            "name": "Sujal Choudhari",
            "description": "This is a test page",
            "keywords": "test,page,solarisui"
        });

        // const temp = sui.Atomizer.preloadTemplates();
        console.log(Object.keys(sui.Atomizer.templates));

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
            ],children: [dropdown]
        });

        page.getChildren()[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(navbar));
        sui.SolarisUI.buildProject("Test", [page]);

    });
});

