#!/usr/bin/env node

const ArgumentResolver = require("./ArgumentResolver");
const FilesystemService = require("./FilesystemService");
const commandExists = require('command-exists');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');

if (!ArgumentResolver.hasAllRequiredArguments()) {
    console.log("Please ensure you pass the --file, --output and --data flags.");
    return;
}

if (!FilesystemService.fileExists()) {
    console.log("Please ensure the path for --file is correct.");
    return;
}

if (!ArgumentResolver.dataIsValid()) {
    console.log("Please ensure the data you have passed is valid json");
    return;
}

const DocxService = new Docxtemplater();
const content = new JSZip(FilesystemService.getFileToModify());
let document = DocxService.loadZip(content);

document.setData(ArgumentResolver.getData());

try {
    document.render()
}
catch (error) {
    let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
    }

    console.log(JSON.stringify({ error: e }));
    throw error;
}

FilesystemService.saveDocxFile(document.getZip().generate({ type: 'nodebuffer' }));

if (ArgumentResolver.wantsPdf()) {
    FilesystemService.convertToPdf();
}