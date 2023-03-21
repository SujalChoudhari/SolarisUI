import Container from "../src/container/container"

describe("Container", () => {
    var dummy: Container;
    beforeEach(() => {
        dummy = new Container();
    });

    it("must resize self to fit parent container", () => {
        dummy.fill("horizontal");
        expect(dummy.getAttribute("style")).toContain("width: 100%;");
        dummy.fill("vertical");
        expect(dummy.getAttribute("style")).toContain("height: 100%;");
        dummy.fill("both");
        expect(dummy.getAttribute("style")).toContain("width: 100%; height: 100%;");

    });

    it("should align correctly", () => {
        dummy.fill("both");
        dummy.align("center","middle");
        expect(dummy.getAttribute("style")).toContain("left: 50%; transform: translateY(-50%); top: 50%;");        
    });

});