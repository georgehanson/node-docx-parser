const ArgumentResolver = require("./ArgumentResolver");
const fs = require('fs');
const path = require('path');
const converter = require('unoconv');

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
        converter.convert(path.resolve(process.cwd(), ArgumentResolver.outputFileName()), 'pdf', {}, function (err, buffer) {
            this.savePdfFile(buffer);
            fs.writeFile('converted.pdf', result);
        });
    }

    savePdfFile(buffer) {
        let newFileName = ArgumentResolver.outputFileName().replace("docx", "pdf");
        return this.saveFile(buffer, newFileName);
    }

    saveFile(buffer, name) {
        return fs.writeFileSync(path.resolve(process.cwd(), name), buffer);
    }
}

module.exports = new FilesystemService;