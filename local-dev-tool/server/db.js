var fs = require('fs-extra');
var path = require('path');
var request = require('request');

function downloadAndSaveFile(filePath, uri){
    return new Promise((resolve,reject)=>{
        fs.ensureFileSync(filePath);
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(filePath)).on('close', ()=>{
                resolve();
            });
        });
    })

};

function saveFile(filePath, value){
    fs.ensureFileSync(filePath)
    fs.writeFileSync(filePath,value);
}

function saveJson(filePath, value){
    fs.ensureFileSync(filePath);
    fs.writeJsonSync(filePath,value);
}

function getJson(filePath){
    fs.ensureFileSync(filePath);
    return fs.readJsonSync(filePath, { throws: false }) || {};
}

module.exports = {
    saveJson: saveJson,
    saveFile: saveFile,
    downloadAndSaveFile: downloadAndSaveFile,
    getJson: getJson,
}