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
    public static traceLevel: LogLevel = LogLevel.ERROR;
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
    private static underscore = "\x1b[4m";


    public static debug(...message: string[]): void {
        if (Logger.logLevel <= 0)
            Logger.write("[DEBUG]", Logger.traceLevel <= 0, ...message);
    }

    public static info(...message: string[]): void {
        if (Logger.logLevel <= 1)
            Logger.write("[INFO]", Logger.traceLevel <= 1, ...message);
    }

    public static time(...message: string[]): void {
        if (Logger.logLevel <= 2)
            Logger.write("[TIME]", Logger.traceLevel <= 2, ...message, `${Logger.end()}ms`);
    }

    public static warn(...message: string[]): void {
        if (Logger.logLevel <= 3)
            Logger.write("[WARN]", Logger.traceLevel <= 3, ...message);
    }

    public static error(...message: string[]): void {
        if (Logger.logLevel <= 4)
            Logger.write("[ERROR]", Logger.traceLevel <= 4, ...message);
    }





    private static write(type: string, trace: boolean, ...message: string[]): void {

        const currentTime = new Date();
        const logFilePath = `./logs/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}.log`;
        const logMessage = `${type}:\t ${message.join(" ")}\n`;

        // Write to console
        const logColor = Logger.mLogColors[type] || "";

        if (!trace) console.log(`${logColor}${Logger.mBoldText}${type}${Logger.mResetColor}`,
            `${Logger.mItalicText}${Logger.mResetColor}\n\t`,
            `${logColor}${message.join(" ")}${Logger.mResetColor}`);
        else console.trace(`${logColor}${Logger.mBoldText}${type}${Logger.mResetColor}`,
            `${Logger.mItalicText}${Logger.mResetColor}\n\t`,
            `${logColor}${Logger.mItalicText}${Logger.underscore}${message.join(" ")}${Logger.mResetColor} 
            
            \n==============================================[ TRACEBACK ]======================================================`);


        // console.trace(...message);

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