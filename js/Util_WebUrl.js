function weburlutil(){
  var me = this;
  me.getHtml = function(image,weburl,idx){
    var html = "",style;
	style = "position:absolute;width:20px;height:20px;left:" + parseInt((image.left * scaleX) - 20) + "px;";
	html += '<img class="weburlButton" src="Icons/weburl.png" url="' + weburl + '"';
	html += ' style="' + style + "top:" + parseInt(((image.top + image.height - 20) * scaleY) - (idx * 20)) + 'px">';
	return html;  
  }  
  me.click = function(){
	var url = this.getAttribute("url");
    var w = window.open(url,"_blank");
  };
}
weburlUtil = new weburlutil();
