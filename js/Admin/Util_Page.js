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
  
  elementBindClick("testUpload",function(){
    var url = "scripts/JUMbookUploadData.php?book=" + bookName + "&type=test&varname=test";
	var val = JSON.parse(getElementById("umlaut").value);
	console.log(val);
	postAjax(url,"js=" + JSON.stringify(val,undefined,2),function(data){alert(data);});
  });
  
};
pageUtil.adminSetHandler = function(){
  elementBindClick("showAdminPage",pageUtil.adminClick);
  elementsBindClick("canvasImage",imageUtil.adminClick);
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
