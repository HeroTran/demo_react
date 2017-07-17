function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj) {
	try{
		reloadStylesheets();
		//popup template international
		$('.template_international .popup').click(function(index, element) {
			$(this).toggleClass('opening');
			$(this).parent('.image_item').find('.img_desc').toggle();
		});
		$('.template_international .icon_close').click(function(index, element) {
			$(this).parent('.img_desc').parent('.image_item').find('.popup').toggleClass('opening');
			$(this).parent('.img_desc').toggle();
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
					if( $(this).find('.column > p').last().length > 0 ) $(this).find('.column > p').last().append('<span class="last"></span>');
					else $('section').eq($('section').length - 2).find('.column > p').last().append('<span class="last"></span>');
				}
			});
		}
		
		if( $('.intelligence').length > 0 && $('.scrollable').length == 0 )
		{
			var window_h = $(window).height();
			var height = window_h - $('header')[0].offsetHeight - 40;
			if( $('.intelligence01').length > 0 )
			{
				if( $('.portrait').length > 0 ) $('.am_body').addClass('scrollable');
				else
				{
					var img = "<td>" + $('.am_body > table > tbody > tr:eq(0) > td').html() + "</td>";
					var content = "<td><div class='scrollable'>" + $('.am_body > table > tbody > tr:eq(1) > td:eq(0)').html() + $('.am_body > table > tbody > tr:eq(1) > td:eq(1)').html() + "</div></td>";
					$('.am_body').children("table").html("<tr>" + img + content + "</tr>");
				}
			}
			if( $('.intelligence02').length > 0 )
			{
				var content = "<tr><td><div class='scrollable'>" + $('.am_body > table > tbody > tr:eq(0) > td:eq(0)').html() + "</div></td><td><div class='scrollable'>" + $('.am_body > table > tbody > tr:eq(0) > td:eq(1)').html() + "</div></td>";
				$('.am_body').children("table").html(content);
			}
			if( $('.intelligence03').length > 0 )
			{
				var content = "<tr><td><div class='scrollable'>" + $('.am_body > table > tbody > tr:eq(0) > td:eq(0)').html() + "</div></td><td><div class='scrollable'>" + $('.am_body > table > tbody > tr:eq(0) > td:eq(1)').html() + "</div></td>";
				$('.am_body').children("table").html(content);
			}
			$('.scrollable').css( 'height', height + "px" );
		}
		
		if( $(".template_international, .template_features").length > 0 )
		{
			$(".template_international").each(function(){
				if( $(window).width() > 400 ) $(this).css('width', $(window).width());
				$(this).find('.firgure').css({'height' : '100%', 'width' : '100%'});
				var ratio = 0;
				
				var el = $(this);
				var attr = el.find('img').attr('style');
				if(! typeof attr !== typeof undefined && attr !== false)
				{
					el.find('img').load(function() {
					
						$(this).removeAttr('style');
						if( el.hasClass('portrait') )
						{
							if( $(this).height() > $(this).width() )
							{
								$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
								if($(this).height() < $(window).height())
									$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
								else if($(this).width() < $(window).width())
									$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
							}
							else
								$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
						}
						else
						{
							if( $(this).height() > $(this).width() )
								$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
							else
							{
								$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
								if($(this).width() < $(window).width())
									$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
								else if($(this).height() < $(window).height())
									$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
							}
						
						}
					}).each(function() {
					  if(this.complete) $(this).load();
					});
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
		
		if( $(".features .feature-image").length > 0 )
		{
			$(".features .feature-image").each(function(){
				var el = $(this);
				
				var attr = el.find('img').attr('style');
				if(! typeof attr !== typeof undefined && attr !== false)
				{
					el.find('img').load(function() {
						if( $(window).width() > 400 )
						{
							
							$(this).removeAttr('style');
							if( el.parent().hasClass('portrait') )
							{
						
								if( $(this).height() > $(this).width() )
								{
									$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
									if($(this).height() < $(this).parent().height())
										$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
									else if($(this).width() < $(this).parent().width())
										$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
								}
								else
								{
									$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
									if($(this).height() < $(this).parent().height())
										$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
									else if($(this).width() < $(this).parent().width())
										$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
								}
							}
							else
							{
								if( $(this).height() > $(this).width() )
								{
									$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
									if($(this).width() < $(this).parent().width())
										$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
									else if($(this).height() < $(this).parent().height())
										$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
								}
								else
								{
									$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
									if($(this).width() < $(this).parent().width())
										$(this).css({'height' : 'auto', 'width' : '100%', 'max-height' : 'initial'});
									else if($(this).height() < $(this).parent().height())
										$(this).css({'height' : '100%', 'width' : 'auto', 'max-width' : 'initial'});
								}
					
							}
						
							var objH = el.find('img').height();
							var canvasH = el.height();
							var top = Math.ceil((canvasH - objH)/2) ;
							el.find('img').css({
								'top' : top,
								'position' : 'relative'
							});
			
							var objV = el.find('img').width();
							var canvasW = el.width();
							var left = Math.ceil((canvasW - objV)/2) ;
							el.find('img').css({
								'left' : left
							});
						}
					}).each(function() {
					  if(this.complete) $(this).load();
					});
				}
				
			});
		}
		
		$('.features').each(function(){
			var arrow = $(this).find(".arrow_down");
			var content = $(this);	
			$(window).scroll(function() {
			   if($(window).scrollTop() + window.innerHeight == $(document).height()) {
			      arrow.hide();
			   }
			   else
			   	  arrow.show();
			});
		});
	}
	catch (e) {
        console.log(e);
    }
	
}
function centerImage(el)
{
	el.find('img').load(function() {
		var objH = el.find('img').height();
		var canvasH = el.height();
		var top = Math.ceil((canvasH - objH)/2) ;
		el.find('img').parent('div').css({
			'top' : top,
			'position' : 'relative'
		});
		
		var objV = el.find('img').width();
		var canvasW = el.width();
		var left = Math.ceil((canvasW - objV)/2) ;
		el.find('img').parent('div').css({
			'left' : left
		});
		
	}).each(function() {
	  if(this.complete) $(this).load();
	});
}

window.addEventListener('load', function(){
	
document.body.addEventListener('touchstart', function(e){
 $(".arrow_down").toggle();
}, false)
 
}, false)


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


