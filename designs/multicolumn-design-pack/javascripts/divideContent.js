var wrapSpan = require('./wrapSpan.js');
var checkBrowerEdge = require('./checkBrowerEdge.js');
var createStyleWSInEdge = require('./createStyleWSInEdge.js');
var createWhiteSpace = require('./createWhiteSpace.js');
var Languages = require('./languages.js');


module.exports = function (body, ws, content, padding, docHeight, headerHeight, colWidth, isLandscape, captionHeight, panelWidth) {
    //create head space
    var wspace = createWhiteSpace(ws[0]);
    content.insertBefore(wspace, content.firstChild);
    createStyleWSInEdge(0);
    var wspace2 = createWhiteSpace(ws[1]);
    var currentElement;
    var allChild = content.children;
    var lengthChild = allChild.length;
    var k = 1;
    var check = true;
    while (k < lengthChild && allChild[k].offsetLeft < panelWidth && check && lengthChild >= 3) {
        if (allChild[k].nodeName.indexOf('DIV') < 0 && allChild[k].nodeName.indexOf('IFRAME') < 0) {
            if (allChild[k].offsetTop + allChild[k].offsetHeight > docHeight || allChild[k].offsetLeft > colWidth) {
                currentElement = allChild[k];
                if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('image') < 0 && currentElement.className.indexOf('white-space') < 0 && currentElement.className.indexOf("eof") < 0 ) {

                    if (currentElement.className.indexOf('spanned') < 0) {
                        wrapSpan(currentElement);
                    }
                    var spans = currentElement.querySelectorAll('span');
                    var cont = true;
                    var i = 0;
                    while (i < spans.length && cont) {
                        if (spans[i].offsetLeft > colWidth) {
                            cont = false;
                            if(currentElement.nodeName.indexOf("FIGCAPTION") >= 0){
                                if(currentElement.previousElementSibling.classList.contains("image") || currentElement.previousElementSibling.className.indexOf("white-space") >= 0){
                                    currentElement.className += ' overrive-style';
                                }
                            }

                            if(content.querySelector(".default-image") == null){
                                currentElement.classList.remove("overrive-style");
                            }
                            if (i > 0) {
                                if (spans[i - 1].offsetLeft + spans[i - 1].offsetWidth > currentElement.offsetWidth - 10) {
                                    i = i - 2;
                                    /*i--;*/
                                }
                                if (!checkBrowerEdge()) {
                                    currentElement.classList.remove("overrive-style");
                                }
                            }
                            if (checkBrowerEdge()) {
                               if(currentElement.classList.contains("overrive-style")){
                                    spans[i].parentNode.insertBefore(wspace2, spans[i]);
                                    createStyleWSInEdge(1);
                               }else{
                                    spans[i].parentNode.insertBefore(wspace2, spans[i]);

                               }
                            }else{
                                 spans[i].parentNode.insertBefore(wspace2, spans[i]);
                            }
                           
                        } else {
                            i++;
                        }
                    }
                    if (i == spans.length) {
                        currentElement.className += ' no-margin-bot';
                        currentElement.parentNode.insertBefore(wspace2, currentElement.nextSibling);
                    }
                } else if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('white-space') >= 0) {
                    content.insertBefore(wspace2, currentElement.nextSibling);
                }

                check = false;
            }
        } else {
            if (allChild[k].className.indexOf("default-image") < 0 && allChild[k].className.indexOf("image") >= 0 && allChild[k].offsetLeft > colWidth) {
                content.insertBefore(wspace2, allChild[k]);
                check = false;
            } else if (allChild[k].nextElementSibling.className.indexOf("image") >= 0 && allChild[k + 1].offsetLeft > colWidth) {
                content.insertBefore(wspace2, allChild[k].nextSibling);
                check = false;
            }
        }
        k++;
    }
    //add white space in landscape
    if (isLandscape) {
        var wspace3 = createWhiteSpace(ws[2]);
        if (k > 0) {
            k = k - 1;
        }
        var checkLandcape = true;
        while (k < lengthChild && allChild[k].offsetLeft < panelWidth && checkLandcape && lengthChild >= 3) {
            if (allChild[k].nodeName.indexOf('DIV') < 0 && allChild[k].nodeName.indexOf('IFRAME') < 0 && allChild[k].className.indexOf('white-space') < 0) {
                if (allChild[k].offsetTop + allChild[k].offsetHeight > docHeight || allChild[k].offsetLeft > colWidth * 2 ) {
                    var condition = false;
                    if (allChild[k].className.indexOf('spanned') >= 0 && allChild[k].querySelectorAll("span")[allChild[k].querySelectorAll("span").length - 1].offsetLeft > colWidth * 2 && allChild[k].className.indexOf("eof") < 0 ) {
                        currentElement = allChild[k];
                        condition = true;
                    } else {
                        if (allChild[k].offsetLeft > colWidth && allChild[k].className.indexOf("white-space") < 0 && allChild[k].className.indexOf("eof") < 0) {
                            currentElement = allChild[k];
                            condition = true;
                        }
                    }
                    if (condition) {
                        if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('image') < 0 && currentElement.className.indexOf('white-space') < 0) {
                            if (currentElement.className.indexOf('spanned') < 0) {
                                wrapSpan(currentElement);
                            }
                            var spans = currentElement.querySelectorAll('span');
                            var cont = true;
                            var i = 0;
                            while (i < spans.length && cont) {
                                if (spans[i].offsetLeft > colWidth * 2) {
                                    
                                    cont = false;
                                    if (i == 0) {
                                        if (content.querySelector(".default-image") == null){
                                            currentElement.parentNode.insertBefore(wspace3, currentElement);
                                        }else{
                                            if (checkBrowerEdge()) {
                                                if (spans[i].className.indexOf("white-space") < 0) {
                                                    spans[i].parentNode.insertBefore(wspace3, spans[i]);
                                                    createStyleWSInEdge(2);
                                                }
                                            }else{
                                                if (currentElement.previousElementSibling.className.indexOf("white-space") < 0) {
                                                    currentElement.parentNode.insertBefore(wspace3, currentElement);
                                                }
                                            }
                                        }
                                        
                                    } else {
                                        if (spans[i - 1].offsetLeft + spans[i - 1].offsetWidth > currentElement.offsetWidth - 10) {
                                            i--;
                                        }

                                        if(content.querySelector(".default-image") == null){
                                            spans[i].parentNode.insertBefore(wspace3, spans[i]);
                                        }else{
                                             if(spans[i].className.indexOf("white-space") < 0){
                                                spans[i].parentNode.insertBefore(wspace3, spans[i]);
                                            }
                                        }
                                    }
                                } else {
                                    i++;
                                }
                            }
                            if (i == spans.length) {
                                currentElement.className += ' no-margin-bot';
                                currentElement.parentNode.insertBefore(wspace3, currentElement.nextSibling);
                            }
                        } else if (currentElement != null && currentElement.className != undefined && currentElement.className.indexOf('white-space') >= 0) {
                            content.insertBefore(wspace3, currentElement.nextSibling);
                        }

                        checkLandcape = false;
                    } else {
                        checkLandcape = true;
                    }

                }
            } else {
                if (allChild[k].className.indexOf("default-image") < 0 && allChild[k].className.indexOf("image") >= 0 && allChild[k].offsetLeft > colWidth * 2) {
                    if (content.querySelector(".default-image") != null) {
                        content.insertBefore(wspace3, allChild[k]);
                    } else {
                        content.insertBefore(wspace3, allChild[k].previousSibling);
                    }
                    checkLandcape = false;
                } else if (content.querySelector(".default-image") != null && allChild[k].nextElementSibling.className.indexOf("image") >= 0 && allChild[k + 1].offsetLeft > colWidth * 2) {
                    content.insertBefore(wspace3, allChild[k].nextSibling);
                    checkLandcape = false;
                }
            }
            k++;
        }
    }
}

