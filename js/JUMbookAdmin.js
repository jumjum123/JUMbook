var bookName,bookFolder,dataFolder,imgFolder;
var pagesextended,images;
function init(){
  //elementShow("uploadTable",false);
  initFaces();
  fillProjects(fillLists);
  elementBindClick("createProjectBtn",function(){createProject(logData);});
  elementBindClick("createListsBTN",function(){createMasterlists(logData);});
  elementBind("projectList","change",function(){openUpload(logData);});
  elementBindClick("correctFilename",function(){correctImageFileType(logData);});
  elementBindClick("checkMissingImages",function(){checkMissingImages(logData);});
  elementBindClick("uploadImageBtn",function(){uploadMediaFile("imageFile","Images");});
  elementBindClick("uploadVideoBtn",function(){uploadMediaFile("videoFile","Videos");});
  elementBindClick("uploadAudioBtn",function(){uploadMediaFile("audioFile","Audios");});
  elementBindClick("createFaceDescBtn",function(){createFaceDesc();});
  elementBindClick("showPerson",function(){showPerson();});
  elementBindClick("showBookBtn",function(){openBookInNewWindow({});});
  elementBindClick("adminBookBtn",function(){openBookInNewWindow({admin:true});});
  elementBindClick("autorunBookBtn",function(){openBookInNewWindow({autorun:true});});
  function logData(data){console.log(data);}
}
function fillProjects(cb){
  var url = "scripts/JUMbookGetDir.php?path=../Multibook/Multibooks&" + getRnd();
  getAjax(url,function(data){fillSelectList("projectList",data,cb);});
}
function fillSelectList(id,data,cb){
  var el = getElementById(id);
  data = JSON.parse(data);
  el.options.length = 0;
  data.forEach(function(item){
    var parts = item.split("/");
	el.options.add(new Option(parts[parts.length -1]));
  });
  if(cb) cb(id + " loaded");
}
function fillLists(){
  var url = "scripts/JUMbookGetList.php?book=" + getExistingProject() + "&" + getRnd();
  fillList("Images","imageList");
  fillList("Videos","videoList");
  fillList("Audios","audioList");
  function fillList(type,id){
    getAjax(url + "&type=" + type,function(data){
      var el = getElementById(id);
	  data = JSON.parse(data);
	  el.options.length = 0;
	  data.forEach(function(item){el.options.add(new Option(item.split("/")[6]));});
	});
  }
}

