const ArgumentResolver = require("./ArgumentResolver");
const fs = require('fs');
const path = require('path');

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
        return fs.writeFileSync(path.resolve(process.cwd(), ArgumentResolver.outputFileName()), buffer);
    }
}

module.exports = new FilesystemService;