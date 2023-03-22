import Component from './component'
import String from './string';
import Style from './styles';
import FileManager from '../filemanager';

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
    private addedDefaultStyles: boolean = false;
    public addStylesheet(style: Style): void {
        var manager = new FileManager();

        if(!this.addedDefaultStyles) {
            this.addDefaultStyles();
            console.log("Added default styles")
            this.addedDefaultStyles = true;
        }

        let styleUrl = style.url.startsWith("http") ?  style.url : manager.getAbsolutePath(style.url);
        if(style.type === "external" && style.url !== "") {
            const styleSheet = this.pmChildren.find(child => child.getTag() === 'link' && child.getAttribute('rel') === 'stylesheet' && child.getAttribute('href') === styleUrl);
            if (styleSheet) {
                styleSheet.setAttribute('href', styleUrl);
            }
            else {
                const newStyle = new Component('link', { rel: 'stylesheet', href: styleUrl });
                this.addChildren(newStyle);
            }
        }
        else if(style.type === "external" && style.url === "") {
            throw new Error("Style url is not defined");
        }
        else if(style.type === "infile" && Object.keys(style.properties[0]).length === 0) {
            throw new Error("Style properties are not defined");
        }
        else {
            let properties = "";
            style.properties.forEach(property => {
                Object.keys(property).forEach(selector => {
                    // selector
                    properties += `\n${selector} { \n`;
                    Object.keys(property[selector]).forEach(key => {
                        properties += `${key}: ${property[selector][key]};\n`;
                    });
                    properties += ` } \n`;
                });
            });
            const newStyle = new Component('style', {}, [new String(properties)]);
            this.addChildren(newStyle);
        }
    }
    private addDefaultStyles(): void {
        const manager = new FileManager();
        const allFiles =manager.getAllFilesInDirectory("/public/styles");

        allFiles.forEach(file => {
            const newStyle = new Component('link', { rel: 'stylesheet', href: file });
            this.addChildren(newStyle);
        })
    }


};
