function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj)
{
	try{
        var body = document.getElementsByTagName('body')[0];
        //Move header out of div containing class portrait or landscape because of scrolling problem with fixed position div
        //only enable this code if we need a fixed header
          var headerBar = body.querySelector(':scope .header');
                if(headerBar){
                    body.insertBefore(headerBar, body.firstChild);
                }
        //query container
        var container = body.querySelector(':scope .container');
        var containerClass = container.className;
        var templateID = container.id;
        var panelWidth = parseInt(getQuery('width', window.innerWidth));
        var panelHeight = parseInt(getQuery('height', window.innerHeight));
        var platform = getQuery('platform', 'tablet');
        var cache = getQuery('cache', null);
        if(cache != null){ 
            if(platform.trim() != 'mobile')
            {
                body.className += ' completed'; 
            }
            if(typeof cb === 'function'){
                cb(readerObj);
            }
            return; 
        }
        removeEmptyFigcaption();
        resizeWidthFigcaption();
		if(container == null){return;}
		container = container.querySelector('.content-body');
		if(containerClass.indexOf('keep-first-image') < 0){
			removeFirstImage(container);
		}
		if(containerClass.indexOf('enable-dropcap') >= 0){
			createDropcap(container);
		}
		//run script for special template
		switch(templateID){
			default:
				break;
		}
	}
	catch(e){
		console.log(e);
	}
	
	body.className += ' completed';
	return;
}
//custom functions

