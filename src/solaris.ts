import { Component, Script, Style, String } from "./vdom";
import Mustache from 'mustache';
import * as htmlparser2 from "htmlparser2";
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
	public static pages: Component[] = [];

	/**
	 * The configuration of the SolarisUI instance.
	 * @property bootstrapSupport - Whether or not to include Bootstrap support. Defaults to `false`.
	 * @property tailwindSupport - Whether or not to include Tailwind support. Defaults to `false`.
	 */
	public static config: SolarisUIConfig = { bootstrapSupport: false, tailwindSupport: false };

	/**
	 * Creates a new instance of the `SolarisUI` class.
	 * @param name - The name of the SolarisUI instance.
	 * @param lang - The language of the SolarisUI instance. Defaults to "en".
	 * @param encoding - The character encoding of the SolarisUI instance. Defaults to "utf-8".
	 * @param config - The configuration of the SolarisUI instance.
	 */
	public static init(name: string, lang: string = "en", encoding: string = "utf-8", config: SolarisUIConfig = { bootstrapSupport: false, tailwindSupport: false }) {
		SolarisUI.projectName = name;
		SolarisUI.lang = lang;
		SolarisUI.encoding = encoding;
		SolarisUI.config = config;
	}

	/**
	 * Builds the SolarisUI instance by generating HTML and CSS source code for each page.
	 * @param root - The root pages to build.
	 */
	public static build(...root: Component[]): void {
		const fileManager = new FileManager();
		Logger.info(__filename, "Clearing Output ...");
		fileManager.removeDirectory(`./builds/${SolarisUI.projectName}`, true);

		Logger.info(__filename, "Building Project...");
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

		Logger.info(__filename, 'Build Saved');
	}

	/**
	 * Compiles the HTML source code for each page in the SolarisUI instance.
	 * @private
	 */
	private static compileHtmlSource(): void {
		Logger.info(__filename, 'Compiling HTML source');
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
					child.getTag() === "body" && child.addScript(new Script("external", "https://unpkg.com/tailwindcss@2/dist/tailwind.min.js"));
				});
			}
			SolarisUI.htmlSource[element.props.url.split(".")[0]] = element.toString();
		});
	}

	/**
	 * Add default styles to all the pages in the project
	 * @private
	 */
	private static useGlobalStyles(): void {
		Logger.info(__filename, "Using global styles");
		const manager = new FileManager();
		var allFiles: string[];
		let newFile: string | undefined;
		try {
			allFiles = manager.getAllFilesInDirectory("./public/style");
		} catch (error: any) {
			allFiles = [];
			Logger.error(__filename, `There are no css files under public/style`);
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
				if (page.props.head)
					page.props.head.addChildren(newStyle);
			})
		});
	}

	public static createComponent(filePath: string, props: { [key: string]: any }): Component | null {
		const html = SolarisUI.loadComponent(filePath, props);
		if (html === null)
			return null;

		console.log(html);
		const component = SolarisUI.parseComponent(html);
		component.props = props;
		// check for each component.children if its tag is equal anything in props.keys, replace the child with the value in the prop
		component.getChildren().forEach((child: Component) => {
			if (props[child.getTag()]) {
				child = props[child.getTag()];
			}
		});
		return component;
	}

	private static loadComponent(filePath: string, props: any): string | null {
		const fileManager = new FileManager();
		const fileContent = fileManager.readFile(filePath);
		if (fileContent === null) return null;
		return Mustache.render(fileContent, props);
	}

	private static parseComponent(html: string): Component {
		let rootComponent = new Component("root");
		let currentComponent: Component = rootComponent;

		const parser = new htmlparser2.Parser(
			{
				onopentag: (tag: string, attributes: { [key: string]: string }) => {
					const newComponent = new Component(tag, attributes);
					currentComponent.addChildren(newComponent);
					currentComponent = newComponent;
				},
				ontext: (text: string) => {
					if (text.trim() === "") return;

					const lastChild = currentComponent.getChildren().at(-1);
					if (lastChild && lastChild instanceof String)
						lastChild.content += text;
					else
						currentComponent.addChildren(new String(text));
				},
				onclosetag: (tag: string) => {

					const newComponent = currentComponent.getParent();
					if (newComponent)
						currentComponent = newComponent;
				},
			},
			{ decodeEntities: true }
		);
		parser.write(html);
		parser.end();

		return rootComponent.getChildren()[0];
	}
}

export {
	SolarisUI,
	SolarisUIConfig
};