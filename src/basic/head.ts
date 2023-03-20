import Component from './component'
import String from './string';

export default class Head extends Component {
    constructor(title: string = "", author: string = "", description: string = "",keywords: string = "") {
        super("head");
        this.setTitle(title);
        this.setAuthor(author);
        this.setDescription(description);
        this.setKeywords(keywords);
        
    }

    public setTitle(title: string): void {
        const titleEl = this.children.find(child => child.tag === 'title');
        if (titleEl) {
            titleEl.children = [new String(title)]
        } else {
            const newTitle = new Component('title', {}, [new String(title)]);
            this.addChildren(newTitle);
        }
    }

    public setDescription(description: string): void {
        const descEl = this.children.find(child => child.attributes?.name === 'description');
        if (descEl) {
            descEl.attributes.content = description;
        } else {
            const newDesc = new Component('meta', { name: 'description', content: description });
            this.addChildren(newDesc);
        }
    }

    public setKeywords(keywords: string): void {
        const keywordsEl = this.children.find(child => child.attributes?.name === 'keywords');
        if (keywordsEl) {
            keywordsEl.attributes.content = keywords;
        } else {
            const newKeywords = new Component('meta', { name: 'keywords', content: keywords });
            this.addChildren(newKeywords);
        }
    }

    public setAuthor(author: string): void {
        const authorEl = this.children.find(child => child.attributes?.name === 'author');
        if (authorEl) {
            authorEl.attributes.content = author;
        } else {
            const newAuthor = new Component('meta', { name: 'author', content: author });
            this.addChildren(newAuthor);
        }
    }

};

module.exports = Head;