function createDropcap(container){
	var paras = container.querySelectorAll(':scope .right_content > p:not(.author):not(.strap-line):not(.title):not(.pullQuote)');
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

function resetWidthOfImage(img ,maxWidthImage){
    img.className += ' centerImage';
    var w = parseInt(img.getAttribute('width'));
    var h = parseInt(img.getAttribute('height'));
    if (w >= maxWidthImage) {
        var nw = maxWidthImage;
        var nh = Math.floor(nw / w * h);
        img.setAttribute('width', nw);
        img.setAttribute('height', nh);
        createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
    }
}
//reset Width Height Image in content
function resetWidthHeightImage(img ,maxWidthImage, maxHeightImage){
    img.className += ' centerImage';
    var w = parseInt(img.getAttribute('width'));
    var h = parseInt(img.getAttribute('height'));
    if (w > maxWidthImage) {
        var nw = maxWidthImage;
        var nh = Math.floor(nw / w * h);
        if (nh > maxHeightImage) {
            nh = maxHeightImage;
            nw = Math.floor(nh / h * w);
        }
        img.setAttribute('width', nw);
        img.setAttribute('height', nh);
        createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
    } else if (h > maxHeightImage) {
        var nh = maxHeightImage;
        var nw = Math.floor(nh / h * w);
        if (nw > maxWidthImage) {
            nw = maxWidthImage;
            nh = Math.floor(nw / w * h);
        }
        img.setAttribute('width', nw);
        img.setAttribute('height', nh);
        createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
       
    }
}

function initCreditForImage(content){
    var image = document.querySelectorAll('.container .image');
    if(image.length){   
        for(var i = 0; i<image.length; i++){
            var img = image[i];
            var img_child = img.querySelector("img");
            var credit = img.querySelector(".credit");
            if(credit != null){
                if (credit.textContent.trim() == '') {
                    credit.parentNode.removeChild(credit);
                }else{
                    img_child.parentNode.insertBefore(credit, img_child);
                }
            }
        }
    }
}

function initQuoteForParagraph(content){
    var pullQuote = content.querySelectorAll("div.pullQuote");
    if(pullQuote.length){
        for(var i = 0; i<pullQuote.length; i++){
            var quote = pullQuote[i];
            if(quote.parentNode.nodeName == "DIV" || quote.parentNode.className.indexOf("object") > 0){
                var tabP = document.createElement('p');
                tabP.className = 'pullQuote';
                tabP.innerHTML   = quote.innerText ;
                quote.parentNode.parentNode.insertBefore(tabP, quote.parentNode.nextSibling);
                quote.parentNode.remove();
            }
        }
    }
}
function createEventFig(event){
	if(event != null){
		event.stopPropagation();
	    event.preventDefault();
	}
	var image = event.currentTarget.parentNode;
	var credit = image.querySelector(".credit");
    if(credit != null){
        if(image.querySelector(".arrow-style").className.indexOf("info-fig") < 0 ){
            image.querySelector(".arrow-style").classList.remove("close-fig");
            image.querySelector(".arrow-style").className += ' info-fig';
            credit.className += ' hide-fig';
            credit.classList.remove("show-fig");
        }
       else{
           image.querySelector(".arrow-style").classList.remove("info-fig");
           image.querySelector(".arrow-style").className += ' close-fig';
           credit.classList.remove("hide-fig");
           credit.className += ' show-fig';
       }
    }
   return false;	  
}


function getPageWidth() {
    return window.innerWidth;
}


function setPageTotalNumber() {
    var content = document.getElementById("pagination");
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var colWidth = panelWidth * 0.5;
    if (document.querySelector('#t1').className.indexOf('landscape') >= 0) {
        colWidth = panelWidth / 3;
    }
    var lastOffset = document.querySelector('#t1 .content-body .eof').offsetLeft;
    var topOffset = document.querySelector('#t1 .content-body .eof').offsetTop;
    var page = Math.ceil(lastOffset / panelWidth);
    var range = lastOffset - (panelWidth * (page - 1));
    if (range < colWidth && topOffset <= content.offsetTop + 22) {
        page -= 1;
    }
    var pages = document.createAttribute("total-page");
    pages.value = page;
    document.querySelector('body').attributes.setNamedItem(pages);
    document.querySelector('#t-page').innerText = page;
}

function getTotalPage() {
    return parseInt(document.querySelector('body').getAttribute('total-page'));
}

function getPageHTML() {
    var s = document.getElementsByTagName('html')[0].innerHTML;
    var filtered = s
        .replace(/(<iframe id=\"amreader-iframe\".*?>.*?<\/iframe>)/g, '');
    // .replace(/(<style .*? id=\"myStyle\".*?>.*?<\/style>)/g, '')
    // .replace(/(<p class=\"white-space\".*?>.*?<\/p>)/g, '')
    // .replace(/(<span class=\"eof.*?>.*?<\/span>)/g,'');
    return '<html>' + filtered + '</html>';
}

function getPageWidth() {
    return window.innerWidth;
}

function setCurrentPage(page) {
    if( document.querySelector('#c-page') != null){
        document.querySelector('#c-page').innerText = page;
    }
}
function resizeWidthFigcaption() {
    var fig;
    var imgContainerList = document.querySelectorAll('.image');
    if(imgContainerList.length > 0){
        for (var i = 0; i < imgContainerList.length; i++) {
            var img = imgContainerList[i].querySelector(':scope img');
            if(img.clientWidth < imgContainerList[i].clientWidth){
                fig = imgContainerList[i].querySelector(':scope figcaption');
               if(fig){
                 fig.style.width = img.clientWidth + 'px';
               }
            }
        }
    }
}
function removeEmptyFigcaption() {
    var figs = document.querySelectorAll('figcaption');
    if(figs.length > 0){
    	for (var i = 0; i < figs.length; i++) {
	        var fig = figs[i];
	        if (fig.textContent.trim() == '') {
	            fig.parentNode.removeChild(fig);
	        }
    	}
    }
}


function removeEmptyTabP(){
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

function moveFigcaption() {
    var figs = document.querySelectorAll('#t1 .content-body figcaption');
    if(figs != null){
    	for (var i = 0; i < figs.length; i++) {
	        var fig = figs[i];
	        var parent = fig.parentNode;
	        if (parent.className.indexOf('defaultImage') < 0) {
	            parent.parentNode.insertBefore(fig, parent.nextSibling);
	        }
	    }
    }
}

function createAttr(type, value, obj) {
    var attr = document.createAttribute(type);
    attr.value = value;
    obj.attributes.setNamedItem(attr);
}

function getStyle(obj) {
    return obj.currentStyle || window.getComputedStyle(obj);
}

function createStyleTag(css, id) {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    style.id = id;
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}

function createWhiteSpace(height) {
    var wspace = document.createElement("span");
    wspace.className = 'white-space';
    createAttr('style', 'height:' + height + 'px', wspace);
    return wspace;
}

function getIndex(parent, obj) {
    var nodeList = Array.prototype.slice.call(parent.children);
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
        } else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
            Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
        }
    }
    return childTextNodes;
}

function wrapEachWord(textNode, tag) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;

    var characters = text.split(' ');
    var isAddBlank = text.indexOf(' ') < 0 ? false : true;
    var elements = [];
    characters.forEach(function(character, index) {
        var char = character.replace(/\u2013|\u2014/g, "-");
        var element = document.createElement(tag);
        var ws = '';
        if (index < characters.length && isAddBlank) {
            ws = ' ';
        }
        var characterNode = document.createTextNode(char + ws);
        element.appendChild(characterNode);
        parent.insertBefore(element, textNode);
    });
    parent.removeChild(textNode);
}

