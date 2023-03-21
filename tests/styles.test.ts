import Component from "../src/basic/component";


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
        dummy.setStyles({"padding":"30px"});
        expect(dummy.toString()).toBeTruthy();
    });

    it("should reset the style", () => {
        dummy.setStyles({"color":"red"});
        expect(dummy.getAttribute("style")).toContain("color: red;");
    });


    it("should delete styles successfully", () => {
        dummy.deleteStyles("color", "margin-top");
        expect(dummy.getAttribute("style")).toEqual("background-color: red;");
    });
});
