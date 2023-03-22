import Component from "./basic/component";
import Page from "./basic/page";
import Head from "./basic/head";
import String from "./basic/string";
import Link from "./basic/link";

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
        this.pages.forEach(page => {
            page.setAttribute("lang", this.lang);
        });

        this.compileHtmlSource();

        //Output
        fileManager.createDirectory(`./public/builds/${this.name}`);

        Object.keys(this.htmlSource).forEach(key => {
            key = key.split('.')[0];
            fileManager.createFile(`./public/builds/${this.name}/${key}.html`, this.htmlSource[key]);
        });
    }

    private compileHtmlSource(): void {
        this.pages.forEach(element => {
            this.htmlSource[element.url.split(".")[0]] = element.toString();
        });
    }
}
