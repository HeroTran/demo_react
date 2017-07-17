module.exports = function removeEmptyFigcaption() {
    var figs = document.querySelectorAll('figcaption');
    if(figs != null){
    	for (var i = 0; i < figs.length; i++) {
	        var fig = figs[i];
	        if (fig.textContent.trim() == '') {
	            fig.parentNode.removeChild(fig);
	        }
    	}
    }
}
