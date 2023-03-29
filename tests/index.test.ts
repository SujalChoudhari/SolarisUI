import { text } from "stream/consumers";
import { Component } from "../src/basic";
import * as sui from "../src/index";

import Logger, { LogLevel } from "../src/logger";

describe("Solaris", () => {
    it("should successfully create the given data source", () => {

        sui.SolarisUI.init("Test", "en", "utf-8", {
            globalCss: true
        });
        const head = sui.SolarisUI.createComponent("./src/basic/head.component.html",
            { title: "Title", meta: "" });

        // console.log(head?.children[0]);


        const body = sui.SolarisUI.createComponent("./src/basic/body.component.html",
            { children: 'None' });
        const index = sui.SolarisUI.createComponent("./src/basic/page.component.html",
            { head: head, body: body, url: "index.html" });
        const text = sui.SolarisUI.createComponent("./src/basic/text.component.html",
            { type: "h1", text: "Hello" });
        if (index && text) {
            body?.addChildren(text); // this wont affect the index as it creates a copy of the props
            sui.SolarisUI.build(index);
        }
    });
});

