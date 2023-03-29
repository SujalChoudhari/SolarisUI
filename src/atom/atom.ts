import Mustache from 'mustache';
import { AtomizerTemplate } from './atomizer';


export default class Atom {
    public template: AtomizerTemplate;
    public props: { [key: string]: any };

    constructor(template: AtomizerTemplate, props: { [key: string]: any }) {
        this.template = template;
        this.props = props;

        if (this.template !== null)
            Mustache.parse(this.template);
    }

    public toString(): string {
        if (this.template === null) return "";
        return Mustache.render(this.template, this.props);
    }
}