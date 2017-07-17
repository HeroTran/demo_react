function AMCustomScript(mode, fontSize, navigate, cache, cb, readerObj) {
    try {

        var body = document.getElementsByTagName('body')[0];
        var cache = getQuery('cache', null);
        if (cache != null) {
            body.className += ' completed';
            //setPageTotalNumber();
            reloadStylesheets();
            if (typeof cb === 'function') {
                cb(readerObj);
            }
            var arrow = document.querySelectorAll(".arrow-style");
            if(arrow.length){
                for (var i = 0; i < arrow.length; i++) {
                    arrow[i].addEventListener('click', function(event) {
                        createEventFig(event);
                    });
                }
            }
            var scrollBot = document.querySelectorAll(".scrollBot");
            if(scrollBot.length){
                for (var i = 0; i < scrollBot.length; i++) {
                    scrollBot[i].addEventListener("click", function(event){ 
                            var id_chapter = this.getAttribute("href").substring(this.getAttribute("href").length,8);
                            var name_chapter = "chapter"+parseInt(id_chapter);
                            var aName = document.querySelector("a[name='"+name_chapter+"']");
                            if(aName != null){
                                scrollTo(this,body,aName,1000);
                            }
                    });
                }
            }

            var scrollTop = document.querySelectorAll(".scrollTop");
            if(scrollTop.length){
                for (var i = 0; i < scrollTop.length; i++) {
                    scrollTop[i].addEventListener("click", function(event){ 
                            var id_chapter = this.getAttribute("name").substring(this.getAttribute("name").length,7);
                            var name_chapter = "#chapter"+parseInt(id_chapter);
                            var aName = document.querySelector("a[href='"+name_chapter+"']")
                            if(aName != null){
                                scrollTo(this,body,aName,1000);
                            }
                    });
                }
            }
            return;
        }
       

        
        var content = document.querySelector('#t1 .container');
        var divImage = document.querySelectorAll('.container .image');
        var wrap_content = document.querySelector('#t1');
        removeFirstImage(body);
        initHeadInfro(content);
        addCaptionCamera(wrap_content);
        removeEmptyTabP();
        initCreditForImage(content);
        removeEmptyFigcaption();
        createStyleForFactBox(content);
        removeSpaceForContent(content);
        
        createphotoCredit(content);

        var platform = getQuery('platform', 'tablet');
        if (platform == 'mobile') {
            setTimeout(function(){ 
                var panelWidth = parseInt(getQuery('width', window.innerWidth));
                var panelHeight = parseInt(getQuery('height', window.innerHeight));
                var padding = 20;
                var padding_fig = 10;
                var max_height = 453;
                var max_device = 320;
                var scrollBot = document.querySelectorAll(".scrollBot");
                if(scrollBot.length){
                    for (var i = 0; i < scrollBot.length; i++) {
                        scrollBot[i].addEventListener("click", function(event){ 
                                var id_chapter = this.getAttribute("href").substring(this.getAttribute("href").length,8);
                                var name_chapter = "chapter"+parseInt(id_chapter);
                                var aName = document.querySelector("a[name='"+name_chapter+"']");
                                if(aName != null){
                                    scrollTo(this,body,aName,1000);
                                }
                        });
                    }
                }

                var scrollTop = document.querySelectorAll(".scrollTop");
                if(scrollTop.length){
                    for (var i = 0; i < scrollTop.length; i++) {
                        scrollTop[i].addEventListener("click", function(event){ 
                                var id_chapter = this.getAttribute("name").substring(this.getAttribute("name").length,7);
                                var name_chapter = "#chapter"+parseInt(id_chapter);
                                var aName = document.querySelector("a[href='"+name_chapter+"']")
                                if(aName != null){
                                    scrollTo(this,body,aName,1000);
                                }
                        });
                    }
                }
                createStyleForFrame(content, panelWidth, padding,platform);
                setHeightWidthImage(panelWidth, panelHeight, content, divImage, padding , max_height, max_device, padding_fig);
                setHeightWidthImageOfFactBox(content,max_height);
                if(divImage.length){
                    for(var i = 0 ; i < divImage.length; i++){
                        var divImg = divImage[i];
                        var credit = divImg.querySelector(".credit");
                        var imgHeigth = divImg.querySelector("img").offsetHeight;
                        var imgWidth = divImg.querySelector("img").offsetWidth;
                        //add icon camera
                        var dataRel = divImg.querySelector("img").getAttribute("data-rel");
                        if(dataRel != null){
                            var icCamera = createElement('div', 'ic-camera');
                            icCamera.setAttribute('data-rel',dataRel);
                            divImg.insertBefore(icCamera,divImg.children[1]);
                            if(imgWidth < panelWidth){
                                var positionRight = (divImg.offsetWidth - imgWidth) / 2 ;
                                icCamera.style.right = (positionRight + 12) + "px";
                            }
                        }
                        if(credit != null){
                            
                            var maxCreditHeight = imgHeigth - 40;
                            createAttr('style','max-height:' + maxCreditHeight + 'px;', credit);
                            credit.className += " fig-style";
                            divImg.className += " default-style";
                            var div = createElement('div', 'arrow-style');
                            divImg.insertBefore(div,divImg.children[1]);
                            credit.className += ' hide-fig';
                            if(divImg.querySelector("figcaption") == null){
                                credit.className += " not-credit";
                                div.className += " not-fig";
                            }else{
                                var fig = divImg.querySelector("figcaption").offsetHeight;
                                var margin = 30;
                                var bottom = 8;
                                var credit_bottom = 0;
                                
                                var positionBottom = fig + margin;
                                credit.style.bottom =  (positionBottom + credit_bottom) + "px";
                                div.style.bottom = (positionBottom - bottom) + "px";
                            }
                            if(imgWidth < divImg.offsetWidth){
                                var positionRight = (divImg.offsetWidth - imgWidth) / 2 ;
                                var widthCredit = imgWidth - 40;
                                credit.style.left =  (positionRight + 20) + "px";
                                credit.style.width =  widthCredit + "px";
                                div.style.right = (positionRight + 10) + "px";

                            }
                            divImg.querySelector(".arrow-style").className += ' info-fig';
                            divImg.querySelector(".arrow-style").className += ' custom-action';
                            divImg.querySelector(".arrow-style").addEventListener("click", function(event){ 
                                createEventFig(event);
                                
                            });
                         }
                    }
                }
            }, 
            500);
            return;
        }
        setTimeout(function(){ 
            var panelWidth = parseInt(getQuery('width', window.innerWidth));
            var panelHeight = parseInt(getQuery('height', window.innerHeight));
            console.log(panelWidth);
            createAttr('style', 'max-height:' + (panelHeight - 101) + 'px;', wrap_content);
            var isLandscape = false;
            var max_height = 610;
            if (document.querySelector('#t1').className.indexOf('landscape') >= 0) {
                isLandscape = true;
            }
            
            if(!isLandscape){//this is portrait
                var padding = 65;
                var padding_fig = 20;
                var max_device = panelWidth;
                createStyleForFrame(content, panelWidth, padding,platform);
                setHeightWidthImage(panelWidth, panelHeight, content, divImage, padding, max_height, max_device, padding_fig);
            }
            else{//this is landscape
                var padding = 90;
                var padding_fig = 20;
                var max_device = panelWidth;
                createStyleForFrame(content, panelWidth, padding,platform);
                setHeightWidthImage(panelWidth, panelHeight, content, divImage, padding, max_height, max_device, padding_fig);
            }
            setHeightWidthImageOfFactBox(content,max_height);
            if(divImage.length){
                for(var i = 0 ; i < divImage.length; i++){
                    var divImg = divImage[i];
                    var imgHeigth = divImg.querySelector("img").offsetHeight;
                    var imgWidth = divImg.querySelector("img").offsetWidth;
                    checkShowGallery(divImg);
                    var credit = divImg.querySelector(".credit");
                    //add icon camera
                    var dataRel = divImg.querySelector("img").getAttribute("data-rel");
                    if(dataRel != null){
                        var icCamera = createElement('div', 'ic-camera');
                        icCamera.setAttribute('data-rel',dataRel);
                        divImg.insertBefore(icCamera,divImg.children[1]);
                        if(imgWidth < divImg.offsetWidth){
                            var positionRight = (divImg.offsetWidth - imgWidth) / 2 ;
                            icCamera.style.right = (positionRight + 12) + "px";
                        }
                    }
                     if(credit != null){
                        
                        var maxCreditHeight = imgHeigth - 40;
                        createAttr('style','max-height:' + maxCreditHeight + 'px;', credit);
                        credit.className += " fig-style";
                        divImg.className += " default-style";
                        var div = createElement('div', 'arrow-style');
                        divImg.insertBefore(div,divImg.children[1]);
                        credit.className += ' hide-fig';
                        

                        if(divImg.querySelector("figcaption") == null){
                             credit.className += " not-credit";
                             div.className += " not-fig";
                        }else{
                            var fig = divImg.querySelector("figcaption").offsetHeight;
                            var margin = 29;
                            var bottom = 8;
                            var credit_bottom = 0;
                            var positionBottom = fig + margin;
                            credit.style.bottom =  (positionBottom + credit_bottom) + "px";
                            div.style.bottom = (positionBottom - bottom) + "px";
                        }
                        if(imgWidth < divImg.offsetWidth){
                            var positionRight = (divImg.offsetWidth - imgWidth) / 2 ;
                            var widthCredit = imgWidth - 40;
                            credit.style.left =  (positionRight + 20) + "px";
                            credit.style.width =  widthCredit + "px";
                            div.style.right = (positionRight + 10) + "px";

                        }
                        divImg.querySelector(".arrow-style").className += ' info-fig';
                        divImg.querySelector(".arrow-style").className += ' custom-action';
                        divImg.querySelector(".arrow-style").addEventListener("click", function(event){ 
                            createEventFig(event);
                            
                        });
                     }
                }
            }
            reloadStylesheets();
            
            var scrollBot = document.querySelectorAll(".scrollBot");
            if(scrollBot.length){
                for (var i = 0; i < scrollBot.length; i++) {
                    scrollBot[i].addEventListener("click", function(event){ 
                            var id_chapter = this.getAttribute("href").substring(this.getAttribute("href").length,8);
                            var name_chapter = "chapter"+parseInt(id_chapter);
                            var aName = document.querySelector("a[name='"+name_chapter+"']");
                            if(aName != null){
                                scrollTo(this,body,aName,1000);
                            }
                    });
                }
            }

            var scrollTop = document.querySelectorAll(".scrollTop");
            if(scrollTop.length){
                for (var i = 0; i < scrollTop.length; i++) {
                    scrollTop[i].addEventListener("click", function(event){ 
                            var id_chapter = this.getAttribute("name").substring(this.getAttribute("name").length,7);
                            var name_chapter = "#chapter"+parseInt(id_chapter);
                            var aName = document.querySelector("a[href='"+name_chapter+"']")
                            if(aName != null){
                                scrollTo(this,body,aName,1000);
                            }
                    });
                }
            }
        }, 

        500);
        
    } catch (e) {
        console.log(e);
    }
}

