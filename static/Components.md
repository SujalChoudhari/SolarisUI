## Guide to create Components

Components now can be created by using `createComponent` function in version `1.0.1-alpha.5` or later.

Here is how you can create a Header.
The Type hinting will provide the list of things to be set.
You can use `refactor` or  any other `dev tools` to auto generate the list.

```ts
import * as sui from "@sujalchoudhari/solaris-ui";

// {
//     links: Array<{title: string, link: string}>,
//     imgUrl: string,
// }
const header = sui.SolarisUI.createComponent<HeaderTemplate>("header",
{
    links: [
        {title: "Home", link: "/"},
        {title: "About", link: "/about"},
        {title: "Contact", link: "/contact"},
    ],
    imgUrl: "https://www.example.com/img/logo.png",
})

```

Similarly you can create other components, mentioned under "index/templateTypes" in the docs