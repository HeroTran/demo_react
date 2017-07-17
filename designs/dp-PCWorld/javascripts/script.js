
function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj)
{
	try{
        var body = document.getElementsByTagName('body')[0];
        //Move header out of div containing class portrait or landscape because of scrolling problem with fixed position div
        // var headerBar = body.querySelector(':scope .header');
        // if(headerBar){
        //     body.insertBefore(headerBar, body.firstChild);
        // }
        //query container
		var t1 =  body.querySelector(':scope > div:nth-of-type(1)');
        var templateID = t1.id;
        var container = t1.querySelector(':scope .content-body');
        var panelWidth = parseInt(getQuery('width', window.innerWidth));
        var panelHeight = parseInt(getQuery('height', window.innerHeight));
        var maxTableHeight = panelHeight/3;
        var platform = getQuery('platform', 'tablet');
        var cache = getQuery('cache', null);
        if(cache != null){ 
            if(platform.trim() != 'mobile')
            {
                body.className += ' completed'; 
                setTimeout(reloadStylesheets(),200);
            }
            if(typeof cb === 'function'){
                cb(readerObj);
            }
            return; 
        }
        //set veritcal scroll by max height of t1 container
        // t1.style['max-height'] = panelHeight + 'px';
        // var header = t1.querySelector(':scope .header');
        // var wrapHeader = document.createElement('DIV');
        // wrapHeader.className += 'wrap-header';
        // wrapHeader.appendChild(header);
        // t1.insertBefore(wrapHeader, t1.firstChild)
		//remove empty figcaption
		removeEmptyFigcaption();
		//remove some photocredit empty
		removePhotoCreditEmpty();
		//add done dot 
		addDoneDotToLastParagraph(container);

		//Keep first image
		//mainContainer includes all content of page
		var layoutName = t1.getAttribute('layout');
		if(!t1){return;}

		if(t1.className.indexOf('keep-first-image') < 0){
			removeFirstImage(container);
		}
		if(t1.className.indexOf('enable-dropcap') >= 0){
			createDropcap(container);
		}
		if(platform == "mobile"){
			//MOBILE mode
			return;
		}else{
			//TABLET 
			var coverHeight = getHeightCoverSection(t1);
			container.style['padding-top'] = coverHeight + 'px';
		}
		//run script for special template
		switch(templateID){
			case 'reviews':
				setScrollForTable(container, maxTableHeight);
			default:
				break;
		}

	}
	catch(e){ console.log(e); }
}
function chooseLayoutFunc(layoutName,container, panelWidth, panelHeight,maxTableHeight){
	var banner  = document.querySelector('.cover .banner');
	var headInfo = document.querySelector('.cover .head-info');
	switch(layoutName){
			case 'hh_article-l':
			case 'hh_secondary-l':
			case 'news_article-l':
			case 'news_secondary-l':
			case 'rr_article-l':
			case 'rr_secondary-l':
				addBannerWidthLandscape(container, panelWidth, panelHeight,banner);
				initLandscape(container, panelWidth, panelHeight,3);
				break;
			case 'hh_article_02-l':
			case 'news_article_02-l':
			case 'rr_article_02-l':
				addBannerWidthLandscape(container, panelWidth, panelHeight,banner);
				initLandscape(container, panelWidth, panelHeight,2);
				break;
			case 'hh_secondary_02-l':
			case 'news_secondary_02-l':
			case 'rr_secondary_02-l':
				addBannerWidthLandscape(container, panelWidth, panelHeight,banner);
				initLandscape(container, panelWidth, panelHeight,4);
				break;
			case 'hh_article_03-l':
			case 'hh_secondary_03-l':
			case 'news_article_03-l':
			case 'news_secondary_03-l':
			case 'rr_article_03-l':
			case 'rr_secondary_03-l':
				initLandscape(container, panelWidth, panelHeight,1);
				break;
			default:
				console.log('Cannot find layout:',layoutName);
				break;
	}
}


function addScrollIcon(container, panelWidth, panelHeight){
	var infoDiv = document.querySelectorAll(':scope .page .info');
	if(infoDiv.length > 0) {
		for (var i = 0;  i < infoDiv.length; i++) {
			if(infoDiv[i].scrollHeight >  infoDiv[i].clientHeight){
				infoDiv[i].className += ' scrollable-icon';
			}
		}
	}
}


