import Component from './component'
import Head from './head';

export default class Page extends Component {
    public url: string;
    constructor(url: string = "./page.html") {
        super("html");
        this.url = url;
    }
};

module.exports = Page;