function AMLoadStory()
{
	gAMReader = new AMReader();
	if (gAMReader.storyId && gAMReader.issueId)
	{
		var toc = new AMTableOfContents(gAMReader.tocId,gAMReader.storyId);
		if (toc.Initialize(true))
		{
			var c = '';
			
			if(gAMReader.textSize > 0)
			{
				c += " text-size-" + gAMReader.textSize;
			}
			
			if(gAMReader.mode > 0)
			{
				c += " mode-" + gAMReader.mode;
			}

			var sectionColor = gAMReader.secColor;
			if(sectionColor) c += " color_" + sectionColor;
			
			document.body.className += c;
			
			if(gAMReader.cacheControl == "request" && toc.InstallCachedContent())
			{
			
				var CacheRequestURI = "amreader:cache-request/pages:1" + "/file:" + toc.CachedFileName();
				//gAMReader.SendMessage(CacheRequestURI);
			}else
			{
				toc.InstallLayout();
				toc.LoadContent();
			}
			
			AMBindScript();
			AMPostProcess();
		}
		delete toc;
	}
}
AMTableOfContents.prototype.LoadContent = function()
{
	var		req;
	var		result = false;	
	req = new XMLHttpRequest();
	//get the story xml
	req.open("GET", gAMReader.issueDirectory + this.storyId +"/story.html", false);
	//req.overrideMimeType('text/plain; charset=x-user-defined-binary');
	req.send();
	try
	{
		this.InstallContent(req.responseText);
		result = true;
	}catch(e){result = false};
	return result;
}
AMTableOfContents.prototype.InstallContent = function(responseText)
{	
	var parent = document.getElementById("story");
	
	this.wrapStory(parent, responseText);
	this.decorate();
	gAMReader.totalPage = document.getElementsByClassName('page story').length;
}
AMTableOfContents.prototype.decorate = function()
{
	var stories = this.properties.section.stories[gAMReader.storyOrder];
	var title = document.getElementsByClassName('am_section');
	var strap_line = document.getElementsByClassName('am_strap_line');
	var story_title = document.getElementsByClassName('am_title');
	var str = "";
	var story_count = document.getElementsByClassName('section-story-count');
	var story_index = document.getElementsByClassName('section-story-index');
	var page_count = document.getElementsByClassName('story-page-count');
	var gallery = document.getElementsByClassName('am_gallery');
	var closeGallery = document.getElementsByClassName('close');
	
	//Get author/photographer/credit
	var author = document.getElementsByClassName("am_author");
	var bio = document.getElementsByClassName("am_bio");
	
	//get author
	if(author.length)
	{
		var authorLength = stories.author.length;
		var authorName ="";
		var bioDesc ="";
		
		for(i = 0; i < authorLength ; i++)
		{
			authorName += stories.author[i].name + ((authorLength > 1) ? "/ " : "");
			//bioDesc += stories.author[i].longBio + ((bioLength > 1) ? "/ " : "");
		}
		for(i = 0; i < author.length ; i++)
		{
			author[i].innerHTML = authorName;
			if( bio[i] ) bio[i].innerHTML = bioDesc;
		}		
	}

	for(var i = 0; i < title.length; i++)
	{
		title[i].innerHTML = this.properties.section.section_name;
	}
	
	for(var i = 0; i < strap_line.length; i++)
	{
		strap_line[i].innerHTML = (this.properties.section.stories[gAMReader.storyOrder].strap_line) ? this.properties.section.stories[gAMReader.storyOrder].strap_line : '';
	}
	
	for(var i = 0; i < story_title.length; i++)
	{
		story_title[i].innerHTML = (this.properties.section.stories[gAMReader.storyOrder].title) ? this.properties.section.stories[gAMReader.storyOrder].title : '';
	}
	
	for(var i = 0; i < story_count.length; i++)
	{
		story_count[i].innerHTML = this.properties.section.stories.length;
	}
	
	for(var i = 0; i < story_index.length; i++)
	{
		story_index[i].innerHTML = parseInt(gAMReader.storyOrder) + 1;
	}
	
	for(var i = 0; i < page_count.length; i++)
	{
		page_count[i].innerHTML = document.getElementsByClassName("am_page").length - 1;
	}
	
	for(var i = 0; i < gallery.length; i++)
	{
		if( this.properties.section.stories[gAMReader.storyOrder].related_objects && this.properties.section.stories[gAMReader.storyOrder].related_objects.gallery && this.properties.section.stories[gAMReader.storyOrder].related_objects.gallery.length > 0 )
		{
			gallery[i].setAttribute("data-rel","amreader:media/gallery:" + gAMReader.issueDirectory + gAMReader.storyId );
			gallery[i].addEventListener('click', AMURLHandler, false);
		}
		else
		{
			gallery[i].parentNode.removeChild(gallery[i]);
		}
	}
	
	//gallery in body
	if( document.getElementsByClassName('gallery').length > 0 && this.properties.section.stories[gAMReader.storyOrder].related_objects && this.properties.section.stories[gAMReader.storyOrder].related_objects.gallery )
	{
		var contentGallery = document.getElementsByClassName('gallery');
		var test = contentGallery.length;
		for( var i = 0; i < test; i++ )
		{
			var mainImage = '';
			var str = '';
			var imageList = contentGallery.item(i).getElementsByTagName('li');
			var galleryArray = this.properties.section.stories[gAMReader.storyOrder].related_objects.gallery;
			
			for( var j = 0; j < imageList.length; j++ )
			{
				str += imageList[j].innerHTML + "#";
			}
			contentGallery.item(i).setAttribute("data-rel","amreader:media/gallery:" + gAMReader.issueDirectory + gAMReader.storyId +"/"+str );
			contentGallery.item(i).addEventListener('click', AMURLHandler, false);
			for( var j = 0; j < galleryArray.length; j++ )
			{
				mainImage = AMInObjects( imageList.item(0).innerHTML, galleryArray[j], 'id' );
				if( mainImage.length > 0 )
				{
					var src = ( gAMReader.isPortrait == mainImage[0].portrait ) ? mainImage[0].image_url : mainImage[1].image_url;
					if( src ) 
					{
						contentGallery.item(i).innerHTML = "<img src='" + gAMReader.issueDirectory + "/" + gAMReader.storyId + "/" + src + "' /><div class='popup_icon'></div>";
						break;
					}
					
				}
			}
			
			contentGallery.item(i).classList.remove('hide');
		}
	}
	
} 

