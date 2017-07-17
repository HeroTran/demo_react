function initNavigate(navigate){
	//reset control
	var goPrev = document.querySelector('.go-prev');
	if(goPrev){
		goPrev.className = 'go-prev';
	}
	var goNext = document.querySelector('.go-next');
	if(goNext){
		goNext.className = 'go-next';
	}
	if(navigate[0] == '1' && goPrev){
		goPrev.className += ' active';
	}
	if(navigate[1] == '1' && goNext){
		goNext.className += ' active';
	}
}

function setLanguage(qLang){
	if(Languages){
		var lang = Languages[qLang];
		var pageInfo = document.querySelector('.footer .page_info');
		if(pageInfo){
			pageInfo.innerHTML = lang.info.replace('<no>', '<span id="c-page">1</span>').replace('<total>', '<span id="t-page">1</span>');
		}
		var goNext = document.querySelector('.footer .go-next');
		if(goNext){
			goNext.innerText = lang.next;
		}
		var goPrev = document.querySelector('.footer .go-prev');
		if(goPrev){
			goPrev.innerText = lang.prev;
		}	
	}
}

function divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight){
	//create head space
	var wspace = createWhiteSpace(ws[0]);
	content.insertBefore( wspace, content.firstChild );

	//find last el in first col
	var x = padding*2;
	var y = docHeight + headerHeight - 2;
	var lastItem = document.elementFromPoint(x,y);
	// if(lastItem.nodeName == 'FIGCAPTION'){
	// 	lastItem = document.elementFromPoint(x,y-10);
	// }
	while(lastItem.nodeName.indexOf('P') < 0 && lastItem.nodeName.indexOf('H') < 0 && lastItem.nodeName.indexOf('DIV') < 0){
		lastItem = lastItem.parentNode;
	}
	var wspace2 = createWhiteSpace(ws[1]);
	if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('content-body') >= 0){
		while(lastItem != null && lastItem.className.indexOf('content-body') >= 0 && y > captionHeight + headerHeight){
			y-=20;
			lastItem = document.elementFromPoint(x,y);
		}
		if(lastItem.parentNode != null && lastItem.parentNode.className != undefined && lastItem.parentNode.className.indexOf('default-image') >= 0){
			// var height = headerHeight + docHeight - lastItem.parentNode.offsetTop - lastItem.parentNode.offsetHeight + ws[1] - 30;
			// wspace2 = createWhiteSpace(height);
			content.insertBefore( wspace2, lastItem.parentNode.nextSibling );
		}
		else{
			while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode != content){
				lastItem = lastItem.parentNode;
			}
			// var height = headerHeight + docHeight - lastItem.offsetTop - lastItem.offsetHeight - parseInt(getStyle(lastItem).marginBottom);
			// wspace2 = createWhiteSpace(height + ws[1]);
			if(lastItem.nextElementSibling.className.indexOf('image') >= 0){
                lastItem.nextElementSibling.className += ' no-break';
            }
			content.insertBefore( wspace2, lastItem.nextSibling );
		}
	}
	else{
		while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode != content){
			lastItem = lastItem.parentNode;
		}
		if(lastItem != null && lastItem.parentNode == content && lastItem.className != undefined && lastItem.className.indexOf('image') < 0 && lastItem.className.indexOf('white-space') < 0){
			if(lastItem.className.indexOf('spanned') < 0){
				wrapSpan(lastItem);
			}
			var spans = lastItem.querySelectorAll('span');
			var cont=true; i=0;
			while(i < spans.length && cont){
				if(spans[i].offsetLeft > colWidth){
					cont = false;
					if(i > 0){
						// var wsHeight = headerHeight + docHeight - spans[i-1].offsetTop - spans[i-1].offsetHeight + ws[1];
						// wspace2 = createWhiteSpace(wsHeight);
					}
					spans[i].parentNode.insertBefore( wspace2, spans[i]);
				}
				else{
					i++;
				}
			}
			if(i==spans.length){
				lastItem.className += ' no-margin-bot';
				lastItem.parentNode.insertBefore( wspace2, lastItem.nextSibling);
			}
		}
		else if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('white-space') >= 0){
			content.insertBefore(wspace2, lastItem.nextSibling);
		}
	}
	//add white space in landscape
	if(isLandscape){
		x = padding*2 + colWidth;
		y = docHeight + headerHeight - 2;
		lastItem = document.elementFromPoint(x,y);
		
		while(lastItem.nodeName.indexOf('P') < 0 && lastItem.nodeName.indexOf('H') < 0 && lastItem.nodeName.indexOf('DIV') < 0){
			lastItem = lastItem.parentNode;
		}
		var wspace3 = createWhiteSpace(ws[2]);
		if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('content-body') >= 0){
			while(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('content-body') >= 0 && y > captionHeight + headerHeight){
				y-=20;
				lastItem = document.elementFromPoint(x,y);
			}
			if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('content-body') < 0){
				while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode != content){
					lastItem = lastItem.parentNode;
				}
				var itemHeight = lastItem.offsetTop + lastItem.offsetHeight + parseInt(getStyle(lastItem).marginBottom) - headerHeight;
				if(lastItem.offsetLeft < colWidth){
					var t = headerHeight + docHeight - lastItem.offsetTop;
					itemHeight = lastItem.offsetHeight + parseInt(getStyle(lastItem).marginBottom) - t;
				}
				// var height = ws[2] + docHeight - itemHeight;
				// wspace3 = createWhiteSpace(height);
				if(lastItem.nextElementSibling.className.indexOf('image') >= 0){
	                lastItem.nextElementSibling.className += ' no-break';
	            }
				lastItem.parentNode.insertBefore( wspace3, lastItem.nextSibling );
			}
		}
		else{
			while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode != content){
				lastItem = lastItem.parentNode;
			}
			if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('image') < 0 && lastItem.className.indexOf('white-space') < 0){
				if(lastItem.className.indexOf('spanned') < 0){
					wrapSpan(lastItem);
				}
				var spans = lastItem.querySelectorAll('span');
				var cont=true; i=0;
				while(i < spans.length && cont){
					if(spans[i].offsetLeft > colWidth * 2){
						cont = false;
						if(i == 0){
							lastItem.parentNode.insertBefore(wspace3, lastItem);
						}
						else{
							spans[i].parentNode.insertBefore( wspace3, spans[i]);
						}
					}
					else{
						i++;
					}
				}
				if(i==spans.length){
					lastItem.className += ' no-margin-bot';
					lastItem.parentNode.insertBefore( wspace3, lastItem.nextSibling);
				}
			}
			else if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('white-space') >= 0){
				content.insertBefore(wspace3, lastItem.nextSibling);
			}
		}
	}
}

