function initNavigate(navigate) {
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

function setLanguage(qLang) {
    if (Languages) {
        var lang = Languages[qLang] ? Languages[qLang] : Languages.en;
        var pageInfo = document.querySelector('.footer .page_info');
        if (pageInfo) {
            pageInfo.innerHTML = lang.info.replace('<no>', '<span id="c-page">1</span>').replace('<total>', '<span id="t-page">1</span>');
        }
        var goNext = document.querySelector('.footer .go-next');
        if (goNext) {
            goNext.innerText = lang.next;
        }
        var goPrev = document.querySelector('.footer .go-prev');
        if (goPrev) {
            goPrev.innerText = lang.prev;
        }
    }
}

function divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight, panelWidth) {

    //create head space
    var wspace = createWhiteSpace(ws[0]);
    content.insertBefore(wspace, content.firstChild);
    createStyleWSInEdge(0);
    var wspace2 = createWhiteSpace(ws[1]);
    var currentElement;
    var allChild = content.children;
    var lengthChild = allChild.length;
    var k = 1;
    var check = true;
    while (k < lengthChild && allChild[k].offsetLeft < panelWidth && check && lengthChild >= 3) {
        if (allChild[k].nodeName.indexOf('DIV') < 0 && allChild[k].nodeName.indexOf('IFRAME') < 0) {
            if (allChild[k].offsetTop + allChild[k].offsetHeight > docHeight || allChild[k].offsetLeft > colWidth) {
                currentElement = allChild[k];
                if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('image') < 0 && currentElement.className.indexOf('white-space') < 0 && currentElement.className.indexOf("eof") < 0 ) {

                    if (currentElement.className.indexOf('spanned') < 0) {
                    	wrapSpan(currentElement);
                    }
                    var spans = currentElement.querySelectorAll('span');
                    var cont = true;
                    var i = 0;
                    while (i < spans.length && cont) {
                        if (spans[i].offsetLeft > colWidth) {
                            cont = false;
                            if(currentElement.nodeName.indexOf("FIGCAPTION") >= 0){
                            	if(currentElement.previousElementSibling.classList.contains("image") || currentElement.previousElementSibling.className.indexOf("white-space") >= 0){
                            		currentElement.className += ' overrive-style';
                            	}
			                }

			                if(content.querySelector(".default-image") == null){
	                        	currentElement.classList.remove("overrive-style");
	                        }
                            if (i > 0) {
                                if (spans[i - 1].offsetLeft + spans[i - 1].offsetWidth > currentElement.offsetWidth - 10) {
                                    i = i - 2;
                                    /*i--;*/
                                }
                                if (!checkBrowerEdge()) {
                                	currentElement.classList.remove("overrive-style");
                                }
                            }
                            if (checkBrowerEdge()) {
                               if(currentElement.classList.contains("overrive-style")){
                               		spans[i].parentNode.insertBefore(wspace2, spans[i]);
                               		createStyleWSInEdge(1);
                               }else{
                               		spans[i].parentNode.insertBefore(wspace2, spans[i]);

                               }
                            }else{
                            	 spans[i].parentNode.insertBefore(wspace2, spans[i]);
                            }
                           
                        } else {
                            i++;
                        }
                    }
                    if (i == spans.length) {
                        currentElement.className += ' no-margin-bot';
                        currentElement.parentNode.insertBefore(wspace2, currentElement.nextSibling);
                    }
                } else if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('white-space') >= 0) {
                    content.insertBefore(wspace2, currentElement.nextSibling);
                }

                check = false;
            }
        } else {
            if (allChild[k].className.indexOf("default-image") < 0 && allChild[k].className.indexOf("image") >= 0 && allChild[k].offsetLeft > colWidth) {
                content.insertBefore(wspace2, allChild[k]);
                check = false;
            } else if (allChild[k].nextElementSibling.className.indexOf("image") >= 0 && allChild[k + 1].offsetLeft > colWidth) {
                content.insertBefore(wspace2, allChild[k].nextSibling);
                check = false;
            }
        }
        k++;
    }
    //add white space in landscape
    if (isLandscape) {
        var wspace3 = createWhiteSpace(ws[2]);
        if (k > 0) {
            k = k - 1;
        }
        var checkLandcape = true;
        while (k < lengthChild && allChild[k].offsetLeft < panelWidth && checkLandcape && lengthChild >= 3) {
            if (allChild[k].nodeName.indexOf('DIV') < 0 && allChild[k].nodeName.indexOf('IFRAME') < 0 && allChild[k].className.indexOf('white-space') < 0) {
                if (allChild[k].offsetTop + allChild[k].offsetHeight > docHeight || allChild[k].offsetLeft > colWidth * 2 ) {
                    var condition = false;
                    if (allChild[k].className.indexOf('spanned') >= 0 && allChild[k].querySelectorAll("span")[allChild[k].querySelectorAll("span").length - 1].offsetLeft > colWidth * 2 && allChild[k].className.indexOf("eof") < 0 ) {
                        currentElement = allChild[k];
                        condition = true;
                    } else {
                        if (allChild[k].offsetLeft > colWidth && allChild[k].className.indexOf("white-space") < 0 && allChild[k].className.indexOf("eof") < 0) {
                            currentElement = allChild[k];
                            condition = true;
                        }
                    }
                    if (condition) {
                        if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('image') < 0 && currentElement.className.indexOf('white-space') < 0) {
                            if (currentElement.className.indexOf('spanned') < 0) {
                                wrapSpan(currentElement);
                            }
                            var spans = currentElement.querySelectorAll('span');
                            var cont = true;
                            var i = 0;
                            while (i < spans.length && cont) {
                                if (spans[i].offsetLeft > colWidth * 2) {
                                	
                                    cont = false;
                                    if (i == 0) {
                                    	if (content.querySelector(".default-image") == null){
                                        	currentElement.parentNode.insertBefore(wspace3, currentElement);
                                        }else{
                                        	if (checkBrowerEdge()) {
                                        		if (spans[i].className.indexOf("white-space") < 0) {
		                                            spans[i].parentNode.insertBefore(wspace3, spans[i]);
		                                            createStyleWSInEdge(2);
		                                        }
	                                        }else{
	                                        	if (currentElement.previousElementSibling.className.indexOf("white-space") < 0) {
		                                            currentElement.parentNode.insertBefore(wspace3, currentElement);
		                                        }
	                                        }
                                        }
                                        
                                    } else {
                                        if (spans[i - 1].offsetLeft + spans[i - 1].offsetWidth > currentElement.offsetWidth - 10) {
                                            i--;
                                        }

                                        if(content.querySelector(".default-image") == null){
                                        	spans[i].parentNode.insertBefore(wspace3, spans[i]);
                                        }else{
                                        	 if(spans[i].className.indexOf("white-space") < 0){
	                                        	spans[i].parentNode.insertBefore(wspace3, spans[i]);
	                                        }
                                        }
                                    }
                                } else {
                                    i++;
                                }
                            }
                            if (i == spans.length) {
                                currentElement.className += ' no-margin-bot';
                                currentElement.parentNode.insertBefore(wspace3, currentElement.nextSibling);
                            }
                        } else if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('white-space') >= 0) {
                            content.insertBefore(wspace3, currentElement.nextSibling);
                        }

                        checkLandcape = false;
                    } else {
                        checkLandcape = true;
                    }

                }
            } else {
                if (allChild[k].className.indexOf("default-image") < 0 && allChild[k].className.indexOf("image") >= 0 && allChild[k].offsetLeft > colWidth * 2) {
                    if (content.querySelector(".default-image") != null) {
                        content.insertBefore(wspace3, allChild[k]);
                    } else {
                        content.insertBefore(wspace3, allChild[k].previousSibling);
                    }
                    checkLandcape = false;
                } else if (content.querySelector(".default-image") != null && allChild[k].nextElementSibling.className.indexOf("image") >= 0 && allChild[k + 1].offsetLeft > colWidth * 2) {
                    content.insertBefore(wspace3, allChild[k].nextSibling);
                    checkLandcape = false;
                }
            }
            k++;
        }
    }
    //add style for white space




}



