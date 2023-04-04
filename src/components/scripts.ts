import ScriptManager from "../utils/scriptmanager";


/**
 * Script
 * -----
 * Script is an representation of Javascript scripts in html
 * @author Ansh Sharma 
 */
export default class Script {
    /**
     * The actual string of script
     */
    public script: string = ``;

    /** 
     * The URL of the Script.
     * only used when external is selected as type of script 
     */
    public url: string = "";

    /**
     * The Type of the script
     */
    public type: string = "";

    /**
     * The Parameters of the script
     */
    public params: { [key: string]: string } = {};

    /**
     * Create a new instance of Script 
     * @param type the type of the script either external or infile
     * @param url the url of an external source script
     * @param script the actual script when url is specified
     * @param params the parameters of the script
     */
    constructor(
        type: "infile" | "external",
        url = "",
        script: string = ``,
        params: { [key: string]: string } = {}
    ) {
        this.script = script;
        this.url = url;
        this.type = type;
        this.params = params;
        ScriptManager.addscript(this);
    }

    /**
     * Get the script as a string
     * @returns the script as a string
     */
    public toString(): string {
        if (this.type === "infile") {
            return `<script>${this.script}</script>`;
        } else {
            return `<script src="${this.url}"></script>`;
        }
    }
    
}