imageUtil.adminGetHtml = function(image,i){

return "";
};
imageUtil.adminShow = function(image,i){
  fillSelect("adminVideo",videos);
};
imageUtil.adminClick = function(clickData){
  aktImage = clickData.srcElement.id.split("_")[1];
  var image = pagesextended[aktPage].images[aktImage]; 
  elementShow("adminImageDiv",true);
  elementBindClick("AdminSaveImage",adminImageSaveAndClose);
  elementBindClick("AdminImageExit",adminImageExit);
  select2select("adminVideo","imageVideo");
  getElementById("AdminTextBox").value = image.speak;
  fillSelect("imageVideo",image.video);
  getElementById("adminWebUrl").value = JSON.stringify(image.weburl);
};
function adminImageSaveAndClose(){
  var image = pagesextended[aktPage].images[aktImage];
  image.speak = getValue("AdminTextBox");
  image.video = getSelectOptions("imageVideo");
  image.weburl = JSON.parse(getValue("adminWebUrl"));
  if(confirm("Upload ?")) {
    var url = "scripts/JUMbookUploadData.php?book=" + bookName + "&type=PagesExtended&varname=pagesextended";
    postAjax(url,"js=" + JSON.stringify(pagesextended,undefined,2),function(data){alert(data);});
  }
  elementShow("adminImageDiv",false);
}
function adminImageExit(){
  elementShow("adminImageDiv",false);
}