AMTableOfContents.prototype.wrapStory = function(parent, story_p)
{
	var	instance, nodeList, i = 0, title, sub_title, deck, image, content, imageHolder="", counter = 0, temp = null;
	var stories = this.properties.section.stories[gAMReader.storyOrder];
	var imageGroup = stories.image;
	nodeList = AMCloneArray(parent.getElementsByClassName("am_page"));
	
	for(i = 0; i < nodeList.length ; i++)
	{
		parent.removeChild(nodeList[i]);
	}
	instance = nodeList[0].cloneNode(true);
	
	/*var panelWidth = (document.body.clientWidth) ? document.body.clientWidth : ( ( gAMReader.isPortrait ) ? 768 : 1024 );
	instance.style.width= panelWidth + "px";
	instance.style.top = 0;*/
	
	parent.appendChild(instance);
	
	//wrap content item
	title = instance.getElementsByClassName("am_section").item(0);
	if(title) title.innerHTML = this.properties.section.section_name;
	
	title = instance.getElementsByClassName("am_title").item(0);
	if(title) title.innerHTML = stories.title;
	
	sub_title = instance.getElementsByClassName("am_sub_title").item(0);
	if(sub_title) sub_title.innerHTML = stories.sub_title;
	
	deck = instance.getElementsByClassName("am_intro").item(0);
	if(deck) 
	{	
		deck.innerHTML = stories.intro;
	}
	else
	{
		story_p = "<p class='am_intro'>"+stories.intro+"</p>" + story_p;
	}

	//get default image
	image = instance.getElementsByClassName("am_df_image").item(0);
	
	if(image && imageGroup != null) 	
	{
		for(var i = 0; i < imageGroup.length; i++)
		{
		
			if((gAMReader.isPortrait == imageGroup[i].portrait && image.getAttribute('data-orientation')) || !image.getAttribute('data-orientation'))
			{
				image.innerHTML = "<img src='" + gAMReader.issueDirectory + gAMReader.storyId + "/" + imageGroup[i].image_url + "' width='"+imageGroup[i].width+"px' height='"+imageGroup[i].height+"px' data-id='"+imageGroup[i].id+"'/>";
				image.style.height = imageGroup[i].height + "px";
				image.style.width = imageGroup[i].width + "px";
				//image.setAttribute("data-rel","amreader:media/gallery:" + gAMReader.issueDirectory + gAMReader.storyId + '/' + imageGroup[i].id );
				//image.addEventListener('click', AMURLHandler, false);
				var img_name = instance.getElementsByClassName("am_df_image_name").item(0);
				if(img_name) img_name.innerHTML = imageGroup[i].name;
				var img_caption = instance.getElementsByClassName("am_df_image_caption").item(0);
				if(img_caption) img_caption.innerHTML = imageGroup[i].caption;
			}	
		}
	}
	content = instance.getElementsByClassName("am_body").item(0);
	var panelWidth = (window.innerWidth) ? window.innerWidth : 1024;
	var panelHeight = (window.innerHeight) ? window.innerHeight : 768;
	instance.style.width= panelWidth + "px";
	instance.style.height= panelHeight + "px";
	
	if(content && nodeList[1] && stories.type == "story")
	{
		story_p = this.wrapFirstPages(parent, instance, story_p);
	}
	else if( content )
	{
		content.innerHTML = story_p;
		this.washImage(content.getElementsByTagName("img"));
	}
	
	if( nodeList.length > 2 )
	{
		
		instance = nodeList[1].cloneNode(true);
		if(story_p) 
		{
			parent.appendChild(instance);
			story_p = this.wrapFirstPages(parent, instance, story_p);
		}
		
		if(story_p) this.wrapPages(parent, nodeList[2], story_p, 2);
	}
	else
	{
		if(nodeList[1])
		{
			if(story_p && stories.type == "story")
			{
				this.wrapPages(parent, nodeList[1], story_p, 1);
			}
			else if(stories.related_objects.gallery || ( stories.related_objects.image && stories.related_objects.image.length > 0) )
			{
				if( stories.related_objects.gallery )
					this.wrapGallery(parent, nodeList[1], stories.related_objects.gallery);
				else
				{
					var gallery = new Array( stories );
					this.wrapGallery(parent, nodeList[1], gallery);
				}
			}
		}
		else
		{
			if(stories.related_objects.image)
				this.wrapSlide(instance, stories.related_objects.image);
			
			if(stories.related_objects.gallery)
				this.wrapSlide(instance, stories.related_objects.gallery[0].related_objects.image);
		
		}
	}
	
	return true;
}

