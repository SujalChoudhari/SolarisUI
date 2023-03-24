import Container from "../src/container/container"

describe("Container", () => {
    var dummy: Container;
    beforeEach(() => {
        dummy = new Container();
    });

    it("must resize self to fit parent container", () => {
        dummy.fill("horizontal");
        expect(dummy.getAttribute("style")).toBeTruthy();
        dummy.fill("vertical");
        expect(dummy.getAttribute("style")).toBeTruthy();
        dummy.fill("both");
        expect(dummy.getAttribute("style")).toBeTruthy();

    });

    it("should align correctly", () => {
        dummy.fill("both");
        dummy.align("top","left");
        expect(dummy.getAttribute("style")).toBeTruthy();
    });

});