function imageutil(){
  var me = this;
  me.getHtml = function(image,i){
    var html,style,borderWidth = 0,borderHeight = 0;
	if(image.border){
	  if(image.border.enabled == "1"){
        borderWidth = parseInt(image.border.size * scaleX);
        borderHeight = parseInt(image.border.size * scaleY);
      }
	  style = "position:absolute;width:" + (parseInt(image.width * scaleX) + borderWidth + borderWidth) + "px;";
      style += "height:" + (parseInt(image.height * scaleY) + borderHeight + borderHeight) + "px;"
      style += "left:" + (parseInt(image.left * scaleX) - borderWidth) + "px;";
      style += "top:" + (parseInt(image.top * scaleY) - borderHeight) + "px;";
	  if(!image.frame)
        style += "border-style:solid;border-width:" + borderWidth + "px;border-color:" + image.border.color + ";";	  
	}
	else{
	  style = "position:absolute;width:" + parseInt(image.width * scaleX) + "px;";
	  style += "height:" + parseInt(image.height * scaleY) + "px;";
	  style += "left:" + parseInt(image.left * scaleX) + "px;";
	  style += "top:" + parseInt(image.top * scaleY) + "px;";
	  style += "border-style:none;border-width:2px;border-color:#00ff00;";
	}
	html = '<div style="' + style + '" fileName="' + image.fileName + '">';
	html += '<canvas id="c_' + i + '" width="' + parseInt(image.width * scaleX) + 'px;"';
    html +=	' height="' + parseInt(image.height * scaleY) + 'px;"';
    if(image.border){
      if(image.border.enabled == "1"){
	    html += ' left="' + parseInt(borderWidth) + 'px;"';
	    html += ' top="' + parseInt(borderWidth) + 'px;"';
      }
    }
	html += ' class="canvasImage"></canvas>';
	html += '</div>\n';
	return html;
	  
  };
  me.show = function(image,i,cb){
    var img,canvas,ctx;
    img = new Image();
    canvas = getElementById("c_" + i);
    ctx = canvas.getContext('2d');
    if(image.alpha) ctx.globalAlpha = image.alpha;
    img.onload = function(){
      var part = {top:0,left:0,height:0,width:0};
	  switch(fotobook.version){
		case "4.0":
		  part.left = -(parseInt(image.part.left / image.part.scale));
		  part.top = -(parseInt(image.part.top / image.part.scale));
		  part.width = parseInt(image.width / image.part.scale);
		  part.height = parseInt(image.height / image.part.scale);
		  break;
        case "3.0":
		  part.left = -(parseInt(image.part.left));
		  part.top = -(parseInt(image.part.top));
		  part.width = parseInt(image.width / image.part.scale);
		  part.height = parseInt(image.height / image.part.scale);
          break;		  
	  }
	  image.imagePart = part;  //used for (face)recognitions
	  if(image.frame){
		showFrame(image.frame,parseInt(image.width * scaleX),parseInt(image.height * scaleY));
		ctx.clip();
		ctx.drawImage(img,part.left,part.top,part.width,part.height,
		              0,0,parseInt(image.width * scaleX),parseInt(image.height * scaleY));
	  }
	  else{
		ctx.drawImage(img,part.left,part.top,part.width,part.height,0,0,canvas.width,canvas.height);
      }
      replaceFace(image,canvas,ctx,"Fabian","Obama");
	  cb();
	};
    img.src = imgFolder + image.fileName;
    function showFrame(frame,width,height){
      switch(frame){
        case "circle":
		  var circumference = Math.max(width,height);
		  var radius = circumference / 2;
		  var scaleX = width / circumference;
		  var scaleY = height / circumference;
		  ctx.save();
		  ctx.translate(width / 2, height / 2);
		  ctx.scale(scaleX,scaleY);
		  ctx.beginPath();
		  ctx.arc(0,0,radius,0,Math.PI*2,true);
		  ctx.stroke();
		  ctx.closePath();
		  ctx.restore();
		  ctx.clip();
		  break;
        case "triangleUp":
		  ctx.save();
		  ctx.lineWidth = 3;
		  ctx.strokeStyle = '#fff';
		  ctx.beginPath();
		  ctx.moveTo(width / 2, 0);
		  ctx.lineTo(width,height);
		  ctx.lineTo(0,height);
		  ctx.closePath();
		  ctx.stroke();
		  ctx.restore();
		  break;
        case "triangleDown":
		  ctx.save();
		  ctx.lineWidth = 3;
		  ctx.strokeStyle = '#fff';
		  ctx.beginPath();
		  ctx.moveTo(0,0);
		  ctx.lineTo(width,0);
		  ctx.lineTo(width / 2,height);
		  ctx.closePath();
		  ctx.stroke();
		  ctx.restore();
		  break;
		default: break;
	  }
	}
  }  
  me.mouseover = function(e){
	var imageParts,image,imgFaces,imgX,imgY,i;
	imageParts = this.id.split("_");
	if(imageParts[0] == "c"){
      image = pagesextended[aktPage].images[imageParts[1]];
	  imgFaces = faces[image.fileName];
	  if(imgFaces){
	    imgX = e.layerX * (image.imagePart.width / this.width) + image.imagePart.left;
	    imgY = e.layerY * (image.imagePart.height / this.height) + image.imagePart.top;
	    this.title = "";
	    for(i = 0; i < imgFaces.length; i++){
          if(imgX > imgFaces[i].x && imgX < (imgFaces[i].x + imgFaces[i].w)){
		    if(imgY > imgFaces[i].y && imgY < (imgFaces[i].y + imgFaces[i].h)) this.title = imgFaces[i].label;   
          }
	    }
	  }
    }
  }
  me.click = function(clickData){
    var page = pagesextended[aktPage];
	aktImage = this.id.split("_")[1];
	var image = page.images[aktImage];
	var text = image.speak;
    bigImg(image);
	if(typeof text == "string"){
      if(text.length > 0){
        elementShow("speakText",true);
	    getElementById("speakText").innerHTML = text;
	    speakText(text,function(){
		  getElementById("speakText").innerHTML = "";
		  elementShow("speakText",false);
		  elementShow("zoomButtonDiv",true);
		  autorunTrigger(bigImageShownEvent);
	    });
      }
	  else{
        elementShow("zoomButtonDiv",true);
		autorunTrigger(bigImageShownEvent);
      }
	}
	else{
      speakText(text,function(){
        elementShow("zoomButtonDiv",true);
		autorunTrigger(bigImageShownEvent);
      });
	}
	function bigImg(image){
	  var html;
	  html = '<img id="bigImg" src="' + imgFolder + image.fileName + '">';
	  getElementById("bigDiv").innerHTML = html;
	  setTimeout(function(){
	    var imgWidth = getElementById("bigImg").naturalWidth;
	    var imgHeight = getElementById("bigImg").naturalHeight;
        var scaleX = windowSize.width / imgWidth;
	    var scaleY = windowSize.height / imgHeight;
	    if(scaleX < scaleY){
		  getElementById("bigImg").width = windowSize.width * 0.95;
		  getElementById("bigImg").style.height = "auto";
	    }
	    else{
		  getElementById("bigImg").height = windowSize.height * 0.95;
		  getElementById("bigImg").style.width = "auto";
	    }
	    elementBindClick(getElementById("bigDiv"),clickBigImg);
	    elementShow("bigDiv",true);
	    function clickBigImg(){
		  elementShow("bigDiv",false);
		  getElementById("speakText").innerHTML = "";
		  elementShow("speakText",false);
		  elementShow("zoomButtonDiv",false);
		  stopSpeak();
		  if(zoomWindow != undefined) zoomWindow.close();
		  zoomWindow = undefined;
	    }
	  },80);      
	}
  }
  me.clickZoom = function(clickData){
    var url = "JUMbookZoom.html?imgsrc=" + getElementById("bigImg").src;
    url += "&fotobook=" + getUrlVar("fotobook")
    zoomWindow = window.open(url);
    elementShow("zoomButtonDiv",false);
  };
}
imageUtil = new imageutil();