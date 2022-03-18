function elementsutil(){
  var me = this;
  me.getButtons = function(){
	var html,style,i;
	style = "position:absolute;width:" + windowSize.width + "px;";
	style += "height:20px;left:0px;top:0px;z-index:99;";
	html = '<div id="pageButtons" style="' + style + '">';
    html += '<table width="100%" style="opacity:0.5;"><tr><th>';
	if(adminMode) html += '<img id="showAdminFotobook" height="16" width="16" src="Icons/admin.png">';
    if(aktPage >= 1) html += getPreviousButton(); else html += '&nbsp;';
    html += '</th><th>';
	html += '<td width="60px" align="left" id= "previousField"></td>';
	html += '<th>';
	for(i = 0; i < pagesextended.length; i++){
	  html += '<span class="pageAdress" title="' + pagesextended[i].header + '"> '
      if(i == aktPage) html += '<u>' + (i + 1) + '</u>'; else html += (i + 1);
	  html += ' </span>';
	}
	html += '</th><th>';
	html += getSettingsButton();
    if(aktPage < (pagesextended.length - 1)) html += getNextButton(); else html += '&nbsp;';
    html += '</th></tr></table>\n';
	html += '<div>';
    return html;
	function getSettingsButton(){
      var html = "";
	  if(adminMode) html = '<img id="showAdminPage" height="16" width="16" src="Icons/admin.png">';
	  else html = '<img id="showSettingsPage" height="16" width="16" src="Icons/settings.png">';
	  return html;
	}
    function getNextButton(){
	  var html = "";
      return html + '<span onClick="nextPage()">&gt;&gt;&gt;</span>\n';
    }
    function getPreviousButton(){
      return '<span onClick="previousPage()">&lt;&lt;&lt;</span>\n';
    }
		  
  };  
  me.getEmptyImg = function(){
    var style,html;
	style = "position:absolute;width:" + (windowSize.width - 30) + "px;";
	style += "height:" + (windowSize.height - 30) + "px;";
	style += "left:15px;";
	style += "top:15px;";
	style += "z-index:99;";
	style += "background-color:lightgrey;";
    html = '<div style="' + style + '" id="bigDiv">';
	html += '</div>';
	return html;	  
  };
  me.getSpeakText = function (){
    var style,html;
	style = "position:absolute;width:" + (windowSize.width / 4) + "px;";
	style += "height:" + (windowSize.height / 4) + "px;left:" + (windowSize.width /3 * 2) + "px;top:200px;";
	style += "z-index:100;background-color:yellow;font:20px arial;";
	html = '<div style="' + style + '" id="speakText"></div>';
	return html;
  };
  me.getZoomButton = function(){
    var style,html;
	style = "position:absolute;top:5px;left:5px;";
	style += "z-index:100;background=url('Icons/zoom.png');";
	html = '<div id="zoomButtonDiv" style="' + style + '">';
	html += '<img id="zoomButton" src="Icons/zoom.png"></img>';
	html += '</div>';
	return html;
  }
}
elementsUtil = new elementsutil();
