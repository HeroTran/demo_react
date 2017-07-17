var dropCapLine = 4.5;
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

function divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight, panelHeight, footerHeight){
	var body = document.getElementsByTagName('body')[0];
	//create head space
	var wspace = createWhiteSpace(ws[0]);
	content.insertBefore( wspace, content.firstChild );

	//find last el in first col
	var x = padding*2;
	var y = docHeight + headerHeight - 5;
	var lastItem = document.elementFromPoint(x,y);
	var wspace2 = createWhiteSpace(ws[1]);
	if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('content-body') >= 0){
		while(lastItem != null && lastItem.className.indexOf('content-body') >= 0 && y > captionHeight + headerHeight){
			y-=20;
			lastItem = document.elementFromPoint(x,y);
		}
		if(lastItem.parentNode != null && lastItem.parentNode.className != undefined && lastItem.parentNode.className.indexOf('default-image') >= 0){
			// var height = headerHeight + docHeight - lastItem.parentNode.offsetTop - lastItem.parentNode.offsetHeight + ws[1] - 30;
			// wspace2 = createWhiteSpace(height);
			content.insertBefore( wspace2, content.firstChild);
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
            wspace2 = createWhiteSpace(ws[1], 'p');
			content.insertBefore( wspace2, lastItem.nextSibling );
		}
	}
	else{
		while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode.className != content.className){
			lastItem = lastItem.parentNode;
		}
		if(lastItem.parentNode == null){
			lastItem = document.querySelector('.dropcap');
		}
		if(lastItem != null && lastItem.parentNode.className == content.className && lastItem.className != undefined && lastItem.className.indexOf('image') < 0 && lastItem.className.indexOf('white-space') < 0){
			while(lastItem != null && lastItem.className != undefined && lastItem.nodeName != 'P'){
				y-=20;
				lastItem = document.elementFromPoint(x,y);
			}
			if(lastItem.className.indexOf('spanned') < 0){
				wrapSpan(lastItem);
			}
			var spans = lastItem.querySelectorAll('span');
			var cont=true; i=0;
			var tempSpan = spans[0];
			for (var i = 1; i < spans.length; i++){
				if(spans[i].nodeName != 'A'){
					tempSpan = spans[i];
					break;
				}
			}
			//cal drop cap height	
			var dropCapHeight  = tempSpan.getBoundingClientRect().height*dropCapLine;
			///
			var heightAvailable = 0;
			if (t1.className && t1.className.indexOf('default-image-one-column') >= 0) {
				// 40 are margir top and bot of head-info
				heightAvailable = panelHeight  - document.querySelector('.cover').offsetHeight - document.querySelector('.head-info').offsetHeight - 40 - footerHeight;
			}
			if (t1.className && t1.className.indexOf('default-image-two-column') >= 0) {
				heightAvailable = panelHeight  - document.querySelector('.cover').offsetHeight - footerHeight;
			}
			//console.log('available height', heightAvailable);
			var isDropcap = false;
			i = 0;
			while(i < spans.length && cont){
				if(spans[i].offsetLeft > colWidth){
					cont = false;
					if(i > 0){
						// var wsHeight = headerHeight + docHeight - spans[i-1].offsetTop - spans[i-1].offsetHeight + ws[1];
						// wspace2 = createWhiteSpace(wsHeight);
					}
					if(lastItem.className && lastItem.className.indexOf('dropcap') >= 0 && dropCapHeight <  heightAvailable){
						if(spans[0].offsetLeft < colWidth && spans[i].offsetLeft > colWidth){
							var iTop = spans[i].offsetTop - headerHeight + spans[i].offsetHeight * dropCapLine;
							var pTop = docHeight - headerHeight - spans[0].offsetTop;
							//console.log(spans[1].offsetHeight)
							if(iTop < pTop ){
								isDropcap = true;
							}
						}
						else if(lastItem.offsetTop < spans[i].offsetHeight * dropCapLine + spans[i].offsetTop){
							isDropcap = true;
						}
					}
					if(isLandscape){
						lastItem.parentNode.insertBefore( wspace2, lastItem);
					}else{
						if(t1.className && t1.className.indexOf('default-image-two-column') >= 0){
							if (dropCapHeight >  heightAvailable || body.className && body.className.indexOf('text-size-0') < 0 || i == 0){
								wspace2.style.height = docHeight - 8 + 'px';
								wspace.style.height = docHeight - 50+'px';
								lastItem.parentNode.insertBefore( wspace2, lastItem);
							}else{
								spans[i].parentNode.insertBefore( wspace2, spans[i]);
							}
						}
						if (t1.className && t1.className.indexOf('default-image-one-column') >= 0) {
							var headInfo = document.querySelector('.content-body .head-info');
							var nextSiblingHeadInfo = headInfo.nextElementSibling;
							//check case: a href is too long, can wrap each word in each span, 
							//so put white space before a href
							var aLink = document.querySelector('.dropcap.spanned a');
							var temp = spans[i].previousElementSibling;
							if(aLink && temp && temp.innerText == aLink.innerText){
								aLink.parentNode.insertBefore( wspace2, aLink);
							}
							else if(dropCapHeight >  heightAvailable){
								nextSiblingHeadInfo.parentNode.insertBefore( wspace2, nextSiblingHeadInfo);
							}else{
								spans[i].parentNode.insertBefore( wspace2, spans[i]);
							}
						}
					}
					
				}
				else{
					i++;
				}
			}
			if(i==spans.length){
				lastItem.className += ' no-margin-bot';
				wspace2 = createWhiteSpace(ws[1], 'p');
				lastItem.parentNode.insertBefore( wspace2, lastItem.nextSibling);
			}
		}
		else if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('white-space') >= 0){
			wspace2 = createWhiteSpace(ws[1], 'p');
			content.insertBefore(wspace2, lastItem.nextSibling);
		}
	}
	//add white space in landscape
	if(isLandscape){
		x = padding*2 + colWidth;
		y = docHeight + headerHeight - 5;
		lastItem = document.elementFromPoint(x,y);
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
	            wspace3 = createWhiteSpace(ws[1], 'p');
				lastItem.parentNode.insertBefore( wspace3, lastItem.nextSibling );
			}
		}
		else{
			while(lastItem != null && lastItem.parentNode != null && lastItem.parentNode.className != content.className){
				lastItem = lastItem.parentNode;
			}
			if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('image') < 0 && lastItem.className.indexOf('white-space') < 0){
				while(lastItem != null && lastItem.className != undefined && lastItem.nodeName != 'P'){
						y-=20;
						lastItem = document.elementFromPoint(x,y);
				}
				if(lastItem.className.indexOf('spanned') < 0){
					wrapSpan(lastItem);
				}
				var spans = lastItem.querySelectorAll('span');
				var cont=true; i=0;
				while(i < spans.length && cont){
					if(spans[i].offsetLeft > colWidth * 2){
						cont = false;
						// if(i > 0 && (spans[i-1].className != undefined && spans[i-1].className.indexOf('white-space') < 0)){
						// 	var wsHeight = headerHeight + docHeight - spans[i-1].offsetTop - spans[i-1].offsetHeight + ws[2];
						// 	wspace3 = createWhiteSpace(wsHeight);
						// }
						spans[i].parentNode.insertBefore( wspace3, spans[i]);
					}
					else{
						i++;
					}
				}
				if(i==spans.length){
					lastItem.className += ' no-margin-bot';
					wspace3 = createWhiteSpace(ws[1], 'p');
					lastItem.parentNode.insertBefore( wspace3, lastItem.nextSibling);
				}
			}
			else if(lastItem != null && lastItem.className != undefined && lastItem.className.indexOf('white-space') >= 0){
				wspace3 = createWhiteSpace(ws[1], 'p');
				content.insertBefore(wspace3, lastItem.nextSibling);
			}
		}
	}
}