AMTableOfContents.prototype.washImage = function(image)
{
	var imageLength = image.length, imageHeight = 0;
	var imageGroup = (this.properties.section.stories[gAMReader.storyOrder].related_objects) ? this.properties.section.stories[gAMReader.storyOrder].related_objects.image : undefined;
	var imageTemp = '';	
	var index = null;
	
	if( imageGroup != undefined ) imageGroup = imageGroup.concat(this.properties.section.stories[gAMReader.storyOrder].image);
	for(i = 0; i < imageLength; i++)
	{
		imageTemp = image.item(i);
		var src = imageTemp.src.split("/");
		var imgPath = src[src.length - 1];
		var imgNameArr = imgPath.split(".");
		var imgName = imgNameArr[0].split("_");
		//imgPath = imageTemp.src;
		//if(!gAMReader.isPortrait) imageTemp.setAttribute("align", "normal");
		imageTemp.setAttribute("width", "auto");
		imageTemp.removeAttribute("height");
		
		if(imageGroup != null) 
		{
			for(var j = 0; j < imageGroup.length; j++)
			{
				if(gAMReader.isPortrait == imageGroup[j].portrait)
				{
					string = imageGroup[j].image_url.split("_story_img_size_");
					if( string[string.length-2] !== undefined && src[src.length - 1].search(string[string.length-2]) >= 0 )
					{
						imgPath = imageGroup[j].image_url;
						index = imageGroup[j].id;
					}
					else if( imgPath == imageGroup[j].image_url )
					{
						index = imageGroup[j].id;
					}
				}
			}
		}
		
		imageTemp.src =  gAMReader.issueDirectory + gAMReader.storyId + "/" + imgPath;
		
		if( index != null )
		{
			imageTemp.parentNode.setAttribute("data-rel","amreader:media/gallery:" + gAMReader.issueDirectory + gAMReader.storyId + '/' + index );
			imageTemp.addEventListener('click', AMURLHandler, false);
		}
			
		imageHeight += imageTemp.height;
	}
	
	return imageHeight;
}


AMTableOfContents.prototype.wrapSlide = function(content, imageGroup)
{
	
	if(content.getElementsByClassName("col").item(0) == null) return;
	
	var li = content.getElementsByClassName("col").item(0), item;
	var thumbs = content.getElementsByClassName("thumb").item(0), thumb;
	var imageLength = imageGroup.length;
	var ul = li.parentNode;
	ul.removeChild(li);
	
	if ( thumbs ) 
	{
		var ul_thumb = thumbs.parentNode;
		ul_thumb.removeChild(thumbs);
		
		for(var i = 0; i < imageLength; i++)
		{
			thumb = thumbs.cloneNode(true);
		
			var embed_thumb = thumb.getElementsByClassName("firgure").item(0);
		
			if(embed_thumb) 
			{
				if((gAMReader.isPortrait == imageGroup[i].portrait && embed_thumb.getAttribute('data-orientation')) || !embed_thumb.getAttribute('data-orientation'))
				{
					embed_thumb.innerHTML = "<img src='" + gAMReader.issueDirectory + gAMReader.storyId + "/" + imageGroup[i].image_url + "' data-id='"+imageGroup[i].id+"'/>";
					ul_thumb.appendChild(thumb);
				
				}
			}
		}
	}

	for(var i = 0; i < imageLength; i++)
	{
		item = li.cloneNode(true);
		
		var embed = item.getElementsByClassName("firgure").item(0);
		
		if(embed) 
		{
			if((gAMReader.isPortrait == imageGroup[i].portrait && embed.getAttribute('data-orientation')) || !embed.getAttribute('data-orientation'))
			{
				embed.innerHTML =  "<img src='" + gAMReader.issueDirectory + gAMReader.storyId + "/" + imageGroup[i].image_url + "' data-id='"+imageGroup[i].id+"'/>";
				
				var intro = item.getElementsByClassName("am_caption").item(0);
				if(intro) intro.innerHTML = imageGroup[i].caption;
				ul.appendChild(item);
				
			}
		}
	}
}


