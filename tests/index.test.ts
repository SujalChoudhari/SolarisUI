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
        const body = sui.SolarisUI.createComponent("./src/basic/body.component.html",
            { children: "Nine" });
        const index = sui.SolarisUI.createComponent("./src/basic/page.component.html",
            { head: head, body: body, url: "index.html" });
        if (index)
            sui.SolarisUI.build(index);
    });
});

