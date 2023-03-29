import { Component } from "../src/templates";
import * as sui from "../src/index";


describe("Solaris", () => {
    it("should successfully create the given data source", () => {


        const page = sui.SolarisUI.createPage("Test Page", {
            "name": "Sujal Choudhari",
            "description": "This is a test page",
            "keywords": "test,page,solarisui"
        });

        // sui.SolarisUI.build();
        console.log(page.toString());
    });
});