function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj)
{
	try{
		var body = document.getElementsByTagName('body')[0];
	
		var navigate = getQuery('navigate', '00');
		initNavigate(navigate);

		var cache = getQuery('cache', null);
		if(cache != null){ 
			setPageTotalNumber(); 
			reloadStylesheets();  
			if(typeof cb === 'function'){
				cb(readerObj);
			}
			return; 
		}

		var panelWidth = parseInt(getQuery('width', window.innerWidth));
		var panelHeight = parseInt(getQuery('height', window.innerHeight));
		
		removeEmptyFigcaption();
		removeFirstImage(body);
		
		//set language
		var qLang = getQuery('language', 'en');
		setLanguage(qLang);
		
		//get feature/preview
		var storyType = getQuery('storyType', '');
		var isFeature = false;
		if(storyType == 'feature' || storyType == 'preview'){
			isFeature = true;
		}
		
		var platform = getQuery('platform', 'tablet');
		if(platform == 'mobile'){
			var defImg = document.querySelector('.default-image');
			if(defImg != null){
				var headInfo = document.querySelector('.head-info');
				headInfo.parentNode.insertBefore(defImg, headInfo.nextSibling);
			}
			if(isFeature){
				var div = createElement('div','feature-mask');
				createAttr('style','width:' + panelWidth + 'px', div);
				div.style.left = 0;
				div.style.top = 0;
				div.style.height = panelHeight + 'px';
				div.style.position = 'fixed';
				div.style.zIndex = '999999';
				document.querySelector('#t1').appendChild(div);
			}
			return;
		}
		
		window.loadedImage = 0;
		var imgs = document.querySelectorAll('.content-body img');
		for(i=0; i<imgs.length; i++){
			var img = imgs[i];
			if(img.complete){
				window.loadedImage++;
			}
			else{
				img.onload = function(){
					window.loadedImage++;
					if(window.loadedImage == imgs.length){
						initLayout();
					}
				}
				img.onerror = function(){
					window.loadedImage++;
					if(window.loadedImage == imgs.length){
						initLayout();
					}
				}
			}
			if(window.loadedImage == imgs.length){
				initLayout();
			}
		}
		if(imgs.length == 0){
			initLayout();
		}

		function initLayout(){
			var t1=document.querySelector('#t1');
			if(t1 != null){
				var i;
				//cal height and column
				var padding = 36;
				var headerHeight = document.querySelector('.header').offsetHeight;
				var footerHeight = document.querySelector('.footer').offsetHeight + parseInt(getStyle(document.querySelector('.footer')).marginTop);
				var docHeight = panelHeight-headerHeight - footerHeight - 2;
				var content = document.getElementById("pagination");
				var headInfo = document.querySelector('.head-info');
				var captionHeight = headInfo.offsetHeight + 20;
				var style = document.createAttribute("style");
				var pat = '';
				pat += 'height: [height]px;';
				pat += '-webkit-columns: [width]px;-moz-columns: [width]px;-ms-columns: [width]px;-o-columns: [width]px;columns: [width]px;';
				//pat += '-webkit-column-gap: [space]px;';
				pat += '-webkit-column-gap: 0px;';
				
				//hide footer
				var qFooter = getQuery('footer', '1');
				if(qFooter == '0'){
					var footer = body.querySelector('.footer');
					footer.className += ' hide-content';
				}
				
				var ws = [];
				for(i=0;i<3;i++){
					ws.push(captionHeight);
				}
		
				var colWidth = panelWidth * 0.5;
				var isLandscape = false;
				if(document.querySelector('#t1').className.indexOf('landscape') >= 0){
					colWidth = panelWidth / 3;
					isLandscape = true;
				}
				// colWidth = Math.floor(colWidth);
				style.value = pat.replace(/\[height\]/g, (docHeight)).replace(/\[width\]/g, colWidth);
				content.attributes.setNamedItem(style);
				content.className = content.className + ' column';
		
				if(document.querySelector('#t1 .content-body .eof') == null){
					var span = document.createElement('span');
					span.className = 'eof';
					document.querySelector('#t1 .content-body').appendChild(span);
				}
				
				if(t1.className && t1.className.indexOf('full-screen') >= 0){
					
				}
				else{
			
					var content = document.querySelector('#t1 .content-body');
					//set default image's height
					var defImg = document.querySelector('.default-image img');
					if(defImg != null){
						var defImgWidth = parseInt( defImg.getAttribute('width'));
						var defImgHeight = parseInt( defImg.getAttribute('height'));
						defImg = defImg.parentNode;
						if(!isFeature && captionHeight < panelHeight/2 && defImgWidth > defImgHeight * 1.3 && defImgWidth > colWidth && content.children[1].className.indexOf('image') < 0){
							// if(content.children[1].className.indexOf('image') < 0){
								var top = parseInt(getStyle(headInfo).top) + headInfo.offsetHeight + 1;
								headInfo.parentNode.insertBefore(defImg, headInfo.nextSibling);
								var left = padding;
								if(isLandscape){
									left = padding + colWidth;
								}
								var newWidth = (colWidth*2 - padding*2);
								var newHeight = Math.floor(newWidth / defImgWidth * defImgHeight);
								var maxHeight = docHeight- captionHeight - 1;
								if(newHeight < maxHeight){
									maxHeight = newHeight;
								}
								createAttr('style', 'width: ' + (colWidth*2 - padding*2) + 'px; height:' + maxHeight + 'px; max-height:' + maxHeight + 'px; top:' + top + 'px; left:' + left + 'px', defImg);
								if(isLandscape){
									ws[2] += defImg.offsetHeight + 20;
								}
								else{
									ws[0] += defImg.offsetHeight + 20;
								}
								ws[1] += defImg.offsetHeight + 20;
								for(var i=0; i<ws.length; i++){
									if(ws[i] > docHeight){
										ws[i] = docHeight - 1;
									}
								}
								defImg.className += ' hide';
							// }
						}
						else{
							createAttr('style', 'max-height:' + (docHeight - captionHeight - 40) + 'px', defImg);
							var fig = defImg.querySelector('figcaption');
							if(fig != null){
								defImg.parentNode.insertBefore(fig, defImg.nextSibling);
							}
						}
					}
			
					//set maximum image's height
					var maxImageHeight = docHeight - captionHeight - 10;
					createStyleTag('.content-body .image{ max-height:' + (maxImageHeight) + 'px; }', 'myStyle');
					
					//reset wh of image
					var imgWidth = colWidth - padding*2;
					var imgs = document.querySelectorAll('.content-body img');
					for(i=0; i<imgs.length; i++){
						var img = imgs[i];
						var w = parseInt(img.getAttribute('width'));
						var h = parseInt(img.getAttribute('height'));
						if(w > imgWidth){
							var nw = imgWidth;
							var nh = Math.floor(nw/w*h);
							if(nh > maxImageHeight){
								nh = maxImageHeight;
								nw = Math.floor(nh/h*w);
							}
							img.setAttribute('width', nw);
							img.setAttribute('height', nh);
							createAttr('style', 'width:' + nw + 'px;height:'+nh+'px', img);
						}
						else if(h > maxImageHeight){
							var nh = maxImageHeight;
							var nw = Math.floor(nh/h*w);
							if(nw > imgWidth){
								nw = imgWidth;
								nh = Math.floor(nw/w*h);
							}
							img.setAttribute('width', nw);
							img.setAttribute('height', nh);
							createAttr('style', 'width:' + nw + 'px;height:'+nh+'px', img);
						}
					}
			
					divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight);
				}
				if(defImg != null){
					defImg.className = defImg.className.replace(' hide', '');
				}
				body.className += ' completed';

				setTimeout(function(contentTop, colWidth, t1, headerHeight, captionHeight, docHeight, padding, panelWidth, isLandscape){
					
					var lastOffset = document.querySelector('#t1 .content-body .eof').offsetLeft;
					var topOffset = document.querySelector('#t1 .content-body .eof').offsetTop;
					var page = Math.ceil(lastOffset/panelWidth);
					var range = lastOffset - (panelWidth*(page-1));
					if(range < colWidth && topOffset <= contentTop + 22){
						page -= 1;
					}
					var pages = document.createAttribute("total-page");
					pages.value = page;
					document.querySelector('body').attributes.setNamedItem(pages);
					document.querySelector('#t-page').innerText = pages.value;
		
					createAttr('style','width:' + pages.value * panelWidth + 'px', t1);
					createAttr('style','width:' + panelWidth + 'px', document.querySelector('.container'));
					
					//create gradient feature
					if(isFeature){
						for(var i=0; i<page; i++){
							var div = createElement('div','feature-mask');
							createAttr('style','width:' + (colWidth - padding*2) + 'px', div);
							var left = colWidth;
							if(isLandscape){left = colWidth * 2;}
							div.style.left = (left + padding + panelWidth*i) + 'px';
							if(i==0){
								div.style.top = headerHeight + captionHeight + 'px';
								div.style.height = (docHeight - captionHeight) + 'px';
							}
							else{
								div.style.top = headerHeight + 'px';
								div.style.height = docHeight + 'px';
							}
							t1.appendChild(div);
						}
						
					}

					reloadStylesheets();
					if(typeof cb === 'function'){
						cb(readerObj);
					}
		
				}, 1000, content.offsetTop, colWidth, t1, headerHeight, captionHeight, docHeight, padding, panelWidth, isLandscape);
			}
		}
	}
	catch(e){ console.log(e); }
}

