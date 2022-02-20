function pageutil(){
  var me = this;
  me.getHtml = function(page){
	var i;
	var html = "";
    function getBackgroundsHtml(){
	  var i,html;
	  html = "";
	  if(page.backgrounds){
	    if(page.backgrounds.length > 0){
	      for(i = 0; i < page.backgrounds.length; i++){
		    html += backgroundUtil.getHtml(page.backgrounds[i],i);
	      }
	    }
	  }
	  return html;
    }
    function getBodyHtml(){
	  var i,html;
	  html = "";
      if(page.images.length > 0){
        for(i = 0; i < page.images.length; i++){
          html += imageUtil.getHtml(page.images[i],i);
		  html += getVideosHtml();
		  html += getWeburlsHtml();
        }
      }
	  return html;
	  function getVideosHtml(){
        var html = "",j;
	    if(page.images[i].video){
		  if(page.images[i].video.length > 0){
            for(j = 0; j < page.images[i].video.length; j++){
              html += videoUtil.getHtml(page.images[i],page.images[i].video[j],j);
		    }
	      }
	    }
	    return html;
	  }
	  function getWeburlsHtml(){
        var html = "",j;
	    if(page.images[i].weburl){
		  if(page.images[i].weburl.length > 0){
		    for(j = 0; j < page.images[i].weburl.length; j++){
			  html += weburlUtil.getHtml(page.images[i],page.images[i].weburl[j],j);
		    }
		  }
	    }
	    return html;
	  } 
    }
    html += getBackgroundsHtml();
    html += getBodyHtml();
    if(page.texts.length > 0){
      for(i = 0; i < page.texts.length;i++) html += textUtil.getHtml(page.texts[i],i);
    }
    if(page.background) html += backgroundUtil.getHtmlColored(page);
    html += elementsUtil.getButtons();
    html += elementsUtil.getEmptyImg();
    html += elementsUtil.getSpeakText();
    html += elementsUtil.getZoomButton();
    if(page.plugins) html += Plugins.getHtml(page.plugins);
	if(adminMode){
      html += me.adminGetHtml(page);
	}
	return html; 
  };
  me.show = function(page){
	var i;
    TranslateShow(translateOn);
    elementShow("bigDiv",false);
    elementShow("speakText",false);
    elementShow("zoomButtonDiv",false);
	elementShow("adminPageDiv",false);
	elementShow("adminImageDiv",false);
	if(adminMode){
      me.adminShow();
	  imageUtil.adminShow();
	}
    me.setHandler();
    if(page.backgrounds){
	  for(i = 0; i < page.backgrounds.length;i++){
	    backgroundUtil.show(page.backgrounds[i],i);
	  }
    }
    if(page.backnoise){
	  if(page.backnoise.indexOf("http") > 0)
	    audioBackNoise.start(page.backnoise);
	  else
        audioBackNoise.start(audioFolder + page.backnoise);
    }
	doParallelFnc(page.images,
	  function(data,id,cb){imageUtil.show(data,id,cb);},
	  function(){ autorunTrigger(pageShownEvent);}
	);
    //for(i = 0; i < page.images.length;i++) imageUtil.show(page.images[i],i); 
  }  
  me.click = function(clickData){

  }
  me.setHandler = function(){
	if(adminMode) me.adminSetHandler();
	else{
	  elementsBindClick("canvasImage",imageUtil.click);
	  if(fotobook.faces){elementsBind("canvasImage","mousemove",imageUtil.mouseover);}
	  elementsBindClick("videoButton",videoUtil.click);
	  elementsBindClick("weburlButton",weburlUtil.click);
	  elementsBindClick("textSwitch",textUtil.click);
	  elementBindClick("zoomButton",imageUtil.clickZoom);
	}
    elementBindClick("showSettingsPage",showSettingsPage);
    elementsBindClick("pageAdress",switchToPage);
    elementBindToEvent("pageButtons","mouseover",function(){getElementById("pageButtons").style.backgroundColor = "#0f0";});
	elementBindToEvent("pageButtons","mouseout",function(){getElementById("pageButtons").style.backgroundColor = null;});  
  };
}
pageUtil = new pageutil();