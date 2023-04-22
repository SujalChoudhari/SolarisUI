import { IndentStyle } from 'typescript';
import * as sui from '../src';
import { Article1Template, AvatarTemplate, CarouselTemplate, FAQTemplate, FeatureTemplate, FooterTemplate, HeaderTemplate,HeroTemplate } from '../src/templates';

describe('sui', () => {
    it('should be defined', () => {
        expect(sui).toBeDefined();
    });

    test("example website", () => {
        new sui.Script("external", "https://cdn.tailwindcss.com");
        const meta = {
            author: "Solaris",
            description: "A simple website built using Solaris UI",
            keyWords: "solaris, ui, framework, javascript, html, css"
        }
        const indexPage = sui.SolarisUI.createPage("Index", "/index.html", meta);

        const navbar = sui.SolarisUI.createComponent<HeaderTemplate>("header", {
            links: [
                { title: "Home", link: "./index.html" },
                { title: "About", link: "./about.html" },
                { title: "Contact", link: "./contact.html" }
            ],
            imgUrl: 'https://source.unsplash.com/64x64/?solar',
            title: 'Solaris UI',
            primary: 'GitHub',
            secondary: 'NPM'
        });

        indexPage.children[1].addChildren(navbar);



        // index page
        const hero = sui.SolarisUI.createComponent<HeroTemplate>("hero", {
            title: 'A revolutionary UI framework',
            imgUrl: 'https://source.unsplash.com/900x600/?sun',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
            primary: 'Download',
            secondary: 'Projects'
        });

        const feature = sui.SolarisUI.createComponent<FeatureTemplate>("feature", {
            imgUrl: 'https://source.unsplash.com/900x1000/?drill',
            features: [
                { title: 'Feature 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { title: 'Feature 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { title: 'Feature 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { title: 'Feature 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { title: 'Feature 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { title: 'Feature 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
            ]
        });

        const carousel = sui.SolarisUI.createComponent<CarouselTemplate>("carousel", {
            images: [
                'https://source.unsplash.com/900x600/?sun',
                'https://source.unsplash.com/900x600/?moon',
                'https://source.unsplash.com/900x600/?earth',
                'https://source.unsplash.com/900x600/?mars',
                'https://source.unsplash.com/900x600/?jupiter',
                'https://source.unsplash.com/900x600/?saturn',
                'https://source.unsplash.com/900x600/?uranus',
            ]
        });

        const article = sui.SolarisUI.createComponent<Article1Template>("article1", {
            title: 'Article 1',
            imgUrl: 'https://source.unsplash.com/900x600/?write',
            author: 'Team Solaris',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.'
        });


        const faq = sui.SolarisUI.createComponent<FAQTemplate>("faq", {
            tag: 'Frequency Asked Questions',
            faqs: [
                { question: 'Question 1', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { question: 'Question 2', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { question: 'Question 3', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { question: 'Question 4', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { question: 'Question 5', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
                { question: 'Question 6', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.' },
            ]
        });

        const footer = sui.SolarisUI.createComponent<FooterTemplate>("footer", {
            imgUrl: './index.html',
            links: [
                { title: 'Home', link: './index.html' },
                { title: 'About', link: './about.html' },
                { title: 'Contact', link: './contact.html' }

            ],
            social: [
                { title: 'Facebook', link: 'https://www.facebook.com/solarisui' },
                { title: 'Twitter', link: 'https://twitter.com/solarisui' },
                { title: 'Instagram', link: 'https://www.instagram.com/solarisui' },
                { title: 'GitHub', link: 'https://github.com/solarisui' }
            ]
        });

        indexPage.children[1].addChildren(
            hero,
            carousel,
            feature,
            article,
            faq,
            footer);



        sui.SolarisUI.buildProject("Example", [indexPage],);
    });
});