AMTableOfContents.prototype.wrapGallery = function(parent, nodeList, imageGroups)
{
	var instance, image, section;
	var imageLength = imageGroups.length, counter = 1;
	var orientation = nodeList.getElementsByClassName("img").item(0);
	
	for(var j = 0; j < imageLength; j++)
	{
		var imageGroup = imageGroups[j];
		for(var i = 0; i < imageGroup.length; i++)
		{
			if((gAMReader.isPortrait == imageGroup[i].portrait && orientation.getAttribute('data-orientation')) || !orientation.getAttribute('data-orientation'))
			{
				instance = nodeList.cloneNode(true);
				instance.className = instance.className.replace(/\btween\b/, counter);
				var panelWidth = (window.innerWidth) ? window.innerWidth : 1024;
				var panelHeight = (window.innerHeight) ? window.innerHeight : 768;
				instance.style.width= panelWidth + "px";
				instance.style.height= panelHeight + "px";
				instance.style.left= counter*panelWidth + "px";
				counter++;
				
				column = instance.getElementsByClassName("column").item(0);
				section = column.getElementsByTagName("figure").item(0);
				parent.appendChild(instance);
				image = column.getElementsByClassName("img").item(0);
				if(image) image.innerHTML =  "<img src='" + gAMReader.issueDirectory + gAMReader.storyId + "/" + imageGroup[i].image_url + "'  width='"+imageGroup[i].width+"px' height='"+imageGroup[i].height+"px' data-id='"+imageGroup[i].id+"'/>";
				
				imageName = column.getElementsByClassName("am_name").item(0);
				if(imageName) 
				{
					if( imageGroup[i].name )
					{
						imageName.innerHTML = imageGroup[i].name;
					}
					else
						imageName.parentNode.removeChild(imageName);
				}
				
				caption = column.getElementsByClassName("am_caption").item(0);
				if(caption) 
				{
					if( imageGroup[i].caption )
						caption.innerHTML = imageGroup[i].caption;
					else
						caption.parentNode.removeChild(caption);
				}
			}
		}
	}
	gAMReader.totalPage = counter;
	return true;
}
function getMaxCols(regex) {
	var StyleSheets = document.styleSheets;
	var rules = null;
	var col = 1;
	for( var i = 0; i < StyleSheets.length; i++ ) {
		if(StyleSheets[i].href.search(/landscape/i) >= 0 || StyleSheets[i].href.search(/portrait/i) >= 0)
			rules = StyleSheets[i].cssRules;
	}
	for(var j = 0; j < rules.length; j++)
	{
		if(rules[j].selectorText == regex)
			col = rules[j].style["-webkit-column-count"]
	}
	
	return col;
}