function createProject(cb){
  var url = "scripts/JUMbookCreateProject.php?book=" + getElementById("projectName").value;
  getAjax(url,function(data){
    console.log("Project Created:",data);
    uploadMCF(function(){fillProjects(cb);})
  });
}
function uploadMCF(cb){
  var formData = new FormData();
  formData.append("mcfFile",getElementById("mcfFile").files[0]);
  var url = "scripts/JUMbookUploadMcf.php?book=" + getElementById("projectName").value;
  postAjaxFile(url,formData,function(data){
    console.log("MCF uploaded",data);
	convertmcf2json(cb);});
}
function convertmcf2json(cb){
  var url = "scripts/JUMbookMcf2Json.php?book=" + getNewProj();
  getAjax(url,function(data){
	console.log("convertedMCF",data);
    url = "scripts/JUMbookMcf2Readable.php?book=" + getNewProj();
	getAjax(url,function(data){
      console.log("coverted Readable",data);    
	  createMasterdata(cb);
    });
  });
}
function createMasterdata(cb){
  createPages(function(){
	uploadJSON(function(){cb();});
  });
  function uploadJSON(cb){
    var url = "scripts/JUMbookUploadJSON.php?book=" + getNewProj();
    var data = JSON.stringify(pages,undefined,2);
    data = data.replaceAll("&quot;","");
    data = data.replaceAll("&amp;","");
    var r = postAjax(url + "&name=PagesExtended","json=" + data,function(a){
      console.log("uploadedJSON",a);
	  r = postAjax(url + "&name=Fotobook","json=" + JSON.stringify(fotobook,undefined,2),function(a){
		console.log("uploaded Fotobook",a);
	    cb();
      });
    });
  }
  function Page(rawPage){
    var me = this;
    me.pagenr = rawPage.attributes.pagenr;
    me.images = [];
    me.backgrounds = [];
    me.texts = [];
    me.width = parseInt(rawPage.bundlesize.attributes.width);
    me.height = parseInt(rawPage.bundlesize.attributes.height);
	me.header = "";
	me.plugins = [];
	me.backnoise = "";
    getBackground(rawPage);
    getAreas(rawPage);
    function getAreas(rawPage){
	  var i,areas,area;
	  if(rawPage.area){
	    areas = rawPage.area;
	    if(Array.isArray(areas)){
	      for(i = 0; i < areas.length; i++){
		    handleArea(areas[i]);
	      }
	    }
	    else handleArea(areas);
	  }
	  function handleArea(area){
	    switch(area.attributes.areatype){
          case "imagearea":
		  case "IMAGEAREA":
            if(area.image.attributes){
			  if(area.image.attributes.filename){
			    me.images.push(new imageArea(area));
			  }
		    }
            break;
		  case "imagebackgroundarea":
		  case "IMAGEBACKGROUNDAREA":
		    if(area.imagebackground.attributes.filename){
			  me.backgrounds.push(new background(area));
	        }
		    break;
          case "textarea":
		  case "FREETEXTAREA":
            me.texts.push(new textArea(area));
            break;	
        }					
	  }
    }
    function getBackground(rawPage){
      var bg;
      if(rawPage.background){
	    bg = rawPage.background;
        if(Array.isArray(bg)) bg = bg[0];
        if(bg.attributes.designElementId){
          if(bg2color[bg.attributes.designElementId])
		    me.background = bg2color[bg.attributes.designElementId];
	    }
	  }
    }
  }
  function Area(raw){
    var me = this;
    if(raw.position){
      me.top = parseInt(raw.position.attributes.top);
      me.left = parseInt(raw.position.attributes.left);
      me.height = parseInt(raw.position.attributes.height);
      me.width = parseInt(raw.position.attributes.width);
      me.rotation = parseInt(raw.position.attributes.rotation);
    }
    else{
      me.top = parseInt(raw.attributes.top);
      me.left = parseInt(raw.attributes.left);
      me.height = parseInt(raw.attributes.height);
      me.width = parseInt(raw.attributes.width);
      me.rotation = parseInt(raw.attributes.rotation);
      me.alpha = parseFloat(raw.attributes.alpha);
      if(raw.attributes.borderenabled == 1){
        me.border = {size : parseInt(raw.attributes.sizeBorder), color : raw.attributes.colorBorder};
      }	  
    }
    if(raw.decoration){
      me.border = {enabled : 0};
	  if(raw.decoration.border){
	    me.border = {
          enabled : parseInt(raw.decoration.border.attributes.enabled),
          size : parseInt(raw.decoration.border.attributes.width),
          color : raw.decoration.border.attributes.color
        };
      }	  
    }
	me.speak = "";
	me.video = [];
	me.weburl = [];
  }
  function imageArea(rawImage){
    var me = this,filename;
    Area.call(this,rawImage);
    filename = rawImage.image.attributes.filename.split("/");
    if(filename.length > 1) me.fileName = extension2lower(filename[1]); else me.fileName = extension2lower(filename[0]);
    if(rawImage.image.attributes.passepartoutDesignElementId == "120903") me.frame = "triangleDown";
    if(rawImage.image.attributes.passepartoutDesignElementId == "46506") me.frame = "triangleUp";
    if(rawImage.decoration){
      if(rawImage.decoration.corners){
        if(rawImage.decoration.corners.corner[0].attributes.length == "7073.17") me.frame = "circle";
	  }
    }
    if(rawImage.image.cutout){
      me.part = {
        top:parseInt(rawImage.image.cutout.attributes.top),
        left:parseInt(rawImage.image.cutout.attributes.left),
        scale:rawImage.image.cutout.attributes.scale
      };
    }
    else {
	  me.part = {
        top:parseInt(rawImage.image.attributes.top),
	    left:parseInt(rawImage.image.attributes.left),
	    scale:rawImage.image.attributes.scale
	  };
    }
  }
  function background(rawBackground){
    var me = this,filename;
    Area.call(this,rawBackground);
    filename = rawBackground.imagebackground.attributes.filename.split("/");
    if(filename.length > 1) me.fileName = filename[1]; else me.fileName = filename[0];
    if(rawBackground.imagebackground.cutout){
      me.part = {
	    top:parseInt(rawBackground.imagebackground.cutout.attributes.top),
	    left:parseInt(rawBackground.imagebackground.cutout.attributes.left),
	    scale:rawBackground.imagebackground.cutout.attributes.scale
      };
    }
    else{
	  me.part = {
        top:parseInt(rawBackground.imagebackground.attributes.top),
	    left:parseInt(rawBackground.imagebackground.attributes.left),
	    scale:rawBackground.imagebackground.attributes.scale
      };		
    }
  }
  function textArea(rawText){
    var me = this;
    Area.call(this,rawText);
    getText(rawText.text);
    function getNodeValue(node,id){
	  var i,r = "";
	  for(i = 0;i < node.length;i++){
	    if(node[i].localName.split(":")[0] == id) r = node[i].localName.split(":")[1];
	  }
	  return r;
    }
    function getText(text){
	  var html = new DOMParser().parseFromString(text,"text/html");
	  me.text = html.body.innerText.trim();
	  me.style = {};
	  me.style.font = html.body.attributes[1].localName.split("'")[0];
      me.style.size = getNodeValue(html.body.attributes,"font-size");
	  me.style.weight = getNodeValue(html.body.attributes,"font-weight");
      if(html.body.children[0].rows)
	    me.style.color = html.body.children[0].rows[0].cells[0].children[0].children[0].style.color;
    }
  }
  
  var pages,fotobook,bg2color;
  var rawpages,json;
  function createPages(cb){
    var aktFile = "/Multibook/Multibooks/" + getNewProj() + "/Fotobook/Fotobook.json";
    getAjax( "JSON/Backgrounds.json", function( data ) {
      bg2color = JSON.parse(data);
      getAjax( aktFile, function( data ) {
	    var page;
	    json = JSON.parse(data.replaceAll("@",""));
	    fotobook = {};
		if(json.version) fotobook.version = json.version;
	    if(json.attributes){
	      if(json.attributes.version) fotobook.version = json.attributes.version;
	    }
		fotobook.mediaDir = "/Multibook/Multibooks/" + getNewProj() + "/";
		fotobook.dataDir = "/JUMbook/Multibooks/" + getNewProj() + "/";
		fotobook.faces = false;
	    rawpages = json.page;
	    pages = [];
	    for(i = 0; i < rawpages.length; i++){
	      page = new Page(rawpages[i]);
	      if((page.texts.length > 0) || (page.images.length > 0)) pages.push(page);
	    }
	    cb();
      });
    });
  }  
}
function openBookInNewWindow(opt){
  var url = "JUMbookViewer.html?fotobook=" + getExistingProject();
  if(opt.admin) url += "&adminmode=true";
  if(opt.autorun) url += "&autorun=true";
  window.open(url);
}

