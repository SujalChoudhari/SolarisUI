const Entity = require("../src/entity");

describe("Entity", () => {
    it("should give an entity a id", () => {
        let entity = new Entity("div", { "class": "mx-5" });
        let id = entity.getId()
        expect(id).toContain("__" + entity.tag);
    });

    it("should create an Entity with the correct tag and attributes", () => {
        let entity = new Entity("div", { "class": "mx-5" });
        expect(entity.tag).toBe("div");
        expect(entity.attributes).toEqual({ "class": "mx-5" });
    });

    it("should return correct attributes", () => {
        let entity = new Entity("div", { "class": "mx-5", "width": "100%" });
        expect(entity.getAttributes()).toEqual({ "class": "mx-5", "width": "100%" });
    });

    it("should convert the data to a string", () => {
        let entity = new Entity("a", { "href": "https://example.com", "src": "https://example.com" }, "Hello World!");
        let out = entity.toString();
        expect(out).toEqual(`<a id="${entity.getId()}" href="https://example.com" src="https://example.com">Hello World!</a>`);
    });

    it("should set and remove attributes", () => {
        let entity = new Entity("a", { "href": "https://example.com"}, "Hello World!");
        entity.setAttribute("href", "https://google.com");
        expect(entity.getAttribute("href")).toBe("https://google.com");
        entity.setAttribute("src", "https://example.com");
        expect(entity.getAttribute("src")).toBe("https://example.com");
        
    });
});