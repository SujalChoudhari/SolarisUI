import FileManager from "./filemanager";
import fs from 'fs';

import { red, yellow, green, blue, cyan, gray, magentaBright, bold, underline, italic } from 'colorette';
export enum LogLevel {
    DEBUG,
    INFO,
    TIME,
    WARNING,
    ERROR,
}


/**
 * Logger
 * -----
 * A simple logger class for logging messages to the console.
 * @remarks
 * Logger class stores logs into a ./logs folder.
 */
export default class Logger {
    public static logLevel: LogLevel = LogLevel.INFO;
    private static mTime: number = 0;
    public static debug(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 0)
            Logger.write("[DEBUG]", filename, ...message);
    }

    public static info(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 1)
            Logger.write("[INFO]", filename, ...message);
    }

    public static time(filename: string, ...message: string[]): void {
        if(Logger.logLevel <= 2)
            Logger.write("[TIME]", filename, ...message);
    }

    public static warn(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 3)
            Logger.write("[WARN]", filename, ...message);
    }

    public static error(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 4)
            Logger.write("[ERROR]", filename, ...message);
    }
    
    

    private static write(type: string, filename: string, ...message: string[]): void {
        if(type == "[ERROR]") console.log(underline(italic(bold(red(type + `: (${filename})\n\t` + message.join(" "))))))
        else if(type == "[WARN]") console.log(underline(italic(bold(yellow(type + `: (${filename})\n\t` + message.join(" "))))))
        else if(type == "[TIME]") console.log(underline(cyan(type + `: (${filename})\n\t` + message.join(" "))))
        else if(type == "[DEBUG]") console.log(underline(italic(bold(blue(type + `: (${filename})\n\t` + message.join(" "))))))
        else console.log(underline(magentaBright(type + `: (${filename})\n\t` + message.join(" "))));

        if (!fs.existsSync('./logs'))
            fs.mkdirSync("./logs")

        const date = new Date();
        const filePath = `./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}.log`;

        if (!fs.existsSync(filePath))
            fs.writeFileSync(filePath, `=====Log file created at ${date.toDateString()} ${date.toTimeString()}=====\n\n`);

        fs.appendFileSync(filePath, `${type}:\t(${filename})\t ${message.join(" ")}\n`);
    }


    public static start(){
        Logger.mTime = Date.now();
    }

    /**
     * 
     * @returns The time elapsed since the last call to Logger.start() in milliseconds
     */
    public static end():number{
        return Date.now() - Logger.mTime;
    }

}