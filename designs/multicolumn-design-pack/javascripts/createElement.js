module.exports = function createElement(nodeName, className, id) {
    if (nodeName == undefined) {
        nodeName = 'div';
    }
    if (className == undefined) {
        className = '';
    }
    nodeName = nodeName.toUpperCase();
    var el = document.createElement(nodeName);
    el.className = className;
    if (id != undefined) {
        el.id = id;
    }
    return el;
}