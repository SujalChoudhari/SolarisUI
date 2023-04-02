import { Component} from "../components";
import fs from "fs";
import FileManager from "./filemanager";
import Logger from "./logger";
import { Atom, Atomizer } from "../atom";
import StyleManager from "../components/StyleManager";
import scriptManager from "../components/ScriptManager";
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
		const headComponent = new Atom(Atomizer.templates.head, { title: title, meta: meta, templatestyles: `
			${
				Atomizer.templateFolder.cssDir != null && fs.existsSync(Atomizer.templateFolder.cssDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.cssDir).map((file) => {
					return `<link rel="stylesheet" href="./templates/css/${file}">`;
				}).join("") : ""
			}
			<link rel="stylesheet" href="./userStyles.css">
			${
				StyleManager.styles.map((style) => {
					style.type == "external" && style.url ? `<link rel="stylesheet" href="${style.url}">` : ""
				}).join("")
			}
		`});
		const bodyComponent = new Atom(Atomizer.templates.body, {templateScripts: `
			${
				Atomizer.templateFolder.jsDir != null && fs.existsSync(Atomizer.templateFolder.jsDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.jsDir).map((file) => {
					return `
						<script src="./templates/js/${file}"></script>
						
							`;
				}).join("") : ""
			}
			${
				scriptManager.getExternalScripts().map((script) => {
					console.log(script);
					return `<script src="${script.url.startsWith("http") ? script.url : fm.getAbsolutePath(script.url)}" params="${
						Object.keys(script.params).map((key) => {
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
	 * Build the pages in the project
	 * @param name The name of the project
	 * @param pages The pages of the project
	 */
	public static buildProject(name: string, pages: Component[]) {
		const fm = new FileManager();

		if (!fs.existsSync("builds")) {
			fm.createDirectory("builds");
		}
		Logger.info(__filename, "Clearing the build directory");
		fm.removeDirectory(`builds/${name}`, true);
		
		if(!fs.existsSync(`builds/${name}`)) {
			fm.createDirectory(`builds/${name}`);
		}

		if(fs.existsSync(`builds/${name}/templates`)) {
			fm.removeDirectory(`builds/${name}/templates`);
		}

		Logger.info(__filename, "Creating template files");
		Atomizer.templateFilesToInclude.forEach((file) => {
			fm.copyFile(file, `builds/${name}/templates/${path.relative(file, "../templates")}`);
		});

		Logger.info(__filename, "Creating HTML files");
		pages.forEach((page) => {
			const styles = StyleManager.getExternalStyles();

			page.children[0].addChildren(...(styles.map((style) => {
				return new Component("link", { rel: "stylesheet", href: style.url });
			})));



			const scripts = scriptManager.getExternalScripts();
			
			page.children[1].addChildren(...(scripts.map((script) =>{
				return new Component("script", { src: script.url, ...(script.params) });
			})));
			fm.createFile(`builds/${name}/${page.getAttribute("id")}`, page.toString());
		});

		Logger.info(__filename, "Creating CSS files");
		const minifiedCSS = StyleManager.toString();
		minifiedCSS && fm.createFile(`builds/${name}/userStyles.css`, minifiedCSS);
		

		// TODO: Create JS files
		Logger.info(__filename, "Creating JS files");
		const minifiedJS = scriptManager.toString();
		minifiedJS && fm.createFile(`builds/${name}/userScripts.js`, minifiedJS);

		Logger.info(__filename, "Copying public folders");
		fm.copyTree("public", `builds/${name}/`);

	}

	public static setTemplateFolder(folder: { baseDir: string, htmlDir?: string ,cssDir?: string, jsDir?: string }) {
		Atomizer.templateFolder = folder;
	}
}

export {
	SolarisUI,
};