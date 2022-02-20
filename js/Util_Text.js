function textutil(){
  var me = this;
  me.getHtml = function(text,i){
    function textLength(txt){
      var l = 0,i;
      for(i = 0; i < txt.length; i++)l += txt[i].length;
	  return l;
	}
	var html,txt,style;
	style = "position:absolute;width:" + parseInt(text.width * scaleX) + "px;";
	style += "height:" + parseInt(text.height * scaleY) + "px;";
	style += "left:" + parseInt(text.left * scaleX) + "px;";
	style += "top:" + parseInt(text.top * scaleY) + "px;";
	if(text.style){
      style += "font-family:" + text.style.font + ";";
	  style += "font-size:" + parseInt(text.style.size) + "px;";
	  style += "color:" + text.style.color + ";";
	}
	html = '<div id="txt_' + i + '" style="' + style + '">' + text.text + '</div>\n';
	if(textLength(text.text) > 250){
	  translateOn = true;
      style = "position:absolute;width:20px;height:20px;";
	  style += "left:" + parseInt(text.left * scaleX -20) + "px;";
	  style += "top:" + parseInt(text.top * scaleY) + "px;";
	  html += '<img id="t_' + i + '" class="textSwitch" src="Icons/speaker.png" style="' + style + '">';
	}
	return html; 
  }  
  me.click = function(){
	var text = getElementById("txt_" + this.id.split("_")[1]).innerText;
    if(isSpeaking()) stopSpeak();
    else speakLanguage(text);
  };
}
textUtil = new textutil();
