import Mustache from "mustache";
import FileManager from "../utils/filemanager";
import * as htmlparser2 from "htmlparser2"
import Logger from "../utils/logger";
import fs from "fs";
import { Component, String } from "../components";

export type AtomizerTemplate = string | null;

export default class Atomizer {
    public static templateFolder: string = "./src/templates/";

    public static templates:{[key:string]:AtomizerTemplate} = Atomizer.preloadTemplates();


    public static loadTemplate(filename: string): AtomizerTemplate {
        const fm = new FileManager(Atomizer.templateFolder);
        const newName = filename;
        const template = fm.readFile(newName);
        if (template == null) {
            Logger.error(__filename, `Template ${newName} not found`);
            return null;
        }
        Logger.info(__filename, `Template ${newName} loaded`);
        return template;
    }

    public static preloadTemplates():{[key:string]:AtomizerTemplate}{
        const templates:{[key:string]:AtomizerTemplate} = {};
        const files = fs.readdirSync(Atomizer.templateFolder);
        files.forEach(file => {
            let newKey = file.split(".")[0];
            const template = Atomizer.loadTemplate(file);
            if(template != null)
                templates[newKey] = template;
        });
        return templates;
    }

    public static buildComponentTree(html: string) {
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