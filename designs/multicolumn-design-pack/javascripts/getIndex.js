module.exports = function getIndex(parent, obj) {
    var nodeList = Array.prototype.slice.call(parent.children);
    return nodeList.indexOf(obj);
}
