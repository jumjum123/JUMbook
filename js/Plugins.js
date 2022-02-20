function Plugs(){
  var video,me = this;
  me.getHtml = function(plugins){
	var i,html;
    html = '<div style="position:absolute;top:50;left:30">';
	for(i = 0; i < plugins.length; i++){
      if(plugins[i] != "") html += Plugins[plugins[i]]();
	}
    html += '</div>';
	return html;
  };
  me.videos = function(){
    var i,j,k,videoAdr = {}
    for(i = 0; i < videos.length; i++){
	  if(typeof videos[i] == "string"){
		if(videos[i].length > 0)
          videoAdr[videos[i]] = {page:undefined,filename:videos[i],name:videos[i]};
	  }
	  else videoAdr[videos[i].filename] = {page:undefined,filename:videos[i].filename,name:videos[i].name};
	}
    for(i = 0; i < pagesextended.length; i++){
	  for(j = 0; j < pagesextended[i].images.length; j++){
        if(pagesextended[i].images[j].video){
          for(k = 0; k < pagesextended[i].images[j].video.length; k++){
            if(pagesextended[i].images[j].video[k].length > 0){
              videoAdr[pagesextended[i].images[j].video[k]].page = i;
			}
		  }
	    }
	  }
    }
    videoAdr = sortByKey(videoAdr);
	var html = "";
    html += '<table style="border:1px solid">';
	j = 0;
    for(i = 0; i < videoAdr.length; i++){
	  video = videoAdr[i];
      if(video.page != undefined){
        if(j == 0) html += '<tr>';
	    html += '<td>' + video.name + ' (';
		html += '<span class="pageAdress">' + (video.page + 1) + '</span>';
		html += ')</td>';
		j++;
		if(j == 3){
          html += '</tr>';
		  j = 0;
		}
	  }
	}
	html += '</table>';
	html += '<table style="border:1px solid">';
	j = 0;
	for(i = 0; i < videoAdr.length; i++){
	  video = videoAdr[i];
	  if(video.page == undefined){
		if(j == 0) html += '<tr>';
		html += '<td>' + video.name.split(".")[0];
		html += '<img class="videoButton" src="Icons/video.png" video="' + video.filename + '">';
		html += '</td>';
		j++;
		if(j == 3){
		  html += '</tr>';
		  j = 0;
		}
	  }
	}
	html += '</table>';
    return html;	
  };
  me.header = function(){
    var i,html,j,headers = [];
	html = '<table style="border:1px solid">';
	j = 0;
	for(i = 0; i < pagesextended.length; i++) headers.push(pagesextended[i].header + ":" + i);
	headers = headers.sort();
	for(i = 0; i < headers.length; i++){
      if(j == 0) html += '<tr>';
	  html += '<td>' + headers[i].split(":")[0] + '(';
	  html += '<span class="pageAdress">' + (parseInt(headers[i].split(":")[1]) + 1) + '</span>';
	  html +=')</td>';
	  j++;
	  if(j == 3){
		j = 0;
		html += '</tr>';
	  }
	}
	if(j > 0) html += '</tr>';
	html+='</table>';
	return html;
  };
  me.addLink2Text = function(){
    var i,j,html,page,texts;
	html = "";
	texts = pagesextended[aktPage].texts;
	return html;
  };
  me.tellAndShow = function(){
	addButton();
	return "";
	function addButton(){
	  setTimeout(function(){
	    getElementById("previousField").innerHTML = '<img id="pluginTellAndShow" src="Icons/speaker.png">';
		setTimeout(function(){
	      elementBindClick("pluginTellAndShow",tellandshow);
	    },1000);
	  },1000);
	}
    function tellandshow(){
	  doSerialFnc({},pagesextended[aktPage].images,tellandshowImage,function(){ });
    }
    function tellandshowImage(i,global,local,callback){
	  var d,style;
	  d = getElementById("c_" + i).parentNode;
	  d.style.borderStyle = "solid";
      speakText(pagesextended[aktPage].images[i].speak,function(){
		setTimeout(function(){
		  d.style.borderStyle = "none";
		  callback();
		},2000);
	  });  
    }
  }
  me.qrVideos = function(){
    var i,j,n,html,videoAdr,videoAdrs;
	var QRspec = {width: 100,height: 100,colorDark: "#000000",colorLight: "#ffffff",correctLevel: QRCode.CorrectLevel.H,};
	j = 0;
	n = 0;
	videoAdrs = [];
	html = '<div style="position:absolute;left:700"><table border="1"';
	for(i = 0; i < videos.length; i++){
	  if(typeof videos[i] == "string") videoAdr = {filename:videos[i],name:videos[i]};
	  else videoAdr = {filename:videos[i].filename,name:videos[i].name};
	  if(j == 0) html += '<tr>';
	  if(videoAdr.name != ""){
	    html += '<th>' + videoAdr.name;
        html += '<div class="videoQR" id="videoQR' + n + '" video="' + videoAdr.filename + '"></div></th>';
	    videoAdrs.push(videoAdr);
	    j++;
		n++;
	    if(j >= 6){
          j = 0; html += '</tr>';
	    }
      }
	}
	html += '</table></div>';
	setTimeout(createQR,1000);
	return html;
	function createQR(){
	  var i,QR,url;
	  for(i = 0; i < videoAdrs.length; i++){
		QR = new QRCode("videoQR" + i,QRspec);
		QR.clear();
		url = "https://www.jumware.com/Multibook/Multibooks/" + bookName + "/Videos/"+videoAdrs[i].filename;
	    QR.makeCode(url);
	  }
      elementsBindClick("videoQR",clickVideo);	  
	}
  };
  me.faces = function(){
    var i,j,img,html,name,foundFaces = {},pages = {};
	html = '<div style="position:absolute;left:700">';
	html += '<table border="1">';
	for(img in faces){
      for(i = 0; i < faces[img].length; i++){
        name = faces[img][i].label;
        if(!foundFaces[name]){
		  foundFaces[name] = {};
		  pages[name] = [];
		}
		if(!foundFaces[name][img])foundFaces[name][img] = [];
	  }
	}
	addPages();
	function addPages(){
      var i,j,p,fileName;
	  for(i = 0; i < pagesextended.length; i++){
        for(j = 0; j < pagesextended[i].images.length; j++){
          fileName = pagesextended[i].images[j].fileName;
          for(p in foundFaces){
            if(foundFaces[p][fileName]){
              if(foundFaces[p][fileName].indexOf(i) < 0){
                foundFaces[p][fileName].push(i);
				if(pages[p].indexOf(i) < 0) pages[p].push(i);
			  }
            }
		  }
		}
	  }
	}
	for(p in pages){
      html += '<tr><th>' + p + '</th><th>';
	    for(i = 0; i < pages[p].length; i++){
          html += '&nbsp;<span class="pageAdress">' + (pages[p][i] + 1) + '</span>&nbsp;';
		}
	  html += '</th></tr>';
	}
	html += '</table>';
	html +='</div>';
	return html;
  };
}
Plugins = new Plugs();
function sortByKey(jsObj){
    var sortedArray = [];
    for(var i in jsObj)sortedArray.push(jsObj[i]);
    return sortedArray.sort();
}