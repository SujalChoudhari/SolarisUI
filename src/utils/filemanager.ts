import fs from 'fs';
import path from 'path';
import Logger from './logger';

/**
 * FileManager
 * -----
 * A class dedicated for handling files and directories
 * This class is responsible for managing project folders, copying files from source to build folders.
 * @author Sujal Choudhari <sujalchoudhari@gmail.com>
*/
export default class FileManager {
    /**
     * Absolute path to current working directory
     */
    public basePath: string;

    /**
     * Creare a new instance of FileManager
     * While creating a new instance of FileManager, base path will be automatically
     * set to the current working directory.
     */
    constructor(basepath: string = "") {
        if (basepath == "")
            this.basePath = path.resolve(process.cwd());
        else
            this.basePath = path.resolve(basepath);
    }
    /**
     * Convert relative path to absolute path
     * @param relativePath The relative path of any file or directory
     * @returns The abosolute path of the file or directory.
     * @deprecated No not use this method. Will be removed in future versions
     */
    public getAbsolutePath(relativePath: string): string {
        return path.resolve(this.basePath, relativePath);
    }

    /**
     * Read a file synchronously
     * @param path relative path of the file or directory
     * @returns the contents of the file or directory. `null`if file is not found
     */
    public readFile(path: string): string | null {
        if (!fs.existsSync(path)) {
            Logger.warn(__filename, `Given file: ${path} does not exist`);
            return null;
        }

        try {
            return fs.readFileSync(path, 'utf8');
        } catch (err) {
            Logger.warn(__filename, `Error reading file: ${err}`);
            return null;
        }
    }

    /**
     * Create a new directory
     * @param path Path at which the directory should be created. The name of the directory should be
     * included in the path
     */
    public createDirectory(path: string): void {
        fs.mkdirSync(path, { recursive: true });
    }

    /**
     * Copy the directory from source to destination
     * @param srcPath THe source path of the directory
     * @param destPath the final destination path
     */
    public copyDirectory(srcPath: string, destPath: string): void {
        if (!fs.existsSync(srcPath)) {
            Logger.warn(__filename, `Source directory ${srcPath} does not exist.`);
            return;
        }

        fs.mkdirSync(destPath, { recursive: true });

        const entries = fs.readdirSync(srcPath, { withFileTypes: true });
        for (const entry of entries) {
            const srcEntryPath = path.join(srcPath, entry.name);
            const destEntryPath = path.join(destPath, entry.name);

            if (entry.isDirectory()) {
                this.copyDirectory(srcEntryPath, destEntryPath);
            } else {
                fs.copyFileSync(srcEntryPath, destEntryPath);
            }
        }
    }

    /**
    * Get a list of names of files and in the directory and its subdirectories.
    * @param directoryPath The path to the directory to get the names from
    * @returns A List of the names (absolute paths)
    * 
    * @author Ansh Sharma
    */
    public getAllFilesInDirectory(directoryPath: string): string[] {
        if (!fs.existsSync(directoryPath)) {
            Logger.warn(__filename, `Directory ${directoryPath} does not exist.`);
            return [];
        }

        const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {

            if (entry.isDirectory()) {
                const entryPath = path.join(directoryPath, entry.name);
                files.push(...this.getAllFilesInDirectory(entryPath));
            } else {
                const entryPath = path.join(directoryPath, entry.name);
                files.push(entryPath);
            }
        }

        return files;
    }

    /**
     * Move a file from one directory to another
     * @param srcPath Source path
     * @param destPath Destination path 
     */
    public moveFile(srcPath: string, destPath: string): void {
        if (!fs.existsSync(srcPath)) {
            Logger.warn(__filename, `Source file ${srcPath} does not exist.`);
            return;
        }

        fs.renameSync(srcPath, destPath);
    }

    /**
     * Copy a file to a destination
     * @param srcPath Source file path
     * @param destPath Destination file path
     * @param srcPathType The type of the source path, relative or absolute. Default is relative
     */
    public copyFile(srcPath: string, destPath: string, srcPathType: "relative" | "absolute" = "relative"): void {
        const contents = this.readFile(srcPath);
        if (contents === null) {
            Logger.warn(__filename, "Failed to read file");
            return;
        }

        let destFileName = path.basename(srcPath);
        if (destPath.includes(".") && !destPath.endsWith("/")) {
            destFileName = path.basename(destPath);
            destPath = path.dirname(destPath);
        }

        this.createFile(path.join(destPath, destFileName), contents);
    }



    /**
     * Create a new file at the specified path
     * @param filePath New File Path, the name of file should be included in the path.
     * @param contents The contents of the file to create with.
     */
    public createFile(filePath: string, contents: string): void {
        try {
            fs.writeFileSync(filePath, contents);
        }
        catch (err: any) {
            fs.writeFileSync(filePath, contents);
        }
    }

    /**
     * Copy the contents of the folder into another folder including subdirectories. 
     * @param srcPath Source file path
     * @param destPath Destination path
     */
    public copyTree(srcPath: string, destPath: string): void {
        if (!fs.existsSync(srcPath)) {
            Logger.warn(__filename, srcPath, " does not exist");
            return;
        }

        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }

        const files = fs.readdirSync(srcPath);
        for (const file of files) {
            const srcFile = path.join(srcPath, file);
            const destFile = path.join(destPath, file);

            const stat = fs.statSync(srcFile);
            if (stat.isDirectory()) {
                this.copyTree(srcFile, destFile);
            } else {
                fs.copyFileSync(srcFile, destFile);
            }
        }
    }
    /**
     * Delete the specified folder
     * @param path Path of the directory to remove
     * @param force Remove the directory forefully. Even if the directory is not empty.
     */
    public removeDirectory(path: string, force: boolean = false): void {
        fs.rmSync(path, {
            force: force,
            recursive: true
        });
    }
}
