import FileManager from '../filemanager';
import Component from './component'
import Script from './scripts';
import String from './string';

export default class Body extends Component {
    constructor() {
        super("body");
    }

    public addScript(script: Script): void {
        const manager = new FileManager();

        let scriptUrl = script.url.startsWith("http") ?  script.url : manager.getAbsolutePath(script.url);
        if(script.type === "external" && script.url !== "") {
            const scriptSheet = this.pmChildren.find(child => child.getTag() === 'link' && child.getAttribute('rel') === 'scriptsheet' && child.getAttribute('href') === scriptUrl);
            if (scriptSheet) {
                scriptSheet.setAttribute('src', scriptUrl);
                Object.keys(script.params).forEach(key => {
                    scriptSheet.setAttribute(key, script.params[key]);
                });
            }
            else {
                const newscript = new Component('script', {src: script.url});
                Object.keys(script.params).forEach(key => {
                    newscript.setAttribute(key, script.params[key]);
                });
                this.addChildren(newscript);
            }
        }
        else if(script.type === "external" && script.url === "") {
            throw new Error("script url is not defined");
        }
        else if(script.type === "infile" && script.script.length === 0) {
            throw new Error("script content is not defined");
        }
        else {
            const newscript = new Component('script', {}, [new String(script.script)]);
            Object.keys(script.params).forEach(key => {
                newscript.setAttribute(key, script.params[key]);
            });
            this.addChildren(newscript);
        }
    }
};

module.exports = Body;