function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj) {
    try {
        var body = document.getElementsByTagName('body')[0];
        // var navigate = getQuery('navigate', navigate);
        initNavigate(navigate);

        var cache = getQuery('cache', null);
        if (cache != null) {
        	body.className += ' completed';
            setPageTotalNumber();
            reloadStylesheets();
            if (typeof cb === 'function') {
                cb(readerObj);
            }
            document.querySelector(".arrow-style").addEventListener("click", function(event){ 
            	event.stopPropagation();
				event.preventDefault();
    			createEventFig();
    			
    		});
            return;
        }

        var panelWidth = parseInt(getQuery('width', window.innerWidth));
        var panelHeight = parseInt(getQuery('height', window.innerHeight));

        removeEmptyFigcaption();
        removeEmptyTabP();
        removeFirstImage(body);
        moveFigcaption();
        //set language
        var qLang = getQuery('language', 'en');
        setLanguage(qLang);

        //get feature/preview
        var storyType = getQuery('storyType', '');
        var isFeature = false;
        if (storyType == 'feature' || storyType == 'preview') {
            isFeature = true;
        }

        var platform = getQuery('platform', 'tablet');
        if (platform == 'mobile') {
            var defImg = document.querySelector('.default-image');
            if (defImg != null) {
                var headInfo = document.querySelector('.head-info');
                headInfo.parentNode.insertBefore(defImg, headInfo.nextSibling);
            }
            if (isFeature) {
                var div = createElement('div', 'feature-mask');
                createAttr('style', 'width:' + panelWidth + 'px', div);
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
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (img.complete) {
                window.loadedImage++;
            } else {
                img.onload = function() {
                    window.loadedImage++;
                    if (window.loadedImage == imgs.length) {
                        initLayout();
                    }
                }
                img.onerror = function() {
                    window.loadedImage++;
                    if (window.loadedImage == imgs.length) {
                        initLayout();
                    }
                }
            }
            if (window.loadedImage == imgs.length) {
                initLayout();
            }
        }
        if (imgs.length == 0) {
            initLayout();
        }

        function initLayout() {
            var t1 = document.querySelector('#t1');
            if (t1 != null) {

            	setTimeout(function(){ 

            		var i;
                //cal height and column
                var padding = 36;
                var headerHeight = document.querySelector('.header').offsetHeight;
                var footerHeight = document.querySelector('.footer').offsetHeight + parseInt(getStyle(document.querySelector('.footer')).marginTop);
                var docHeight = panelHeight - headerHeight - footerHeight - 2;
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
                if (qFooter == '0') {
                    var footer = body.querySelector('.footer');
                    footer.className += ' hide-content';
                }

                var ws = [];
                for (i = 0; i < 3; i++) {
                    ws.push(captionHeight);
                }

                var colWidth = panelWidth * 0.5;
                var isLandscape = false;
                if (document.querySelector('#t1').className.indexOf('landscape') >= 0) {
                    colWidth = panelWidth / 3;
                    isLandscape = true;
                }
                // colWidth = Math.floor(colWidth);
                style.value = pat.replace(/\[height\]/g, (docHeight)).replace(/\[width\]/g, colWidth);
                content.attributes.setNamedItem(style);
                content.className = content.className + ' column';

                if(document.querySelector('#t1 .content-body').lastElementChild != null){
                	document.querySelector('#t1 .content-body').lastElementChild.className += ' no-margin-bot';
                }

                if (document.querySelector('#t1 .content-body .eof') == null) {
                    var span = document.createElement('span');
                    span.className = 'eof';
                    document.querySelector('#t1 .content-body').appendChild(span);
                }

                if (t1.className && t1.className.indexOf('full-screen') >= 0) {

                } else {

                    var content = document.querySelector('#t1 .content-body');
                    //set default image's height
                    var defImg = document.querySelector('.default-image img');
                    if (defImg != null) {
                        var defImgWidth = parseInt(defImg.getAttribute('width'));
                        var defImgHeight = parseInt(defImg.getAttribute('height'));
                        defImg = defImg.parentNode;
                        if (!isFeature && captionHeight < panelHeight * 0.4 && defImgWidth > defImgHeight * 1.3 && defImgWidth > colWidth && content.children[1].className.indexOf('image') < 0) {
                            // if(content.children[1].className.indexOf('image') < 0){
                            var top = parseInt(getStyle(headInfo).top) + headInfo.offsetHeight + 20;
                            headInfo.parentNode.insertBefore(defImg, headInfo.nextSibling);
                            var left = padding;
                            if (isLandscape) {
                                left = padding + colWidth;
                            }
                            var newWidth = (colWidth * 2 - padding * 2);
                            var newHeight = Math.floor(newWidth / defImgWidth * defImgHeight);
                            var maxHeight = docHeight - captionHeight - 1;
                            if (newHeight < maxHeight) {
                                maxHeight = newHeight;
                            }
                            createAttr('style', 'width: ' + (colWidth * 2 - padding * 2) + 'px; height:' + maxHeight + 'px; max-height:' + maxHeight + 'px; top:' + top + 'px; left:' + left + 'px', defImg);
                            if (isLandscape) {
                                ws[2] += defImg.offsetHeight + 20;
                            } else {
                                ws[0] += defImg.offsetHeight + 20;
                            }
                            ws[1] += defImg.offsetHeight + 20;
                            for (var i = 0; i < ws.length; i++) {
                                if (ws[i] > docHeight) {
                                    ws[i] = docHeight - 1;
                                }
                            }
                            defImg.className += ' hide';
                            // }
                        } else {
                            createAttr('style', 'max-height:' + (docHeight - captionHeight - 40) + 'px', defImg);
                            var fig = defImg.querySelector('figcaption');
                            if (fig != null) {
                                defImg.parentNode.insertBefore(fig, defImg.nextSibling);
                            }
                        }
                    }

                    //set maximum image's height
                    var maxImageHeight = docHeight - captionHeight - 10;
                    /*createStyleTag('.content-body .image{ max-height:' + (maxImageHeight) + 'px; }', 'myStyle');*/

                    //reset wh of image
                    var imgWidth = colWidth - padding * 2;
                    var imgs = document.querySelectorAll('.content-body img');
                    for (i = 0; i < imgs.length; i++) {
                        var img = imgs[i];
                        var w = parseInt(img.getAttribute('width'));
                        var h = parseInt(img.getAttribute('height'));
                        if (w > imgWidth) {
                            var nw = imgWidth;
                            var nh = Math.floor(nw / w * h);
                            if (nh > maxImageHeight) {
                                nh = maxImageHeight;
                                nw = Math.floor(nh / h * w);
                            }
                            img.setAttribute('width', nw);
                            img.setAttribute('height', nh);
                            createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
                        } else if (h > maxImageHeight) {
                            var nh = maxImageHeight;
                            var nw = Math.floor(nh / h * w);
                            if (nw > imgWidth) {
                                nw = imgWidth;
                                nh = Math.floor(nw / w * h);
                            }
                            img.setAttribute('width', nw);
                            img.setAttribute('height', nh);
                            createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
                        }
                    }
                    //Create style for figcation default-image
				    if(content.querySelector(".default-image") == null){
				    	var default_image = body.querySelector(".default-image");
				    	if(default_image != null){
				    		var fig = default_image.querySelector("FIGCAPTION");
				    		if(fig != null){
				    			maxFigHeight = body.querySelector(".default-image").style.maxHeight;
					    		fig.style.maxHeight = maxFigHeight;
					    		var heightFig = fig.offsetHeight;
					    		if(heightFig >= maxImageHeight){
					    			heightFig -= 12;
					    		}else{
					    			heightFig -= 5;
					    		}
					    		fig.style.height = heightFig + "px";
					    		fig.className += " fig-style";
					    		default_image.className += " default-style";
					    		var div = createElement('div', 'arrow-style');
					    		default_image.insertBefore(div,default_image.children[1]);
					    		fig.className += ' hide-fig';
					    		default_image.querySelector(".arrow-style").className += ' info-fig';
					    		default_image.querySelector(".arrow-style").className += ' custom-action';
					    		default_image.querySelector(".arrow-style").addEventListener("click", function(event){ 
					    			createEventFig(event);
					    			
					    		});
				    		}
				    	}
				    }
                    divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight, panelWidth);
                    
                }
                if (defImg != null) {
                    defImg.className = defImg.className.replace(' hide', '');
                }
                body.className += ' completed';
               if(!checkBrowerEdge()){
                   		reloadStylesheets();
                   	}
               
                setTimeout(function(contentTop, colWidth, t1, headerHeight, captionHeight, docHeight, padding, panelWidth, isLandscape) {

                    var lastOffset = document.querySelector('#t1 .content-body .eof').offsetLeft;
                    var topOffset = document.querySelector('#t1 .content-body .eof').offsetTop;
                    var page = Math.ceil(lastOffset / panelWidth);
                    var range = lastOffset - (panelWidth * (page - 1));
                    if (range < colWidth && topOffset <= contentTop + 22) {
                        page -= 1;
                    }
                    var pages = document.createAttribute("total-page");
                    pages.value = page;
                    document.querySelector('body').attributes.setNamedItem(pages);
                    document.querySelector('#t-page').innerText = pages.value;

                    createAttr('style', 'width:' + pages.value * panelWidth + 'px', t1);
                    createAttr('style', 'width:' + panelWidth + 'px', document.querySelector('.container'));
                    //create gradient feature
                    var content = document.querySelector('#t1 .content-body');
                    
                    if (isFeature) {
                        for (var i = 0; i < page; i++) {
                            var div = createElement('div', 'feature-mask');
                            createAttr('style', 'width:' + (colWidth - padding * 2) + 'px', div);
                            var left = colWidth;
                            if (isLandscape) {
                                left = colWidth * 2;
                            }
                            div.style.left = (left + padding + panelWidth * i) + 'px';
                            if (i == 0) {
                                div.style.top = headerHeight + captionHeight + 'px';
                                div.style.height = (docHeight - captionHeight) + 'px';
                            } else {
                                div.style.top = headerHeight + 'px';
                                div.style.height = docHeight + 'px';
                            }
                            t1.appendChild(div);
                        }

                    }
                    
                   	if(!checkBrowerEdge()){
                   		reloadStylesheets();
                   	}
                    if (typeof cb === 'function') {
                        cb(readerObj);
                    }
                    if(checkBrowerEdge()){
                    	initTouch(content,colWidth,page,isLandscape,panelWidth);
                    }
	                
                }, 800, content.offsetTop, colWidth, t1, headerHeight, captionHeight, docHeight, padding, panelWidth, isLandscape);

            	}, 200);
                
            }
            //end
        }
    } catch (e) {
        console.log(e);
    }
}


