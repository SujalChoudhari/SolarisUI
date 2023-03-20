import Page from "../src/basic/page"

describe("Page", () => {
    it("should work as intended", () => {
        let component = new Page();
        let out = component.toString()
        expect(out).toContain("<html");
        expect(out).toContain("</html>");
        let page = new Page("./about");
        expect(page.url).toBe("./about");
    });


});