// AMCustomScript.js calls the following functions
// So we need to require them in AMCustomScript file
	// addCaptionCamera
	// createAttr 
	// createElement 
	// createEventFig 
	// createPhotoCredit 
	// createStyleForFactbox 
	// createStyleForFrame 
	// getQuery 
	// initCreditForImage
	// initHeadInfo
	// reloadStylesheets
	// removeEmptyFigcaption
	// removeEmptyTagP
	// removeFirstImage
	// removeSpaceForContent
	// setWidthHeightImage
	// setWidthHeightImageOfFactbox

	
var AMCustomScript = require('./javascripts/AMCustomScript.js');


var checkBrowerEdge = require('./javascripts/checkBrowerEdge.js');
var getQuery = require('./javascripts/getQuery.js');
var removeEmptyTabP = require('./javascripts/removeEmptyTabP.js');
var createStyleTag = require('./javascripts/createStyleTag.js');
var createWhiteSpace = require('./javascripts/createWhiteSpace.js');
var getColumnWidth = require('./javascripts/getColumnWidth.js');
var getEmbedSize = require('./javascripts/getEmbedSize.js');
var getFooterHeight = require('./javascripts/getFooterHeight.js');
var getIndex = require('./javascripts/getIndex.js');
var getPageHTML = require('./javascripts/getPageHTML.js');
var getPageWidth = require('./javascripts/getPageWidth.js');
var getStyle = require('./javascripts/getStyle.js');
var getTextNode = require('./javascripts/getTextNodes.js');
var getTotalPage = require('./javascripts/getTotalPage.js');
var Languages = require('./javascripts/languages.js');
var moveFigcaption = require('./javascripts/moveFigcaption.js');
var setCurrentPage = require('./javascripts/setCurrentPage.js');
var setPageTotalNumber = require('./javascripts/setPageTotalNumber.js');
var initTouch = require('./javascripts/initTouch.js');
var reloadStylesheets = require('./javascripts/reloadStylesheets.js');
var wrapEachWord = require('./javascripts/wrapEachWord.js');
var wrapSpan = require('./javascripts/wrapSpan.js');


// CSS FILES
require('./stylesheets/base.css');
require('./stylesheets/color.css');
require('./stylesheets/font.css');
require('./stylesheets/content.scss');
require('./stylesheets/landscape.css');
require('./stylesheets/portrait.css');
