pageUtil.adminGetHtml = function(page){	
  return "";
};
pageUtil.adminShow = function(page){
  fillSelectFromObject("adminPlugins",Plugins);
}
pageUtil.adminClick = function(clickData){
  var page = pagesextended[aktPage];
  elementShow("adminPageDiv",true);
  fillSelect("pagePlugins",page.plugins);
  getElementById("pageHeader").value = page.header;
  getElementById("pageBacknoise").value = page.backnoise;
  select2select("adminPlugins","pagePlugins");
  elementBindClick("AdminSavePage",adminPageSaveAndClose);
  elementBindClick("AdminPageExit",adminPageExit);  
};
pageUtil.adminFotobookClick = function(){
  showSettingsPage();
}
pageUtil.adminSetHandler = function(){
  elementBindClick("showAdminPage",pageUtil.adminClick);
  elementBindClick("showAdminFotobook",showAdminFaceDiv);
  elementsBindClick("canvasImage",imageUtil.adminClick);
  elementBindClick("AdminSaveFaces",adminSaveFacesClick);
  elementBindClick("AdminExitFaces",adminExitFacesClick);
};
function adminPageSaveAndClose(){
  var page = pagesextended[aktPage];
  page.header = getValue("pageHeader");
  page.backnoise = getValue("pageBacknoise");
  page.plugins = getSelectOptions("pagePlugins");
  if(confirm("Upload ?")) {
	var url = "scripts/JUMbookUploadData.php?book=" + bookName + "&type=PagesExtended&varname=pagesextended";
	postAjax(url,"js=" + JSON.stringify(pagesextended,undefined,2),function(data){alert(data);});
  }
  elementShow("adminPageDiv",false);
}
function adminPageExit(){
  elementShow("adminPageDiv",false);
}
function showAdminFaceDiv(){
  elementShow("adminFaceDiv",true);
  if(!fotobook.faces){
    fotobook.faces = {active:false,showNames:false,mode:undefined,replace:[]};
  }
  if(fotobook.faces.active) getElementById("settingsFaceActive").checked = fotobook.faces.active;
  if(fotobook.faces.showNames) getElementById("settingsShowNames").checked = fotobook.faces.showNames;
  if(fotobook.faces.mode) getElementById("settingsReplaceMode").value = fotobook.faces.mode;
}
function adminSaveFacesClick(){
  fotobook.faces = {active : getElementById("settingsFaceActive").checked,
             showNames : getElementById("settingsShowNames").checked,
             mode : getElementById("settingsReplaceMode").value,
             replace : []
  };
  var url = "scripts/JUMbookUploadData.php?book=" + bookName + "&type=Fotobook&varname=fotobook";
  postAjax(url,"js=" + JSON.stringify(fotobook,undefined,2),function(data){
    //alert(data);
	elementShow("adminFaceDiv",false);
  });
}
function adminExitFacesClick(){
  elementShow("adminFaceDiv",false);
}