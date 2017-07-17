var getTextNodes = require('./getTextNodes.js');
var wrapEachWord = require('./wrapEachWord.js');
module.exports = function wrapSpan(obj) {
    var allTextNodes = getTextNodes(obj);
    allTextNodes.forEach(function(textNode) {
        wrapEachWord(textNode, 'span');
    });
    obj.className += ' spanned';
}
