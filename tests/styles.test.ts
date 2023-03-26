import Style from '../src/basic/styles';

describe("Style class tests", () => {
    let style: Style;

    beforeAll(() => {
        style = new Style("infile", "",
            {
                "container": {
                    "display": "flex",
                    "justify-content": "center",
                    "align-items": "center",
                },
            },
        );
    });

    test("toString() returns the correct CSS string", () => {
        const expectedCSS =
            ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n";
        expect(style.toString()).toContain(".container");
        expect(style.toString()).toContain("display: flex;");
        expect(style.toString()).toContain("justify-content: center;");
    });


    test(" addStyle",()=>{
        style.addClassProperty("container",{
            "background":"url(test)"
        });

        expect(style.toString()).toContain("background: url(test)");
        expect(style.toString()).toContain("display: flex");
    });

    test("remove style",()=>{
        
        expect(style.toString()).toContain("background: url(test)")
    });

    
});
