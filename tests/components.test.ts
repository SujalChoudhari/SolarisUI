import * as sui from "../src/";

test('Components', () => {
    const container = new sui.Atom(sui.Atomizer.getTemplate("container"), {
        children: [
            new sui.Atom(sui.Atomizer.getTemplate("image"), {
                attributes: [
                    { name: "src", value: "https://via.placeholder.com/150" },
                    { name: "alt", value: "Placeholder Image" }
                ]
            }
            ), "Hello World!"]
    });

    const page = sui.SolarisUI.createPage("Test Page", "test.html", {
        "description": "This is a test page.",
        "author": "Sujal Choudhari"
    });
    page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(container))

    sui.SolarisUI.buildProject("test", [page]);
});