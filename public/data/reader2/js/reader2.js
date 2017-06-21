//http://reader2/reader/index.html?#issueID=14&tocID=138&storyID=42792d5794dd1d0799c57f463434a383&orientation=landscape&mode=0&fontSize=2

var getQueryString = function(name, defaultValue) {
	if(defaultValue == undefined){
		defaultValue = null;
	}
	if(!window.arrQuery){
		var url = window.location.hash;
		var a = url.split("#")[1].split("&");
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		window.arrQuery = b;
	}
	var res = window.arrQuery[name];
	if(res == undefined){
		res = defaultValue;
	}
	return res;
}

function Reader(mode, textSize, navigate, cache, issueID, tocID, storyId, orientation){
    //preserve the variable needed to execute finalize method
    this.mode = mode === undefined ? undefined : mode;
    this.textSize = textSize === undefined? undefined : textSize;
    this.navigate = navigate === undefined ? undefined : navigate;
    this.cache = cache === undefined ? undefined : cache;
    this.issueID = issueID === undefined ? undefined : issueID;
    this.tocID = tocID === undefined ? undefined : tocID;
    this.storyId = storyId === undefined ? undefined : storyId;
    this.orientation = orientation === undefined ? undefined : orientation;
}


Reader.prototype.initialize = function()
{
	this.issueID = getQueryString('issueID');
	this.tocID = getQueryString('tocID');
	this.storyId = getQueryString('storyID');
	this.textSize = getQueryString('fontSize', 0);
	this.cache = getQueryString('cache');
	this.mode = getQueryString('mode', 0);
	this.orientation = getQueryString('orientation', 'portrait');
	this.navigate = getQueryString('navigate', '00');
	this.platform = getQueryString('platform', 'tablet');
	this.path = getQueryString('path', '');
	this.layout = getQueryString('layout', '');
	this.designPath = getQueryString('designPath', '');
	this.issueTitle = getQueryString('issueTitle', '');
	this.storyType = getQueryString('storyType', '');
	this.minImageWidth = getQueryString('minImageWidth', 99);
	this.minImageHeight = getQueryString('minImageHeight', 99);
	this.language = getQueryString('language', 'en');
	var storageObj = {
		issueID: getQueryString('issueID'),
		tocID: getQueryString('tocID'),
		storyId: getQueryString('storyID'),
		textSize: getQueryString('fontSize', 0),
		cache: getQueryString('cache'),
		mode: getQueryString('mode', 0),
		orientation: getQueryString('orientation', 'portrait'),
		navigate: getQueryString('navigate', '00'),
		platform: getQueryString('platform', 'tablet'),
		path: getQueryString('path', ''),
		layout: getQueryString('layout', ''),
		designPath: getQueryString('designPath', ''),
		issueTitle: getQueryString('issueTitle', ''),
		storyType: getQueryString('storyType', ''),
		minImageWidth: getQueryString('minImageWidth', 99),
		minImageHeight: getQueryString('minImageHeight', 99),
		language: getQueryString('language', 'en')
	}
	localStorage.setItem('reader-params', JSON.stringify(storageObj));
	
	if(this.path.length > 0){
		this.path = this.path.replace(/^\/+/,'');
		if(this.path[this.path.length-1] != '/'){
			this.path += '/';
		}
	}
	if(this.designPath.length == 0){
		this.designPath = '../'+this.path + 'designs/';
	}
	else{
		this.designPath = this.designPath.replace(/^\/+/,'');
		if(this.designPath[this.designPath.length-1] != '/'){
			this.designPath = '../' + this.designPath;
		}
	}
	
	if(this.designPath != '' && this.issueTitle != ''){
		var properties = {
			issue: {
				title: this.issueTitle
			},
			layout: {
				name: ''
			}
		}
		this.afterInit(properties);
	}
	else{
		var _this = this;
		this.fetchJSON('../'+this.path+this.issueID+'/properties.js', function(res){
			_this.afterInit(res);
		});
	}
}

Reader.prototype.afterInit = function(designPack){
	this.designPath += designPack.layout.name;
	this.issueName = '';
	if(designPack.issue !== undefined && designPack.issue.title !== undefined){
		this.issueName = designPack.issue.title;
	}
	
	if(this.cache != null){
		this.loadDataCache();
	}
	else{
		this.loadData();
	}
}

Reader.prototype.loadData = function(){
	var _this = this;
	this.fetchJSON('../'+this.path+this.issueID+'/'+ this.tocID +'.js', function(res){
		_this.properties = res;
		_this.renderLayout();
	});
}

