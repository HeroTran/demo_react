module.exports = function removeFirstImage(container) {
    var defaultImage = document.querySelector('.default-image');
    if (defaultImage) {
        var defaultImageName = defaultImage.querySelector('img').getAttribute('alt');
        var firstImage = container.querySelector('.image img');
        if(firstImage != null){
            if (firstImage.getAttribute('title') == defaultImageName) {
            var par = firstImage.parentNode;
                if (par != null) {
                    var fig = par.nextSibling;
                    if (fig.nodeName == 'FIGCAPTION') {
                        fig.parentNode.removeChild(fig);
                    }
                    par.parentNode.removeChild(par);
                }
            }
        }
        
    }
        
}
