function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj) {
	try{
		reloadStylesheets();
		//popup template international
		$('.template_international .popup').click(function(index, element) {
			$(this).find('.icon').toggleClass('opening');
			$(this).find('.img_desc').toggle();
		});
		
		//Generate paging
		if( $(".paging li").length == 0 )
		{
			var sum_section = $('section').length;
			var paginglist = '<ul>';
			var itempaging = '';
			for(var i=0; i<sum_section; i++)
			{
				itempaging += "<li></li>";
			}
			paginglist+=itempaging;
			paginglist+='</ul>';
			var paging = $('.paging');
			paging.append(paginglist);
		
			$('section').each(function(index, element) {
				var index = $(this).index();
				$(this).find('.paging li').eq(index).addClass('active');
				if( index == $('section').length - 1 )
				{
					if( $(this).find('.column > p').last().length > 0 ) $(this).find('.column > p').last().addClass('last');
					else $('section').eq($('section').length - 2).find('.column > p').last().addClass('last');
				}
			});
		}
		if( $(".template_international, .template_features").length > 0 )
		{
			$(".template_international").each(function(){
				if( !$(this).hasClass('index-0') )
				{
					if( $(this).hasClass('portrait') )
					{
						$(this).find('img').css('width', '100%');
					}
					else
						$(this).find('img').css('height', '100%');
				
					centerImage($(this));
				}
				
			});
			
			var parent = $('.am_title').parent();
			var size = parseFloat($('.am_title').css('font-size'));
			while( $('.am_title').width() > parent.width() || $('.am_sub_title').width() > parent.width() )
			{
				var size = parseFloat($('.am_title').css('font-size')) - 10 ;
				$('.am_title').css('font-size', size + 'px');
				$('.am_sub_title').css('font-size', size + 'px');
				
				var lineHeight = parseFloat($('.am_title').css('line-height')) - 8 ;
				$('.am_title').css('line-height', lineHeight + 'px');
				$('.am_sub_title').css('line-height', lineHeight + 'px');
			}
			
		}
		
		if( $(".template_features .default_image").length > 0 )
		{
			$(".template_features .default_image").each(function(){
				var el = $(this);
				el.find('img').load(function() {
					var objH = el.find('img').width();
					var canvasH = el.width();
					var left = Math.ceil((canvasH - objH)/2);
					el.find('img').parent('div').css({
						'margin-left' : left
					});
				}).each(function() {
				  if(this.complete) $(this).load();
				});
			});
		}
		
		if( $(".template_audit .default_image").length > 0 )
		{
			$(".template_audit .default_image").each(function(){
				$(this).removeAttr('style');
				if( $(this).parent().next('.column').length > 0 )
				{
					var height = $(this).parent().next('.column').height();
					$(this).css({ 'height': height, 'overflow': 'hidden' });
				}
			});
			
			$(".landscape .template_audit .default_image img").each(function(){
				if( $(this).height() <  $('.default_image').height() )
				{
					$('.default_image').css({'height' : 'auto'});
				}
			});
		}
		$('.dropcap').each(function(i, data){
			if( i != 0 ) $(this).removeClass('dropcap');
		});
		
		$('.am_body img').each(function(){
			var el = $(this).parent();
			el.css({ 'width': '100%', 'background-color': '#000' });
			el.find('img').load(function() {
				
				if(el.find('img').height() <= el.find('img').width())
				{
					el.find('img').css({
						'width': '100%',
						'height': 'auto'
					});
				}
				else
				{
					el.find('img').css({
						'height': '100%',
						'width': 'auto'
					});
				}
				
				var objH = el.find('img').height();
				var canvasH = el.height();
				var objW = el.find('img').width();
				var canvasW = el.width();
				var left = Math.ceil((canvasW - objW)/2);
				var top = Math.ceil((canvasH - objH)/2);
				el.find('img').css({
					'top' : top,
					'position' : 'relative',
					'margin': '0',
					'left': left
				});
				
				
			}).each(function() {
			  if(this.complete) $(this).load();
			});
			
		});
	}
	catch (e) {
        console.log(e);
    }
	
}
function centerImage(el){
	el.find('img').load(function() {
		var objH = el.find('img').height();
		var canvasH = el.height();
		var top = (Math.ceil((canvasH - objH)/2) > 0 && objH > 50) ? Math.ceil((canvasH - objH)/2) : 0;
		el.find('img').parent('div').css({
			'top' : top,
			'position' : 'relative'
		});
	}).each(function() {
	  if(this.complete) $(this).load();
	});
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





