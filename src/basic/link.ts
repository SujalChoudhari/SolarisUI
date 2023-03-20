import Component from './component'
import String from './string';

export default class Link extends Component {

    constructor(content: string = "",url: string, target: string = "_self",) {
        super("a", {
            "target": target,
            "href": url
        });
        this.addChild(new String(content));
    }
};

module.exports = Link;