function createEventFig(event){
	if(event != null){
		event.stopPropagation();
	    event.preventDefault();
	}
	var body = document.getElementsByTagName('body')[0];
	var default_image = body.querySelector(".default-image");
	var fig = default_image.querySelector("FIGCAPTION");
	if(default_image.querySelector(".arrow-style").className.indexOf("info-fig") < 0 ){
		default_image.querySelector(".arrow-style").classList.remove("close-fig");
	    default_image.querySelector(".arrow-style").className += ' info-fig';
	    fig.className += ' hide-fig';
	    fig.classList.remove("show-fig");
	}
   else{
   	   default_image.querySelector(".arrow-style").classList.remove("info-fig");
	   default_image.querySelector(".arrow-style").className += ' close-fig';
	   fig.className += ' show-fig';
	   fig.classList.remove("hide-fig");
   }
   return false;	  
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

function removeFirstImage(container) {
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
	        if (parent.className.indexOf('default-image') < 0) {
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
    var storageObj = JSON.parse(localStorage.getItem('reader-params'));
    if(storageObj != null){
        if(storageObj[name] != null){
            res = storageObj[name];
        }
        else{
            res = res ? res[1] : defVal;
        }
    }else{
        res = res ? res[1] : defVal;
    }
   
    return res;
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
function createStyleWSInEdge(position) {
    if (checkBrowerEdge()) {
        var whiteSpace = document.querySelectorAll(".white-space")[position];
        if (whiteSpace != null) {
            whiteSpace.className += ' wsEdge';
        }
   }
}

function checkBrowerEdge() {
	var isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1;
	var isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 || window.navigator.appVersion.toLowerCase().indexOf('trident/') > -1 ;
	if (isEdge || isIE){
		return true;
	}
    return false;
}


//touch for IE


function  initTouch(content,colWidth,page,isLandscape,panelWidth){
	document.querySelector(".completed").setAttribute("style","overflow:hidden;touch-action: none;-ms-touch-action: none;");
	var totalWidth;
	if(isLandscape){
		totalWidth = colWidth * 3;
	}
	else{
		totalWidth = colWidth * 2;
	}
	var el = document.getElementById('t1'); 
    var curindex = 0, moveLeft = 0;
    var heightContent = window.innerHeight - document.querySelector('.footer').offsetHeight;
 	
    ontouch(el, function(evt, dir, phase, swipetype, distance){
        if (phase == 'start'){
           moveLeft =  el.scrollLeft || 0;
        }
        else if (phase == 'move' && (dir =='left' || dir =='right')){
            var totaldist = distance + moveLeft;
        }
        else if (phase == 'end'){
            if(evt.pageY <= heightContent){
            	if(swipetype != 'none'){
            		if (swipetype == 'left' || swipetype == 'right'){
	            	var flag = true;
	                if(swipetype == 'left'){
	                	 if(curindex <= page - 1 ){
			                curindex++;
			                if(curindex  == page){
			                	flag = false;
			                	curindex = page - 1;
			                }
			            }
			            
	                }else{
	                	if(curindex >= 0 ){
			                curindex--;
			                if(curindex +1 == 0){
			                	flag = false;
			                	curindex = 0;
			                }
			            }
			            
	                }
	            }
	            if(flag){
	            	scrollLeft(document.querySelector(".completed"),curindex * totalWidth,500 );
		            currentPage = curindex > 0 ? curindex + 1 : 1;
		            document.getElementById("c-page").innerHTML = currentPage;
	            }else{
	            	document.querySelector(".completed").setAttribute("style","overflow:hidden;");
	            }
            	}
            }
            
        }
    }) 

    function ontouch(el, callback){
 		
	    var touchDevice = el,
	    dir,
	    swipeType,
	    startX,
	    startY,
	    distX,
	    distY,
	    threshold = 10, 
	    restraint = 200,
	    allowedTime = 500; 
	    var elapsedTime,startTime;
	    handletouch = callback || function(evt, dir, phase, swipetype, distance){}
	      touchDevice.addEventListener('pointerdown', function(e){
	       var clientX = e.pageX,clientY = e.pageY;
			dir = 'none';
			swipeType = 'none';
			dist = 0;
			startX = clientX;
			startY = clientY;
			startTime = new Date().getTime();
			handletouch(e, 'none', 'start', swipeType, 0); 
			e.preventDefault();
	    }, false)
	 
	    touchDevice.addEventListener('pointermove', function(e){
	        var clientX = e.pageX,clientY = e.pageY;
	        distX = clientX - startX ;
	        distY = clientY - startY; 
            dir = (distX < 0)? 'left' : 'right';
            handletouch(e, dir, 'move', swipeType, distX);
	        e.preventDefault(); 
	    }, false)
	 
	    touchDevice.addEventListener('pointerup', function(e){
	        elapsedTime = new Date().getTime() - startTime;
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipeType = dir;
            }
	        handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
	        e.preventDefault();
	    }, false)
	    
	 
	     touchDevice.addEventListener('mousedown', function(e){
	       var clientX = e.pageX,clientY = e.pageY;
				dir = 'none';
				swipeType = 'none';
				dist = 0;
				startX = clientX;
				startY = clientY;
				startTime = new Date().getTime();
				handletouch(e, 'none', 'start', swipeType, 0); 
				e.preventDefault();
	    }, false)
	 
	    touchDevice.addEventListener('mousemove', function(e){
	        var clientX = e.pageX,clientY = e.pageY;
	        distX = clientX - startX ;
	        distY = clientY - startY; 
            dir = (distX < 0)? 'left' : 'right'
            handletouch(e, dir, 'move', swipeType, distX);
	        e.preventDefault(); 
	    }, false)
	 
	    touchDevice.addEventListener('mouseup', function(e){
	        elapsedTime = new Date().getTime() - startTime;
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipeType = dir;
            }
	        handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
	        e.preventDefault();
	    }, false)
	}

	function scrollLeft(element, to, duration) {
	    var start = element.scrollLeft,
	        change = to - start,
	        currentTime = 0,
	        increment = 20;
	        
	    var animateScroll = function(){        
	        currentTime += increment;
	        var val = Math.easeInOutQuad(currentTime, start, change, duration);
	        element.scrollLeft = val;
	        if(currentTime < duration) {
	            setTimeout(animateScroll, increment);
	        }
	    };
	    animateScroll();
	}

	//smooth when scrollLeft
	Math.easeInOutQuad = function (t, b, c, d) {
	 t /= d/2;
	 if (t < 1) return c/2*t*t + b;
	 t--;
	 return -c/2 * (t*(t-2) - 1) + b;
	};
}
