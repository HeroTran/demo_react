
window.setCurrentPage = function(page) {
    if( document.querySelector('#c-page') != null){
        document.querySelector('#c-page').innerText = page;
    }
}


module.exports = setCurrentPage;