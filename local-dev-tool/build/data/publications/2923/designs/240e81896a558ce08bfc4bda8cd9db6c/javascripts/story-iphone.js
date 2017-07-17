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
				c = " text-size-" + gAMReader.textSize;
			}
			else
			{
				c += " body_text_size " + document.body.className;
			}

			var sectionColor = gAMReader.secColor;
			if(sectionColor) c += " color_" + sectionColor;
			
			if(gAMReader.mode > 0)
			{
				c += " mode-" + gAMReader.mode;
			}
			
			document.body.className = c;
			
			if(gAMReader.cacheControl == "request" && toc.InstallCachedContent())
			{
			
				var CacheRequestURI = "amreader:cache-request/pages:1" + "/file:" + toc.CachedFileName();
			}else
			{
				toc.InstallLayout();
				
				if( gAMReader.issueId == 'rss' )
				{
					toc.LoadRSSContent();
				}
				else
				{
					toc.LoadContent();
				}
			}
			
			AMBindScript();
			AMPostProcess();
		}
		delete toc;
	}
}
AMTableOfContents.prototype.LoadRSSContent = function()
{
	var		result = true;	
	var stories = this.properties.section.stories[gAMReader.storyOrder];
	
	this.InstallContent(stories.body);
	
	return result;
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
	var headline = (this.properties.section.section_name) ? this.properties.section.section_name.split(" ") : '';
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
	if(author.length && stories.author)
	{
		var authorLength = stories.author.length;
		var authorName ="";
		var bioDesc ="";
		if ( authorLength > 0 && stories.author[0].name != "" )
		{
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
		else
		{
			if (author.item(0)) author.item(0).parentNode.parentNode.removeChild(author.item(0).parentNode);
		}
	}
	
	var relative = document.getElementsByClassName("am_relatives");
	
	if(relative.length)
	{
		if( stories.relative_links.length > 0 || stories.author.length > 0 )
		{
			var authorList = ( stories.relative_links.length > 0 ) ? stories.relative_links : stories.author;
			var parentRelative = relative.item(0).parentNode;
			var tempRelative = relative.item(0);
			parentRelative.removeChild(tempRelative);
			
			var authorLength = authorList.length;
		
			for(var i = 0; i < authorLength ; i++)
			{
				var authorName = ( stories.relative_links.length > 0 ) ? authorList[i].name : authorList[i].AuthorName;
				var authorBio = ( stories.relative_links.length > 0 ) ? authorList[i].intro : authorList[i].Title;
				var authorEmail = ( stories.relative_links.length > 0 ) ? authorList[i].id : authorList[i].Email;
				
				var tempAuthor = tempRelative.cloneNode(true);
				if( tempAuthor.getElementsByClassName("am_relatives_name").item(0) ) tempAuthor.getElementsByClassName("am_relatives_name").item(0).innerHTML = authorName;
				if( tempAuthor.getElementsByClassName("am_relatives_intro").item(0) ) tempAuthor.getElementsByClassName("am_relatives_intro").item(0).innerHTML = authorBio;
				if( tempAuthor.getElementsByClassName("am_relatives_email").item(0) ) tempAuthor.getElementsByClassName("am_relatives_email").item(0).innerHTML = authorEmail;
				
				parentRelative.appendChild(tempAuthor);
			}
		}
		else
		{
			relative.item(0).parentNode.parentNode.removeChild(relative.item(0).parentNode);
		}
	}
	

	if(headline.length > 0) 
	{
		str = headline[0]; 
		for (var i = 1; i < headline.length; i++)
		{
			str += " <span>"+ headline[i] +"</span>";
		}
	}
	for(var i = 0; i < title.length; i++)
	{
		title[i].innerHTML = str;
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
  
	  if( this.properties.section.stories[gAMReader.storyOrder].related_objects && this.properties.section.stories[gAMReader.storyOrder].related_objects.gallery )
	  	{
	   		gallery[i].setAttribute("data-rel","amreader:media/gallery:" + gAMReader.issueDirectory + gAMReader.storyId );
	   		gallery[i].addEventListener('click', AMURLHandler, false);
	  	}
	  else
	  	{
	   		gallery[i].parentNode.removeChild(gallery[i]);
	  	}
 	}
	
	for(var i = 0; i < closeGallery.length; i++)
	{
		closeGallery[i].setAttribute("data-rel","amreader:media/gallery:close" );
		closeGallery[i].addEventListener('click', AMURLHandler, false);
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
	parent.appendChild(instance);
	
	//wrap content item
	title = instance.getElementsByClassName("am_title").item(0);
	if(title) title.innerHTML = stories.title;
	
	sub_title = instance.getElementsByClassName("am_sub_title").item(0);
	if(sub_title) sub_title.innerHTML = stories.sub_title;
	
	deck = instance.getElementsByClassName("am_intro").item(0);
	if(deck && stories.intro) 
	{	
		deck.innerHTML = stories.intro;
	}
	else if( stories.intro )
		story_p =  "<p><b>" + stories.intro + "</b></p>" + story_p;
	

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
				var img_name = instance.getElementsByClassName("am_df_image_name").item(0);
				if(img_name) img_name.innerHTML = imageGroup[i].name;
				var img_caption = instance.getElementsByClassName("am_df_image_caption").item(0);
				if(img_caption) img_caption.innerHTML = imageGroup[i].caption;
			}	
		}
	}
	content = instance.getElementsByClassName("am_body").item(0);
	if( content )
	{
		content.innerHTML = story_p;
		this.washImage(content.getElementsByTagName("img"));
	}
	
	if(nodeList[1])
	{
		if(story_p && stories.type == "story")
		{
			this.wrapPages(parent, nodeList[1], story_p);
		}
		else if(stories.related_objects.gallery || stories.related_objects.image.length > 0 )
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
		if(stories.related_objects && stories.related_objects.image)
			this.wrapSlide(instance, stories.related_objects.image);
			
		if(stories.related_objects && stories.related_objects.gallery)
			this.wrapSlide(instance, stories.related_objects.gallery[0]);
		
	}
	
	return true;
}
AMTableOfContents.prototype.washImage = function(image)
{
	if( gAMReader.issueId == 'rss' ) return;
	
	var imageLength = image.length, imageHeight = 0;
	var imageGroup = (this.properties.section.stories[gAMReader.storyOrder].related_objects) ? this.properties.section.stories[gAMReader.storyOrder].related_objects.image : undefined;
	var imageTemp = '';
	
	if( imageGroup != undefined ) imageGroup = imageGroup.concat(this.properties.section.stories[gAMReader.storyOrder].image);
	else imageGroup = this.properties.section.stories[gAMReader.storyOrder].image;
	
	
	
	for(i = 0; i < imageLength; i++)
	{
		imageTemp = image.item(i);
		var src = imageTemp.src.split("/");
		var imgPath = src[src.length - 1];
		var imgNameArr = imgPath.split(".");
		var imgName = imgNameArr[0].split("_");
		var popup = document.createElement("div");
		var index = null;
		var defImage = false;
		popup.className = "icon_info";
		
		imageTemp.setAttribute("width", "auto");
		imageTemp.removeAttribute("height");
		
		if(imageGroup != null) 
		{
			for(var j = 0; j < imageGroup.length; j++)
			{
				if(gAMReader.isPortrait == imageGroup[j].portrait)
				{
					string = imageGroup[j].image_url.split("_default_ipad_");
					if( string.length < 2 )
						string = imageGroup[j].image_url.split("_story_img_size_");
					if( string[string.length-2] !== undefined && src[src.length - 1].search(string[string.length-2]) >= 0 )
					{
						imgPath = imageGroup[j].image_url;
						index = imageGroup[j].id;
						if( (imageGroup[j].image_url).search('_default_ipad_') > 0 )
							defImage = true;
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
			imageTemp.parentNode.setAttribute("width", imageTemp.width +"px");
			imageTemp.addEventListener('click', AMURLHandler, false);
		}
	
		if( imageTemp.parentNode.lastChild.tagName != "IMG" )
		{
			imageTemp.parentNode.insertBefore(popup,imageTemp.parentNode.lastChild);
		}
		else
			imageTemp.parentNode.appendChild(popup);
		
		imageHeight += imageTemp.height;
		
		if( defImage ) imageTemp.parentNode.className = 'default';
	}
	
	return imageHeight;
}


AMTableOfContents.prototype.wrapSlide = function(content, imageGroup)
{
	if(content.getElementsByClassName("col").item(0) == null) return;
	
	var li = content.getElementsByClassName("col").item(0), item;
	var imageLength = imageGroup.length;
	var ul = li.parentNode;
	ul.removeChild(li);
	
	for(i = 0; i < imageLength; i++)
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
		var imageGroup = imageGroups[j].related_objects.image;
		for(var i = 0; i < imageGroup.length; i++)
		{
			if((gAMReader.isPortrait == imageGroup[i].portrait && orientation.getAttribute('data-orientation')) || !orientation.getAttribute('data-orientation'))
			{
				instance = nodeList.cloneNode(true);
				instance.className = instance.className.replace(/\btween\b/, i);
				if(!gAMReader.isPortrait) 
				{
					instance.style.left= counter*1024 + "px";
					counter++;
				}
				column = instance.getElementsByClassName("column").item(0);
				section = column.getElementsByTagName("figure").item(0);
				parent.appendChild(instance);
				image = column.getElementsByClassName("img").item(0);
				if(image) image.innerHTML =  "<img src='" + gAMReader.issueDirectory + gAMReader.storyId + "/" + imageGroup[i].image_url + "'  width='"+imageGroup[i].width+"px' height='"+imageGroup[i].height+"px' data-id='"+imageGroup[i].id+"'/>";
				
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
	document.body.innerHTML = "";
	
	delete gAMReader;
	gAMReader = new AMReader();

	if (gAMReader.issueId && gAMReader.storyId)
	{
		var toc = new AMTableOfContents(gAMReader.tocId,gAMReader.storyId);
		if (toc.Initialize(true))
		{	
			
			var c = '';
			
			if(gAMReader.textSize > 0)
			{
				c = " text-size-" + gAMReader.textSize;
			}
			else
			{
				c = " body_text_size ";
			}

			var sectionColor = gAMReader.secColor;
			if(sectionColor) c += " color_" + sectionColor;
			
			if(gAMReader.mode > 0)
			{
				c += " mode-" + gAMReader.mode;
			}
			
			document.body.className = c;
			
			if(gAMReader.cacheControl == "request" && toc.InstallCachedContent())
			{
				var CacheRequestURI = "amreader:cache-request/pages:1" + "/file:" + toc.CachedFileName();
				//gAMReader.SendMessage(CacheRequestURI);
			}else
			{	
				toc.InstallLayout();
				
				if( gAMReader.issueId == 'rss' )
				{
					toc.LoadRSSContent();
				}
				else
				{
					toc.LoadContent();
				}
			}

			AMBindScript();
			AMPostProcess();
		}
		delete toc;
	}
	
}
window.addEventListener('load', AMLoadStory, false);
window.addEventListener('hashchange', AMHashChanged, false);
