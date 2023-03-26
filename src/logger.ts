
export enum LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
}

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


    private static write(type:string,filename:string,...message: string[]): void {
        console.log(type +`: (${filename})\n\t` + message.join(" "));
    }
}