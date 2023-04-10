import Atom from "./atom";
import FileManager from "../utils/filemanager";
import * as htmlparser2 from "htmlparser2"
import Logger from "../utils/logger";
import fs from "fs";
import path from "path";
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
        htmlDir: string,
        cssDir: string,
        jsDir: string
    }] = [{ baseDir: `${__dirname}/../../templates/`, htmlDir: "", cssDir: "css", jsDir: "js" }];

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
        const templatesArray: { [key: string]: AtomizerTemplate }[] = [];

        Atomizer.templateFolders.forEach((templateFolder, index) => {
            const templates: { [key: string]: AtomizerTemplate } = {};
            const files = fs.readdirSync(templateFolder.baseDir, { withFileTypes: true });

            files.forEach(file => {
                if (!file.isDirectory()) {
                    let newKey = file.name.split(".")[0];
                    const template = Atomizer.loadTemplate(path.join(templateFolder.baseDir, file.name), index);
                    if (template != null) {
                        templates[newKey] = template;
                    }
                } else {
                    if (file.name === templateFolder.htmlDir) {
                        const htmlFiles = fs.readdirSync(path.join(templateFolder.baseDir, templateFolder.htmlDir), { withFileTypes: true });

                        htmlFiles.forEach(htmlFile => {
                            if (!htmlFile.isDirectory()) {
                                let newKey = htmlFile.name.split(".")[0];
                                if (templateFolder.htmlDir != "") {
                                    const template = Atomizer.loadTemplate(path.join(templateFolder.baseDir, templateFolder.htmlDir, htmlFile.name), index);

                                    if (template != null) {
                                        templates[newKey] = template;
                                    }
                                }
                            }
                        });
                    }
                }
            });

            Logger.info(__filename, `Templates loaded from ${templateFolder.baseDir}`);
            templatesArray.push(templates);
        });

        return templatesArray;
    }

    /**
     * Build the component tree from the atom.
     * @param atom The atom to be parsed and built into a component tree
     * @returns The root component of the component tree.
     */
    public static buildComponentTreeFromAtom(atom: Atom): Component {
        return Atomizer.buildComponentTree(atom.toString());
    }

    /**
    A static method in the Atomizer class that adds a new template folder to the templateFolders array.
    @param {object} templateFolder - An object containing the base directory and optional subdirectories for the template folder.
    @param {string} templateFolder.baseDir - The base directory for the template folder.
    @param {string} [templateFolder.htmlDir] - Optional subdirectory for HTML templates.
    @param {string} [templateFolder.cssDir] - Optional subdirectory for CSS templates.
    @param {string} [templateFolder.jsDir] - Optional subdirectory for JavaScript templates.
    @remarks
    If the templateFolder object's baseDir property does not already exist in Atomizer.templateFolders,
    the templateFolder object is pushed into Atomizer.templateFolders.
    Then, the templates in the newly added folder are preloaded and pushed into Atomizer.templates.
    If the baseDir already exists in Atomizer.templateFolders, a warning is logged.
    @author Ansh Sharma
    */

    public static addTemplateFolder(templateFolder: {
        baseDir: string,
        htmlDir: string,
        cssDir: string,
        jsDir: string
    }) {
        if (!Atomizer.templateFolders.find((folder) => folder.baseDir === templateFolder.baseDir)) {
            Atomizer.templateFolders.push(templateFolder);
            console.log(Atomizer.templateFolders)
            Atomizer.templates.push(Atomizer.preloadTemplates()[Atomizer.templateFolders.length - 1]);
        }
        else {
            Logger.warn(__filename, `Template folder ${templateFolder.baseDir} already exists`);
        }
    }

    /**
    A static method in the Atomizer class that retrieves a template with the specified name and index from the templates property.
    @param {string} templateName - The name of the template to retrieve.
    @param {number} [templateFolderIndex=0] - The index of the folder containing the template. Defaults to 0.
    @returns {AtomizerTemplate} - The requested template.
    @remarks
    If the template is found in the templates property, it is returned immediately.
    If the template is not found, this method searches through all template folders for the specified name.
    If a template is found, it is returned and cached in the templates property for future use.
    If no template is found, an error message is logged and an empty string is returned.
    @author Ansh Sharma
    */
    public static getTemplate(templateName: string, templateFolderIndex?: 0): AtomizerTemplate {
        const template = Atomizer.templates[templateFolderIndex || 0][templateName];
        if (!template) {
            const newTemplate = Atomizer.templates.map((templateFolder) => {
                if (templateFolder[templateName]) {
                    return templateFolder[templateName];
                }
            }).join("");
            if (!newTemplate) {
                const new_Template = Atomizer.loadTemplate(templateName, templateFolderIndex || 0);
                if (new_Template) {
                    Atomizer.templates[templateFolderIndex || 0][templateName] = new_Template;
                    return new_Template;
                }
                else {
                    Logger.error(__filename, `Template ${templateName} not found`);
                    return "";
                }
            }
            else {
                return newTemplate;
            }
        }
        else {
            return template;
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