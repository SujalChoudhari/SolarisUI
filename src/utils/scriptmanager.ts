import Logger from "./logger";
import Script from "../components/scripts";

/**
 * ScriptManager
 * -----
 * Manages all scripts in the project.
 * @remarks
 * Auto importes all the Scripts in each file.
 * @author Ansh Sharma
 */
export default class ScriptManager {
    public static scripts: Script[] = [];

    /**

A static method in the ScriptManager class that adds a new script to the scripts array.
@param {Script} script - An object representing a script to be added.
@param {string} script.url - The URL of the script.
@param {string} script.script - The script code.
This method logs an information message with the added script's URL or script code, and pushes the script object into the scripts array.
*/
    public static addscript(script: Script): void {
        if (this.isScriptAdded(script)) return;
        Logger.info(__filename, "Adding script", script.url || script.script);
        this.scripts.push(script);
    }

    /**

A static method in the `ScriptManager` class that removes a script from the scripts array.
@param {Script} script - An object representing the script to be removed.
This method removes the specified script object from the scripts array.
*/
    public static removescript(script: Script): void {
        this.scripts = this.scripts.filter(s => s != script);
    }

    /**

A static method in the ScriptManager class that checks if a script has already been added to the scripts array.
@param {Script} script - An object representing the script to check.
@returns {boolean} - true if the script has already been added, false otherwise.
*/

    public static isScriptAdded(script: Script): boolean {
        return this.scripts.find(s => s == script) != undefined;
    }

    /**

A static method in the ScriptManager class that returns a string containing the JavaScript code of all scripts that have been added to the scripts array and have a type of "inline".
@returns {string} - The JavaScript code of all inline scripts.
*/
    public static toString(): string {
        let js = "";
        this.scripts.forEach(script => {
            if (!script.type || script.type == "external") return;
            if (!script.script) return;
            js += `${script.script}\n\n`;
        });
        return js;
    }

    /**

A static method in the ScriptManager class that returns an array containing all scripts that have been added to the scripts array and have a type of "external".
@returns {Array<Script>} - An array of all external scripts.
*/

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