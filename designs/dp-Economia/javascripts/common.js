AMBindScriptgAMReader = null;
gAMResourcesRoot = "../../../";
gAMGalleryHandle = null;
gAMDesign = null;
gAMGalleryPopup = 0;

document.documentElement.style.webkitTapHighlightColor = "rgba(0,0,0,0)";

function AMReader()
{
	this.issueId = null;
	this.storyId = null;
	this.storyOrder = null;
	this.tocId = null;
	this.textSize = 0;
	this.mode = 0;
	this.totalPage = 1;
	this.cacheControl = null;
	this.selectedPage = 0;
	this.gallerySize = null;
	this.readyState = 'initializing';
	this.secColor = null;
	this.Initialize();
}
function AMCloneArray(stuff)
{
	return Array.prototype.slice.call(stuff);
}
AMReader.prototype.Initialize = function()
{
    var issueName = (/.*[#&]issueID=([^&$]+).*/).exec(window.location.hash);
	var fontSize = (/.*[#&]fontSize=([^&$]+).*/).exec(window.location.hash);
	var storyInfo = (/.*[#&]storyID=([^&$]+).*/).exec(window.location.hash);
	var storyOrder = (/.*[#&]storyOrder=([^&$]+).*/).exec(window.location.hash);
	var tocInfo = (/.*[#&]tocID=([^&$]+).*/).exec(window.location.hash);
	var rootInfo = (/.*[#&]resourcesRoot=([^&$]+).*/).exec(window.location.hash);
	var cache = (/.*[#&]cache=([^&$]+).*/).exec(window.location.hash);
	var page = (/.*[#&]page=([^&$]+).*/).exec(window.location.hash);
	var isGallery = (/.*[#&]isGallery=([^&$]+).*/).exec(window.location.hash);
	var mode = (/.*[#&]mode=([^&$]+).*/).exec(window.location.hash);
	
	if (issueName && issueName.length == 2)
	{
		this.issueId = issueName[1];
		
		if (storyInfo && storyInfo.length == 2) this.storyId = storyInfo[1];
		if (storyOrder && storyOrder.length == 2) this.storyOrder = storyOrder[1];
		if (tocInfo && tocInfo.length == 2) this.tocId = tocInfo[1];
		if (rootInfo && rootInfo.length == 2) gAMResourcesRoot = rootInfo[1];
		if (fontSize && fontSize.length == 2) this.textSize = fontSize[1];
		if (cache && cache.length == 2) this.cacheControl = cache[1];
		if (page && page.length == 2) this.selectedPage = page[1];
		if (isGallery && isGallery.length == 2) gAMGalleryPopup = isGallery[1];
		if (mode && mode.length == 2) this.mode = mode[1];
		
		this.issueDirectory = gAMResourcesRoot + this.issueId + "/";
		this.isPortrait = /portrait[.]html$/.test(window.location.pathname);
	}
}

//AMTableOfContents: Get section and its properties in properties file
function AMTableOfContents(tocID, storyID)
{
	this.tocId = tocID;
	this.storyId = storyID;
	this.properties = null;
	this.sectionName = null;
	
}
AMTableOfContents.prototype.Initialize = function()
{
	if (this.properties != null) return true;
	
	var		result = false;
	var		req;
	
	req = new XMLHttpRequest();
	if(this.tocId)
	{
		req.open("GET", gAMReader.issueDirectory + this.tocId + ".js", false);
		//req.overrideMimeType('text/plain; charset=x-user-defined-binary');
		req.send();
		this.properties = JSON.parse(req.responseText, null);

		if (this.properties)
		{
			if (this.properties.section)
			{
				this.sectionName = this.properties.section.name;
				gAMReader.secColor = this.properties.section.title_color;
				result = true;
			}
		}
	}
	
	return result;
}
AMTableOfContents.prototype.InstallLayout = function()
{
	var template, layout;
	if(gAMReader.storyOrder)
	{
		layout = this.properties.section.stories[gAMReader.storyOrder].layout;
	}
	else
	{
		layout = {"landscape" : { "link" : this.properties.section.landscape_view }, "portrait" : { 'link' : this.properties.section.portrait_view} };
	}
	
	if( gAMGalleryPopup == 1 )
	{
		layout = {"landscape" : { "link" : "story-landscape-gallery.html" }, "portrait" : { 'link' : "story-portrait-gallery.html"} };
	}
	
	if(layout)
	{
		if(!gAMReader.isPortrait)
			template = (layout.landscape && layout.landscape.link) ? layout.landscape.link : 'default_layout_landscape.html';
		else
			template = (layout.portrait && layout.portrait.link) ? layout.portrait.link : 'default_layout_portrait.html';
	}
	

	if (template)
	{
		
		var		req, doc;
		req = new XMLHttpRequest();
		req.open("GET", "../layouts/" + template, false);
		req.overrideMimeType('text/xml');
		req.send();
		if (req.responseXML)
		{
			doc = req.responseXML;
			while (doc.body.children.length > 0)
			{
				var		localNode;
				localNode = document.adoptNode(doc.body.children[0], true);
				document.body.appendChild(localNode);
			}
			
			if(doc.body.className != "") document.body.className += " " + doc.body.className;
		}
	}
}
function AMGalleryHandle()
{
	var self = this;
	this.url = null;
}

AMGalleryHandle.prototype.Initialize2 = function(images, url)
{
	var i = 0, sdClass, template, instance, img, section, bondwrapper, button, butt = '<div class="controls">';
	
	var imgsize = gAMReader.gallerySize; //this should be changed in the future - this is for gallery
	var nodeList = document.getElementById("gallery");
    if(!nodeList)return;
	template = nodeList.getElementsByTagName("section").item(0);
	sdClass = template.className.replace(/\btemplate\b/,'');
	template.parentNode.removeChild(template);
    template = null;
	section = nodeList.getElementsByClassName("bond-box").item(0);
	bondwrapper = nodeList.getElementsByClassName("bond-wrapper").item(0);

	var imagelength = images.length;
	var tempImage='';
	for(var j = 0; j < imagelength; j++)
	{
		if(images[j][imgsize] != null)
		{
			tempImage += "<div class='bond-slide'><img src='" + gAMReader.issueDirectory +"/"+ gAMReader.storyId +"/"+ images[j][imgsize].file + "' onerror='this.style.display=\"none\"' /></div>";
			if(j==0) butt += '<div class="button index-0 current"><div class="dot"></div></div>';
			else butt += '<div class="button index-'+ j +'"><div class="dot"></div></div>';
			i++;
		}
	}
	section.innerHTML = tempImage;
	button = document.getElementById("controls");
	if(button) button.innerHTML = butt + "</div>";

	delete butt;
	delete button;
}
function GalleryStart()
{
	var gallery = document.getElementsByClassName("bond-wrapper").item(0);
	if(gallery){
		var parent = gallery.parentNode;
		parent.removeChild(gallery);
		parent.appendChild(gallery);
		AMIMGHandler(gallery);
		delete gallery;
        gallery = null;
	}
}
function AMIMGReload()
{
	var img = document.getElementsByTagName('img');
	if(img)
	{
		var l = img.length;
		var j = 0;
		for(var i = 0; i < l; i++)
		{
			obj = img.item(i);
			if(!obj.complete || typeof obj.naturalWidth == "undefined" || obj.naturalWidth == 0) {
			   var src =obj.src;
			   var pos = src.indexOf('?');
			   if (pos >= 0) {
				  src = src.substr(0, pos);
			   }
			   var date = new Date();
			   obj.src = src + '?v=' + date.getTime();
			}
		}
	}
}
function MediaChange()
{
	var gallery = document.getElementsByClassName("bond-wrapper").item(0);
	if(gallery){
		var img = gallery.getElementsByTagName("img").item(0);
		var coor = "amreader:media/coor/"+img.width+"/"+ img.height +"/"+img.x+"/"+img.y;
	}
	return coor;
}
AMReader.prototype.SendMessage = function(uri)
{
	var			iframe;
	
	iframe = document.getElementById("amreader-iframe");
	if (iframe == null)
	{
		iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.style.width = "1px";
		iframe.style.height = "1px";
		iframe.style.position = "absolute";
		iframe.style.left = "-20px";
		iframe.style.top = "0px";
		iframe.id = "amreader-iframe";
		
		document.body.appendChild(iframe);
	}
	iframe.src = uri;
	
}
function AMNextPageHandler(event)
{
	if (event.screenX > 900)
	{
		event.preventDefault();
		event.stopPropagation();
		gAMReader.SendMessage("amreader:view-next-page");
	}
}
function AMURLHandler(event)
{
	event.preventDefault();
	event.stopPropagation();
	if(event.srcElement.parentElement != null && event.srcElement.parentElement.getAttribute("data-rel"))
		gAMReader.SendMessage(event.srcElement.parentElement.getAttribute("data-rel"));
	else if(event.srcElement.getAttribute("data-rel"))
		gAMReader.SendMessage(event.srcElement.getAttribute("data-rel"));
	else
		gAMReader.SendMessage("amreader:clickBody");

}

function AMIMGHandler(img)
{
	var l = img.getElementsByTagName('img');
	
	if(l.length > 1) 
	{
		img.style.display = "block";
		SlideGallery();
	}
	else
	{
		img.style.display = "block";
		var nodeList = document.getElementById("gallery");
		l.item(0).width = nodeList.offsetWidth - 10;
		l.item(0).height = nodeList.offsetHeight - 10;
		left = nodeList.offsetLeft;

		if(gAMGalleryHandle && gAMGalleryHandle.url)
			l.item(0).setAttribute("data-rel","amreader:media/file:" + gAMReader.issueDirectory + gAMReader.storyId +"/"+ gAMGalleryHandle.url + "/" + l.item(0).width + "/" + l.item(0).height + "/" + l.item(0).x + "/" + l.item(0).y);
		else
			l.item(0).setAttribute("data-rel","amreader:view-gallery/from:"+gAMReader.storyId+"/index:0");
		l.item(0).addEventListener("click", AMURLHandler, false);
		
		delete img;
        img = null;
	}
	return l.length;
}

function Sponsor(tocId)
{
	var result = false;
	this.advertiser = null;
	this.tocId = tocId;
	this.Initialize(tocId);
}

Sponsor.prototype.Initialize = function()
{
	if(this.advertiser != null) return true;
	var result = false;
	var req, sponsor;
	
	req = new XMLHttpRequest();
	
	req.open("GET", gAMResourcesRoot + "adv/advertisers.js", false);
	req.send();
	if(req.responseText)
		this.advertiser = JSON.parse(req.responseText, null);
	else
		result = false;

	return result;
}
Sponsor.prototype.wrapAdv = function()
{
	if(this.advertiser == null) return false;
	
	var sponsorNode = document.getElementById("article-sponsor");
	if(sponsorNode){
		var span = document.createElement("span");
		sponsorNode.appendChild(span);
		span.textContent = "Brought you by ";
		var img = document.createElement("img");
		span.appendChild(img);
		var length;
		
		length = this.advertiser.section.items.length;

		for(var i = 0; i < length; i++)
		{
			if(this.advertiser.section.items[i].parent == decodeURI(this.tocId))
			{
				img.src = gAMResourcesRoot + "adv/" + this.advertiser.section.items[i].id + "/" + this.advertiser.section.items[i].logo;
				span.setAttribute('data-rel', 'amreader:advertiser/' + gAMResourcesRoot + "adv/" + this.advertiser.section.items[i].id + "/" + this.advertiser.section.items[i].file);
				span.addEventListener('click', AMURLHandler, false);
				break;
			}
		}
	}
	return true;
}

function AMPostProcess()
{
	if (gAMReader.selectedPage != null && !gAMReader.isPortrait)
	{
		var parent = document.getElementsByClassName('add-overflow-id-last-column-footer').item(0);
		if(parent)
		{
			var nextPage = document.createElement("div");
			nextPage.className = "next-page-button-bar";
			var next = document.createElement("img");
			var nextPage2 = nextPage.cloneNode();
			nextPage2.innerHTML=" ";
			document.body.appendChild(nextPage2);
			parent.appendChild(nextPage);
			nextPage.appendChild(next);
			next.src = "../images/next-page-arrow.svg";
			nextPage.addEventListener("mousedown", AMNextPageHandler, false);
			nextPage2.addEventListener("mousedown", AMNextPageHandler, false);
		}
	}
	/*if(gAMReader.tocId) 
	{
		var adv = new Sponsor(gAMReader.tocId);
		adv.wrapAdv();
        delete adv;
	}
*/
	gAMReader.readyState = 'complete';

	if ( gAMReader.cacheControl == "request" || gAMGalleryPopup == 1 )
		gAMReader.SendMessage("amreader:page-load-complete");
	else
	{
		gAMReader.totalPage = document.getElementsByClassName('page story').length;
		gAMReader.SendMessage("amreader:cache-request/pages:"+gAMReader.totalPage+"/file:"+gAMReader.issueId+"/"+gAMReader.tocId+"/"+( (gAMReader.storyId) ? gAMReader.storyId+"/" : "")+"cached_"+((gAMReader.isPortrait) ? "portrait" : "landscape") + "_"+gAMReader.textSize+".html");
	}
}

function AMBindScript()
{
	var all = new Array();
	all = document.getElementsByTagName("*");

	for (var i=0, max=all.length; i < max; i++) {
		if( !all[i].classList.contains('am_gallery') && !all[i].classList.contains('close') && !all[i].classList.contains('gallery') && all[i].tagName != 'A' && !all[i].classList.contains('popup') && !all[i].classList.contains('icon')  )
		{
			if(document.getElementById("popup") == null)
				all[i].addEventListener("click", AMURLHandler, false);
		}
		
	}
	AMCustomScript();
	AMHyperlinkHandle();
	AMVideoHandle();
}

function AMInObjects(needle, set, key)
{
    var results = new Array();
    for(index=0;index<set.length;index++){
        if(set[index][key] == needle){
            results.push(set[index]);
        }
    }
    return results;
}

function AMVideoHandle()
{
    var elem = document.getElementsByTagName("source");
    var elength = elem.length;
	var parent = null;
	
    for(var i = 0; i < elength; i++)
	{
		video = elem.item(i);
		parent = video.parentNode;
		var src = video.src.split("/");
		var videoPath = src[src.length - 1];
		
		video.src =  gAMReader.issueDirectory + gAMReader.storyId + "/" + videoPath;
		
		parent.setAttribute("data-rel","amreader:media/video/" + gAMReader.storyId + "/" + videoPath);
		parent.addEventListener('click', AMURLHandler, false);
	}
}

function AMHyperlinkHandle()
{
    var elem = document.getElementsByTagName("a");
    var elength = elem.length;
    for(var i = 0; i < elength; i++)
	{
		if( !elem[i].classList.contains('am_gallery') && !elem[i].classList.contains('close') && !elem[i].classList.contains('am_twitter') && !elem[i].classList.contains('flex-next') && !elem[i].classList.contains('flex-prev') )
		{
			elem[i].setAttribute("data-rel","amreader:hyperlink/" + elem[i].href);
			elem[i].addEventListener('click', AMURLHandler, false);
		}
	}
}

function AMGetElement(className, nothing)
{
    var string = '';
    var elem = document.getElementsByClassName(className);
    var elength = elem.length-1;
    if (elength >= 0) {
        for(var i = 0; i < elength; i++)
        {
            string += elem[i].outerHTML + '@@@@@@@@@@';
        }
        string += elem[elength].outerHTML;
    }
    return string;
}

function AMRefreshImage(name)
{
    var elem = document.getElementsByTagName("img");
    var elength = elem.length;
	var src = '', url = '';
	
	var d=new Date();
    for(var i = 0; i < elength; i++)
	{
		src = elem[i].src;
		url = elem[i].getAttribute("data-url");
		
		if( src.search(name) >= 0 ) 
		{
			elem[i].src = src + "?v=" + d.valueOf();
		}
		
		if( url.search(name) >= 0 ) 
		{
			elem[i].src = url + "?v=" + d.valueOf();
		}
	}
}

function AMBrokenImage()
{
    var elem = document.getElementsByTagName("img");
    var elength = elem.length;
	var string = '';
	var image = [];
	
	var d=new Date();
    for(var i = 0; i < elength; i++)
	{
		var url = elem[i].getAttribute("data-url");
		if (typeof elem[i].naturalWidth != "undefined" && elem[i].naturalWidth == 0)
		{
			image = elem[i].src.split("/");
			id = elem[i].getAttribute("data-id");
			elem[i].setAttribute('data-url', elem[i].src);
			elem[i].src = gAMDesign.designPack + 'images/nopic.png';
			string += ( ( string!='' ) ? '@@@@@@@@@@' : '' ) + id;
		}
	}
	return string;
}