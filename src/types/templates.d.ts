import { type } from "os";

export type Article1Props = {
    title?: string;
    imgUrl?: string;
    author?: string;
    description?: string;
}

export type Article2Props = {
    title?: string,
    tags?: Array<
        {
            name?: string,
            link?: string,
            target?: "_blank" | "_self" | "_parent" | "_top"
        }
    >,
    description?: string,
    author?: string,
    date?: string,
}

export type AvatarProps = {
    images?: Array<string>,
    moreNum?: number
}

export type BannerProps = {
    title: string,
    content: string,
    children: Array<string>,
}

export type BlogProps = {
    title: string,
    imgUrl: string,
    description: string,
    date: string,
    posts: Array<
        {
            title: string,
            imgUrl: string,
            description: string,
            date: string,
        }
    >,
}

export type BreadcrumbProps = {

    title: string,
    link: string,
    trail: Array<
        { title: string, link: string }
    >,

}

export type ButtonProps = {
    text: string
}

export type CallToActionProps = {
    title: string,
    call: string,
}

export type CardProps = {
    tag: string,
    title: string,
    imgUrl: string,
    description: string,
}

export type CarouselProps = {
    images: Array<string>
}

export type ErrorProps = {
    url: string,
}

export type FAQProps = {
    tag: string,
    faqs: Array<
        {
            question: string,
            answer: string,
        }
    >
}

export type FeatureProps = {
    imgUrl: string,
    features: Array<
        { title: string, description: string }
    >
}

export type FooterBigProps = {
    note: string,
    columns: Array<
        {
            title: string,
            rows: Array<{
                title: string,
                link: string,
            }>
        }>
}

export type FooterProps = {
    imgUrl: string,
    links: Array<
        { title: string, link: string }
    >,
    social: Array<
        { title: string, link: string }
    >
}

export type GalleryProps = {
    images: Array<
        {
            imgUrl: "https://source.unsplash.com/random/480x360",
            isBig: true,
        }
    >
}

export type HeaderProps = {
    links: Array<{title: string, link: string}>,
    imgUrl: string,
}