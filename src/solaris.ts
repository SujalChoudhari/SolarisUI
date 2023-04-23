import fs from "fs";
import path from "path";
import { Component, Script, Style } from "./components";
import { Atom, Atomizer } from "./atom";
import { StyleManager, ScriptManager, Logger, FileManager } from "./utils";

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

	
	/**
	 * Creates a component from a given template name and props.
	 * @template T - The type of props to be passed.
	 * @param {string} templateName - The name of the template to be used.
	 * @param {T} props - The props to be passed to the component.
	 * @returns {Component} - The component tree.
	 * 
	 * @example
	 * ```ts
	 * const component = SolarisUI.createComponent<ButtonTemplate>("button", { text: "Click me!" });
	 */
	public static createComponent<T extends { [key: string]: any }>(
		templateName: string,
		props: T
	): Component {
		let atom = new Atom(Atomizer.getTemplate(templateName), props);
		let component = Atomizer.buildComponentTreeFromAtom(atom);
		return component;
	}

	/**
	  * Builds the pages in the project.
	* @param name The name of the project.
	* @param pages The pages of the project.
	* @param buildType The type of build to be done. 
	* lazy - Only the html of the pages is redone
	* full - The entire project is rebuilt.
	*/
	public static buildProject(name: string, pages: Component[], buildType: "lazy" | "full" = "full"): void {
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
