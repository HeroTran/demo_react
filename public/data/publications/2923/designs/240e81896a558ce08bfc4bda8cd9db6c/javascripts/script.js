function AMCustomScript()
{
	if( document.getElementsByClassName('landscape').length > 0 )
	{
		var main = document.getElementsByClassName('am_df_image').item(0);
		if( main )
		{
			var image = main.getElementsByTagName('img').item(0);
			
			if( image && image.height > image.width )
			{
				document.getElementById('story').className = document.getElementById('story').className + ' imageportrait';
			}
		}
	}
	
	var body = document.getElementsByClassName('am_body').item(0);
	var headline = body.getElementsByTagName('h2').item(0);
	if( headline ) headline.className = 'story_heading_size';
	
	var decks = body.getElementsByClassName('deck');
	for( var i = 0; i < decks.length; i++ )
	{
		decks[i].className = 'intro_size';
	}
	
	var captions = document.getElementsByClassName('caption');
	for( var i = 0; i < captions.length; i++ )
	{
		if( captions[i].innerHTML == "" )
		{
			captions[i].parentNode.getElementsByClassName('icon_info').item(0).style.display = "none";
		}
	}
	
	var objs = document.getElementsByClassName("icon_info");
	for( var i = 0; i < objs.length; i++ )
	{
		objs[i].addEventListener('click', ToggleCaption, false);
	}
	
	var figcaption = document.getElementsByTagName('figcaption');
	for( var i = 0; i < figcaption.length; i++ )
	{
		var str = figcaption[i].innerHTML.replace(/(\r\n|\n|\r)/gm,"");
		if( str.length > 1 ) figcaption[i].removeAttribute("style");
	}
	
	var title = document.getElementsByClassName('title').item(0);
	if( title )
	{
		var size = parseInt(getStyle(title, 'font-size'));
		while( title.scrollWidth > title.parentNode.offsetWidth )
		{
			size = size - 5;
			title.style.fontSize = size+'px';
		}
	}
	
	if( document.getElementsByClassName('imageportrait').length > 0 )
	{
		var title = document.getElementsByClassName('am_title').item(0);
		var titleParent = document.getElementsByClassName('title').item(0);
		if( title )
		{
			var size = parseInt(getStyle(titleParent, 'font-size'));
			while( title.scrollWidth > title.offsetWidth )
			{
				size = size - 5;
				titleParent.style.fontSize = size+'px';
			}
		}
	}
	
	var images = body.getElementsByTagName('img');
	for( var i = 0; i < images.length; i++ )
	{
		img = images.item(i);
		
	    img.onload = function()
	    {
	        width = this.naturalWidth;
			if( width < this.parentNode.offsetWidth )
			{
				this.parentNode.removeAttribute('data-rel');
			}
	    }
	}
	
	var iframes = body.getElementsByTagName('iframe');
	for( var i = 0; i < iframes.length; i++ )
	{
		iframe = iframes.item(i);
		if ( iframe.previousSibling && iframe.previousSibling.className != 'loading' )
		{
			var loading = document.createElement("div");
			loading.className = "loading";
			var src = "amreader:hyperlink/"+ iframe.src;
			loading.innerHTML = 'Loading video... <a href="'+iframe.src+'" style="display:initial" data-rel="'+ src +'">view on youtube</a>';
			iframe.parentNode.insertBefore(loading,iframe);
		}
		
	   	reloadYoutube(iframe);
	}
}

function getStyle(el,styleProp) {
  var camelize = function (str) {
    return str.replace(/\-(\w)/g, function(str, letter){
      return letter.toUpperCase();
    });
  };

  if (el.currentStyle) {
    return el.currentStyle[camelize(styleProp)];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(el,null)
                               .getPropertyValue(styleProp);
  } else {
    return el.style[camelize(styleProp)]; 
  }
}


function onPageShow()
{
	
}

function reloadYoutube(iframe)
{	
    var _timer=setInterval(function()
    {
		
		iframedoc = iframe.contentWindow || iframe.contentDocument;
	    if (iframedoc.document) iframedoc = iframedoc.document;
		
        if(iframedoc && iframedoc.body && iframedoc.getElementById('player'))
        {
            clearInterval(_timer);
			if ( iframe.previousSibling.className == 'loading' )iframe.parentNode.removeChild(iframe.previousSibling);
			
        }
		iframe.src = iframe.src;
    }, 2000)
}

function ToggleCaption(e)
{
	if( e.srcElement.className.search('open') > 0)
	{
		e.srcElement.className = "icon_info";
		e.srcElement.parentNode.getElementsByTagName('figcaption').item(0).style.display = "none";
	}
	else
	{
		e.srcElement.className = "icon_info open";
		e.srcElement.parentNode.getElementsByTagName('figcaption').item(0).style.display = "block";
	}
	
}