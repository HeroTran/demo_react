

var $ = require ('jquery');
export  function  imageExists(url:string){
    var image = new Image();

    image.src = url;

    if (image.complete) {
        return false;
    }
    else if (image.height === 0) {
        return false;
    }

    return true;
}

export function getDesignPack(params){
    var designPack = "";
    var listMagazine;
    if(getLocalStore("listSite") != null){
            listMagazine = getLocalStore("listSite").value;
    }
    if(listMagazine != null){
        for(let i=0;i<listMagazine.length;i++){
            if(listMagazine[i].siteId == params.siteId){
                designPack = listMagazine[i].designPack;
            }
        }
    }
    
    if(designPack == ""){designPack = "pcworld";}
    
    return designPack;
}

export function setLocalStore(key,value){
    localStorage.setItem(key,JSON.stringify({value}));
}


export function getLocalStore(key){
    return JSON.parse(localStorage.getItem(key));
}

export function removeLocalStore(key){
    return localStorage.removeItem(key);
}

//var url = "reader2/index.html?v=1498215675.84#issueID=78&tocID=1137&storyID=zinio_78_geode1707_article_003_01_1497868857.5151&orientation=portrait&mode=1&fontSize=0&navigate=11&width=768&height=1004&platform=tablet&layout=&path=publications/2941&designPath=designs/dp-DVP&issueTitle=For Testing"
//custom
//sites/reader2/index.html?v=1498224235.582#issueID=30&tocID=165&storyID=zinio_30_zuhwohde1607_001_002_003_Editorial_1467370214.4547&orientation=portrait&mode=1&fontSize=0&navigate=11&width=768&height=1004&platform=tablet&layout=correspondence_temp2.twig&path=publications/2923&designPath=designs/RollingStone&issueTitle=For Testing

export function createUrlForIFrame(params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,width,height,platform,issueTitle){
    var d = new Date();
    var version_time = d.getTime();
    var url = 'reader2/index.html?v='+version_time+'#issueID='+params.issueId+'&tocID='+tocID+'&storyID='+storyID+'&orientation='+orientation+'&mode='+mode+'&fontSize='+fontSize+'&navigate='+navigate+'&width='+width+'&height='+height+'&platform='+platform+'&'
    +'layout='+layout+'&path=publications/'+params.siteId+'&designPath=designs/'+designPack+'&issueTitle='+issueTitle+'';
    return url;
}

export function replaceNewUrl(designPack,orientation,platform,width,height,issueTitle){
    var d = new Date();
    var version_time = d.getTime();
    var url = 'reader2/index.html?v='+version_time+'#issueID=78&tocID=1137&storyID=zinio_78_geode1707_article_003_01_1497868857.5151&orientation='+orientation+'&mode=0&fontSize=0&navigate=11&width='+width+'&height='+height+'&platform='+platform+'&layout=&path=publications/2941&designPath=designs/'+designPack+'&issueTitle='+issueTitle+'';
    return url;
}

// Changes XML to Array
export function xmlToArray(xml) {
    var xmlDoc = StringToXML(xml);
	// Create the return object
	var obj = {};
    var landscape = [];
    var portrait = [];
    var node_landscape = xmlDoc.getElementsByTagName("landscape")[0];
    var node_portrait = xmlDoc.getElementsByTagName("portrait")[0];
    if(node_landscape != undefined){
        var child_landscape = node_landscape.children;
        if(child_landscape.length > 0){
            for(var i = 0;i < child_landscape.length; i++){
                var link = child_landscape[i].children[1].innerHTML;
                landscape.push(link);
            }
        }
    }

    if(node_portrait != undefined){
        var child_portrait = node_portrait.children;
        if(child_portrait.length > 0){
            for(var i = 0;i < child_portrait.length; i++){
                var link = child_portrait[i].children[1].innerHTML;
                portrait.push(link);
            }
        }
    }

    obj = {
        landscape:landscape,
        portrait:portrait
    }
	
	return obj;
};

function StringToXML(oString) {
    return (new DOMParser()).parseFromString(oString, "text/xml");
}
export function scroolIFrame(currentPage,width){
    $("iframe").contents().find("body").animate(
        {scrollLeft: width * currentPage}, 
        500,
        function(){
            document.querySelector("iframe").contentWindow['setCurrentPage'](currentPage+1);
        }
    );
}