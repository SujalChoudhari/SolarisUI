import Component from './component'
import String from './string';

export default class Head extends Component {
    constructor(title: string = "", author: string = "", description: string = "", keywords: string = "") {
        super("head");
        this.setTitle(title);
        this.setAuthor(author);
        this.setDescription(description);
        this.setKeywords(keywords);
        

    }

    public setTitle(title: string): void {
        const titleEl = this.pmChildren.find(child => child.getTag() === 'title');
        if (titleEl) {
            titleEl.addChild(new String(title))
        } else {
            const newTitle = new Component('title', {}, [new String(title)]);
            this.addChildren(newTitle);
        }
    }

    public setDescription(description: string): void {
        const descEl = this.pmChildren.find(child => child.getAttribute("name") === 'description');
        if (descEl) {
            descEl.setAttribute("content", description);
        } else {
            const newDesc = new Component('meta', { name: 'description', content: description });
            this.addChildren(newDesc);
        }
    }

    public setKeywords(keywords: string): void {
        const keywordsEl = this.pmChildren.find(child => child.getAttribute("name") === 'keywords');
        if (keywordsEl) {
            keywordsEl.setAttribute("content", keywords);
        } else {
            const newKeywords = new Component('meta', { name: 'keywords', content: keywords });
            this.addChildren(newKeywords);
        }
    }

    public setAuthor(author: string): void {
        const authorEl = this.pmChildren.find(child => child.getAttribute("name") === 'author');
        if (authorEl) {
            authorEl.setAttribute("content", author);
        } else {
            const newAuthor = new Component('meta', { name: 'author', content: author });
            this.addChildren(newAuthor);
        }
    }

};
