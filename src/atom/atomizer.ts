import Atom from "./atom";
import FileManager from "../utils/filemanager";
import * as htmlparser2 from "htmlparser2"
import Logger from "../utils/logger";
import fs from "fs";
import { Component, String, Style } from "../components";

/**
 * An Atomizer template can be a string or null.
 */
export type AtomizerTemplate = string | null;

/**
 * Atomizer
 * -----
 * An utility class for loading/parsing and creating templates.
 * 
 * @remarks
 * This class is responsible for loading the templates from the template folder.
 * It also provides a function to build the component tree from the HTML string.
 * 
 * @author Sujal Choudhari <sjlchoudhari.gmail.com>
 */
export default class Atomizer {
    /**
     * The folder where the templates are stored. 
     * @remarks
     * Only the templated from this folder will be preloaded loaded.
     * If there are many template folders then those components will have to be loaded manually.
     * or change the template folder and preload the templates again.
     * 
     * @author Ansh Sharma
     */
    public static templateFolders: [{
        baseDir: string,
        htmlDir?: string,
        cssDir?: string,
        jsDir?: string
    }] = [{ baseDir: "./src/templates/", htmlDir: "", cssDir: "css", jsDir: "js" }];

    public static templateFilesToInclude: string[] = [];

    /**
     * The preloaded templates (the default ones)
     */
    public static templates: { [key: string]: AtomizerTemplate }[] = Atomizer.preloadTemplates();


    /**
     * Load a template from the template folder
     * @param filename The name of the template file
     * @returns New atomizer template
     */
    public static loadTemplate(filename: string, templateFolderIndex: number): AtomizerTemplate {
        const fm = new FileManager(Atomizer.templateFolders[templateFolderIndex].baseDir);
        const newName = filename;
        const template = fm.readFile(newName);
        if (template == null) {
            Logger.error(__filename, `Template ${newName} not found`);
            return null;
        }

        let baseName = newName.split(".")[0];
        if (fs.existsSync(Atomizer.templateFolders[templateFolderIndex].baseDir
            + Atomizer.templateFolders[templateFolderIndex].cssDir
            + "/"
            + baseName
            + ".css")) {
            Atomizer.templateFilesToInclude.push(
                Atomizer.templateFolders[templateFolderIndex].baseDir
                + Atomizer.templateFolders[templateFolderIndex].cssDir
                + "/"
                + baseName
                + ".css");
        }

        if (fs.existsSync(Atomizer.templateFolders[templateFolderIndex].baseDir
            + Atomizer.templateFolders[templateFolderIndex].jsDir
            + "/"
            + baseName
            + ".js")) {
            Atomizer.templateFilesToInclude.push(
                Atomizer.templateFolders[templateFolderIndex].baseDir
                + Atomizer.templateFolders[templateFolderIndex].jsDir
                + "/"
                + baseName
                + ".js");
        }


        Logger.info(__filename, `Template ${newName} loaded`);
        return template;
    }

    /**
     * Preload All the templates from the template folder.
     * @returns A dictionary of all the preloaded templates with their names as keys.
     */
    public static preloadTemplates(): { [key: string]: AtomizerTemplate }[] {
        const fm = new FileManager();
        const templates: { [key: string]: AtomizerTemplate } = {};
        return Atomizer.templateFolders.map((templateFolder, index) => {
            const files = fs.readdirSync(templateFolder.baseDir, { withFileTypes: true });
            files.forEach(file => {
                if (!file.isDirectory()) {
                    let newKey = file.name.split(".")[0];
                    const template = Atomizer.loadTemplate(file.name, index);
                    if (template != null)
                        templates[newKey] = template;
                }
                else if (file.isDirectory()) {
                    console.log(file.name);
                    if (file.name === templateFolder.htmlDir) {
                        const htmlFiles = fs.readdirSync(templateFolder.baseDir + templateFolder.htmlDir, { withFileTypes: true });

                        htmlFiles.forEach(htmlFile => {
                            if (!htmlFile.isDirectory()) {
                                let newKey = htmlFile.name.split(".")[0];
                                const template = Atomizer.loadTemplate(templateFolder.htmlDir + "/" + htmlFile.name, index);
                                if (template != null)
                                    templates[newKey] = template;
                            }
                        });
                    }
                }
            });

            Logger.info(__filename, `Templates loaded from ${templateFolder.baseDir}`);
            return templates;

        });
    }

    /**
     * Build the component tree from the atom.
     * @param atom The atom to be parsed and built into a component tree
     * @returns The root component of the component tree.
     */
    public static buildComponentTreeFromAtom(atom: Atom): Component {
        return Atomizer.buildComponentTree(atom.toString());
    }

    public static getTemplate(templateName: string, templateFolderIndex?: 0): AtomizerTemplate {
        if (templateName in Atomizer.templates[templateFolderIndex || 0])
            return Atomizer.templates[templateFolderIndex || 0][templateName];
        else {
            Logger.error(__filename, `Template ${templateName} not found`);
            return null;
        }
    }

    /**
     * Build the component tree from the HTML string.
     * @param html The HTML string to be parsed and built into a component tree
     * @returns The root component of the component tree.
     */
    public static buildComponentTree(html: string): Component {
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
        Logger.info(__filename, `Component tree built`);
        return rootComponent.getChildren()[0];
    }
};