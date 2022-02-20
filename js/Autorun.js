var pageShownEvent = new Event('pageShown');
var bigImageShownEvent = new Event('bigImageShown');
function autorunTrigger(evt){
  if(autorun) document.dispatchEvent(evt);
}
function initAutoRun(){
  document.removeEventListener("pageShown",pageShownHandler);
  document.removeEventListener("imageShown",bigImageShownHandler);
  if(settings.General.showPage) document.addEventListener('pageShown',pageShownHandler,true);
  if(settings.Image.Samples) document.addEventListener("bigImageShown",bigImageShownHandler,true);
}
function pageShownHandler(){
  setTimeout(function(){
    //if(++aktPage >= pagesextended.length) aktpage = 0;
	if(settings.Image.Samples) AutorunImages();
	else{
      if(++aktPage >= pagesextended.length) aktpage = 0;
	  showPage();
	}
  },getSpeedSetting());
  //if(aktPage >= pagesextended.length) aktPage = 0;
  //if(settings.Image.Samples) AutorunImages();
  //else AutorunPage();
}
function AutorunImages(){
  aktImage = 0;
  clickElementById("c_" + aktImage);
}
function bigImageShownHandler(){
  setTimeout(function(){
    if(++aktImage >= pagesextended[aktPage].images.length){
      if(++aktPage >= pagesextended.length) aktpage = 0;
	  showPage();
	}
	clickElementById("c_" + aktImage);
  },getSpeedSetting());
}
function AutorunPage(){
  setTimeout(function(){
    aktPage++;
    if(aktPage >= pagesextended.length) aktPage = 0;
    showPage();
  },getSpeedSetting());
}
/*function AutorunImagesOld(){
  var i = 0,images = pagesextended[aktPage].images;
  setTimeout(function(){
    if(images.length > 0) showImage();
	else showPage();
  },getSpeedSetting());
  if(images.length > 0) showImage();
  function showImage(){
    clickElementById("c_" + i);
    setTimeout(function(){
	  clickElementById("bigImg");
      i++;
	  if(i >= images.length) AutorunPage();
	  else showImage();
    },getSpeedSetting());
  }
}
*/