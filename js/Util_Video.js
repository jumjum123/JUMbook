function videoutil(){
  var me = this;
  me.getHtml = function(image,video,idx){
    var html = "",style;
	if(video.length > 0){
	  style = "position:absolute;width:20px;height:20px;left:" + parseInt((image.left * scaleX) - 20) + "px;";
	  html += '<img class="videoButton" src="Icons/video.png" video="' + video + '"';
	  html += ' style="' + style + "top:" + parseInt((image.top * scaleY) + (idx * 20)) + 'px">';
    }
	return html;
  }
  me.click = function(clickData){
	var video = this.getAttribute("video");
    var bigDiv,html;
    html = '<video id="showVideo" src="' + videoFolder + video + '" controls autoplay></video>';
    bigDiv = getElementById("bigDiv");
    bigDiv.innerHTML = html;
    setTimeout(function(){
      elementShow(bigDiv,true);
	  getElementById("showVideo").onclick = function(){
	    elementShow(bigDiv,false);
        setTimeout(function(){
	      getElementById("showVideo").pause();
		  elementShow(bigDiv,false);
		  getElementById("showVideo").setAttribute("video","");
	      var elem = getElementById("showVideo");
	      elem.parentNode.removeChild(elem);
	    },200);
	  };
	  getElementById("showVideo").onended = function(){
	    elementShow(bigDiv,false);
	    var elem = getElementById("showVideo");
	    elem.parentNode.removeChild(elem);
	  }
    },80);
  }
}
videoUtil = new videoutil();