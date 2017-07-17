window.getTotalPage = function() {
    return parseInt(document.querySelector('body').getAttribute('total-page'));
}


module.exports = getTotalPage;