function openUpload(){
  fillLists();
}
function uploadMediaFile(id,type){
  var lst = getElementById(id).files;
  var formData = new FormData();
  formData.append("mediaFile",lst[0]);
  var url = "scripts/JUMbookUploadMedia.php?book=" + getExistingProject() + "&type=" + type + "&fileName=" + lst[0].name;
  postAjaxFile(url,formData,function(data){console.log(data);});
}

function createMasterlists(cb){
  var url = "scripts/JUMbookUploadLists.php?book=" + getExistingProject() + "&" + getRnd();
  getAjax(url,function(data){
    console.log("masterlists created",data);
	url = "scripts/JUMbookCopyJSON2Data.php?book=" + getExistingProject() + "&" + getRnd();
	getAjax(url,function(data){
      console.log("JSON2Data done",data);
      cb("upload masterlists done");});
  });
}

function correctImageFileType(cb){
  var filename,url,i,j,data,r;
  url = "Multibooks/" + getExistingProject() + "/Data/PagesExtended.js";
  runScript(url,function(data){
    url = "Multibooks/" + getExistingProject() + "/Data/Images.js";
    runScript(url,function(data){
      for(i = 0; i < pagesextended.length;i++){
        page = pagesextended[i];
        for(j = 0; j < page.images.length; j++){
          if(images.indexOf(page.images[j].fileName) < 0){
			filename = page.images[j].fileName.split(".")[0] + ".jpg";
			if(images.indexOf(filename) >= 0) page.images[j].fileName = filename;
		  }
		}
	  }
	  url = "scripts/JUMbookUploadData.php?book=" + getExistingProject();
	  data = JSON.stringify(pagesextended,undefined,2);
	  r = postAjax(url + "&type=PagesExtended&varname=pagesextended","js=" + data,function(a){
		cb("Images filename corrected");  
      });
	});	
  });
}
function checkMissingImages(cb){
  var i,imageName = [],missing = [];
  var path = "Multibooks/" + getExistingProject() + "/Data/";
  getElementById("missingImages").value = "checking";
  runScript(path + "Images.js",function(data){
    for(i = 0; i < images.length; i++) imageName.push(images[i].split(".")[0]);
    runScript(path + "PagesExtended.js",function(data){
      for(var i = 0; i < pagesextended.length; i++){
        checkPage(i);
	  }
	  getElementById("missingImages").value = JSON.stringify(missing,undefined,2);
	  cb(JSON.stringify(missing,undefined,2));
	});
  });
  function checkPage(page){
    var i,pimages,miss;
	pimages = pagesextended[page].images;
	for(i = 0; i < pimages.length;i++){
      if(images.indexOf(pimages[i].fileName) < 0){
		miss = {page:page,index:i,fileName:pimages[i].fileName};
		fnd = imageName.indexOf(pimages[i].fileName.split(".")[0]);
		if(fnd >= 0) miss.newExt = images[fnd].split(".")[1];
		missing.push(miss);
	  }
	}
  }
}

