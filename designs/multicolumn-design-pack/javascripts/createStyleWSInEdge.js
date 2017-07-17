var checkBrowerEdge = require('./checkBrowerEdge.js');
module.exports = function createStyleWSInEdge(position) {
    if (checkBrowerEdge()) {
        var whiteSpace = document.querySelectorAll(".white-space")[position];
        if (whiteSpace != null) {
            whiteSpace.className += ' wsEdge';
        }
   }
}