function wrapSpan(obj) {
    var allTextNodes = getTextNodes(obj);
    allTextNodes.forEach(function(textNode) {
        wrapEachWord(textNode, 'span');
    });
    obj.className += ' spanned';
}

function reloadStylesheets() {
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        links[i].setAttribute('href', href);
    }
}

function getQuery(name, defVal) {
    var re = new RegExp('.*[#&]' + name + '=([^&$]+).*', 'g');
    var res = re.exec(window.location.hash);
    return res ? res[1] : defVal;
}

function getColumnWidth() {
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var doc = document.getElementById('t1');
    var colWidth = panelWidth / 3;
    if (doc.className.indexOf('landscape') < 0) {
        colWidth = panelWidth / 2;
    }
    return colWidth - 36 * 2;
}

function getFooterHeight() {
    return 61;
}

function getEmbedSize() {
    var size = 0;
    var panelWidth = parseInt(getQuery('width', window.innerWidth));
    var doc = document.getElementById('t1');
    var colWidth = panelWidth / 3;
    if (doc.className.indexOf('landscape') < 0) {
        colWidth = panelWidth / 2;
    }
    size = panelWidth - Math.floor(colWidth) + 36;
    return size;
}

function createElement(nodeName, className, id) {
    if (nodeName == undefined) {
        nodeName = 'div';
    }
    if (className == undefined) {
        className = '';
    }
    nodeName = nodeName.toUpperCase();
    var el = document.createElement(nodeName);
    el.className = className;
    if (id != undefined) {
        el.id = id;
    }
    return el;
}

function checkBrowerEdge() {
	var isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1;
	var isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 || window.navigator.appVersion.toLowerCase().indexOf('trident/') > -1 ;
	if (isEdge || isIE){
		return true;
	}
    return false;
}


function createStyleForFrame(content, panelWidth, padding,platform){
    var frame = content.querySelectorAll("iframe");
    if(frame.length > 0){
        for(var i = 0; i < frame.length; i++){
            if(platform == 'mobile'){
                var maxHeightFrame = Math.floor((panelWidth - padding) * 0.6 );
                createAttr('style', 'width: ' + (100) + '%; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);
            }else{
                
                if(frame[i].offsetWidth > panelWidth - padding){
                    var maxHeightFrame = Math.floor(frame[i].offsetWidth * (frame[i].offsetHeight/frame[i].offsetWidth));
                    createAttr('style', 'width: ' + (100) + '%; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);
                }else{
                    var maxHeightFrame = Math.floor((panelWidth - padding) * 0.6 );
                    createAttr('style', 'width: ' + (frame[i].offsetWidth) + 'px; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);

                }
            }
            
           
        }
    }
}

function createphotoCredit(content){
    var photo = content.querySelector(".photo-credit");
    if(photo == null){
        var last = content.lastElementChild;
        if(last != null){
            var div_photo = document.createElement('p');
            div_photo.className = 'end-credit';
            content.appendChild(div_photo);
            var end = content.querySelector(".end-credit");
            if(end.previousElementSibling != null){
                end.previousElementSibling.className += ' no-margin-bt';
            }
        }
    }
}
function createStyleForFactBox(content){
    var table = content.querySelectorAll('table');
    if(table != null){
        for(var i=0; i < table.length; i++){
            if(table[i].parentNode != undefined && table[i].parentNode != null){
                table[i].parentNode.className = " factbox";
            }
        }
    }
}

function initHeadInfro(content){
    var author = content.querySelector(".author");
    if(author == null){
        var subtitle = content.querySelector(".subtitle");
        if(subtitle){
            subtitle.className += ' no-margin-bot'
        }
    }
}
function removeAllSpace(content){
    for (var i = 0; i < content.childNodes.length; i++) {
            var node = content.childNodes[i];
            if (typeof node.tagName === 'undefined') {
                node.parentNode.removeChild(node);
            }
    }
}

function addCaptionCamera(wrap_content){
    var caption = wrap_content.querySelector(".caption");
    var icon_camera = wrap_content.querySelector(".icon-camera");
    if(icon_camera != null){
        caption.className += ' cap_camera';
    }
}
