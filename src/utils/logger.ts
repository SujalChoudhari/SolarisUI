import FileManager from "./filemanager";
import fs from 'fs';

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

    private static mLogColors: Record<string, string> = {
        "[ERROR]": "\x1b[31m\x1b[1m",
        "[WARN]": "\x1b[33m\x1b[1m",
        "[TIME]": "\x1b[36m\x1b[1m",
        "[DEBUG]": "\x1b[34m\x1b[1m",
        "[INFO]": "\x1b[32m\x1b[1m",
    };

    private static mResetColor = "\x1b[0m";
    private static mBoldText = "\x1b[1m";
    private static mItalicText = "\x1b[3m";


    public static debug(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 0)
            Logger.write("[DEBUG]", filename, ...message);
    }

    public static info(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 1)
            Logger.write("[INFO]", filename, ...message);
    }

    public static time(filename: string, ...message: string[]): void {
        if (Logger.logLevel <= 2)
            Logger.write("[TIME]", filename, ...message, `${Logger.end()}ms`);
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

        const currentTime = new Date();
        const logFilePath = `./logs/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}.log`;
        const logMessage = `${type}:\t(${filename})\t ${message.join(" ")}\n`;

        // Write to console
        const logColor = Logger.mLogColors[type] || "";

        console.log(
            `${logColor}${Logger.mBoldText}${type}${Logger.mResetColor}`,
            `${Logger.mItalicText}(${filename})${Logger.mResetColor}\n\t`,
            `${logColor}${message.join(" ")}${Logger.mResetColor}`);

        // Write to file
        if (!fs.existsSync("./logs")) {
            fs.mkdirSync("./logs");
        }
        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, `=====Log file created at ${currentTime.toDateString()} ${currentTime.toTimeString()}=====\n\n`);
        }
        fs.appendFileSync(logFilePath, logMessage);
    }


    /**
     * Starts the timer for the Logger.time() function
     */
    public static start() {
        Logger.mTime = Date.now();
    }

    /**
     * 
     * @returns The time elapsed since the last call to Logger.start() in milliseconds
     */
    private static end(): number {
        return Date.now() - Logger.mTime;
    }

}