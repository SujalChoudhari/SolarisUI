import { Component, Script, Style, String } from "../templates";
import Mustache from 'mustache';
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
	public static createPage(title: string,meta?:{[key:string]:string}): Component {
		const headComponent = new Atom(Atomizer.head, { title: title,meta:meta });
		const bodyComponent = new Atom(Atomizer.body, { });
		const pageAtom = new Atom(Atomizer.page,{head:headComponent,body:bodyComponent});
		return Atomizer.buildComponentTree(pageAtom.toString());
	}


}

export {
	SolarisUI,
};