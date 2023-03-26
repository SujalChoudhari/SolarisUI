import Text from "../src/basic/text"


describe("Heading",()=>{
    it("must create a valid h tag",()=>{
        let heading = new Text("h1","Hello world");
        expect(heading.getTag()).toBe("h1");
    });

    it("should should use default h1 tag",()=>{
        let heading = new Text("h0","Hello world");
        expect(heading.getTag()).toBe("h1");
    });

    it("should should use default p tag",()=>{
        let heading = new Text("h69","Hello world");
        expect(heading.getTag()).toBe("h6");
    });

    it("should make any other text type",()=>{
        let heading = new Text("pre","Hello world");
        expect(heading.getTag()).toBe("pre");
    });
});