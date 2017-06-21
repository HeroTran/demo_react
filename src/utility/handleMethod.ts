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