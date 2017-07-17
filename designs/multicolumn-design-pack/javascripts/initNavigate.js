module.exports = function initNavigate(navigate){
    //reset control
    var goPrev = document.querySelector('.go-prev');
    if (goPrev) {
        goPrev.className = 'go-prev';
    }
    var goNext = document.querySelector('.go-next');
    if (goNext) {
        goNext.className = 'go-next';
    }
    if (navigate[0] == '1' && goPrev) {
        goPrev.className += ' active';
    }
    if (navigate[1] == '1' && goNext) {
        goNext.className += ' active';
    }
}