function addBannerWidthLandscape(container, panelWidth, panelHeight){
	createAttr('style','width:' + panelWidth + 'px', document.querySelector('.cover .banner'));
}
function setHeightDefImage(panelHeight){
	var headInfo = document.querySelector(':scope .head-info');
	var defImg = document.querySelector(':scope .default-image');
	//70 is margin top of def img
	var heightOfDefImg = panelHeight - headInfo.getBoundingClientRect().height -70;
	defImg.style.height = heightOfDefImg + 'px';
}
function initLandscape(container, panelWidth, panelHeight,type){
	var temp;
	var headInfo = document.querySelector('.head-info'),
	banner = document.querySelector('.cover .banner'),
	header = document.querySelector('.header'),
	defImg = document.querySelector('.default-image'),
	//get padding top of content-area
	contentAreaPaddingTop = getContentAreaPaddingTop();
	createAttr('style','width:' + panelWidth + 'px', banner);
	if(type === 1) {
		createAttr('style','width:' + panelWidth + 'px', headInfo);
	}
	//convert str to number
	var bannerHeight = banner.offsetHeight;
	//set style for content column in default page
	var contentCoordiate;
	var defImgHeight;
	if(type === 1) {
		temp = headInfo.offsetHeight + bannerHeight;
		//hh article 3
		defImgHeight = panelHeight - headInfo.offsetHeight - bannerHeight - getFooterHeight();
		//set height of default image 
		defImg.style.height = ''+ defImgHeight+'px';
		defImg.style['margin-top'] = ''+ temp + 'px';
		//set content column position
		var ws3 = container.querySelector(':scope > .white-space:nth-of-type(3)');
		contentCoordiate = headInfo.offsetHeight + bannerHeight - ws3.getBoundingClientRect().top;
		var firstChild = ws3.nextElementSibling;
		createAttr('style','margin-top:' + (contentCoordiate) + 'px', firstChild);
		return;
	}
	if (type === 2){
		temp = bannerHeight;
		//set height of default image 
		defImgHeight = panelHeight - bannerHeight - headInfo.offsetHeight - getFooterHeight();
		defImg.style.height = ''+ defImgHeight+'px';
		defImg.style['margin-top'] = ''+ temp + 'px';
		//defImg.style['margin-top'] = ''+ bannerHeight + 'px';
		return;
	}
	if(type === 3){
		defImgHeight = panelHeight - bannerHeight - getFooterHeight();
		//ios central 2
		//set height of default image 
		defImg.style.height = ''+ defImgHeight+'px';
		return;
	}
	if(type === 4){
		//secondary-2
		defImgHeight = panelHeight - headInfo.offsetHeight -  getFooterHeight();
		defImg.style.height = ''+ defImgHeight+'px';
		return;
	}
}
function initLandscapeFullscreen(container, panelWidth, panelHeight,type){
	
}
function initMacUserReviewPortrait(container, panelWidth, panelHeight) {
	createAttr('style','width:' + panelWidth + 'px', document.querySelector('.cover'));
}
function getHeightCoverSection (container){
	var coverSection = container.querySelector(':scope .cover');
	if(coverSection){
		return coverSection.clientHeight;
	}
	return 0;
}

function setScrollForTable(container,maxHeight){
	//query all table immediate after .content-body
	var paragraphElm = container.querySelectorAll(':scope table[bgcolor="#eeeeee"]');
	var parentElm = null;
	if(paragraphElm.length > 0) {
		for (var i = 0;  i < paragraphElm.length; i++) {
			parent = paragraphElm[i].parentNode;
			//set style for parent div
			parent.className += ' table-container';
			parent.style.maxHeight = maxHeight + 'px';
			//if(parent.scrollHeight >  parent.clientHeight){
			parent.className += ' scrollable-icon';
			//}
		}
	}
	//createStyleTag('.content-body table[bgcolor="#eeeeee"]{ max-height:' + (maxTableHeight) + 'px !important; }', 'myStyle');
}
function addDoneDotToLastParagraph (container){
	//query all p immediate after .content-body
	var paragraphElm = container.querySelectorAll(':scope > p');
	//add done dot for last p not p.photo-credit
	for (var i = paragraphElm.length - 1; i >= 0; i--) {
		var tmp = paragraphElm[i];
		if(tmp.className.indexOf('photo-credit')< 0 && tmp.className.indexOf('pullQuote') < 0){
			tmp.className += ' done-dot';
			return
		}
	}
}
function getTotalPage(){
	return parseInt(document.querySelector('body').getAttribute('total-page'));
}