AMTableOfContents.prototype.wrapFirstPages = function(parent, nodeList, story_p)
{
	if(story_p == null) return false;
	var	instance, i = 0;
	instance = nodeList;
	contentNode = instance.getElementsByClassName("content").item(0);
	
	//parse story into temp div
	var fragment = document.createDocumentFragment();
	var temp = document.createElement("div");
	fragment.appendChild(temp);
	temp.innerHTML = story_p;
	
	var story = [];
	
	while (temp.childNodes.length > 0)
	{
		child = temp.lastChild;
		temp.removeChild(child);
		if( child.innerHTML ) story.push(child);
	}
	temp.parentNode.removeChild(temp);
	delete fragment;
	
	var text = '', classes='';
	var imageHeight = 0, colTemp, contentNode;
	
	colTemp = AMCloneArray( instance.getElementsByClassName("am_body") );
	
	var colLength = colTemp.length;
	
	//var maxHeight = contentNode.clientHeight;
	var maxWidth = ( document.body.clientWidth != 0 ) ? document.body.clientWidth : 912;
	var panelHeight = (window.innerHeight) ? window.innerHeight : 768;

	for(var j = 0; j < colLength; j++)
	{
		var performBreak = false, column = null, remain=[], parentTag ='p';
		column = colTemp[j];
		contentNode.appendChild(column);
		//var maxHeight = ( contentNode.clientHeight != 0 ) ? contentNode.clientHeight - column.offsetTop - 20 : 630;
		var maxHeight = panelHeight - column.offsetTop - 80;
		contentNode.style.height = ( panelHeight - 80 ) + "px";
		do{
			if(text != "")
			{
				column.innerHTML = text;
				text = "";
			}
			else if( story.length > 0 )
			{
				column.appendChild( story.pop());
			}
			
			if(column.offsetHeight > maxHeight && (column.lastChild.tagName == "P" || column.lastChild.tagName == "H2" || column.lastChild.tagName == "H1" || column.lastChild.tagName == "H3" || column.lastChild.tagName == "H4" || column.lastChild.tagName == "H5" || column.lastChild.tagName == "H6" ) && column.lastChild.innerHTML != '' && column.lastChild.innerHTML != undefined )
			{
				parentTag = column.lastChild.tagName;
				
				var lastLength = column.lastChild.innerHTML.replace(/^\s+|\s+$/g,"").split(" ").length;
				var tag = null;
				classes = column.lastChild.className;
				
				var decoratedText = column.lastChild.innerHTML;
				if( column.lastChild.lastChild.tagName !== undefined && ( column.lastChild.lastChild.tagName == 'B' || column.lastChild.lastChild.tagName == 'I' || column.lastChild.lastChild.tagName == 'U' ) )
				{
					var tempChild = column.lastChild.lastChild;
					column.lastChild.removeChild(tempChild);
					if( column.lastChild.innerHTML == '' )
					{
						tag = document.createElement( tempChild.tagName );
						decoratedText = tempChild.innerHTML;
					}
				}
				remain = this.wrapContent(decoratedText, column, maxHeight, tag, i, j);
				performBreak = true;
				
			}else if(column.offsetHeight > ( maxHeight - imageHeight ) && (column.lastChild.tagName == "OL" || column.lastChild.tagName == "UL") )
				{
					parentTag = column.lastChild.tagName;
					var olCounter = 0;
					//parse story into temp OL
					var fragment = document.createDocumentFragment();
					var temp = document.createElement(column.lastChild.tagName);
					var tempStory = column.lastChild.innerHTML;
					column.lastChild.innerHTML = "";
					fragment.appendChild(temp);
					temp.innerHTML = tempStory;
					var OL = [];
	
					while (temp.childNodes.length > 0)
					{
						child = temp.lastChild;
						if( child.innerHTML != undefined ) child.innerHTML = child.innerHTML.replace(/&nbsp;/g,"");
						temp.removeChild(child);
						if( child.innerHTML != undefined ) OL.push(child);
					}

					temp.parentNode.removeChild(temp);
					delete fragment;
					
					while( OL.length > 0 && column.offsetHeight <= maxHeight )
					{
						var string = OL.pop();
						if( string.innerHTML != 'undefined' ) column.lastChild.appendChild( string );
						olCounter++;
					}
					
					if( column.offsetHeight > maxHeight )
					{
						tag = document.createElement("li");
						decoratedText = column.lastChild.lastChild.innerHTML;

						var limit = column.lastChild.offsetHeight - ( maxHeight - (column.offsetHeight - ((column.lastChild.offsetHeight != undefined) ? column.lastChild.offsetHeight : 0)));
						
						var arr = decoratedText.replace(/^\s+|\s+$/g,"").split(" ");
						var o = arr.length;
						while( column.lastChild.lastChild.offsetHeight >= limit  && o > 0){
							temparr = arr.slice(0, o);
							o--;
							
							column.lastChild.lastChild.innerHTML = temparr.join(" ").trim() +" ";
						}
						
						if( column.lastChild.lastChild.offsetHeight > limit )
						{
							if( o > 0 )
							{
								var tempString = column.lastChild.lastChild.innerHTML;
								tempString = tempString.substring(0, tempString.lastIndexOf(" "));
								column.lastChild.lastChild.innerHTML = tempString;
							}
							else
							{
								column.lastChild.removeChild(column.lastChild.lastChild);
							}
							
							o--;
						}
						
						temparr = arr.slice(o+1, arr.length);
						if (temparr.length > 0)
						{
							tag.innerHTML = temparr.join(" ").trim() +" ";
							if( o > 0 ) tag.className = "continued";
							OL.push(tag);
						}
						else
							olCounter++;
						
						while (OL.length > 0)
						{
							var string = OL.pop();
							text += string.outerHTML;
						}
						text = "<"+parentTag+" "+ ((parentTag == "OL") ? "start='"+olCounter+"'" : "") + ">"+ text +"</"+parentTag+">";
						performBreak = true;
					}
				}
			else if(column.offsetHeight > maxHeight && (column.lastChild.tagName == "DIV" || column.lastChild.tagName == "BLOCKQUOTE") )
			{
				text = column.lastChild.outerHTML;
				column.removeChild(column.lastChild);
				performBreak = true;
			}
			else if(story.length == 0)
			{
				performBreak = true;
			}
			
		}while(!performBreak)

		if(column.lastChild && column.lastChild.innerHTML === undefined)
			column.removeChild(column.lastChild);
			
		if(column.getElementsByTagName("p")[0]) column.getElementsByTagName("p")[0].className += " first";
		
		if( remain != null && remain.length > 0)
		{
			
			if( tag ) 
			{
				tag.innerHTML = remain.join(" ");
				text = "<"+parentTag+" class='continued "+ classes +"'>"+ tag.outerHTML +"</"+parentTag+">";
			}
			else 
				text = "<"+parentTag+" class='continued "+ classes +"'>"+ remain.join(" ") +"</"+parentTag+">"; 
			remain = null;
		}
		
		this.washImage(column.getElementsByTagName("img"));
		
	}
	while( story.length > 0 )
	{
		var child = story.pop();
		text += "<p>"+child.outerHTML+"</p>";
	}
	
	
	return text;
}

