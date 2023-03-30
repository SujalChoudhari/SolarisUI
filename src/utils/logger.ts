import FileManager from "./filemanager";
import fs from 'fs';
export enum LogLevel {
    DEBUG,
    INFO,
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
    public static debug(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 0)
            Logger.write("[DEBUG]", filename, ...message);
    }

    public static info(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 1)
            Logger.write("[INFO]", filename, ...message);
    }

    public static warn(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 2)
            Logger.write("[WARN]", filename, ...message);
    }

    public static error(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 3)
            Logger.write("[ERROR]", filename, ...message);
    }


    private static write(type: string, filename: string, ...message: string[]): void {
        console.log(type + `: (${filename})\n\t` + message.join(" "));

        if (!fs.existsSync('./logs'))
            fs.mkdirSync("./logs")

        const date = new Date();
        const filePath = `./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}.log`;

        if (!fs.existsSync(filePath))
            fs.writeFileSync(filePath, `=====Log file created at ${date.toDateString()} ${date.toTimeString()}=====\n\n`);

        fs.appendFileSync(filePath, `${type}:\t(${filename})\t ${message.join(" ")}\n`);
    }
}