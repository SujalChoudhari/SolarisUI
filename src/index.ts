import Component from "./basic/component";
import Page from "./basic/page";
import Head from "./basic/head";
import String from "./basic/string";
import Link from "./basic/link";

import Navbar from "./structural/navbar";
import Dropdown from "./structural/dropdown";


class SolarisUI {
    public lang: string = "en";
    public encoding: string = "utf8";
    public htmlSource: { [key: string]: string } = {};

    constructor(lang: string = "en", encoding: string = "utf-8") {
        this.lang = lang;
        this.encoding = encoding;
    }

    public build(...root: Page[]): void {
        root.forEach(element => {
            this.htmlSource[element.url] = element.toString();
        });
    }
}



var project = new SolarisUI();


var page = new Page("main");
var head = new Head("Test Page", "Me", "idk", "a,b,c");
let navbar = new Navbar(
    new Link("link1"),
    new Link("link2"),
    new Dropdown("dropdown1", "", [
        new Link("dropdownLink1"),
        new Link("dropdownLink2"),
        new Link("dropdownLink3"),
    ]),
);
page.addChildren(head,navbar);
project.build(page);
console.log(project.htmlSource);