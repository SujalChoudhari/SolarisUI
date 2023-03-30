import { Component, Script, Style, String } from "../components";
import Mustache from 'mustache';
import fs from "fs";
import * as htmlparser2 from "htmlparser2";
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
		const headComponent = new Atom(Atomizer.templates.head, { title: title, meta: meta });
		const bodyComponent = new Atom(Atomizer.templates.body, {});
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

		Logger.info(__filename, "Creating HTML files");
		pages.forEach((page) => {
			fm.createFile(`builds/${name}/${page.getAttribute("id")}`, page.toString());
		});

		Logger.info(__filename, "Creating CSS files");
		// TODO: Create CSS files

		Logger.info(__filename, "Creating JS files");
		// TODO: Create JS files

		Logger.info(__filename, "Copying public folders");
		fm.copyTree("public", `builds/${name}/public`);

	}
}

export {
	SolarisUI,
};