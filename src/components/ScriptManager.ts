import Script from "./scripts";

export default class scriptManager{
    public static scripts: Script[] = [];

    public static addscript(script: Script): void{
        this.scripts.push(script);
    }
    public static removescript(script: Script): void{
        this.scripts = this.scripts.filter(s => s != script);
    }

    public static toString(): string{
        let js = "";
        this.scripts.forEach(script => {
            if(!script.type || script.type == "external") return;
            if(!script.script) return;
            js += `${script.script}\n\n`;
        });
        return js;
    }

    public static getExternalScripts(): string {
        let js = "";
        this.scripts.forEach(script => {
            if(!script.type || script.type == "infile") return;
            if(!script.url) return;
            js += `<script src="${script.url}" ${Object.keys(script.params).forEach(param => {
                return `${param}="${script.params[param]}"`;
            })}></script>\n`;
        });
        return js;
    }
}