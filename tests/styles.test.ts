import { config } from "process";
import { Component, Head, Style, ModalContainer, SolarisUI, Page } from "../src/index";


describe('Styles', () => {
    let dummy: Component;

    beforeEach(() => {
        dummy = new Component("div", { "class": "active" });
        dummy.setStyles({
            "background-color": "red",
            "color": "green",
            "margin-top": "4px"
        });
    });

    it("should create add styles as an attribute", () => {
        dummy.setStyles({ "padding": "30px" });
        expect(dummy.toString()).toBeTruthy();
    });

    it("should reset the style", () => {
        dummy.setStyles({ "color": "red" });
        expect(dummy.getAttribute("style")).toContain("color: red;");
    });


    it("should delete styles successfully", () => {
        dummy.deleteStyles("color", "margin-top");
        expect(dummy.getAttribute("style")).toEqual("background-color: red;");
    });
});


describe("Stylesheets", () => {
    it("must add a link tag to the corresponding head", () => {
        let head = new Head("Test Head");
        head.addStylesheet(new Style(
            "external", "https://example.com/stylesheets"
        ));
        expect(head.getChildren().at(-1)?.getTag()).toBe("link");
        expect(head.getChildren().at(-1)?.getAttribute("href")).toBe("https://example.com/stylesheets");
    });


    it("should successfully add classes and use the external css", () => {
        let project = new SolarisUI("My Test Project", undefined, undefined,
            { defaultCss: true, bootstrapSupport: false, tailwindSupport: false });
        let page = new Page("index")
        let head = new Head("Test Head",);
        let modal = new ModalContainer();
        page.addChildren(head, modal);
        project.build(page);

    })

});