function getPageHTML(){
	var s = document.getElementsByTagName('html')[0].innerHTML;
	var filtered=s
		.replace(/(<iframe id=\"amreader-iframe\".*?>.*?<\/iframe>)/g, '');
		// .replace(/(<style .*? id=\"myStyle\".*?>.*?<\/style>)/g, '')
		// .replace(/(<p class=\"white-space\".*?>.*?<\/p>)/g, '')
		// .replace(/(<span class=\"eof.*?>.*?<\/span>)/g,'');
	return '<html>' + filtered + '</html>';
}

function getPageWidth(){
	return window.innerWidth;
}

function removeFirstImage(container){
	var imgs = container.querySelectorAll(':scope .image img');
	if(imgs.length > 0){
		for(var i=0; i<imgs.length; i++){
			var par = imgs[i].parentNode;
			if(par.className && par.className !='default-image'){
				
				var fig = par.nextSibling;
				if(fig.nodeName == 'FIGCAPTION'){
					fig.parentNode.removeChild(fig);
				}
				par.parentNode.removeChild(par);
				return;
			}
		}
	}
}

function removeEmptyFigcaption() {
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

function removePhotoCreditEmpty(){
	var ptCredit = document.querySelector('photo-credit');
	if(ptCredit){
		if(ptCredit.textContent.trim() =='' || ptCredit.textContent == null)
		{
			ptCredit.parentNode.removeChild(ptCredit);
		}
	}
}
function createAttr(type, value, obj){
	var attr = document.createAttribute(type);
	attr.value = value;
	obj.attributes.setNamedItem(attr);
}

function getStyle(obj){
	return obj.currentStyle || window.getComputedStyle(obj);
}

function createStyleTag(css, id){
	var head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');

	style.type = 'text/css';
	style.id = id;
	if (style.styleSheet){
  		style.styleSheet.cssText = css;
	} else {
  		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
}

function getIndex(parent, obj){
	var nodeList = Array.prototype.slice.call( parent.children );
	return nodeList.indexOf(obj);
}

function getTextNodes(node) {
    var childTextNodes = [];
    if (!node.hasChildNodes()) {
        return;
    }
    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType == Node.TEXT_NODE) {
            childTextNodes.push(childNodes[i]);
        }
        else if (childNodes[i].nodeType == Node.ELEMENT_NODE && childNodes[i].className.indexOf('dropcap-letter') < 0) {
            Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
        }
    }
    return childTextNodes;
}

function reloadStylesheets() {
    var links = document.getElementsByTagName('link');
    for(var i=0; i<links.length; i++){
    	var href= links[i].getAttribute('href');
    	links[i].setAttribute('href', href);
    }
}

function getQuery(name, defVal){
	var re = new RegExp('.*[#&]'+name+'=([^&$]+).*','g');
	var res = re.exec(window.location.hash);
	res = res ? res[1] : defVal;
	return res;
}

function getColumnWidth(){
	var panelWidth = parseInt(getQuery('width', window.innerWidth));
	var doc = document.getElementById('t1');
	var colWidth = panelWidth/3;
	if(doc.className.indexOf('landscape') < 0){
		colWidth = panelWidth/2;
	}
	return colWidth-36*2;
}

function getFooterHeight() {
	return document.querySelector('.footer').offsetHeight;
}

function getEmbedSize(){
	var size = 0;
	var panelWidth = parseInt(getQuery('width', window.innerWidth));
	var doc = document.getElementById('t1');
	var colWidth = panelWidth/3;
	if(doc.className.indexOf('landscape') < 0){
		colWidth = panelWidth/2;
	}
	size = panelWidth - Math.floor(colWidth) + 36;
	return size;
}

function createDropcap(container){
	var paras = container.querySelectorAll(':scope > p:not(.author):not(.strap-line):not(.title):not(.pullQuote)');
	if(paras.length > 0){
		var p = paras[0];
		if(p.textContent != "" && p.firstChild){
			var isFirstCharacterBold = p.firstChild.nodeName;
			if (isFirstCharacterBold === "B") {
			   	p.className += ' dropcap';
			}
		}
	}
}

function convertPxToInt (str){
	str = str.replace(/ /g,'');
	var ln = str.length;
	var temp  = str.substring(0, ln - 2);
	return +temp;
}