AMTableOfContents.prototype.wrapPages = function(parent, nodeList, story_p, i)
{
	
	if(story_p == null) return false;
	var	instance;
	//parse story into temp div
	var fragment = document.createDocumentFragment();
	var temp = document.createElement("div");
	fragment.appendChild(temp);
	temp.innerHTML = story_p;
	var story = [];
	
	while (temp.childNodes.length > 0)
	{
		child = temp.lastChild;
		//if( child.innerHTML != undefined ) child.innerHTML = child.innerHTML.replace(/&nbsp;/g,"");
		temp.removeChild(child);
		if( child.innerHTML != "" )story.push(child);
	}
	
	temp.parentNode.removeChild(temp);
	delete fragment;
	
	var text = '';
	
	//#t6 article .content: should be changed
	//var maxHeight = 680 * getMaxCols("#t6 article .content");
	
	do{
		var remain=[], imageHeight = 0, colTemp, contentNode;
		
		instance = nodeList.cloneNode(true);
		instance.className = instance.className.replace(/\btween\b/, i);
		parent.appendChild(instance);
		var panelWidth = (window.innerWidth) ? window.innerWidth : 1024;
		var panelHeight = (window.innerHeight) ? window.innerHeight : 768;
		instance.style.width= panelWidth + "px";
		instance.style.height= panelHeight + "px";
		instance.style.left= i*panelWidth + "px";
		instance.style.top = 0;
		//instance.style.position = 'absolute';
		
		contentNode = instance.getElementsByClassName("content").item(0);
		colTemp = AMCloneArray( instance.getElementsByClassName("am_body") );
		if( instance.getElementsByClassName('story-page-index').item(0) ) instance.getElementsByClassName('story-page-index').item(0).innerHTML = i;
		
		var colLength = colTemp.length;

		var maxHeight = panelHeight - contentNode.offsetTop - 40;
		var maxWidth = ( contentNode.clientWidth != 0 ) ? contentNode.clientWidth : 912;
		
		//console.log("Client Width: " + contentNode.clientWidth);
		for(var j = 0; j < colLength; j++)
		{
			var performBreak = false, column = null, parentTag = 'P', classes='';
			column = colTemp[j];
			contentNode.appendChild(column);
			
			if( column.clientWidth > ( maxWidth / colLength ) || column.clientWidth == 0 ){
				if(colLength > 1){
					column.style.width = (maxWidth / colLength - 20) + "px";
					column.style.cssFloat = 'left'; // this works all except IE
					
				}
				else
					column.style.width = 294 + "px";
			}
			
			do{
				if(text != "")
				{
					column.innerHTML = text;
					text = "";
				}
				else if( story.length > 0 )
				{
					var string = story.pop();
					if( string.innerHTML != 'undefined' ) column.appendChild( string );
					var classname = ( column.lastChild.className ) ? column.lastChild.className.toLowerCase() : '';
					if( classname == 'am_info_box' || classname == 'object-right factbox' || classname == 'object-left factbox' || classname == 'object-center factbox' || classname == 'factbox' )
					{
						column.lastChild.getElementsByClassName('text').item(0).style.height = (maxHeight-65) + "px";
					}
				}
				this.washImage(column.getElementsByTagName("img"));
				imageHeight = 0;
				if(column.offsetHeight > ( maxHeight - imageHeight ) && (column.lastChild.tagName == "P" || column.lastChild.tagName == "H2" || column.lastChild.tagName == "H1" || column.lastChild.tagName == "H3" || column.lastChild.tagName == "H4" || column.lastChild.tagName == "H5" || column.lastChild.tagName == "H6" ) && column.lastChild.innerHTML != '' && column.lastChild.innerHTML != undefined )
				{
					classes = column.lastChild.className;
					parentTag = column.lastChild.tagName;
					var lastLength = column.lastChild.innerHTML.replace(/^\s+|\s+$/g,"").split(" ").length;
					var tag = null;
					
					var decoratedText = column.lastChild.innerHTML;
					if( column.lastChild.lastChild.tagName !== undefined && ( column.lastChild.lastChild.tagName == 'B' || column.lastChild.lastChild.tagName == 'I' || column.lastChild.lastChild.tagName == 'U' ) )
					{
						var tempChild = column.lastChild.lastChild;
						column.lastChild.removeChild(tempChild);
						if( column.lastChild.innerHTML == '' )
						{
							tag = document.createElement( tempChild.tagName );
							decoratedText = tempChild.outerHTML;
						}
					}
					
					remain = this.wrapContent(decoratedText, column, maxHeight, tag, i, j);
					
					performBreak = true;
				}else if(column.offsetHeight > ( maxHeight - imageHeight ) && (column.lastChild.tagName == "OL" || column.lastChild.tagName == "UL") )
				{
					parentTag = column.lastChild.tagName;
					var olCounter = 0;
					//parse story into temp OL
					var fragment = document.createDocumentFragment();
					var temp = document.createElement(column.lastChild.tagName);
					var tempStory = column.lastChild.innerHTML;
					column.lastChild.innerHTML = "";
					fragment.appendChild(temp);
					temp.innerHTML = tempStory;
					var OL = [];
	
					while (temp.childNodes.length > 0)
					{
						child = temp.lastChild;
						if( child.innerHTML != undefined ) child.innerHTML = child.innerHTML.replace(/&nbsp;/g,"");
						temp.removeChild(child);
						if( child.innerHTML != undefined ) OL.push(child);
					}

					temp.parentNode.removeChild(temp);
					delete fragment;
					
					while( OL.length > 0 && column.offsetHeight <= maxHeight )
					{
						var string = OL.pop();
						if( string.innerHTML != 'undefined' ) column.lastChild.appendChild( string );
						olCounter++;
					}
					
					if( column.offsetHeight > maxHeight )
					{
						tag = document.createElement("li");
						decoratedText = column.lastChild.lastChild.innerHTML;

						var limit = column.lastChild.offsetHeight - ( maxHeight - (column.offsetHeight - ((column.lastChild.offsetHeight != undefined) ? column.lastChild.offsetHeight : 0)));
						var arr = decoratedText.replace(/^\s+|\s+$/g,"").split(" ");
						var o = arr.length;
						while( column.lastChild.lastChild.offsetHeight >= limit  && o > 0){
							temparr = arr.slice(0, o);
							o--;
							
							column.lastChild.lastChild.innerHTML = temparr.join(" ").trim() +" ";
						}
						
						if( column.lastChild.lastChild.offsetHeight > limit )
						{
							if( o > 0 )
							{
								var tempString = column.lastChild.lastChild.innerHTML;
								tempString = tempString.substring(0, tempString.lastIndexOf(" "));
								column.lastChild.lastChild.innerHTML = tempString;
							}
							else
							{
								column.lastChild.removeChild(column.lastChild.lastChild);
							}
							
							o--;
						}
						
						temparr = arr.slice(o+1, arr.length);
						if (temparr.length > 0)
						{
							tag.innerHTML = temparr.join(" ").trim() +" ";
							if( o > 0 ) tag.className = "continued";
							OL.push(tag);
						}
						else
							olCounter++;
						
						while (OL.length > 0)
						{
							var string = OL.pop();
							text += string.outerHTML;
						}
						text = "<"+parentTag+" start='"+olCounter+"'>"+ text +"</"+parentTag+">";
						performBreak = true;
					}
				}
				else if(column.offsetHeight > ( maxHeight - imageHeight ) && (column.lastChild.tagName == "DIV" || column.lastChild.tagName == "BLOCKQUOTE") )
				{
					text = column.lastChild.outerHTML;
					column.removeChild(column.lastChild);
					performBreak = true;
				}
				else if(story.length == 0)
				{
					performBreak = true;
				}
				
				imageHeight = 0;
			}while(!performBreak)
			
			if(column.lastChild && column.lastChild.innerHTML === undefined)
				column.removeChild(column.lastChild);
			if(i==1 && j == 0 && !column.getElementsByTagName("p")[0].classList.contains('continued'))
				column.getElementsByTagName("p")[0].className += " first";
			
			if( remain != null && remain.length > 0)
			{
				if( tag ) 
				{
					tag.innerHTML = remain.join(" ");
					text = "<"+parentTag+" class='continued "+ classes +"'>"+ tag.outerHTML +"</"+parentTag+">";
				}
				else 
				{
					text = "<"+parentTag+" class='continued "+ classes +"'>"+ remain.join(" ") +"</"+parentTag+">";
					
				}
					 
				remain = null;
			}
		}
		instance.style.position = 'absolute';
		
		i++;
	}while(story.length > 0 || text.length > 0)
	
	return true;
}