Reader.prototype.loadDataCache = function(){
	var _this = this;
	this.fetchHTML('../'+this.path+this.issueID+'/'+ this.storyId +'/' + this.cache + '.html', function(res){
		if(res != ''){
			var cacheData = res;
			var doc = document.implementation.createHTMLDocument('');
			doc.open(); doc.write(cacheData); doc.close();
			var className = doc.body.classList[0];
			doc.body.className = className + ' mode-'+ _this.mode + ' text-size-' + _this.textSize + ' ' + _this.platform;
			_this.renderedHTML = '<html>'+doc.getElementsByTagName('html')[0].innerHTML+'</html>';
			_this.finishRender();
		}
		else{
			_this.loadData();
		}
	});
}

Reader.prototype.renderLayout = function()
{
    // Check which template to load. 
    // Read in a list of templates defined elsewhere, then register them in a foreach loop
    
    // data should include 3 levels of information
    // - issue, section, story. 
    // there should be a command switch to allow all stories in one layout, or only one. (switch to page id, instead of storyid?)
    
    // THIS IS VERY SLOW (adds 200ms??)
    var layout = '';
    if( this.storyId ) {
		story = this.findStory(this.storyId, this.properties);
		var hasLayout = false;
		if(this.layout.length > 0){
	    	layout = this.layout;
	    }
	    else{
	    	try{
	    		layout = story.layout[this.orientation].link;
	    		hasLayout = true;
	    	}
	    	catch(e){}
	    	if(!hasLayout){
	    		if(this.orientation == 'portrait'){
					layout = 'default_layout_portrait.twig';
				}
				else{
					layout = 'default_layout_landscape.twig';
				}
	    	}
	    }
	}
	else 
	{
		story = this.properties.section.stories;
		layout = this.properties.section[this.orientation + '_view'];
	}

	//change image source
	var doc = document.createElement('div');
	doc.innerHTML = story.body;

	//remove first image
	/*var imgs = doc.querySelectorAll('img');
	if(imgs.length > 0){
		var par = imgs[0].parentNode;
		par.parentNode.removeChild(par);
	}*/

	//remove h5,h2,p.deck,p.byline
	if(doc.children.length > 0){
		if(doc.children[0].nodeName == 'H5'){
			var node = doc.children[0];
			node.parentNode.removeChild(node);
		}
		if(doc.children[0].nodeName == 'H2'){
			var node = doc.children[0];
			node.parentNode.removeChild(node);
		}
	}
	var decks = doc.querySelectorAll('.deck');
	for(var i=decks.length-1; i>=0; i--){
		decks[i].parentNode.removeChild(decks[i]);
	}
	var bylines = doc.querySelectorAll('.byline');
	var sByline = '';
	for(var i=bylines.length-1; i>=0; i--){
		sByline += '<span>' + bylines[i].innerHTML + '</span>&nbsp;';
		bylines[i].parentNode.removeChild(bylines[i]);
	}
	story.byline = sByline;
	
	//set image default
	var defImgSrc = '', defImgName = '';
	story.defaultImageLink = '';
	if(story.image.length > 0){
		if(this.storyType == 'rss'){
			story.image = story.image[0];
			var defImage = document.createElement('IMG');
			defImage.setAttribute('src', story.image.image_url);
			story.image.width = defImage.width;
			story.image.height = defImage.height;
		}
		else{
			story.image = this.orientation == 'portrait' ? story.image[0] : story.image[1];
			if(story.image.width > this.minImageWidth && story.image.height > this.minImageHeight){
				story.defaultImageLink = '';
				if(story.image.image_url.indexOf('http') >= 0){
					try{
						var src = story.image.image_url.match(/\/\/[^\/]+\/([^]+)/)[1];
						var aSrc = src.split('/');
						var imgName = aSrc[aSrc.length-1];
						story.image.image_url = imgName;
					}
					catch(e){}
				}
				story.image.image_url = '../'+this.path + this.issueID + '/' + this.storyId + '/' + story.image.image_url;
				if(story.image.width > 249 && story.image.height > 149){
					story.defaultImageLink = '../'+this.path+this.issueID + '/'+this.storyId + '/' + story.image.id;
				}
				defImgSrc = story.image.image_url;
				defImgName = story.image.name;
			}
			else{
				story.image = [];
			}
		}
	}
	
	//set related object source
	if(story.related_objects && story.related_objects.image){
		for(var i=0; i<story.related_objects.image.length; i++){
			var rImg = story.related_objects.image[i];
			var aSrc = rImg.image_url.split('/');
			var imgName = aSrc[aSrc.length-1];
			rImg.image_url = '../'+this.path+this.issueID + '/'+this.storyId+'/'+imgName;
		}
	}

	story.showGallery = false;
	imgs = doc.querySelectorAll('img');
	var i=imgs.length;
	while(i>0){
		var img = imgs[i-1];
		if((img.getAttribute('width') != null && img.width < 100) || (img.getAttribute('height') != null && img.height < 100)){
			img.parentNode.removeChild(img);
		}
		i--;
	}
	imgs = doc.querySelectorAll('img');
	var isPortrait = (this.orientation == 'portrait' ? true : false);
	var galleryImageCount = 0;
	for(var i=0; i<imgs.length; i++){
		var img = imgs[i];
		img.parentNode.className = 'image';
		var src = img.getAttribute('src');
		var imgName = img.getAttribute('alt');
		if(src.indexOf(this.storyId) < 0 && src.indexOf('http') < 0){
			if(defImgName == imgName){
				src = defImgSrc;
			}
			var aSrc = src.split('/');
			var imgName = aSrc[aSrc.length-1];
			src = '../'+this.path+this.issueID + '/'+this.storyId+'/'+imgName;
			img.setAttribute('src', src);
			//set figcaption
			/*var fig=img.parentNode.querySelector('figcaption');
			if(fig != null){
				var parent = img.parentNode;
				parent.parentNode.insertBefore(fig, parent.nextSibling);
			}*/
			//set data-rel
			var j=0, cont=true;
			if(story.related_objects && story.related_objects.image){
				while(j < story.related_objects.image.length && cont){
					var rImg = story.related_objects.image[j];
					if(rImg.portrait == isPortrait && rImg.image_url == src && (rImg.width > 249 && rImg.height > 149)){
						var order = Math.ceil(j/2);
						cont = false;
						img.setAttribute('data-rel', 'amreader:media/gallery:../'+this.issueID + '/'+this.storyId + '/'+ rImg.id);
						img.setAttribute('data-id', order);
						galleryImageCount++;
					}
					j++;
				}
			}
		}
	}
	if(galleryImageCount > 0){
		story.showGallery = true;
	}
	//change hyperlink
	var hrefs = doc.querySelectorAll('a');
	for(var i=0; i<hrefs.length; i++){
		var item = hrefs[i];
		var link = item.getAttribute('href');
		item.setAttribute('data-rel', 'amreader:hyperlink/' + link);
	}

	story.body = doc.innerHTML;
	story.galleryLink = '../'+this.issueID + '/'+this.storyId;
	
	var sColor = (this.properties.section.title_color) ? this.properties.section.title_color : '';
	var sName = (this.properties.section.section_name) ? this.properties.section.section_name : '';
	var sDescription = (this.properties.section.description) ? this.properties.section.description : '';
    var data = {
        issue: {
            id: this.issueID,
			name: this.issueName
        },
        section: {
            color: sColor,
			name: sName,
			description: sDescription
        },
		design: this.designPath,
		asset: '../'+this.path + this.issueID + '/' + this.storyId,
		fontSize: this.textSize,
		mode: this.mode,
		platform: this.platform,
        story: story
    }
	
	var date = new Date();
	var templateID = date.getTime();
	
	var _this = this;
    var template = twig({
		id: templateID,
       	href: this.designPath + "/layouts/" + layout,
       	async: true,
		load: function(template) { 
			_this.renderedHTML = template.render(data);
			_this.finishRender();
		}
    });
}

