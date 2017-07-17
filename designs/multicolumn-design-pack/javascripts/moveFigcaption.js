module.exports = function moveFigcaption() {
    var figs = document.querySelectorAll('#t1 .content-body figcaption');
    if(figs != null){
        for (var i = 0; i < figs.length; i++) {
            var fig = figs[i];
            var parent = fig.parentNode;
            if (parent.className.indexOf('default-image') < 0) {
                parent.parentNode.insertBefore(fig, parent.nextSibling);
            }
        }
    }
}