AMTableOfContents.prototype.wrapContent = function(string, column, maxHeight, tag, index, j)
{
	if( index == 0 ) console.log(j);
	if(!string) return "";
	var limit = maxHeight - (column.offsetHeight - ((column.lastChild.offsetHeight != undefined) ? column.lastChild.offsetHeight : 0));
	if(limit <= 0)
	{
		column.removeChild(column.lastChild);
		return string.replace(/^\s+|\s+$/g,"").split(" ");
	}
	var arr = string.replace(/^\s+|\s+$/g,"").split(" ");
	var o = arr.length;
	var text = "", remain = new Array(), temparr = new Array(), count = 0;
	var performBreak = false;
	
	
	
	while( column.lastChild.offsetHeight > limit && o > 1 && !performBreak && limit > 0 ){
		temparr = arr.slice(0, o);
		o = Math.floor(o/2);
		
		text = temparr.join(" ").trim() +" ";
		
		if( tag ) 
		{
			tag.innerHTML = text;
			column.lastChild.innerHTML = tag.outerHTML;
		}
		else
			column.lastChild.innerHTML = text;
	}
	count = temparr.length;
	
	text = column.lastChild.innerHTML;
	while( column.lastChild.offsetHeight <= limit ){
		if(arr[count] !== undefined)
		{
			if( column.lastChild.lastChild && column.lastChild.lastChild.tagName != undefined )
				column.lastChild.lastChild.innerHTML += " " + arr[count];
			else
				column.lastChild.innerHTML += " " + arr[count];
			
			text += " " + arr[count];
			count++;
		}
		else
			break;
	}
	
	if( column.lastChild.offsetHeight > limit )
	{
		if( column.lastChild.lastChild.tagName != undefined )
		{
			var tempString = column.lastChild.lastChild.innerHTML;
			tempString = tempString.substring(0, tempString.lastIndexOf(" "));
			column.lastChild.lastChild.innerHTML = tempString;
		}
		else
		{
			var tempString = column.lastChild.innerHTML;
			tempString = tempString.substring(0, tempString.lastIndexOf(" "));
			column.lastChild.innerHTML = tempString;
		}
		
		text = tempString;
		
		count--;
	}
	
	
	
	if(arr[count-1] == '<a') count--;
	if(arr[count-2] == '<a') count = count - 2;
	if(arr[count-3] == '<a') count = count - 3;
	
	text = arr.slice(0, count);
	
	column.lastChild.innerHTML = text.join(" ").trim() +" ";

	if(count < 4)
	{
		count = 0;
		column.removeChild(column.lastChild);
	}
	remain = arr.slice(count, arr.length);
	
    delete temparr;
	return remain;
}
AMTableOfContents.prototype.calculateHeight = function(column, text, arr, count, maxHeight)
{
	var performBreak = false;
	while(column.offsetHeight <= maxHeight && count > 0 && !performBreak){
		text += arr[count] + " ";
		column.lastChild.innerHTML = text.trim() + " ";
		if(column.offsetHeight > maxHeight)
		{
			column.lastChild.innerHTML = arr.slice(0, count-1).join(" ");
		}
		count++;
		if(count == arr.length) performBreak = true;
	}
	
	if(count == 0) count = 0;
	else count -= 2;

	return arr.slice(count, arr.length);
}
AMTableOfContents.prototype.InstallCachedContent = function()
{
	var		result = false;
    var req;
	try
	{
		var		CachedHTMLPath;
		CachedHTMLPath = this.CachedFileName();
		req = new XMLHttpRequest();
		
		req.open("GET", CachedHTMLPath, false);
		req.send(null);
		
		if (req.responseText.length > 0)
		{
			document.body.innerHTML = req.responseText;
			document.body.getElementsByClassName("story column").item(0).style.left = "0px";
			document.body.getElementsByClassName("story column").item(0).style.top = "0px";
			result = true;
			
		}
	}
	catch (e)
	{
		result = false;
	}
	return result;
}