window.AMCustomScript = function(mode, fontSize, navigate, cache, cb, readerObj)
{
	try{
		//get body tag element
		var body = document.getElementsByTagName('body')[0];
		//get width and height of screen including horizontal scrollbar
		var panelWidth = parseInt(getQuery('width', window.innerWidth));
		var panelHeight = parseInt(getQuery('height', window.innerHeight));
		var platform = getQuery('platform', 'tablet');
		//check IOS
		if(/iP(hone|od|ad)/.test(navigator.platform)){
			body.className += ' ios-9'; 
			window.ios9 = true;
		}

		//Check CACHE
		var cache = getQuery('cache', '');
		if(cache != ''){ 
			if(platform.trim() != 'mobile')
			{
				body.className += ' completed'; 
				setTimeout('reloadStylesheets()', 100);
			}
			if(typeof cb === 'function'){
				cb(readerObj);
			}
			return; 
		}
		//show bottom navigate dots
		var navigate = getQuery('navigate', '00');
		initNavigate(navigate);
		//remove empty figcaption
		removeEmptyFigcaption();
		//remove some photocredit empty
		removePhotoCreditEmpty();

		//Keep first image
		//mainContainer includes all content of page
		var container = body.querySelector('div');
		var containerClass = container.className;
		var layoutName = container.getAttribute('layout');
		var isScript = container.getAttribute('init');
		container = container.querySelector('.content-body');
		if(containerClass.indexOf('keep-first-image') < 0){
			removeFirstImage(container);
		}
		if(containerClass.indexOf('enable-dropcap') >= 0){
			createDropcap(container, platform);
		}
		if(window.ios9 && (containerClass.indexOf('ioscentral_article_01') >= 0 || containerClass.indexOf('ioscentral_article_main') >= 0)){
			dropCapLine = 6;
		}
		
		//get feature/preview
		var storyType = getQuery('storyType', '');
		var isFeature = false;
		if(storyType == 'feature' || storyType == 'preview'){
			isFeature = true;
		}
		if(platform == 'mobile'){
			//MOBILE mode
			if(layoutName && isScript !== 'on'){
				
			}else{
				//add done dot 
				addDoneDotToLastParagraph(container);
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
		}else{
			//tablet mode
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
				if(layoutName && isScript && isScript =='off'){
					//TABLET mode
					//if only want use script for specific template -> set isScript = off, without script of t1
					setScreenTablet();
					chooseLayoutFunc(layoutName,container, panelWidth, panelHeight);
				}
				else {
					setScreenTablet();
					var t1=document.querySelector('#t1');
					if(t1 != null){
						var i;
						//cal height and column
						var padding = 20;
						//set height of HEADER elm
						var headerHeight = document.querySelector('.header').offsetHeight;
						//set height of BANNER elm
						var bannerHeight = document.querySelector('.banner').offsetHeight;
						//set height of Footer elm
						var footerHeight = document.querySelector('.footer').offsetHeight;
						//set height of container which is parent div of content-area div
						var containerContentHeight = document.querySelector('.container').offsetHeight;
						var contentArea = document.querySelector('.content-area');
						var contentAreaPaddingTop = getContentAreaPaddingTop();
						var docHeight = panelHeight - contentAreaPaddingTop - footerHeight;
						var content = document.getElementById("pagination");
						var headInfo = document.querySelector('.head-info');
						var captionHeight = headInfo.offsetHeight + 20;
						var style = document.createAttribute("style");
						//set maximum image's height
						var maxImageHeight = docHeight - headerHeight - 10;
						var maxTableHeight = docHeight/3;
						createStyleTag('.content-body .image img{ max-height:' + (maxImageHeight) + 'px; }', 'myStyle');
						var pat = '';
						pat += 'height: [height]px;';
						pat += '-webkit-columns: [width]px;-moz-columns: [width]px;-ms-columns: [width]px;-o-columns: [width]px;columns: [width]px;';
						//pat += '-webkit-column-gap: [space]px;';
						pat += '-webkit-column-gap: 0px;';
						if(isScript && isScript == 'on'){
							//want to use both script t1 and specific script of that template
							chooseLayoutFunc(layoutName,container, panelWidth, panelHeight,  maxTableHeight);
						}
						//add done dot 
						addDoneDotToLastParagraph(container);
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
						style.value = pat.replace(/\[height\]/g, (containerContentHeight)).replace(/\[width\]/g, colWidth);
						content.attributes.setNamedItem(style);
						content.className = content.className + ' column';
				
						if(document.querySelector('#t1 .content-body .eof') == null){
							var span = document.createElement('span');
							span.className = 'eof';
							document.querySelector('#t1 .content-body').appendChild(span);
						}
						var content = document.querySelector('#t1 .content-body');
						var cover = document.querySelector('#t1 .cover');
						if(cover == null){
							cover = createElement('div');
						}
						if(t1.className && t1.className.indexOf('full-screen') >= 0){
							
						}
						else if(t1.className && t1.className.indexOf('default-image-background') >= 0){
							
							var defImg = document.querySelector('.default-image');
							var top = cover.offsetHeight;
							var left = 0;
							var newWidth = colWidth*2;
							var maxHeight = t1.offsetHeight - cover.offsetHeight;
							defImg.style.width = newWidth + 'px';
							defImg.style.height = maxHeight + 'px';
							defImg.style.top = top + 'px';
							defImg.style.left = left + 'px';
							ws[0] += docHeight + 20;
							ws[1] += docHeight + 20;
						}
						else{
							//set default image's height
							
							var defImg = document.querySelector('.default-image img');
							if(t1.className && t1.className.indexOf('default-image-one-column') >= 0){
								for(i=0;i<3;i++){
									ws[i] = cover.offsetHeight - headerHeight + 14;
								}
							} 
							if(t1.className && t1.className.indexOf('default-image-two-column') >= 0){
								ws[0] = ws[1] = cover.offsetHeight - contentAreaPaddingTop;
							} 
							else if(defImg != null){
								var defImgWidth = parseInt( defImg.getAttribute('width'));
								var defImgHeight = parseInt( defImg.getAttribute('height'));
								defImg = defImg.parentNode;
								if(content.children[1].className.indexOf('image') < 0){
									var top = cover.offsetHeight;
									// headInfo.parentNode.insertBefore(defImg, headInfo.nextSibling);
									var left = 0;
									var newWidth = panelWidth;
									var newHeight = Math.floor(newWidth / defImgWidth * defImgHeight);
									var maxHeight = docHeight- cover.offsetHeight - 1;
									if(newHeight < maxHeight){
										maxHeight = newHeight;
									}
									defImg.style.top = top + 'px';
									defImg.style.left = left + 'px';
									defImg.style.width = (colWidth-40) + 'px';
									defImg.style.maxHeight = maxHeight + 'px';
									//ws[0] += defImg.offsetHeight + 20;
									//ws[1] += defImg.offsetHeight + 20;
									defImg.className += ' hide';
								}
							}
							else{
								
							}
							
							//reset wh of image
							var imgWidth = colWidth - padding*2;
							var imgs = document.querySelectorAll('.content-body img');
							for(i=0; i<imgs.length; i++){
								var img = imgs[i];
								var w = parseInt(img.getAttribute('width'));
								if(w > imgWidth){
									var h = parseInt(img.getAttribute('height'));
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
							}
					
							divideContent(body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight, panelHeight, footerHeight);
						}
						if(defImg != null){
							defImg.className = defImg.className.replace(' hide', '');
						}

						//showDropcapShadow(container);
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
							//set paging
							setupPaging(page);
				
							createAttr('style','width:' + pages.value * panelWidth + 'px', document.querySelector('#t1'));
							createAttr('style','width:' + panelWidth + 'px', document.querySelector('.container'));
							
							//create gradient feature
							if(isFeature){
								var fragment = document.createDocumentFragment();
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
									fragment.appendChild(div);
								}
								t1.appendChild(fragment);
							}
							reloadStylesheets();
							if(typeof cb === 'function'){
								cb(readerObj);
							}
						}, 1000, content.offsetTop, colWidth, t1, headerHeight, captionHeight, docHeight, padding, panelWidth, isLandscape);
					}
				}

				createDropcapLetter(container,platform);
				body.className += ' completed';
				//check white space postion
				checkWhiteSpacePos();
			}
		}
	}
	catch(e){ console.log(e); }
}
function chooseLayoutFunc(layoutName,container, panelWidth, panelHeight,  maxTableHeight){
	switch(layoutName){
			case 'ioscentral_accessories':
				initCentralAccessories(container, panelWidth, panelHeight);
				break;
			case 'macuser_hotstuff':
				initMacUserHotStuff(container, panelWidth, panelHeight);
				break;
			case 'ioscentral_article_01-l':
			case 'ioscentral_article_main-l':
				addBannerWidthLandscape(container, panelWidth, panelHeight);
				initLandscape(container, panelWidth, panelHeight,2);
				break;
			case 'ioscentral_article_02-l':
				addBannerWidthLandscape(container, panelWidth, panelHeight);
				initLandscape(container, panelWidth, panelHeight,3);
				break;
			case 'macuser_article_01-l':
			case 'macuser_article_02-l':
			case 'create_article_main-l':
			case 'create_article_02-l':
			case 'playlist_article_main-l':
			case 'playlist_article_02-l':
				initLandscape(container, panelWidth, panelHeight,1);
				break;
			case 'macuser_review_01':
			case 'macuser_review_02':
			case 'ioscentral_review':
			case 'ioscentral_review_02':
			case 'helpdesk_review':
			case 'helpdesk_review_02':
			case 'create_review':
			case 'create_review_02':
			case 'playlist_review':
			case 'playlist_review_02':
			case 'workingmac_review':
			case 'workingmac_review_02':
				//dont set max height for no-review-table mode
				setScrollForTable(container, maxTableHeight);
				initMacUserReviewPortrait(container, panelWidth, panelHeight);
				break;
			case 'macuser_review_01-l':
			case 'ioscentral_review_02-l':
			case 'helpdesk_review-l':
			case 'create_review-l':
			case 'playlist_review-l':
			case 'workingmac_review-l':
				//dont set max height for no-review-table mode
				setScrollForTable(container, maxTableHeight);
				initMacUserReviewPortrait(container, panelWidth, panelHeight);
				break;
			case 'macuser_review_02-l':
			case 'ioscentral_review-l':
			case 'helpdesk_review_02-l':
			case 'create_review_02-l':
			case 'playlist_review_02-l':
			case 'workingmac_review_02-l':
				//dont set max height for no-review-table mode
				setScrollForTable(container, maxTableHeight);
				addBannerWidthLandscape(container, panelWidth, panelHeight);
				break;
			case 'ioscentral_appstore':
			case 'ioscentral_appstore-l':
				initAppStore(container, panelWidth, panelHeight);
				break;
			case 'feature_03':
				setHeightDefImage(panelHeight);
				break;
			default:
				console.log('Cannot find layout:',layoutName);
				break;
	}
}
function setupPaging(pageCount){
	var navDots = document.querySelector('.nav-dots');
	var pageLength = parseInt(pageCount);
	if(navDots != null){
		var s = '';
		for(var i=0; i<pageLength; i++){
			s += '<span class="dot" id="page-'+(i+1)+'"></span>';
		}
		navDots.innerHTML = s;
		navDots.querySelector('.dot').className += ' active';
	}
}
function checkWhiteSpacePos(){
	var t1=document.querySelector('#t1');
	if(t1.className && t1.className.indexOf('default-image-two-column') >= 0){
		var listWspace = document.querySelectorAll(':scope .content-body .white-space');
		if(listWspace.length > 1){
			var wspace = listWspace[0];
			var wspace2 = listWspace[1];
			var wspaceTop = wspace.getBoundingClientRect().top;
			var wspace2Top = wspace2.getBoundingClientRect().top;
			if(wspaceTop !== wspace2Top){
				wspace2.style.height = wspace.offsetHeight + (wspaceTop - wspace2Top)  + 'px';
			}
		}
	}

}
function initCentralAccessories(container, panelWidth, panelHeight){
	var children = container.children;
	var contentPage = document.querySelector('.content-page');
	var curEl = null;
	var infoEl = null;
	while(children.length > 0){
		var child = children[0];
		if(curEl == null || child.className.indexOf('image') >= 0){
			if(child.className.indexOf('image') >= 0){
				var img = child.querySelector('img');
				if(img != null){
					child.style.backgroundImage = "url('" + img.getAttribute('src') + "')";
				}
			}
			curEl = createElement('div','page');
			createAttr('style','width:' + panelWidth + 'px', curEl);
			contentPage.appendChild(curEl);
			curEl.appendChild(child);
			infoEl = createElement('div', 'info');
			curEl.appendChild(infoEl);
		}
		else{
			infoEl.appendChild(child);
		}
	}
	var pages = contentPage.querySelectorAll('div.page');
	var pageCount = pages.length;
	setupPaging(pageCount);
	var coverContainer = document.querySelector('.cover');
	createAttr('style','width:' + pageCount * panelWidth + 'px', document.querySelector('.container'));
	createAttr('style','width:' + pageCount * panelWidth + 'px', document.querySelector('#t1'));
	createAttr('style','width:' + panelWidth + 'px', coverContainer);
	//handling first page - cover page
	var hCoverContainer = coverContainer.getBoundingClientRect().height;
	//set styles for image in first page
	var imgInFirstPage = contentPage.querySelector(':scope .page:nth-of-type(1) .image');
	var isLandscape = checkLandscapeMode();
	if(isLandscape){
		imgInFirstPage.style.height = imgInFirstPage.getBoundingClientRect().width *3/4 + 'px';
		imgInFirstPage.style['margin-top'] = hCoverContainer + 'px';
	}else{
		if(imgInFirstPage){
			imgInFirstPage.style.height = imgInFirstPage.getBoundingClientRect().width *3/4 + 'px';
					var listNthPages = contentPage.querySelectorAll(':scope .page:not(:nth-of-type(1)) .image');
		for(i = 0; i < listNthPages.length; i++){
			listNthPages[i].style.height = imgInFirstPage.style.height;
		}
			imgInFirstPage.style['margin-top'] = hCoverContainer + 'px';
		}
	}
	//add scroll icon
	addScrollIcon();
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
function initAppStore(container, panelWidth, panelHeight){
	var parent = document.querySelector(':scope .container');
	if(container.scrollHeight >  container.clientHeight){
		parent.className += ' scroll';
	}
	var headInfo = document.querySelector(':scope .head-info');
	var coverPanel = document.querySelector(':scope .cover');
	if(headInfo.scrollHeight >  headInfo.clientHeight){
		coverPanel.className += ' scroll';
	}
	//set height of def image
	var defImg = document.querySelector(':scope .cover .default-image img');
	var banner = coverPanel.querySelector(':scope .banner');
	defImg.style.width = panelHeight - banner.getBoundingClientRect().height - headInfo.getBoundingClientRect().height - 70 +'px';
}
function initMacUserHotStuff(container, panelWidth, panelHeight){
	var children = container.children;
	var contentPage = document.querySelector('.content-page');
	var curEl = null;
	var infoEl = null;
	while(children.length > 0){
		var child = children[0];
		if(curEl == null || child.className.indexOf('image') >= 0){
			if(child.className.indexOf('image') >= 0){
				var img = child.querySelector('img');
				if(img != null){
					child.style.backgroundImage = "url('" + img.getAttribute('src') + "')";
				}
			}
			curEl = createElement('div','page');
			createAttr('style','width:' + panelWidth + 'px', curEl);
			contentPage.appendChild(curEl);
			curEl.appendChild(child);
			infoEl = createElement('div', 'info');
			curEl.appendChild(infoEl);
		}
		else{
			infoEl.appendChild(child);
		}
	}
	var pages = contentPage.querySelectorAll('div.page');
	var pageCount = pages.length;
	setupPaging(pageCount);
	createAttr('style','width:' + pageCount * panelWidth + 'px', document.querySelector('.container'));
	createAttr('style','width:' + pageCount * panelWidth + 'px', document.querySelector('#t1'));
	createAttr('style','width:' + panelWidth + 'px', document.querySelector('.cover'));
	//add scroll icon
	addScrollIcon();
}
function addBannerWidthLandscape(container, panelWidth, panelHeight){
	createAttr('style','width:' + panelWidth + 'px', document.querySelector('.cover .banner'));
}
function setHeightDefImage(panelHeight){
	var headInfo = document.querySelector(':scope .head-info');
	var defImg = document.querySelector(':scope .default-image');
	//70 is margin top of def img
	var heightOfDefImg = panelHeight - headInfo.getBoundingClientRect().height;
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
	var contentCoordiate = headInfo.offsetHeight - (contentAreaPaddingTop - bannerHeight);
	var defImgHeight = panelHeight - headInfo.offsetHeight - bannerHeight - getFooterHeight();
	temp = headInfo.offsetHeight + bannerHeight;
	if(type === 1) {
		//macuser article 1
		//set height of default image 
		defImg.style.height = ''+ defImgHeight+'px';
		defImg.style['margin-top'] = ''+ temp + 'px';
		//set content column position
		var firstChild = container.querySelector(':scope > .white-space:nth-of-type(3)').nextElementSibling;
		createAttr('style','margin-top:' + (contentCoordiate-5) + 'px', firstChild);
	}
	if (type === 2){
		//ios central 1
		//set height of default image 
		defImg.style.height = ''+ defImgHeight+'px';
		defImg.style['margin-top'] = ''+ bannerHeight + 'px';
	}
	if(type === 3){
		defImgHeight = panelHeight - bannerHeight - getFooterHeight();
		//ios central 2
		//set height of default image 
		defImg.style.height = ''+ defImgHeight+'px';
		defImg.style['margin-top'] = ''+ bannerHeight + 'px';
	}
}
function initLandscapeFullscreen(container, panelWidth, panelHeight,type){
	
}
function initMacUserReviewPortrait(container, panelWidth, panelHeight) {
	createAttr('style','width:' + panelWidth + 'px', document.querySelector('.cover'));
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
function getContentAreaPaddingTop(){
	var temp = window.getComputedStyle(document.querySelector('.content-area'), null).getPropertyValue('padding-top');
	temp = convertPxToInt(temp);
	return temp;
}
function setCurrentPage(page){
	var platform = getQuery('platform', 'tablet');
	if(platform.trim() !== 'mobile'){
		var navDots = document.querySelector('.nav-dots');
		if(navDots != null){
			var active = navDots.querySelector('.dot.active');
			if(active){
				active.className = active.className.replace(' active', '');
			}
			navDots.querySelector('#page-'+page).className += ' active';
		}
	}
}

function removeFirstImage(container){
	var imgs = container.querySelectorAll('.image img');
	if(imgs.length > 0){
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
		if(fig.textContent.trim() == '' || fig.textContent.trim() == null){
			fig.parentNode.removeChild(fig);	
		}
	}
}
function removePhotoCreditEmpty(){
	var ptCredit = document.querySelector('.photo-credit');
	if(ptCredit){
		if(ptCredit.textContent.trim() =='' || ptCredit.textContent == null)
		{
			ptCredit.parentNode.removeChild(ptCredit);
		}
	}
}
function checkLandscapeMode(){
	if(document.querySelector('#t1').className.indexOf('landscape') >= 0){
		return true;
	}
	return false;
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

function createWhiteSpace(height, element){
	if(element == undefined){
		element = 'span';
	}
	var wspace = document.createElement(element);
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
        else if (childNodes[i].nodeType == Node.ELEMENT_NODE && childNodes[i].className.indexOf('dropcap-letter') < 0) {
            Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
        }
    }
    return childTextNodes;
}
function wrapEachWord(textNode, tag, i) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;
	if(parent.nodeName == 'B' && i == 0){return;}
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
	var isDropcap = (obj.className && obj.className.indexOf('dropcap') >= 0);
	console.log(allTextNodes)
	allTextNodes.forEach(function(textNode, i) {
	    wrapEachWord(textNode, 'span', i);
	});
	obj.className += ' spanned ';
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

function createDropcap(container,platform){
	var paras = container.querySelectorAll(':scope > p');
	for(var i=0; i<paras.length; i++){
		var p = paras[i];
		if(p.textContent != "" && p.firstChild && p.className.indexOf('strap-line')< 0 && p.className.indexOf('author') < 0  && p.className.indexOf('title') < 0 && p.className.indexOf('pullQuote') < 0){
			var isFirstCharacterBold = p.firstChild.nodeName;
			if (isFirstCharacterBold === "B") {
			   	p.className += ' dropcap';
			   	if(window.ios9 && platform.trim() !='mobile'){
					var firstLetter = p.innerText[0];
					var newDropcap = document.createElement('span');
					newDropcap.innerText = firstLetter;
					newDropcap.setAttribute('data-text', firstLetter);
					newDropcap.className = 'dropcap-letter';
					p.appendChild(newDropcap);	
				}
			}
			return;
		}
	}
}
function createDropcapLetter(container){
	if(window.ios9){
		var p = container.querySelector('.dropcap-letter');
		if(p){
			setTimeout(function(p){
				var firstLetter = p.getAttribute('data-text');	
				p.innerText = firstLetter;
			}, 1000, p);
		}
	}
}
function showDropcapShadow(container){
	var pDropcap = container.querySelector(':scope > p.dropcap');
	var firstLetter = pDropcap.querySelector(':scope > b');
	firstLetter.style['visibility'] = 'hidden';
	var shadowDropcap = pDropcap.querySelector(':scope > span.dropcap-letter');
	shadowDropcap.className += ' on';
}
function convertPxToInt (str){
	str = str.replace(/ /g,'');
	var ln = str.length;
	var temp  = str.substring(0, ln - 2);
	return +temp;
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
function setScreenTablet(){
	var html = document.getElementsByTagName('html')[0];
	var body = document.getElementsByTagName('body')[0];
	var t1 = body.querySelector('div');
	var style = ' full-height';
	html.className += style;
	body.className += style;
	t1.className += style;
}