const ArgumentResolver = require("./ArgumentResolver");
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

class FilesystemService {
    fileExists() {
        return fs.existsSync(this.filePath());
    }

    getFileToModify() {
        return fs.readFileSync(this.filePath(), 'binary');
    }

    filePath() {
        return path.resolve(process.cwd(), ArgumentResolver.getFile());
    }

    saveDocxFile(buffer) {
        this.saveFile(buffer, ArgumentResolver.outputFileName());
    }

    convertToPdf() {
        exec(`/usr/bin/unoconv -f pdf "${ArgumentResolver.outputFileName()}"`);
    }

    saveFile(buffer, name) {
        return fs.writeFileSync(path.resolve(process.cwd(), name), buffer);
    }
}

module.exports = new FilesystemService;