module.exports = function createAttr(type, value, obj) {
    var attr = document.createAttribute(type);
    attr.value = value;
    obj.attributes.setNamedItem(attr);
}
