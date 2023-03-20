import fs from 'fs';
import path from 'path';

export default class FileManager {
    public basePath: string;
    constructor() {
        this.basePath = path.resolve(process.cwd());
        console.log('basePath: ' + this.basePath);
    }

    public getAbsolutePath(relativePath: string): string {
        return path.join(this.basePath, relativePath);
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

    public moveFile(srcPath: string, destPath: string): void {
        const srcAbsolutePath = this.getAbsolutePath(srcPath);
        const destAbsolutePath = this.getAbsolutePath(destPath);

        if (!fs.existsSync(srcAbsolutePath)) {
            throw new Error(`Source file ${srcPath} does not exist.`);
        }

        fs.renameSync(srcAbsolutePath, destAbsolutePath);
    }

    public createFile(filePath: string, contents: string): void {
        const absolutePath = this.getAbsolutePath(filePath);
        fs.writeFileSync(absolutePath, contents);
    }
}
