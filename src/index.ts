import Component from "./basic/component";
import Page from "./basic/page";
import Head from "./basic/head";
import String from "./basic/string";
import Link from "./basic/link";

import Navbar from "./structural/navbar";
import Dropdown from "./structural/dropdown";

import FileManager from "./filemanager";


export default class SolarisUI {
    public name: string;
    public lang: string = "en";
    public encoding: string = "utf8";
    public htmlSource: { [key: string]: string } = {};
    public cssSource: { [key: string]: string } = {};
    public pages: Page[] = [];

    constructor(name: string, lang: string = "en", encoding: string = "utf-8") {
        this.name = name;
        this.lang = lang;
        this.encoding = encoding;
    }


    public build(...root: Page[]): void {
        const fileManager = new FileManager();
        this.pages = root;

        this.compileHtmlSource();
        this.compileCssSource();

        //Output
        fileManager.createDirectory(`./public/builds/${this.name}`);
        fileManager.createDirectory(`./public/builds/${this.name}/style`);

        Object.keys(this.htmlSource).forEach(key => {
            key = key.split('.')[0];
            fileManager.createFile(`./public/builds/${this.name}/${key}.html`, this.htmlSource[key]);
        });

        Object.keys(this.cssSource).forEach(key => {
            key = key.split(".")[0];
            fileManager.createFile(`./public/builds/${this.name}/style/${key}.css`, this.cssSource[key]);
        });

    }

    private compileHtmlSource(): void {
        this.pages.forEach(element => {
            this.htmlSource[element.url.split(".")[0]] = element.toString();
        });
    }

    private compileCssSource(): void {
        this.pages.forEach(element => {
            this.cssSource[element.url.split(".")[0]] = element.customCss();
        });
    }
}
