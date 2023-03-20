import Component from './component'

export default class Page extends Component {
    public url:string;
    constructor(url:string="./page.html") {
        super("html");
        this.url = url;
    }
};

module.exports = Page;