module.exports = function getQuery(name, defVal) {
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
   
    return res;
}
