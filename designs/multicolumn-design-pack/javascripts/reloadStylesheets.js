module.exports = function reloadStylesheets() {
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        links[i].setAttribute('href', href);
    }
}
