var createAttr = require('./createAttr.js');
module.exports = function createWhiteSpace(height) {
    var wspace = document.createElement("span");
    wspace.className = 'white-space';
    createAttr('style', 'height:' + height + 'px', wspace);
    return wspace;
}