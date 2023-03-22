export default class Script {
    protected pmScript: string = ``;
    protected pmUrl: string = "";
    protected pmType: string = "";
    protected pmParams: { [key: string]: string } = {};
    constructor(
        public type: "infile" | "external",
        public url = "",
        public script: string = ``,
        public params: { [key: string]: string } = {}
    ) {
        this.pmScript = script;
        this.pmUrl = url;
        this.pmType = type;
        this.pmParams = params;
    }
}