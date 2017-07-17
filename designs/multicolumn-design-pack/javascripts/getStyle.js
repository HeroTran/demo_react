module.exports = function getStyle(obj) {
    return obj.currentStyle || window.getComputedStyle(obj);
}
