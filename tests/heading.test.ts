import Heading from "../src/basic/heading"


describe("Heading",()=>{
    it("must create a valid h tag",()=>{
        let heading = new Heading(1,"Hello world");
        expect(heading.getTag()).toBe("h1");
    });

    it("should change 0 to 1 in type filed",()=>{
        let heading = new Heading(0,"Hello world");
        expect(heading.getTag()).toBe("h1");
    });

    it("should change +6 to 6 in type filed",()=>{
        let heading = new Heading(69,"Hello world");
        expect(heading.getTag()).toBe("h6");
    });

});