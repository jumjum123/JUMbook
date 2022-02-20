function backgroundutil(){
  var me = this;
  me.getHtml = function(background,i){
	var html,style;
	style = "position:absolute;width:" + parseInt(background.width * scaleX) + "px;";
	style += "height:" + parseInt(background.height * scaleY) + "px;";
	style += "left:" + parseInt(background.left * scaleX) + "px;";
	style += "top:" + parseInt(background.top * scaleY) + "px;";
	style += "z-Index:-1"
	html = '<div style="' + style + '">';
	html += '<canvas id="b_' + i + '" width="' + parseInt(background.width * scaleX) + 'px;"';
    html +=	' height="' + parseInt(background.height * scaleY) + 'px;"';
    html += ' class="canvasImage"></canvas>';
	html += '</div>\n';
	return html;		  
  }
  me.show = function(background,i){
    var img,canvas,ctx;
	img = new Image();
	canvas = getElementById("b_" + i);
	ctx = canvas.getContext('2d');
	img.onload = function(){
	  ctx.drawImage(img,-(background.part.left / background.part.scale),-(background.part.top / background.part.scale)
	               ,img.width + (background.part.left / background.part.scale)
	               ,img.height + (background.part.top / background.part.scale)
	               ,0,0,background.width * scaleX,background.height * scaleY);
	};
	img.src = imgFolder + background.fileName;
  };
  me.getHtmlColored = function(page){
	var html,style;
	style = "position:absolute;width:" + parseInt(page.width * scaleX) + "px;";
	style += "height:" + parseInt(page.height * scaleY) + "px;";
	style += "background-color:" + page.background + ";"
	style += "z-Index:-5"
	html = '<div style="' + style + '"></div>';
    return html;	  
  }  
}
backgroundUtil = new backgroundutil();