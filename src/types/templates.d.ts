export type Article1Template = {
    title?: string;
    imgUrl?: string;
    author?: string;
    description?: string;
}

export type Article2Template = {
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

export type AvatarTemplate = {
    images?: Array<string>,
    moreNum?: number
}

export type BannerTemplate = {
    title: string,
    content: string,
    children: Array<string>,
}

export type BlogTemplate = {
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

export type BreadcrumbTemplate = {

    title: string,
    link: string,
    trail: Array<
        { title: string, link: string }
    >,

}

export type ButtonTemplate = {
    text: string
}

export type CallToActionTemplate = {
    title: string,
    call: string,
}

export type CardTemplate = {
    tag: string,
    title: string,
    imgUrl: string,
    description: string,
}

export type CarouselTemplate = {
    images: Array<string>
}

export type ErrorTemplate = {
    url: string,
}

export type FAQTemplate = {
    tag: string,
    faqs: Array<
        {
            question: string,
            answer: string,
        }
    >
}

export type FeatureTemplate = {
    imgUrl: string,
    features: Array<
        { title: string, description: string }
    >
}

export type FooterBigTemplate = {
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

export type FooterTemplate = {
    imgUrl: string,
    links: Array<
        { title: string, link: string }
    >,
    social: Array<
        { title: string, link: string }
    >
}

export type GalleryTemplate = {
    images: Array<
        {
            imgUrl: "https://source.unsplash.com/random/480x360",
            isBig: true,
        }
    >
}

export type HeaderTemplate = {
    links: Array<{title: string, link: string}>,
    imgUrl: string,
}

export type TableTemplate = {
    title: string;
    header: string[];
    rows: Array<{
        data: string[];
    }>;
};
