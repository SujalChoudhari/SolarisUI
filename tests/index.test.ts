import { Component } from "../src/templates";
import * as sui from "../src/index";


describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        sui.SolarisUI.init("Test", "en", "utf-8", {
            globalCss: true
        });

        sui.Atomizer.templateFolder = "./src/templates/"
        const page = sui.Atomizer.loadTemplate("page");
        const head = sui.Atomizer.loadTemplate("head");
        const body = sui.Atomizer.loadTemplate("body");
        const headComponent = new sui.Atom(head, {title: "Test"});
        const bodyComponent = new sui.Atom(body, {children: ["Hello World!","World Hello"]});
        const pageComponent = new sui.Atom(page,{head:headComponent,body:bodyComponent}); 
        console.log(pageComponent.toString());
    });
});

