
var getQuery = require('./getQuery.js');
var getStyle = require('./getStyle.js');
var initNavigate = require('./initNavigate.js');
var setPageTotalNumber = require('./setPageTotalNumber.js');
var reloadStylesheets = require('./reloadStylesheets.js');
var createEventFig = require('./createEventFig.js');
var removeEmptyFigcaption = require('./removeEmptyFigcaption.js');
var removeEmptyTabP = require('./removeEmptyTabP.js');
var removeFirstImage = require('./removeFirstImage.js');
var moveFigcaption = require('./moveFigcaption.js');
var setLanguage = require('./setLanguage.js');
var createElement = require('./createElement.js');
var createAttr = require('./createAttr.js');
var checkBrowerEdge = require('./checkBrowerEdge.js');
var initTouch = require('./initTouch.js');
var divideContent = require('./divideContent.js');



window.AMCustomScript = function (mode, fontSize, navigate, cache, cb, readerObj) {
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

