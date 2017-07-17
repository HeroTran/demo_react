module.exports = function removeEmptyTabP() {
    var tabP = document.querySelectorAll('P');
    if(tabP != null){
    	for (var i = 0; i < tabP.length; i++) {
	        var tab = tabP[i];
	        if (tab.textContent.trim() == '') {
	            tab.parentNode.removeChild(tab);
	        }
    	}
    }
}