Reader.prototype.fetchJSON = function(url, cb)
{
	url += '?v=' + Math.random();
	var isAsync = false;
	if(cb != undefined){
		isAsync = true;
	}
	
	var req = new XMLHttpRequest();
	if(isAsync){
		req.onreadystatechange = function() {
			if (req.readyState == 4){
				var res = '';
				if((req.status == 200 || req.status == 0)){
					res = req.responseText;
				}
				cb(JSON.parse(res, null));
			}
		};
	}
    req.open("GET", url, isAsync);
    req.send();
	if(!isAsync){
		return JSON.parse(req.responseText, null);
	}
}

Reader.prototype.fetchHTML = function(url, cb)
{
	url += '?v=' + Math.random();
	var isAsync = false;
	if(cb != undefined){
		isAsync = true;
	}
	
    var req = new XMLHttpRequest();
	if(isAsync){
		req.onreadystatechange = function() {
			if (req.readyState == 4){
				var res = '';
				if((req.status == 200 || req.status == 0)){
					res = req.responseText;
				}
				cb(res);
			}
		};
	}
	
    req.open("GET", url, isAsync);
    req.send();
	if(!isAsync){
		return req;
	}
}


Reader.prototype.findStory = function(storyId, data)
{
    //console.log(jsel(data.issue.sections).select("//stories/*[@id='"+storyId+"']"))
    // var dom = jsel(data.section);
    // return dom.select("//stories/*[@id='"+storyId+"']");
    var i=0, cont=true, res={};
    while(i<data.section.stories.length && cont){
    	if(data.section.stories[i].id == storyId){
    		res = data.section.stories[i];
    		cont = false;
    	}
    	i++;
    }
    return res;
}

