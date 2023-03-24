import Head from "../src/basic/head";
import String from "../src/basic/string";
import Page from "../src/basic/page";

describe("Head", () => {

    it("should set all the constructor fields", () => {
        let head = new Head("TitleTest");
        expect(((head.getChildren()[0].getChildren()[0]) as String).content).toBe("TitleTest");
        head = new Head("TitleTest", "Author");
        expect(head.getChildren()[1].getAttributes().content).toBe("Author");
        head = new Head("TitleTest", "Author","Description","Keywords,Keywords,Description");
        expect(head.getChildren().length).toBe(4);
    });

});

describe("Page",()=>{
    it("should assign the link property of head",()=>{
        let page = new Page("abc.html");
        let head = new Head("Sujal");
        page.addChildren(head);
        console.log(head.getChildren()[4]);
    });

});
