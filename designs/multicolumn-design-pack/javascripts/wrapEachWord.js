module.exports = function wrapEachWord(textNode, tag) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;

    var characters = text.split(' ');
    var isAddBlank = text.indexOf(' ') < 0 ? false : true;
    var elements = [];
    characters.forEach(function(character, index) {
        var char = character.replace(/\u2013|\u2014/g, "-");
        var element = document.createElement(tag);
        var ws = '';
        if (index < characters.length && isAddBlank) {
            ws = ' ';
        }
        var characterNode = document.createTextNode(char + ws);
        element.appendChild(characterNode);
        parent.insertBefore(element, textNode);
    });
    parent.removeChild(textNode);
}
