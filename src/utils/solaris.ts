import { Component} from "../components";
import fs from "fs";
import FileManager from "./filemanager";
import Logger from "./logger";
import { Atom, Atomizer } from "../atom";

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
		const headComponent = new Atom(Atomizer.templates.head, { title: title, meta: meta, templatestyles: `
			${
				Atomizer.templateFolder.cssDir != null && fs.existsSync(Atomizer.templateFolder.cssDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.cssDir).map((file) => {
					return `<link rel="stylesheet" href="./templates/css/${file}">`;
				}).join("") : ""
			}
		`});
		const bodyComponent = new Atom(Atomizer.templates.body, {templateScripts: `
			${
				Atomizer.templateFolder.jsDir != null && fs.existsSync(Atomizer.templateFolder.jsDir) ? fs.readdirSync(Atomizer.templateFolder.baseDir + Atomizer.templateFolder.jsDir).map((file) => {
					return `<script src="./templates/js/${file}"></script>`;
				}).join("") : ""
			}
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

		if(fs.existsSync(Atomizer.templateFolder.baseDir) && !fs.existsSync(`builds/${name}/templates`)) {
			Logger.info(__filename, "Copying template files");

			if(fs.existsSync(`${Atomizer.templateFolder.baseDir}\\${Atomizer.templateFolder.cssDir}`)){
				fm.createDirectory(`builds/${name}/templates/css`);
				fm.copyTree(`${Atomizer.templateFolder.baseDir}\\${Atomizer.templateFolder.cssDir}`, `builds/${name}/templates/css`);
			}
			if(fs.existsSync(`${Atomizer.templateFolder.baseDir}\\${Atomizer.templateFolder.jsDir}`)){
				fm.createDirectory(`builds/${name}/templates/js`);
				fm.copyTree(`${Atomizer.templateFolder.baseDir}\\${Atomizer.templateFolder.jsDir}`, `builds/${name}/templates/js/`);
			}	
		}


		Logger.info(__filename, "Creating HTML files");
		pages.forEach((page) => {
			fm.createFile(`builds/${name}/${page.getAttribute("id")}`, page.toString());
		});

		Logger.info(__filename, "Creating CSS files");
		// TODO: Create CSS files


		Logger.info(__filename, "Creating JS files");
		// TODO: Create JS files

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