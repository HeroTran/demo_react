module.exports = function removeSpaceForContent(content){
    var header = content.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    if(header.length > 0){
        for(var i=0;i<header.length;i++){
            header[i].innerHTML = header[i].innerHTML.replace(/&nbsp;/g, ' ');
        }
    }
}