function setHeightWidthImage(panelWidth, panelHeight, content, divImage, 
                             padding , max_height, max_device, padding_fig){
    if(divImage.length){
        for (i = 0; i < divImage.length; i++) {
            var divImg = divImage[i];

            if(divImg.nextElementSibling != null){
                if(divImg.nextElementSibling.className.indexOf("image") < 0){
                    if(divImg.querySelector("figcaption") != null){
                        divImg.className += ' margin-image';
                        }
                    else{
                        divImg.className += ' margin-bottom-image';
                    }
                }
                
            }   
            if(divImg.previousElementSibling != null){
                if(divImg.previousElementSibling.className.indexOf("image") >= 0){
                    divImg.className += ' martop-image';
                }
            }
            
            var img = divImg.querySelector("img");
            //case width full
            var width = parseInt(img.getAttribute('width'));
            var height = parseInt(img.getAttribute('height'));
            

            if(width > height){
                if(width >= max_device){
                    divImg.style.position = "relative";
                    divImg.style.left  = -(padding) + "px";
                    divImg.style.width  = panelWidth + "px";
                    resetWidthHeightImage(img , panelWidth, panelHeight);
                    var figImage = divImg.querySelector("figcaption");
                    if(figImage != null){
                        createAttr('style', 'padding-left:' + padding_fig + 'px;padding-right:' + padding_fig + 'px', figImage);
                    }
                }else{
                    if(width >= (panelWidth - (padding * 2))){
                        var maxWidthImage = panelWidth - (padding * 2);
                        var maxHeightImage = max_height;
                        resetWidthHeightImage(img ,maxWidthImage, maxHeightImage);
                    }
                }
            }else{
                var maxHeightImage = max_height;
                var maxWidthImage = Math.floor(maxHeightImage * (width/height));
                resetWidthHeightImage(img ,maxWidthImage, maxHeightImage);
                var width_curent = img.offsetWidth;
                if(width_curent < maxWidthImage && img.offsetHeight <= maxHeightImage){
                    var height_current = Math.floor(width_curent * (height/width));
                    resetWidthHeightImage(img ,width_curent, height_current);
                }
                
            }
            
        }
    }
}
//checkShowGallery
function checkShowGallery(divImg){
    var imgHeigth = divImg.querySelector("img").offsetHeight;
    var imgWidth = divImg.querySelector("img").offsetWidth;
    var dataRel = divImg.querySelector("img").getAttribute("data-rel")
    //row must than 750x250  and 250x750
    if(dataRel != null){
        if((imgWidth <= 750 && imgHeigth <= 250) || (imgHeigth <= 750 && imgWidth <= 250)){
            divImg.querySelector("img").removeAttribute("data-rel");
        }
    }
}
//reset Width Height Image in content
function resetWidthHeightImage(img ,maxWidthImage, maxHeightImage){
    img.className += ' centerImage';
    var w = parseInt(img.getAttribute('width'));
    var h = parseInt(img.getAttribute('height'));
    if (w > maxWidthImage) {
        var nw = maxWidthImage;
        var nh = Math.floor(nw / w * h);
        if (nh > maxHeightImage) {
            nh = maxHeightImage;
            nw = Math.floor(nh / h * w);
        }
        img.setAttribute('width', nw);
        img.setAttribute('height', nh);
        createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
    } else if (h > maxHeightImage) {
        var nh = maxHeightImage;
        var nw = Math.floor(nh / h * w);
        if (nw > maxWidthImage) {
            nw = maxWidthImage;
            nh = Math.floor(nw / w * h);
        }
        img.setAttribute('width', nw);
        img.setAttribute('height', nh);
        createAttr('style', 'width:' + nw + 'px;height:' + nh + 'px', img);
       
    }
}

