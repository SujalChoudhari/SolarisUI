import { Component, Page, Script, Style } from "./basic";
import FileManager from "./filemanager";
import Logger from "./logger";

/**
 * Configuration options for the Solaris UI library.
 * @author Ansh Sharma
 */
type SolarisUIConfig = {
    /**
     * Whether to use the default CSS provided by the library.
     */
    globalCss?: boolean;
    /**
     * Whether to enable support for the Bootstrap CSS framework.
     */
    bootstrapSupport?: boolean;
    /**
     * Whether to enable support for the Tailwind CSS framework.
     */
    tailwindSupport?: boolean;
}

/**
 * @class Sloaris
 * A UI framework to create HTML pages with just JavaScript.
 * This component is responsible for building the entire UI framework.
 * @license MIT license
 * @author Sujal Choudhari <sujalchoudari@gmail.com>
 */
class SolarisUI {
    /**
     * The name of the SolarisUI instance.
     */
    public static projectName: string;

    /**
     * The language of the SolarisUI instance. Defaults to "en".
     */
    public static lang: string = "en";

    /**
     * The character encoding of the SolarisUI instance. Defaults to "utf-8".
     */
    public static encoding: string = "utf8";

    /**
     * An object containing the HTML source code for each page in the SolarisUI instance.
     */
    public static htmlSource: { [key: string]: string } = {};

    /**
     * An object containing the CSS source code for each page in the SolarisUI instance.
     */
    public static css: Style[] = [];

    /**
     * An array of `Page` objects representing the pages in the SolarisUI instance.
     */
    public static pages: Page[] = [];

    /**
     * The configuration of the SolarisUI instance.
     * @property bootstrapSupport - Whether or not to include Bootstrap support. Defaults to `false`.
     * @property tailwindSupport - Whether or not to include Tailwind support. Defaults to `false`.
     */
    public static config: SolarisUIConfig = { globalCss: true, bootstrapSupport: false, tailwindSupport: false };

    /**
     * Creates a new instance of the `SolarisUI` class.
     * @param name - The name of the SolarisUI instance.
     * @param lang - The language of the SolarisUI instance. Defaults to "en".
     * @param encoding - The character encoding of the SolarisUI instance. Defaults to "utf-8".
     * @param config - The configuration of the SolarisUI instance.
     */
    public static init(name: string, lang: string = "en", encoding: string = "utf-8", config: SolarisUIConfig = { globalCss: true, bootstrapSupport: false, tailwindSupport: false }) {
        SolarisUI.projectName = name;
        SolarisUI.lang = lang;
        SolarisUI.encoding = encoding;
        SolarisUI.config = config;
    }

    /**
     * Builds the SolarisUI instance by generating HTML and CSS source code for each page.
     * @param root - The root pages to build.
     */
    public static build(...root: Page[]): void {
        const fileManager = new FileManager();
        Logger.info(__filename,"Clearing Output ...");
        fileManager.removeDirectory(`./builds/${SolarisUI.projectName}`,true);

        Logger.info(__filename,"Building Project...");
        SolarisUI.pages = root;
        SolarisUI.pages.forEach(page => {
            page.setAttribute("lang", SolarisUI.lang);
        });
        SolarisUI.useGlobalStyles();
        SolarisUI.compileHtmlSource();

        //Output
        fileManager.createDirectory(`./builds/${SolarisUI.projectName}`);
        fileManager.createDirectory(`./builds/${SolarisUI.projectName}/style`);

        fileManager.copyTree(`./public/`, `./builds/${SolarisUI.projectName}/`);

        Object.keys(SolarisUI.htmlSource).forEach(key => {
            key = key.split('.')[0];
            fileManager.createFile(`./builds/${SolarisUI.projectName}/${key}.html`, SolarisUI.htmlSource[key]);
        });

        Logger.info(__filename,'Build Saved');
    }

    /**
     * Compiles the HTML source code for each page in the SolarisUI instance.
     * @private
     */
    private static compileHtmlSource(): void {
        Logger.info(__filename,'Compiling HTML source');
        SolarisUI.pages.forEach(element => {
            if (SolarisUI.config.bootstrapSupport) {
                element.getChildren().forEach((child: any) => {
                    child.getTag() === "head" && child.addStylesheet(new Style("external", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"));
                    child.getTag() === "body" && child.addScript(new Script("external", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"));
                });
            }
            if (SolarisUI.config.tailwindSupport) {
                element.getChildren().forEach((child: any) => {
                    child.getTag() === "head" && child.addStylesheet(new Style("external", "https://unpkg.com/tailwindcss@2/dist/tailwind.min.css"));
                    // child.getTag() === "body" && child.addScript(new Script("external", "https://unpkg.com/tailwindcss@2/dist/tailwind.min.js"));
                });
            }
            SolarisUI.htmlSource[element.url.split(".")[0]] = element.toString();
        });
    }

    /**
     * Add default styles to all the pages in the project
     * @private
     */
    private static useGlobalStyles(): void {
        if (SolarisUI.config.globalCss === false) return;
        Logger.info(__filename,"Using global styles");
        const manager = new FileManager();
        var allFiles: string[];
        let newFile: string | undefined;
        try {
            allFiles = manager.getAllFilesInDirectory("./public/style");
        } catch (error: any) {
            allFiles = [];
            Logger.error(__filename,`There are no css files under public/style`);
        }

        allFiles.forEach(file => {

            newFile = file.split("\\").at(-1);
            if (newFile)
                newFile = newFile.split(".").at(0);
        });

        SolarisUI.pages.forEach(page => {
            allFiles.forEach(file => {
                let name = file.split("\\").at(-1);
                name = name?.split(".")[0];
                const newStyle = new Component('link', { rel: 'stylesheet', href: `./style/${name}.css` });
                if (page.head)
                    page.head.addChildren(newStyle);
            })
        });
    }
}

export {
    SolarisUI,
    SolarisUIConfig
};