import Head from "../src/basic/head";
import String from "../src/basic/string";


describe("Head", () => {

    it("should set all the constructor fields", () => {
        let head = new Head("TitleTest");
        expect(((head.getChildren()[0].getChildren()[0]) as String).content).toBe("TitleTest");
        head = new Head("TitleTest", "Author");
        expect(head.getChildren()[1].attributes.content).toBe("Author");
        head = new Head("TitleTest", "Author","Description","Keywords,Keywords,Description");
        expect(head.getChildren().length).toBe(4);
    });

});
