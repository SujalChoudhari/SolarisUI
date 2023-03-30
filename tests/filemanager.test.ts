import * as path from 'path';
import * as fs from 'fs';
import FileManager from '../src/utils/filemanager';

describe('FileManager', () => {

    var fm: FileManager;
    beforeEach(() => {
        fm = new FileManager();
    });

    it('should return the absolute path of a file or directory', () => {
        const basePath = path.resolve(process.cwd());
        const relativePath = 'src/index.ts';
        const expectedAbsolutePath = path.join(basePath, relativePath);

        expect(fm.getAbsolutePath(relativePath)).toBe(expectedAbsolutePath);
    });

    it('should return the content of a file', () => {
        const relativePath = './src/index.ts';
        const expectedContent = fs.readFileSync(relativePath, 'utf-8');

        expect(fm.readFile(relativePath)).toBe(expectedContent);
    });

    it('should return null if the file does not exist', () => {
        const relativePath = './non/existent/file.ts';

        expect(fm.readFile(relativePath)).toBeNull();
    });

    it("must create a new directory", () => {
        const relativePath = './only-for-test/.';
        fm.createDirectory(relativePath);
        expect(fs.existsSync(relativePath)).toBe(true);
        fs.rmdirSync(relativePath);
    });


    it('should copy a directory from source to destination', () => {
        const srcPath = 'only-for-test/';
        const destPath = 'dest-for-test/';
        fm.createDirectory(srcPath);

        fm.copyDirectory(srcPath, destPath);

        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.readdirSync(srcPath)).toEqual(fs.readdirSync(destPath));
        fs.rmdirSync(srcPath);
        fs.rmdirSync(destPath);
    });

    it("should return a list of files", () => {
        const list = fm.getAllFilesInDirectory("./src");
        expect(list).not.toBeNull();
    });



});


describe('FileManager', () => {

    const testDir = path.join('./test');
    var fm: FileManager;

    beforeEach(() => {
        fm = new FileManager();
        fs.mkdirSync(testDir);
    });

    afterEach(() => {
        fs.rmdirSync(testDir, { recursive: true });
    });
    it('should move a file from one directory to another', () => {
        const srcPath = path.join(testDir, 'src.txt');
        const destPath = path.join(testDir, '/dest/');

        fs.writeFileSync(srcPath, 'test content');

        fm.moveFile(srcPath, destPath);

        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.existsSync(srcPath)).toBe(false);
    });


    it('should move a file from one directory to another', () => {
        const srcPath = path.join(testDir, 'src.txt');
        const destDir = path.join(testDir, 'dest');
        const destPath = path.join(destDir, 'src.txt');
    
        fs.mkdirSync(destDir);
        fs.writeFileSync(srcPath, 'test content');
    
        fm.moveFile(srcPath, destPath);
    
        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.existsSync(srcPath)).toBe(false);
      });

    it('should create a file to a destination', () => {
        const srcPath = path.join(testDir, 'src.txt');

        fm.createFile(srcPath, 'test content');
        expect(fs.existsSync(srcPath)).toBe(true);
    });

    it('should copy a file to a destination', () => {
        const srcPath = path.join(testDir, 'src.txt');
        const destPath = path.join(testDir, 'dest.txt');

        fs.writeFileSync(srcPath, 'test content');

        fm.copyFile(srcPath, destPath);

        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.readFileSync(srcPath, 'utf-8')).toEqual(fs.readFileSync(destPath, 'utf-8'));
    });



    it('should copy the contents of a folder into another folder including subdirectories', () => {
        const srcPath = path.join(testDir, 'src');
        const destPath = path.join(testDir, 'dest');

        fs.mkdirSync(srcPath);
        fs.writeFileSync(path.join(srcPath, 'file.txt'), 'test content');
        fs.mkdirSync(path.join(srcPath, 'subdir'));
        fs.writeFileSync(path.join(srcPath, 'subdir', 'file.txt'), 'test content');

        fm.copyTree(srcPath, destPath);

        expect(fs.existsSync(destPath)).toBe(true);
        expect(fs.readdirSync(srcPath)).toEqual(fs.readdirSync(destPath));
        expect(fs.readdirSync(path.join(srcPath, 'subdir'))).toEqual(fs.readdirSync(path.join(destPath, 'subdir')));
    });
});