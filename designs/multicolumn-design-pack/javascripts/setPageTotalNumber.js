module.exports = function setPageTotalNumber() {
    var content = document.getElementById("pagination");
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var colWidth = panelWidth * 0.5;
    if (document.querySelector('#t1').className.indexOf('landscape') >= 0) {
        colWidth = panelWidth / 3;
    }
    var lastOffset = document.querySelector('#t1 .content-body .eof').offsetLeft;
    var topOffset = document.querySelector('#t1 .content-body .eof').offsetTop;
    var page = Math.ceil(lastOffset / panelWidth);
    var range = lastOffset - (panelWidth * (page - 1));
    if (range < colWidth && topOffset <= content.offsetTop + 22) {
        page -= 1;
    }
    var pages = document.createAttribute("total-page");
    pages.value = page;
    document.querySelector('body').attributes.setNamedItem(pages);
    document.querySelector('#t-page').innerText = page;
}