function showPerson(){
  var url = "./Persons/" + getValue("personsList") + "/" + getValue("facesList");
  var img = new Image();
  img.onload = function(){
    var canvas = document.createElement("canvas");
    canvas.id = "showPersonCanvas";
    canvas.onclick = function(){
      getElementById("showPersonCanvas").remove();
    };
    canvas.height = img.height;
    canvas.width = img.width;
    document.body.append(canvas);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    showLandmarks(ctx);
  };
  function showLandmarks(ctx){
    var url = "./Persons/" + getValue("personsList") + "/descriptor.json";
    getAjax(url,function(data){
      data = JSON.parse(data);
      showLandmark(ctx,data.landmarks[0].outline);
      showLandmark(ctx,data.landmarks[0].leftEye);
      showLandmark(ctx,data.landmarks[0].leftEyeBrow);
      showLandmark(ctx,data.landmarks[0].rightEye);
      showLandmark(ctx,data.landmarks[0].rightEyeBrow);
      showLandmark(ctx,data.landmarks[0].nose);
      showLandmark(ctx,data.landmarks[0].mouth);
    });
  }
  function showLandmark(ctx,pnts){
    ctx.save();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pnts[0].x,pnts[0].y);
    for(var i = 1; i < pnts.length; i++){ ctx.lineTo(pnts[i]._x,pnts[i]._y); }
    ctx.stroke();
    ctx.restore();
  }
  img.src = url;
}

function getNewProj(){ return getElementById("projectName").value;}
function getExistingProject(){ return getElementById("projectList").value;}
function getRnd(){return "rnd=" +Math.floor(Math.random() * 1000000).toString();}