//general working data
var aktBook,aktPage = 0,aktImage,windowSize,adminMode;
var audioBackNoise = new AudioObject(function(){});
//Data objects for actual book
var fotobook,pagesextended,videos,images,audios,settings,translate,faces;
//actual working data
var bookName,autorun,jsFolder,bookFolder,imgFolder,videoFolder,audioFolder,dataFolder;
var scaleX,scaleY,translateOn = false;
var croppie,zoomWindow;
// utilobjects
var pageUItil,imageUtil,textUtil,videoUtil,weburlUtil,backgroundUtil,elementsUtil,Plugins;

function init(){
  initWindow();
  initWorkingData(function(){
    if(adminMode)initAdmin(function(){console.log("admin loaded");});
    initActualBook(function(){
      if(autorun)initAutoRun();
      showPage();
    });
  });
  function initWindow(){
	windowSize = {width:window.innerWidth,height:window.innerHeight - 20};
	window.onresize = function(event){
	  windowSize = {width:window.innerWidth,height:window.innerHeight - 20};
	  showPage();
    }
  }
  function initWorkingData(cb){
	bookName = getUrlVar("fotobook");
	bookFolder = "Multibooks/" + bookName + "/";
	runScript(bookFolder + "/Data/Fotobook.js",function(){	  
	  imgFolder = fotobook.mediaDir + "Images/";
	  videoFolder = fotobook.mediaDir + "Videos/";
	  audioFolder = fotobook.mediaDir + "Audios/";
	  dataFolder = fotobook.dataDir + "Data/";
	  adminMode = getUrlVar("adminmode");
	  autorun = getUrlVar("autorun");
	  jsFolder = "js/Admin/";
	  cb();
	});
  }
  function initAdmin(callback){
    function loadAdmin(){
      function getAdminJS(i,data,fncData,callback){
		runScript(jsFolder + fncData + ".js",callback);
	  }
	  var dataArr = ["Util_Page","Util_Image"];
	  doSerialFnc({},dataArr,getAdminJS,function(){callback();});
	}
	loadAdmin();
  }
  function initActualBook(callback){
	function loadData(){
	  function getDataFnc(i,data,fncData,callback){
		runScript(dataFolder + fncData + ".js",callback);
	  }
      var dataArr = ["PagesExtended","Videos","Audios","Images","autorun"];
	  if(fotobook.faces) dataArr.push("Faces"); else faces = {};
	  doSerialFnc({},dataArr,getDataFnc,function(){preloadFaces(callback);});
	}
	loadData();
  }
}
function showPage(){	
  buildBody();
  setTimeout(showBody,300);
}
function buildBody(){
  var i,body,page;
  translateOn = false;
  body = "";
  page = pagesextended[aktPage];
  scaleX = windowSize.width / page.width;
  scaleY = windowSize.height / page.height;
  if(audioBackNoise.running) audioBackNoise.stop();
  getElementById("bookbody").innerHTML = pageUtil.getHtml(page);
}
function showBody(){
  var page;
  page = pagesextended[aktPage];
  pageUtil.show(page);
}
function switchToPage(data){
  aktPage = parseInt(this.innerText) - 1;
  showPage();	
}
function nextPage(){ aktPage++; showPage(); }
function previousPage(){aktPage--; showPage(); }
