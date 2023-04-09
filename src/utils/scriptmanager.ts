import Logger from "./logger";
import Script from "../components/scripts";

/**
 * ScriptManager
 * -----
 * Manages all scripts in the project.
 * @remarks
 * Auto importes all the Scripts in each file.
 */
export default class ScriptManager {
    public static scripts: Script[] = [];

    public static addscript(script: Script): void {
        Logger.info(__filename, "Adding script", script.url || script.script);
        this.scripts.push(script);
    }
    public static removescript(script: Script): void {
        this.scripts = this.scripts.filter(s => s != script);
    }

    public static isScriptAdded(script: Script): boolean {
        return this.scripts.includes(script);
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