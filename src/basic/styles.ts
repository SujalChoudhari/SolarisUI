

/**
 * Style
 * -----
 * A representation of Style tag.
 * 
 * @author Ansh Sharma
 */
export default class Style {
    /**
     * The actual css style properties.
     */
    public properties: [{ [key: string]: { [key: string]: string } }];
    
    /**
     * Url to an external source file. 
     */
    public url: string = "";

    /**
     * Type of the css attachment. Either inline or external.
     * Note: inline attachments are supported under Attributes, and Style functions under Component.
     */
    public type: string = "";

    /**
     * Create a new instance of Style
     * @param type The type of the css attachment. Either inline or external.
     * @param url Url to an external source file. Optional.
     * @param properties Actual Css properties
     */
    constructor(
        type: "infile" | "external",
        url = "",
        properties: [{ [key: string]: { [key: string]: string } }] = [{}],
    ) {
        this.properties = properties;
        this.url = url;
        this.type = type;
    }


}