function setHeightWidthImageOfFactBox(content, max_height){
    var box = content.querySelector("table");
    if(box != null){
        var max_width = box.offsetWidth;
        var allImage = content.querySelectorAll("table .image");
        content.querySelector("table td").lastElementChild.className += " not_bottom";
        if(allImage.length){
            for (i = 0; i < allImage.length; i++) {
                var divImg = allImage[i];
                divImg.removeAttribute("style");
                var img = divImg.querySelector("img");
                //case width full
                var width = parseInt(img.getAttribute('width'));
                var height = parseInt(img.getAttribute('height'));
                if(width > height){
                    var maxWidthImage = max_width;
                    var maxHeightImage = max_height;
                    resetWidthHeightImage(img ,maxWidthImage, maxHeightImage);
                }else{
                    var maxHeightImage = max_height;
                    var maxWidthImage = Math.floor(maxHeightImage * (width/height));
                    resetWidthHeightImage(img ,maxWidthImage, maxHeightImage);
                    var width_curent = img.offsetWidth;
                    if(width_curent < maxWidthImage && img.offsetHeight <= maxHeightImage){
                        var height_current = Math.floor(width_curent * (height/width));
                        resetWidthHeightImage(img ,width_curent, height_current);
                    }
                    
                }
            }
        }
    }
    
    

}