Reader.prototype.finalize = function()
{
	this.addEvent();
	AMCustomScript(this.mode, this.textSize, this.navigate, this.cache, this.PostProcess, this);
	setTimeout(function(obj){
		obj.PostProcess(obj);
	}, 3000, this);
	window.addEventListener('hashchange', AMRender, false);
}

/*
** Reader.prototype.addEvent 
** Retreive all DOM element of the document to attach event that Reader can send user interaction to the application
*/
Reader.prototype.addEvent = function()
{
	var all = new Array();
	all = document.getElementsByTagName("*");

	for (var i=0, max=all.length; i < max; i++) {
		if(all[i].className == undefined || all[i].className.indexOf('custom-action') < 0){
			all[i].addEventListener("click", this.URLHandler, false);
		}
	}
	// document.getElementsByTagName("body")[0].addEventListener("click", this.URLHandler, false);
}

/*
** Reader.prototype.PostProcess 
** Process center sending send message to the Application to request caching action
*/
Reader.prototype.PostProcess = function(obj)
{	
	if(window.isPostProcess != undefined){
		return;
	}
	if ( obj.cache != null )
		obj.SendMessage("amreader:page-load-complete");
	else
		obj.SendMessage("amreader:cache-request/pages:1/file:"+obj.issueID+"/"+obj.tocID+"/"+( (obj.storyId) ? obj.storyId+"/" : "") + "story_"+ obj.orientation + ".html");
	window.isPostProcess = true;
	// setTimeout(function(obj){
	// 	if ( obj.cache != null )
	// 		obj.SendMessage("amreader:page-load-complete");
	// 	else
	// 		obj.SendMessage("amreader:cache-request/pages:1/file:"+obj.issueID+"/"+obj.tocID+"/"+( (obj.storyId) ? obj.storyId+"/" : "")+"story_"+ obj.orientation + ".html");
	// }, 1000, this);
}



Reader.prototype.URLHandler = function(event)
{
	event.preventDefault();
	event.stopPropagation();
	
	if(event.srcElement.parentElement != null && event.srcElement.parentElement.getAttribute("data-rel"))
		Reader.prototype.SendMessage(event.srcElement.parentElement.getAttribute("data-rel"));
	else if(event.srcElement.parentElement.parentElement != null && event.srcElement.parentElement.parentElement.getAttribute("data-rel"))
		Reader.prototype.SendMessage(event.srcElement.parentElement.parentElement.getAttribute("data-rel"));
	else if(event.srcElement.getAttribute("data-rel"))
		Reader.prototype.SendMessage(event.srcElement.getAttribute("data-rel"));
	else
		Reader.prototype.SendMessage("amreader:clickBody");
}

/*
** Reader.prototype.SendMessage
** catches message from Reader and pass it to the application in  iFrame format
*/
Reader.prototype.SendMessage = function(uri)
{
	var			iframe;
	
	iframe = document.getElementById("amreader-iframe");
	if (iframe == null && document.body)
	{
		iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.style.width = "1px";
		iframe.style.height = "1px";
		iframe.style.position = "absolute";
		iframe.style.left = "-20px";
		iframe.style.top = "0px";
		iframe.id = "amreader-iframe";
		iframe.src = uri;
		document.body.appendChild(iframe);
	}
	else if ( iframe != null )
	{
		iframe.src = uri;
	}
}

function AMRender() {
    window.reader = new Reader();
	window.reader.finishRender = function(){
		var isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1;
		var isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 || window.navigator.appVersion.toLowerCase().indexOf('trident/');
		if (isEdge || isIE){
			document.open('text/html', '_self', 'fullscreen=no', 'replace');
		}
		else
		{
			document.open();
		}

		var embededFunc = '';
		if(window.reader.cache == null){
	        embededFunc = "<script src='js/reader2.js'></script>\
	            <script defer language='javascript' type='text/javascript'>\
	                window.reader = new Reader('" + window.reader.mode + "'"
	                    + ", '" + window.reader.textSize + "'"
	                    + ", '" + window.reader.navigate + "'"
	                    + ", " + window.reader.cache
	                    + ", '" + window.reader.issueID + "'"
	                    + ", '" + window.reader.tocID + "'"
	                    + ", '" + window.reader.storyId + "'"
	                    + ", '" + window.reader.orientation + "');\
	                window.reader.finalize();\
	        <\/script>";
	    }
		document.write(window.reader.renderedHTML + embededFunc);
		document.close();
	}
	window.reader.initialize();
};