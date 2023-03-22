import Component from "../src/basic/component";
import String from '../src/basic/string';

describe("Component", () => {
    it("should give an component a id", () => {
        let component = new Component("div", { "class": "mx-5" });
        let id = component.getId()
        expect(id).toContain("__" + component.getTag());
    });

    it("should create an Component with the correct tag and attributes", () => {
        let component = new Component("div", { "class": "mx-5" });
        expect(component.getTag()).toBe("div");
        expect(component.getAttributes()).toEqual({ "class": "mx-5" });
    });

    it("should return correct attributes", () => {
        let component = new Component("div", { "class": "mx-5", "width": "100%" });
        expect(component.getAttributes()).toEqual({ "class": "mx-5", "width": "100%" });
    });

    it("should convert the data to a string", () => {
        let component = new Component("a", { "href": "https://example.com", "src": "https://example.com" }, [new String("Hello World!")]);
        let out = component.toString();
        // console.log(out);
    });

    it("should set and remove attributes", () => {
        let component = new Component("a", { "href": "https://example.com" }, [new String("Hello World!")]);
        component.setAttribute("href", "https://google.com");
        expect(component.getAttribute("href")).toBe("https://google.com");
        component.setAttribute("src", "https://example.com");
        expect(component.getAttribute("src")).toBe("https://example.com");

    });

});

