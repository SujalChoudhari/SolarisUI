import { Component } from "../src/components";
import * as sui from "../src/index";
import { Article1Template, Article2Template, AvatarTemplate, BannerTemplate, BlogTemplate, ButtonTemplate, BreadcrumbTemplate, CallToActionTemplate, HeaderTemplate, FooterBigTemplate, FooterTemplate, GalleryTemplate, CardTemplate, CarouselTemplate, ErrorTemplate, FAQTemplate, FeatureTemplate, TableTemplate } from "../src/templates";

describe("Solaris", () => {
    var page: Component;
    sui.Logger.logLevel = sui.LogLevel.DEBUG;

    beforeEach(() => {
        sui.Atomizer.addTemplateFolder({ baseDir: `${__dirname}/temp`, htmlDir: "", cssDir: "/css/", jsDir: "/js/" });
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
        const article = new sui.Atom(sui.Atomizer.getTemplate("article1"), {
            title: "Hello World",
            imgUrl: "https://source.unsplash.com/random/480x360",
            description: "This is a description",
            author: "Sujal Choudhari",
        } as Article1Template);

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(article));

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("ansh", () => {

        const article = new sui.Atom(sui.Atomizer.getTemplate("ansh"), {
            title: "Hello World",
            imgUrl: "https://source.unsplash.com/random/480x360",
            description: "This is a description",
            author: "Sujal Choudhari",
        });

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(article));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("article2", () => {
        const article = new sui.Atom(sui.Atomizer.getTemplate("article2"), {
            title: "Hello World",
            tags: [
                {
                    name: "tag1",
                    link: "https://google.com",
                    target: "_blank"
                },
                {
                    name: "tag2",
                    link: "https://google.com",
                    target: "_blank"
                }
            ],
            description: "This is a description",
            author: "Sujal Choudhari",
            date: "2020-01-01",
        } as Article2Template);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(article));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("avatar", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("avatar"), {
            images: [
                "https://source.unsplash.com/random/100x100",
                "https://source.unsplash.com/random/101x100",
                "https://source.unsplash.com/random/102x100",
                "https://source.unsplash.com/random/103x100",
            ],
            moreNum: 10
        } as AvatarTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page])
    });


    test("banner", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("banner"), {
            title: "Sale!",
            content: "This is a description",
            children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",],
        } as BannerTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("blogs", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("blog"), {
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
        } as BlogTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));
        sui.SolarisUI.buildProject("Components", [page], "lazy")
    });

    test("breadcrumb", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("breadcrumb"), {
            title: "Home",
            link: "https://google.com",
            trail: [
                { title: "Parent", link: "https://google.com" },
                { title: "Parent2", link: "https://google.com" },
                { title: "Parent3", link: "https://google.com" },
                { title: "Parent4", link: "https://google.com" },
                { title: "Parent5", link: "https://google.com" },
            ]
        } as BreadcrumbTemplate)
        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));
        sui.SolarisUI.buildProject("Components", [page])
    });

    test("button", () => {
        const button = new sui.Atom(sui.Atomizer.getTemplate("button"), {
            text: "Button"
        } as ButtonTemplate);

        const ghostButton = new sui.Atom(sui.Atomizer.getTemplate("ghostbutton"), {
            text: "Ghost Button"
        } as ButtonTemplate);

        const roundedButton = new sui.Atom(sui.Atomizer.getTemplate("roundedbutton"), {
            text: "Rounded Button"
        } as ButtonTemplate);

        page.addChildren(
            sui.Atomizer.buildComponentTreeFromAtom(button),
            sui.Atomizer.buildComponentTreeFromAtom(ghostButton),
            sui.Atomizer.buildComponentTreeFromAtom(roundedButton)
        )

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("calltoaction", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("cta2part"), {
            title: "Call to Action",
            call: "Click here",
        } as CallToActionTemplate);
        const atom2 = new sui.Atom(sui.Atomizer.getTemplate("cta2partdownload"), {
            title: "Call to Action",
            call: "Click here",
        } as CallToActionTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom)
            , sui.Atomizer.buildComponentTreeFromAtom(atom2));

        sui.SolarisUI.buildProject("Components", [page])
    });

    test("card", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("card"), {
            tag: "AA",
            title: "Card",
            imgUrl: "https://source.unsplash.com/random/480x360",
            description: "This is a description",
        } as CardTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("carousel", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("carousel"), {
            images: [
                "https://source.unsplash.com/720x600/?water",
                "https://source.unsplash.com/720x600/?code",
                "https://source.unsplash.com/720x600/?fire",
                "https://source.unsplash.com/720x600/?java",
                "https://source.unsplash.com/720x600/?sun",
                "https://source.unsplash.com/720x600/?adhd",
                "https://source.unsplash.com/720x600/?jupiter",
                "https://source.unsplash.com/720x600/?solar",
                "https://source.unsplash.com/720x600/?moon",
            ]
        } as CarouselTemplate);

        page.getChildren()[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("error", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("error"), {
            url: "https://google.com",
        } as ErrorTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("faq", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("faq"), {
            tag: "One Tag",
            faqs: [
                {
                    question: "This is a question",
                    answer: "This is an answer"
                },
                {
                    question: "This is a question",
                    answer: "This is an answer"
                },
                {
                    question: "This is a question",
                    answer: "This is an answer"
                },
            ]
        } as FAQTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);

    });


    test("feature", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("feature"), {
            imgUrl: "https://source.unsplash.com/random/480x360",
            features: [
                { title: "Feature1", description: "This is a description" },
                { title: "Feature2", description: "This is a description" },
                { title: "Feature3", description: "This is a description" },
                { title: "Feature4", description: "This is a description" },
                { title: "Feature5", description: "This is a description" },
                { title: "Feature6", description: "This is a description" },
                { title: "Feature7", description: "This is a description" },
            ]
        } as FeatureTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);

    });


    test("footerbig", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("footerbig"), {
            note: "Copywrite",
            columns: [
                {
                    title: "Intro",
                    rows: [{
                        title: "Intro",
                        link: "https://google.com",
                    }, {
                        title: "About",
                        link: "https://google.com",
                    }
                    ]
                },
                {
                    title: "company",
                    rows: [{
                        title: "Intro2",
                        link: "https://google.com",
                    }, {
                        title: "About3",
                        link: "https://google.com",
                    }]
                }
            ]
        } as FooterBigTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);

    });


    test("footer", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("footer"), {
            imgUrl: "https://source.unsplash.com/random/480x360",
            links: [
                { title: "Link1", link: "https://google.com" },
                { title: "Link2", link: "https://google.com" },
                { title: "Link3", link: "https://google.com" },
            ],
            social: [
                { title: "Link1", link: "https://google.com" },
                { title: "Link2", link: "https://google.com" },
                { title: "Link3", link: "https://google.com" },
            ]
        } as FooterTemplate);

        page.addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);

    });



    test("gallery", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("gallery"), {
            images: [
                {
                    imgUrl: "https://source.unsplash.com/random/480x360",
                    isBig: true,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/481x360",
                    isBig: false,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/482x360",
                    isBig: false,
                }, {
                    imgUrl: "https://source.unsplash.com/random/483x360",
                    isBig: false,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/484x360",
                    isBig: false,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/480x360",
                    isBig: false,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/481x360",
                    isBig: false,
                }, {
                    imgUrl: "https://source.unsplash.com/random/482x360",
                    isBig: true,
                }, {
                    imgUrl: "https://source.unsplash.com/random/483x360",
                    isBig: false,
                },
                {
                    imgUrl: "https://source.unsplash.com/random/484x360",
                    isBig: false,
                }
            ]
        } as GalleryTemplate);

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);

    });


    test("header", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("header"), {
            title:"Solaris",
            links: [
                {
                    title: "Link1",
                    link: "https://google.com",
                },
                {
                    title: "Link2",
                    link: "https://google.com",
                }, {
                    title: "Link3",
                    link: "https://google.com",
                }, {
                    title: "Link4",
                    link: "https://google.com",
                }
            ],
            imgUrl: "https://source.unsplash.com/random/480x360",
        } as HeaderTemplate);

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("hero", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("hero"), {
            title: "Hero Title",
            description: "Hero Description",
            primary: "Primary",
            secondary: "Secondary",
            imgUrl: "https://source.unsplash.com/random/480x360",
        });

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("input", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("input"), {
            title: "Name",
            hint: "Fullname",
            type: "text",
            placeholder: "Enter your name"
        });

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));

        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("Fileinput", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("fileinput"), {
            title: "Name"
        });

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom));
        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("spinners", () => {
        const atom = new sui.Atom(sui.Atomizer.getTemplate("spinner"), {

        });
        const atom2 = new sui.Atom(sui.Atomizer.getTemplate("loader"), {

        });

        page.children[1].addChildren(sui.Atomizer.buildComponentTreeFromAtom(atom)
            , sui.Atomizer.buildComponentTreeFromAtom(atom2));
        sui.SolarisUI.buildProject("Components", [page]);
    });

    test("table", () => {
        const page = sui.SolarisUI.createPage("Table", "index.html");
        page.children[1].addChildren(sui.SolarisUI.createComponent<TableTemplate>("table", {
            title: "",
            rows: [
                {
                    data: ["Data1", "Data2", "Data3"]
                },
                {
                    data: ["Data2", "Data2", "Data3"]
                }
            ],
            header: ["Header1", "Header2", "Header3"]
        }));
        sui.SolarisUI.buildProject("Components", [page], "lazy");
    });

});


describe("Create Components", () => {
    test("types work correctly", () => {
        const component = sui.SolarisUI.createComponent<HeaderTemplate>("header", {
            links: [
                {
                    title: "Link1",
                    link: "https://google.com",
                }
            ],
            imgUrl: "",
            title: "",
            primary: "Join",
            secondary: "Login"
        })
        expect(component).toBeInstanceOf(sui.Component);
    });
});