AMTableOfContents.prototype.CachedFileName = function()
{
	var template;
	
	if(!gAMReader.isPortrait)
		template = "landscape";
	else
		template = "portrait";
		
	if(gAMReader.selectedPage == null)
		return gAMReader.issueDirectory + gAMReader.storyId + "/" + "cached_" + template + "_" + gAMReader.textSize + ".html";
	else
		return gAMReader.issueDirectory + gAMReader.storyId + "/" + "cached_" + template + "_" + gAMReader.textSize + ".html." + gAMReader.selectedPage;
}

function AMHashChanged()
{
	if (document.body.id != "story") return;
	if (gAMGalleryHandle)
	{
		delete gAMGalleryHandle;
		gAMGalleryHandle = null;
	}
	document.body.innerHTML = "";
	
	delete gAMReader;
	gAMReader = new AMReader();
	
	delete AMBindScriptgAMReader;
	AMBindScriptgAMReader = null;	
	
	if (gAMReader.issueId && gAMReader.storyId)
	{
		var toc = new AMTableOfContents(gAMReader.tocId,gAMReader.storyId);
		if (toc.Initialize(true))
		{
			if(!gAMReader.textSize)
			{
				gAMReader.textSize = 0;
			}
			var bodyClass = " text-size-" + gAMReader.textSize;
			
			if(gAMReader.mode > 0)
			{
				bodyClass += " mode-" + gAMReader.mode;
			}
			
			var sectionColor = gAMReader.secColor;
			if(sectionColor) bodyClass += " color_" + sectionColor;
			
			document.body.className = bodyClass;
			if(gAMReader.cacheControl == "request" && toc.InstallCachedContent())
			{
				var CacheRequestURI = "amreader:cache-request/pages:1" + "/file:" + toc.CachedFileName();
				//gAMReader.SendMessage(CacheRequestURI);
			}else
			{	
				toc.InstallLayout();
				toc.LoadContent();
			}

			AMBindScript();
			AMPostProcess();
		}
		delete toc;
	}
	
}
window.addEventListener('load', AMLoadStory, false);
window.addEventListener('hashchange', AMHashChanged, false);
