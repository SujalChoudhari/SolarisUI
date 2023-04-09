import Mustache from 'mustache';
import { AtomizerTemplate } from './atomizer';

/**
 * Atom
 * -----
 * An atom is a single HTML element with its properties.
 * An atom has a template string and the props that are to be rendered in the template.
 * @author Sujal Choudhari <sjlchoudhari.gmail.com>
 */
export default class Atom {
    /**
     * The template string
     */
    public template: AtomizerTemplate;

    /**
     * The props that are to be rendered in the template
     */
    public props: { [key: string]: any };

    /**
     * Creates a new Atom
     * @param template The template string
     * @param props The props that are to be rendered in the template
     */
    constructor(template:AtomizerTemplate, props: { [key: string]: any }) {
        this.template = template;
        this.props = props;
        if (this.template !== null)
            Mustache.parse(this.template);
    }

    /**
     * Get the HTML equivalent of the atom
     * @returns The rendered template string with the props
     */
    public toString(): string {
        if (this.template === null) return "";
        return Mustache.render(this.template, this.props);
    }
}