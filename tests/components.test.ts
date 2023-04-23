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
            ),"Hello World!"]
    });


    sui.SolarisUI.buildProject("test", [sui.Atomizer.buildComponentTreeFromAtom(container)]);
});