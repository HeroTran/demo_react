var Languages = require('./languages.js');
module.exports = function setLanguage(qLang) {
    if (Languages) {
        var lang = Languages[qLang] ? Languages[qLang] : Languages.en;
        var pageInfo = document.querySelector('.footer .page_info');
        if (pageInfo) {
            pageInfo.innerHTML = lang.info.replace('<no>', '<span id="c-page">1</span>').replace('<total>', '<span id="t-page">1</span>');
        }
        var goNext = document.querySelector('.footer .go-next');
        if (goNext) {
            goNext.innerText = lang.next;
        }
        var goPrev = document.querySelector('.footer .go-prev');
        if (goPrev) {
            goPrev.innerText = lang.prev;
        }
    }
}
