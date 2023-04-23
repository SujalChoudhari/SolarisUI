import fs from "fs";
import path from "path";
import { Component, Script, Style } from "./components";
import { Atom, Atomizer } from "./atom";
import { StyleManager, ScriptManager, Logger, FileManager } from "./utils";
import CheckForUpdate from "./utils/checkForUpdate";
/**
 * @class Sloaris
 * A UI framework to create HTML pages with just JavaScript.
 * This component is responsible for building the entire UI framework.
 * @license MIT license
 * @author Sujal Choudhari <sujalchoudari@gmail.com>
 */
class SolarisUI {

	private static packageVersion: string = "1.0.1-beta.0";
	// Load Components using Atom and Atomizer 	
	// TODO: Reload and recompile the entire UI when the config changes.


	// Utility functions
	public static createPage(
		title: string,
		url: string,
		meta: { [key: string]: string }): Component {


		const headAtom = new Atom(Atomizer.getTemplate("head"), {
			children: [
				`<title>${title}</title>`,
				`<link rel="stylesheet" href="./userStyles.css">`,
				...Object.keys(meta).map((key) => `<meta name="${key}" content="${meta[key]}">`)
			]
		});


		const bodyComponent = new Atom(Atomizer.getTemplate("body"), {
			children: [`
			<script src="./userScripts.js"></script>
		`]
		});

		const pageAtom = new Atom(Atomizer.getTemplate("page"), {
			children: [headAtom, bodyComponent]
		});


		const page = Atomizer.buildComponentTreeFromAtom(pageAtom);
		page.setAttribute("id", url);
		return page;
	}


	/**
	  * Builds the pages in the project.
	* @param name The name of the project.
	* @param pages The pages of the project.
	* @param buildType The type of build to be done. 
	* lazy - Only the html of the pages is redone
	* full - The entire project is rebuilt.
	*/
	public static async buildProject(name: string, pages: Component[], buildType: "lazy" | "full" = "full"): Promise<void> {
		Logger.start();
		// Create FileManager object
		const fm = new FileManager();


		// Create build directory if it doesn't exist
		if (!fs.existsSync(`builds/${name}`) || buildType === "full") {
			fm.createDirectory("builds");
			this.fullBuild(fm, name, pages);
		}
		else {
			this.lazyBuild(fm, name, pages);
		}
		Logger.time(__filename, "Build completed in");
		
		Logger.info("Solaris", "Checking for updates to SolarisUI");

		await CheckForUpdate(this.packageVersion)
	}

	private static lazyBuild(fm: FileManager, name: string, pages: Component[]) {
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


	}

	private static fullBuild(fm: FileManager, name: string, pages: Component[]) {

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

		Logger.info(__filename, "Copying template files");
		Atomizer.filesToInclude.forEach((file) => {
			let destPath = path.join(templateDirectory, path.basename(file));
			fm.copyFile(file, destPath);
			const ext = path.extname(file);
			if (ext === ".css") {
				new Style("external", `./templates/${path.basename(file)}`)
			}
			else if (ext === ".js") {
				new Script("external", `./templates/${path.basename(file)}`, "", { type: "module" })
			}
		});

		// Create HTML files
		this.lazyBuild(fm, name, pages);

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

	}
}

export {
	SolarisUI,
};
