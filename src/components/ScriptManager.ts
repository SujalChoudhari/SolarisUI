import Logger from "../utils/logger";
import Script from "./scripts";

export default class scriptManager {
    public static scripts: Script[] = [];

    public static addscript(script: Script): void {
        Logger.info(__filename, "Adding script", script.url || script.script);
        this.scripts.push(script);
    }
    public static removescript(script: Script): void {
        this.scripts = this.scripts.filter(s => s != script);
    }

    public static toString(): string {
        let js = "";
        this.scripts.forEach(script => {
            if (!script.type || script.type == "external") return;
            if (!script.script) return;
            js += `${script.script}\n\n`;
        });
        return js;
    }

    public static getExternalScripts(): Array<Script> {
        let scripts: Array<Script> = [];
        this.scripts.forEach(script => {
            if (!script.type || script.type !== "external") return;
            if (!script.url) return;
            scripts.push(script);
        });
        return scripts;
    }
}