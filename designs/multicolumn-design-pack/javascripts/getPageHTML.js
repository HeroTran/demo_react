module.exports = function getPageHTML() {
    var s = document.getElementsByTagName('html')[0].innerHTML;
    var filtered = s
        .replace(/(<iframe id=\"amreader-iframe\".*?>.*?<\/iframe>)/g, '');
    // .replace(/(<style .*? id=\"myStyle\".*?>.*?<\/style>)/g, '')
    // .replace(/(<p class=\"white-space\".*?>.*?<\/p>)/g, '')
    // .replace(/(<span class=\"eof.*?>.*?<\/span>)/g,'');
    return '<html>' + filtered + '</html>';
}