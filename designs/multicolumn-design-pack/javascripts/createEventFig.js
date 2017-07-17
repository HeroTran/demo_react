module.exports = function createEventFig(event){
  if(event != null){
    event.stopPropagation();
      event.preventDefault();
  }
  var body = document.getElementsByTagName('body')[0];
  var default_image = body.querySelector(".default-image");
  var fig = default_image.querySelector("FIGCAPTION");
  if(default_image.querySelector(".arrow-style").className.indexOf("info-fig") < 0 ){
    default_image.querySelector(".arrow-style").classList.remove("close-fig");
      default_image.querySelector(".arrow-style").className += ' info-fig';
      fig.className += ' hide-fig';
      fig.classList.remove("show-fig");
  }
   else{
       default_image.querySelector(".arrow-style").classList.remove("info-fig");
     default_image.querySelector(".arrow-style").className += ' close-fig';
     fig.className += ' show-fig';
     fig.classList.remove("hide-fig");
   }
   return false;    
}
