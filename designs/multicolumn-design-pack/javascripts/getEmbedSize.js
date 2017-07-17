module.exports = function getEmbedSize() {
    var size = 0;
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var doc = document.getElementById('t1');
    var colWidth = panelWidth / 3;
    if (doc.className.indexOf('landscape') < 0) {
        colWidth = panelWidth / 2;
    }
    size = panelWidth - Math.floor(colWidth) + 36;
    return size;
}