function initCreditForImage(content){
    var image = document.querySelectorAll('.container .image');
    if(image.length){   
        for(var i = 0; i<image.length; i++){
            var img = image[i];
            var img_child = img.querySelector("img");
            var credit = img.querySelector(".credit");
            if(credit != null){
                if (credit.textContent.trim() == '') {
                    credit.parentNode.removeChild(credit);
                }else{
                    img_child.parentNode.insertBefore(credit, img_child);
                }
            }
        }
    }
}
function createEventFig(event){
    if(event != null){
        event.stopPropagation();
        event.preventDefault();
    }
    var image = event.currentTarget.parentNode;
    var credit = image.querySelector(".credit");
    if(credit != null){
        if(image.querySelector(".arrow-style").className.indexOf("info-fig") < 0 ){
            image.querySelector(".arrow-style").classList.remove("close-fig");
            image.querySelector(".arrow-style").className += ' info-fig';
            credit.className += ' hide-fig';
            credit.classList.remove("show-fig");
        }
       else{
           image.querySelector(".arrow-style").classList.remove("info-fig");
           image.querySelector(".arrow-style").className += ' close-fig';
           credit.classList.remove("hide-fig");
           credit.className += ' show-fig';
       }
    }
   return false;      
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

/*function getQuery(name, defVal) {
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
   
    return res ? res[1] : defVal;
}
*/
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

function checkBrowerEdge() {
    var isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1;
    var isIE = window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 || window.navigator.appVersion.toLowerCase().indexOf('trident/') > -1 ;
    if (isEdge || isIE){
        return true;
    }
    return false;
}


function createStyleForFrame(content, panelWidth, padding,platform){
    var frame = content.querySelectorAll("iframe");
    if(frame.length > 0){
        for(var i = 0; i < frame.length; i++){
            if(platform == 'mobile'){
                var maxHeightFrame = Math.floor((panelWidth - padding) * 0.6 );
                createAttr('style', 'width: ' + (100) + '%; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);
            }else{
                
                if(frame[i].offsetWidth > panelWidth - padding){
                    var maxHeightFrame = Math.floor(frame[i].offsetWidth * (frame[i].offsetHeight/frame[i].offsetWidth));
                    createAttr('style', 'width: ' + (100) + '%; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);
                }else{
                    var maxHeightFrame = Math.floor((panelWidth - padding) * 0.6 );
                    createAttr('style', 'width: ' + (frame[i].offsetWidth) + 'px; height:' + maxHeightFrame + 'px; max-height:' + maxHeightFrame + 'px; ', frame[i]);

                }
            }
            
           
        }
    }
}

function createphotoCredit(content){
    var photo = content.querySelector(".photo-credit");
    if(photo == null){
        var last = content.lastElementChild;
        if(last != null){
            var div_photo = document.createElement('p');
            div_photo.className = 'end-credit';
            content.appendChild(div_photo);
            var end = content.querySelector(".end-credit");
            if(end.previousElementSibling != null){
                end.previousElementSibling.className += ' no-margin-bt';
            }
        }
    }
}
function createStyleForFactBox(content){
    var table = content.querySelectorAll('table');
    if(table != null){
        for(var i=0; i < table.length; i++){
            if(table[i].parentNode != undefined && table[i].parentNode != null){
                table[i].parentNode.className = " factbox";
            }
        }
    }
}

function removeSpaceForContent(content){
    var header = content.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    if(header.length > 0){
        for(var i=0;i<header.length;i++){
            header[i].innerHTML = header[i].innerHTML.replace(/&nbsp;/g, ' ');
        }
    }
}

function initHeadInfro(content){
    var author = content.querySelector(".author");
    if(author == null){
        var subtitle = content.querySelector(".subtitle");
        if(subtitle){
            subtitle.className += ' no-margin-bot'
        }
    }
}

function addCaptionCamera(wrap_content){
    var caption = wrap_content.querySelector(".caption");
    var icon_camera = wrap_content.querySelector(".icon-camera");
    if(icon_camera != null){
        caption.className += ' cap_camera';
    }
}

function removeFirstImage(container) {
    var defaultImage = document.querySelector('.defaultImage');
    if (defaultImage) {
        var defaultImageName = defaultImage.querySelector('img').getAttribute('alt');
        var firstImage = container.querySelectorAll('.image img')[1];
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


//this is function how to scoll top or bottom what you want 

function scrollTo(element,body,anchorEl,duration) {
    var to;
    var wrap_element;
    
    if(body.className.indexOf("mobile") != -1){
        wrap_element = document.body;
        //to = wrap_element.offsetHeight;
    }else{
        wrap_element = document.querySelector('#t1');
        //to = document.querySelector('#t1 .container').offsetHeight;
    }
    to = anchorEl.offsetTop;
    var start = element.offsetTop,
        change = to - start,
        currentTime = 0,
        increment = 50;
     
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        
        wrap_element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};



