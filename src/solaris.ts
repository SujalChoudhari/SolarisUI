import { Component, Script, Style } from "./components";
import fs from "fs";
import FileManager from "./utils/filemanager";
import Logger from "./utils/logger";
import { Atom, Atomizer } from "./atom";
import StyleManager from "./utils/stylemanager";
import ScriptManager from "./utils/scriptmanager";
import path from "path";

/**
 * @class Sloaris
 * A UI framework to create HTML pages with just JavaScript.
 * This component is responsible for building the entire UI framework.
 * @license MIT license
 * @author Sujal Choudhari <sujalchoudari@gmail.com>
 */
class SolarisUI {
	// Load Components using Atom and Atomizer 	
	// TODO: Reload and recompile the entire UI when the config changes.

	// Utility functions
	public static createPage(
			title: string,
			url: string,
			meta?: { [key: string]: string },
			defaultPageTemplateFolderIndex?: 0,
			defaultBodyTemplateFolderIndex?: 0,
			defaultHeadTemplateFolderIndex?: 0): Component {
		const headComponent = new Atom(Atomizer.templates[defaultHeadTemplateFolderIndex || 0].head, {
			title: title, meta: meta, templatestyles: `
			<link rel="stylesheet" href="./userStyles.css">
		`});

		const bodyComponent = new Atom(Atomizer.templates[defaultBodyTemplateFolderIndex || 0].body, {
			templateScripts: `
			<script src="./userScripts.js"></script>
		`});
		const pageAtom = new Atom(Atomizer.templates[defaultPageTemplateFolderIndex || 0].page, { head: headComponent, body: bodyComponent });
		const page = Atomizer.buildComponentTree(pageAtom.toString());
		page.setAttribute("id", url);
		return page;
	}


	/**
 	* Builds the pages in the project.
	* @param name The name of the project.
	* @param pages The pages of the project.
	*/
	public static buildProject(name: string, pages: Component[]): void {
		Logger.start();
		// Create FileManager object
		const fm = new FileManager();

		// Create build directory if it doesn't exist
		if (!fs.existsSync("builds")) {
			fm.createDirectory("builds");
		}

		// Remove existing build directory and create new one
		Logger.info(__filename, "Clearing the build directory");
		fm.removeDirectory(`builds/${name}`, true);
		fm.createDirectory(`builds/${name}`);

		// Create templates directory and copy template files
		Logger.info(__filename, "Creating template files");
		const templateDirectory = `builds/${name}/templates/`;
		if (fs.existsSync(templateDirectory)) {
			fm.removeDirectory(templateDirectory);
		}
		fm.createDirectory(templateDirectory);
		Array.from(new Set(Atomizer.templateFilesToInclude)).forEach((file) => {
			fm.copyFile(file, templateDirectory);
			const baseName = path.basename(file);
			const extension = path.extname(file);
			if (extension == ".js") {
				new Script("external", `./templates/${baseName}`);
			} else if (extension == ".css") {
				new Style("external", `./templates/${baseName}`);
			}
			console.log(baseName, extension);
		});

		// Create HTML files
		Logger.info(__filename, "Creating HTML files");
		const styles = new Set(StyleManager.getExternalStyles());
		const scripts = new Set(ScriptManager.getExternalScripts());
		pages.forEach((page) => {
			page.children[0].addChildren(
				...Array.from(styles).map((style) => new Component("link", { rel: "stylesheet", href: style.url }))
			);
			page.children[1].addChildren(
				...Array.from(scripts).map((script) => new Component("script", { src: script.url, ...(script.params) }))
			);
			fm.createFile(`builds/${name}/${page.getAttribute("id")}`, page.toString());
		});

		// Create CSS file
		Logger.info(__filename, "Creating CSS files");
		const minifiedCSS = StyleManager.toString();
		if (minifiedCSS) {
			fm.createFile(`builds/${name}/userStyles.css`, minifiedCSS);
		}

		// Create JS file
		Logger.info(__filename, "Creating JS files");
		const minifiedJS = ScriptManager.toString();
		if (minifiedJS) {
			fm.createFile(`builds/${name}/userScripts.js`, minifiedJS);
		}

		// Copy public folder
		Logger.info(__filename, "Copying public folders");
		fm.copyTree("public", `builds/${name}/`);

		Logger.time(__filename, "Build completed in");
	}
}

export {
	SolarisUI,
};