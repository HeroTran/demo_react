module.exports = function checkBrowerEdge() {
    var isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1;
	var isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 || window.navigator.appVersion.toLowerCase().indexOf('trident/') > -1 ;
	if (isEdge || isIE){
		return true;
	}
    return false;
}
