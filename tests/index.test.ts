import { Component } from "../src/components";
import * as sui from "../src/index";


describe("Solaris", () => {
    var page: Component;

    beforeEach(() => {
        page = sui.SolarisUI.createPage(
            "Index Page",
            "index.html",
            {
                author: "Sujal Choudhari",
                description: "This is the index page",
                keywords: "index, page, solaris"
            }
        );

        new sui.Script("external", "https://cdn.tailwindcss.com");
    })


    test("article1", () => {
        const article = new sui.Atom(sui.Atomizer.templates.article1, {
            title: "Hello World",
            imgUrl: "https://source.unsplash.com/random/480x360",
            description: "This is a description",
            author: "Sujal Choudhari",
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(article));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("article2", () => {
        const article = new sui.Atom(sui.Atomizer.templates.article2, {
            title: "Hello World",
            tags: [
                {
                    name: "tag1",
                    link: "https://google.com"
                },
                {
                    name: "tag2",
                    link: "https://google.com"
                }
            ],
            description: "This is a description",
            author: "Sujal Choudhari",
            date: "2020-01-01",
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(article));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("avatar", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.avatar, {
            images: [
                "https://source.unsplash.com/random/100x100",
                "https://source.unsplash.com/random/101x100",
                "https://source.unsplash.com/random/102x100",
                "https://source.unsplash.com/random/103x100",
            ],
            moreNum: 10
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("banner", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.banner, {
            title: "Sale!",
            content: "This is a description",
            children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",],
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("blogs", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.blog, {
            title: "Blog",
            imgUrl: "https://source.unsplash.com/random/480x362",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ",
            date: "2020-01-01",
            posts: [
                {
                    title: "Blog1",
                    imgUrl: "https://source.unsplash.com/random/580x361",
                    description: "This is a description",
                    date: "2020-01-01",
                },
                {
                    title: "Blog2",
                    imgUrl: "https://source.unsplash.com/random/581x360",
                    description: "This is a description",
                    date: "2020-01-01",
                },
                {
                    title: "Blog3",
                    imgUrl: "https://source.unsplash.com/random/582x360",
                    description: "This is a description",
                    date: "2020-01-01",
                },
                {
                    title: "Blog4",
                    imgUrl: "https://source.unsplash.com/random/583x360",
                    description: "This is a description",
                    date: "2020-01-01",
                },

            ],
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));
        sui.SolarisUI.buildProject("Components", [page])
    });

    test("breadcrumb", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.breadcrumb, {
            title: "Home",
            link: "https://google.com",
            trail: [
                { title: "Parent", link: "https://google.com" },
                { title: "Parent2", link: "https://google.com" },
                { title: "Parent3", link: "https://google.com" },
                { title: "Parent4", link: "https://google.com" },
                { title: "Parent5", link: "https://google.com" },
            ]
        })
        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));
        sui.SolarisUI.buildProject("Components", [page])
    });

    test("button", () => {
        const button = new sui.Atom(sui.Atomizer.templates.button, {
            text: "Button"
        });

        const ghostButton = new sui.Atom(sui.Atomizer.templates.ghostbutton, {
            text: "Ghost Button"
        });

        const roundedButton = new sui.Atom(sui.Atomizer.templates.roundedbutton, {
            text: "Rounded Button"
        });

        page.addChildren(
            sui.Atomizer.buildComponentTreeFromAtom(button),
            sui.Atomizer.buildComponentTreeFromAtom(ghostButton),
            sui.Atomizer.buildComponentTreeFromAtom(roundedButton)
        )

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("calltoaction", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.cta2part,{
            title: "Call to Action",
            call: "Click here",
        });
        const atom2 = new sui.Atom(sui.Atomizer.templates.cta2partdownload,{
            title: "Call to Action",
            call: "Click here",
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom)
        ,sui.Atomizer.buildComponentTreeFromAtom(atom2));

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("card", () => {
        const atom = new sui.Atom(sui.Atomizer.templates.card, {
            tag:"AA",
            title: "Card",
            imgUrl: "https://source.unsplash.com/random/480x360",
            description: "This is a description",
        });

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("carousel",()=>{
        const atom = new sui.Atom(sui.Atomizer.templates.carousel,{
            images:[
                "https://source.unsplash.com/random/480x360",
                "https://source.unsplash.com/random/481x360",
                "https://source.unsplash.com/random/482x360",
                "https://source.unsplash.com/random/483x360",
                "https://source.unsplash.com/random/484x360",
            ]
        });

        page.getChildren()[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

});

