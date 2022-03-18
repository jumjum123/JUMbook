var settings = getSettings();

function showSettingsPage(){
  elementShow("settingTools",true);
  setSettings();
  elementBindClick("exitSettingTools",function(){
	elementShow("settingTools",false);
  });
  elementBindClick("settingsSave",saveSettings);
}
function getSettings(){
  setTimeout(function(){
    elementShow("settingTools",false);
    //runScript(dataFolder + "/autorun.js",function(){});
  },500);
}
function setSettings(){
  if(settings.General){
    if(settings.General.Speed) getElementById("settingsGeneralSpeed").value = settings.General.Speed;
    if(settings.General.showPage) getElementById("settingsShowPage").value = settings.General.showPage;
  }
  if(settings.Sound){
    if(settings.Sound.Delay) getElementById("settingsSoundDelay").value = settings.Sound.Delay;
  }
  if(settings.Image){
    if(settings.Image.Zoom) getElementById("settingsImageZoom").checked = settings.Image.Zoom;
	if(settings.Image.Samples) getElementById("settingsImageSamples").checked = settings.Image.Samples;
  }
}
function saveSettings(){
  settings = {
	General : {Speed : getElementById("settingsGeneralSpeed").value,
	           showPage : getElementById("settingsShowPage").value},
    Sound : {Delay : getElementById("settingsSoundDelay").value},
    Image :	{Zoom : getElementById("settingsImageZoom").checked,
	         Samples : getElementById("settingsImageSamples").checked
	},
  };
  setCookie("Multibook_" + getUrlVar("fotobook"),JSON.stringify(settings),5);
  initAutoRun();
}
function getSpeedSetting(){
  var r = 3000;
  if(settings.General.speed){
    switch(settings.General.speed){
	  case "Medium": r = 8000; break;
	  case "Fast": r = 4000; break;
	  case "Slow" : r = 15000; break;
	  default: r = 3000; break;
	} 
  }
  else r = 3000;
  return r;
}
