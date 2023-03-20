import Component from './component'

export default class Link extends Component {

    constructor(url: string, target: string = "_self") {
        super("a", {
            "target": target,
            "href": url
        });
    }
};

module.exports = Link;
