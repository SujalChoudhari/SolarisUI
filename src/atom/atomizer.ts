import Mustache from "mustache";
import FileManager from "../filemanager";
import Logger from "../logger";
import fs from "fs";

export type AtomizerTemplate = string | null;

export default class Atomizer {
    public static templateFolder: string = "./filename";


    public static loadTemplate(filename: string): AtomizerTemplate {
        const fm = new FileManager(Atomizer.templateFolder);
        const newName = filename;
        const template = fm.readFile(newName);
        if (template == null) {
            Logger.error(__filename, `Template ${newName} not found`);
            return null;
        }
        return template;
    }
};