import { Component, Script, Style } from "../components";
import fs from "fs";
import FileManager from "./filemanager";
import Logger from "./logger";
import { Atom, Atomizer } from "../atom";
import StyleManager from "./stylemanager";
import ScriptManager from "./scriptmanager";
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
	// TODO: Build the entire project into a bundle of HTML, CSS, and JS files.

	// Utility functions
	public static createPage(title: string, url: string, meta?: { [key: string]: string }): Component {
		const fm = new FileManager();
		const headComponent = new Atom(Atomizer.templates.head, {
			title: title, meta: meta, templatestyles: `
			${Atomizer.templateFolder.cssDir != null && fs.existsSync(Atomizer.templateFolder.cssDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.cssDir).map((file) => {
				return `<link rel="stylesheet" href="./templates/css/${file}">`;
			}).join("") : ""
				}
			<link rel="stylesheet" href="./userStyles.css">
			${StyleManager.styles.map((style) => {
					style.type == "external" && style.url ? `<link rel="stylesheet" href="${style.url}">` : ""
				}).join("")
				}
		`});
		const bodyComponent = new Atom(Atomizer.templates.body, {
			templateScripts: `
			${Atomizer.templateFolder.jsDir != null && fs.existsSync(Atomizer.templateFolder.jsDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.jsDir).map((file) => {
				return `
						<script src="./templates/js/${file}"></script>
						
							`;
			}).join("") : ""
				}
			${ScriptManager.getExternalScripts().map((script) => {
					console.log(script);
					return `<script src="${script.url.startsWith("http") ? script.url : fm.getAbsolutePath(script.url)}" params="${Object.keys(script.params).map((key) => {
						return `${key}="${script.params[key]}"`;
					}).join(" ")
						}"></script>`;
				}).join("")
				}
			<script src="./userScripts.js"></script>
		`});
		const pageAtom = new Atom(Atomizer.templates.page, { head: headComponent, body: bodyComponent });
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
		Atomizer.templateFilesToInclude.forEach((file) => {
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
		const styles = StyleManager.getExternalStyles();
		const scripts = ScriptManager.getExternalScripts();
		pages.forEach((page) => {
			page.children[0].addChildren(
				...styles.map((style) => new Component("link", { rel: "stylesheet", href: style.url }))
			);
			page.children[1].addChildren(
				...scripts.map((script) => new Component("script", { src: script.url, ...(script.params) }))
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


	public static setTemplateFolder(folder: { baseDir: string, htmlDir?: string, cssDir?: string, jsDir?: string }) {
		Atomizer.templateFolder = folder;
	}
}

export {
	SolarisUI,
};