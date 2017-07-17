
//this is function how to touch in brower for window phone

module.exports = function initTouch(content,colWidth,page,isLandscape,panelWidth){
    document.querySelector(".completed").setAttribute("style","overflow:hidden;touch-action: none;-ms-touch-action: none;");
    var totalWidth;
    if(isLandscape){
        totalWidth = colWidth * 3;
    }
    else{
        totalWidth = colWidth * 2;
    }
    var el = document.getElementById('t1'); 
    var curindex = 0, moveLeft = 0;
    var heightContent = window.innerHeight - document.querySelector('.footer').offsetHeight;
    
    ontouch(el, function(evt, dir, phase, swipetype, distance){
        if (phase == 'start'){
           moveLeft =  el.scrollLeft || 0;
        }
        else if (phase == 'move' && (dir =='left' || dir =='right')){
            var totaldist = distance + moveLeft;
        }
        else if (phase == 'end'){
            if(evt.pageY <= heightContent){
                if(swipetype != 'none'){
                    if (swipetype == 'left' || swipetype == 'right'){
                    var flag = true;
                    if(swipetype == 'left'){
                         if(curindex <= page - 1 ){
                            curindex++;
                            if(curindex  == page){
                                flag = false;
                                curindex = page - 1;
                            }
                        }
                        
                    }else{
                        if(curindex >= 0 ){
                            curindex--;
                            if(curindex +1 == 0){
                                flag = false;
                                curindex = 0;
                            }
                        }
                        
                    }
                }
                if(flag){
                    scrollLeft(document.querySelector(".completed"),curindex * totalWidth,500 );
                    currentPage = curindex > 0 ? curindex + 1 : 1;
                    document.getElementById("c-page").innerHTML = currentPage;
                }else{
                    document.querySelector(".completed").setAttribute("style","overflow:hidden;");
                }
                }
            }
            
        }
    }) 

    function ontouch(el, callback){
        
        var touchDevice = el,
        dir,
        swipeType,
        startX,
        startY,
        distX,
        distY,
        threshold = 10, 
        restraint = 200,
        allowedTime = 500; 
        var elapsedTime,startTime;
        handletouch = callback || function(evt, dir, phase, swipetype, distance){}
          touchDevice.addEventListener('pointerdown', function(e){
           var clientX = e.pageX,clientY = e.pageY;
            dir = 'none';
            swipeType = 'none';
            dist = 0;
            startX = clientX;
            startY = clientY;
            startTime = new Date().getTime();
            handletouch(e, 'none', 'start', swipeType, 0); 
            e.preventDefault();
        }, false)
     
        touchDevice.addEventListener('pointermove', function(e){
            var clientX = e.pageX,clientY = e.pageY;
            distX = clientX - startX ;
            distY = clientY - startY; 
            dir = (distX < 0)? 'left' : 'right';
            handletouch(e, dir, 'move', swipeType, distX);
            e.preventDefault(); 
        }, false)
     
        touchDevice.addEventListener('pointerup', function(e){
            elapsedTime = new Date().getTime() - startTime;
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipeType = dir;
            }
            handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
            e.preventDefault();
        }, false)
        
     
         touchDevice.addEventListener('mousedown', function(e){
           var clientX = e.pageX,clientY = e.pageY;
                dir = 'none';
                swipeType = 'none';
                dist = 0;
                startX = clientX;
                startY = clientY;
                startTime = new Date().getTime();
                handletouch(e, 'none', 'start', swipeType, 0); 
                e.preventDefault();
        }, false)
     
        touchDevice.addEventListener('mousemove', function(e){
            var clientX = e.pageX,clientY = e.pageY;
            distX = clientX - startX ;
            distY = clientY - startY; 
            dir = (distX < 0)? 'left' : 'right'
            handletouch(e, dir, 'move', swipeType, distX);
            e.preventDefault(); 
        }, false)
     
        touchDevice.addEventListener('mouseup', function(e){
            elapsedTime = new Date().getTime() - startTime;
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipeType = dir;
            }
            handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
            e.preventDefault();
        }, false)
    }

    function scrollLeft(element, to, duration) {
        var start = element.scrollLeft,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
        var animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //smooth when scrollLeft
    Math.easeInOutQuad = function (t, b, c, d) {
     t /= d/2;
     if (t < 1) return c/2*t*t + b;
     t--;
     return -c/2 * (t*(t-2) - 1) + b;
    };
}
