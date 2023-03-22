export default class Style {
    protected pmProperties: [{[key: string]: {[key: string]: string} } ];
    protected pmUrl: string = "";
    protected pmType: string = "";
    constructor(
        public type: "infile" | "external",
        public url = "",
        public properties: [{[key: string]: {[key: string]: string} } ]= [{}],
    ) {
        this.pmProperties = properties;
        this.pmUrl = url;
        this.pmType = type;
     }

    
}