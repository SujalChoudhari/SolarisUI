import fs from 'fs';
import path from 'path';

export default class FileManager {
    public basePath: string;
    constructor() {
        this.basePath = path.resolve(process.cwd());
    }

    public getAbsolutePath(relativePath: string): string {
        return path.join(this.basePath, relativePath);
    }

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


    public createDirectory(directoryPath: string): void {
        const absolutePath = this.getAbsolutePath(directoryPath);
        fs.mkdirSync(absolutePath, { recursive: true });
    }

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

    public moveFile(srcPath: string, destPath: string): void {
        const srcAbsolutePath = this.getAbsolutePath(srcPath);
        const destAbsolutePath = this.getAbsolutePath(destPath);

        if (!fs.existsSync(srcAbsolutePath)) {
            throw new Error(`Source file ${srcPath} does not exist.`);
        }

        fs.renameSync(srcAbsolutePath, destAbsolutePath);
    }

    public copyFile(srcPath: string, destPath: string): void {
        let contents = this.readFile(srcPath);
        
        if (contents !== null)
        this.createFile(destPath, contents);
        else {
            throw new Error("Failed to read file");
        }
    }
    
    public createFile(filePath: string, contents: string): void {
        console.log(filePath);
        const absolutePath = this.getAbsolutePath(filePath);
        fs.writeFileSync(absolutePath, contents);
    }
}