function setPageTotalNumber(){
	var content = document.getElementById("pagination");
	var panelWidth = parseInt(getQuery('width', window.innerWidth));
	var panelWidth = parseInt(getQuery('width', window.innerWidth));
	var colWidth = panelWidth * 0.5;
	if(document.querySelector('#t1').className.indexOf('landscape') >= 0){
		colWidth = panelWidth / 3;
	}
	var lastOffset = document.querySelector('#t1 .content-body .eof').offsetLeft;
	var topOffset = document.querySelector('#t1 .content-body .eof').offsetTop;
	var page = Math.ceil(lastOffset/panelWidth);
	var range = lastOffset - (panelWidth*(page-1));
	if(range < colWidth && topOffset <= content.offsetTop + 22){
		page -= 1;
	}
	var pages = document.createAttribute("total-page");
	pages.value = page;
	document.querySelector('body').attributes.setNamedItem(pages);
	document.querySelector('#t-page').innerText = page;
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

function setCurrentPage(page){
	document.querySelector('#c-page').innerText = page;
}

function removeFirstImage(container){
	var imgs = container.querySelectorAll('.image img');
	if(imgs != null){
		for(var i=0; i<imgs.length; i++){
			var par = imgs[i].parentNode;
			if(par != null){
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

function removeEmptyFigcaption(){
	var figs = document.querySelectorAll('figcaption');
	for(var i=0; i<figs.length; i++){
		var fig = figs[i];
		if(fig.textContent.trim() == ''){
			fig.parentNode.removeChild(fig);	
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

function createWhiteSpace(height){
	var wspace = document.createElement("span");
	wspace.className = 'white-space';
	createAttr('style', 'height:' + height + 'px', wspace);
	return wspace;
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
        else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
            Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
        }
    }
    return childTextNodes;
}
function wrapEachWord(textNode, tag) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;

    var characters = text.split(' ');
	var isAddBlank = text.indexOf(' ') < 0 ? false:true;
    var elements = [];
    characters.forEach(function(character, index) {
		var char = character.replace(/\u2013|\u2014/g, "-");
        var element = document.createElement(tag);
        var ws = '';
        if(index < characters.length && isAddBlank){ws = ' ';}
        var characterNode = document.createTextNode(char + ws);
        element.appendChild(characterNode);
        parent.insertBefore(element, textNode);
    });
    parent.removeChild(textNode);
}

function wrapSpan(obj){
	var allTextNodes = getTextNodes(obj);
	allTextNodes.forEach(function(textNode) {
	    wrapEachWord(textNode, 'span');
	});
	obj.className += ' spanned';
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
	return 61;
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

function createElement(nodeName, className, id){
	if(nodeName == undefined){nodeName = 'div';}
	if(className == undefined){className = '';}
	nodeName = nodeName.toUpperCase();
	var el = document.createElement(nodeName);
	el.className = className;
	if(id != undefined){
		el.id = id;
	}
	return el;
}