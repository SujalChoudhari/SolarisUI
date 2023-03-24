import fs from 'fs';
import path from 'path';

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
    constructor() {
        this.basePath = path.resolve(process.cwd());
    }

    /**
     * Convert relative path to absolute path
     * @param relativePath The relative path of any file or directory
     * @returns The abosolute path of the file or directory.
     */
    public getAbsolutePath(relativePath: string): string {
        return path.join(this.basePath, relativePath);
    }

    /**
     * Read a file synchronously
     * @param relativePath relative path of the file or directory
     * @returns the contents of the file or directory. `null`if file is not found
     */
    public readFile(relativePath: string): string | null {
        const absolutePath = this.getAbsolutePath(relativePath);
        if (!fs.existsSync(absolutePath)) return null;

        try {
            return fs.readFileSync(absolutePath, 'utf8');
        } catch (err) {
            console.error(`Error reading file: ${err}`);
            return null;
        }
    }

    /**
     * Create a new directory
     * @param directoryPath Path at which the directory should be created. The name of the directory should be
     * included in the path
     */
    public createDirectory(directoryPath: string): void {
        const absolutePath = this.getAbsolutePath(directoryPath);
        fs.mkdirSync(absolutePath, { recursive: true });
    }

    /**
     * Copy the directory from source to destination
     * @param srcPath THe source path of the directory
     * @param destPath the final destination path
     */
    public copyDirectory(srcPath: string, destPath: string): void {
        const srcAbsolutePath = this.getAbsolutePath(srcPath);
        const destAbsolutePath = this.getAbsolutePath(destPath);

        if (!fs.existsSync(srcAbsolutePath)) {
            throw new Error(`Source directory ${srcPath} does not exist.`);
        }

        fs.mkdirSync(destAbsolutePath, { recursive: true });

        const entries = fs.readdirSync(srcAbsolutePath, { withFileTypes: true });
        for (const entry of entries) {
            const srcEntryPath = path.join(srcAbsolutePath, entry.name);
            const destEntryPath = path.join(destAbsolutePath, entry.name);

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
        const absolutePath = this.getAbsolutePath(directoryPath);
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`Directory ${directoryPath} does not exist.`);
        }

        const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {
            
            if (entry.isDirectory()) {
                const entryPath = path.join(directoryPath, entry.name);
                files.push(...this.getAllFilesInDirectory(entryPath));
            } else {
                const entryPath = path.join(absolutePath, entry.name);
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
        const srcAbsolutePath = this.getAbsolutePath(srcPath);
        const destAbsolutePath = this.getAbsolutePath(destPath);

        if (!fs.existsSync(srcAbsolutePath)) {
            throw new Error(`Source file ${srcPath} does not exist.`);
        }

        fs.renameSync(srcAbsolutePath, destAbsolutePath);
    }

    /**
     * Copy a file to a destination
     * @param srcPath Source file path
     * @param destPath Destination file path
     */
    public copyFile(srcPath: string, destPath: string): void {
        let contents = this.readFile(srcPath);
        
        if (contents !== null)
        this.createFile(destPath, contents);
        else {
            throw new Error("Failed to read file");
        }
    }
    
    /**
     * Create a new file at the specified path
     * @param filePath New File Path, the name of file should be included in the path.
     * @param contents The contents of the file to create with.
     */
    public createFile(filePath: string, contents: string): void {
        console.log(filePath);
        const absolutePath = this.getAbsolutePath(filePath);
        fs.writeFileSync(absolutePath, contents);
    }
}
