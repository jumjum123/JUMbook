String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

var synth = window.speechSynthesis;
var sentences = [];var sentence = 0;
var translate,globalAudio = new AudioObject(function(){});
function speak(text,callback){
  var speaker = new SpeechSynthesisUtterance();
  if(callback) speaker.onend = function(){callback();};
  var voices = synth.getVoices();
  for(var i = 0; i < voices.length; i++){
    if(voices[i].default) speaker.voice = voices[i];
  }
  speaker.text = text;
  synth.speak(speaker);
}
function speakText(text,callback){
  if(typeof text == "string"){
	if(text.length > 0){speak(text,callback);}
  }
  else{
	if(globalAudio.running) globalAudio.stop();
	globalAudio.cb = callback;
	globalAudio.start("Multibooks/" + getUrlVar("fotobook") + "/Audios/" + text.fileName);
  }
}
function speakLanguage(text,callback){
  var speaker = new SpeechSynthesisUtterance();
  speaker.onend = function(data){speakSentence();};
  var lang = getCookie("googtrans").split("/")[2];
  var langObj = getLangObj(lang);
  var voices = synth.getVoices();  
  sentences = text.split(langObj.sentenceEnd);
  sentence = 0;
  for(var i = 0; i < voices.length; i++){
    if(voices[i].lang == langObj.lang){
	  speaker.voice = voices[i];
	  break;
	}
  }
  speakSentence();
  function speakSentence(){
    if(sentence < sentences.length){
      speaker.text = sentences[sentence];
      synth.speak(speaker);
      sentence++;
	}
	else{ if(callback) callback(); }
  }
}
function stopSpeak(){
  synth.cancel();
  sentence = sentences.length;
}
function isSpeaking(){
  return synth.speaking;
}
function initLanguages(){
  runScript("Multibooks/" + getUrlVar("fotobook") + "/Data/Translate.js",function(){
    var voices = synth.getVoices();
    var langs = [];
    for(var i = 0; i < voices.length; i++){
      if(langs.indexOf(voices[i].lang) < 0) langs.push(voices[i].lang.split("-")[0]);
	  if(langs.indexOf(voices[i].lang) < 0) langs.push(voices[i].lang);
    }
    var langFiltered = translate.includeLanguages.split(",").filter(e => langs.indexOf(e) !== -1);
    new google.translate.TranslateElement({
      pageLanguage: translate.pagelanguage,
	  includedLanguages: langFiltered.join(","),
	  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
	  },
	  'google_translate_element'
    );
  });
}

function AudioObject(cb){
  var audio,me = this;
  audio = new Audio();
  me.cb = function(){};
  if(cb) me.cb = cb;
  me.running = false;
  me.start = function(url){
	if(url.length > 0){
	  audio.src = url;
	  audio.onended = function(){me.running = false; me.cb(); };
	  audio.play();
	  me.running = true;
	}
  }
  me.stop = function(){
	audio.pause();
	audio.src = "";
	me.running = false;
	me.cb();
  }
}

function getLangObj(language){
  for(var i = 0; i < translate.language2lang.length; i++){
    if(translate.language2lang[i].language == language) return lng = translate.language2lang[i];
  }
  return translate.defaultLang;
}

function getUrlVar(id){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
	if(id){if(hash[0] == id){return hash[1];}}
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  if(id) return false; else return vars;
}
function getUrlData(file){
  var rnd = (Math.random() * 1000000).toString();
  var url = document.location.origin + "/Multibook/Multibooks/" + getProj() + "/" + file + "?x=" + rnd;
  return url;
}

function extension2lower(fileName){
  var newName,fileParts = fileName.split(".");
  fileParts[1] = fileParts[1].toLowerCase();
  if(fileParts[1] == "jpeg") fileParts[1] = "jpg";
  if(fileParts[1] == "png") fileParts[1] = "jpg";
  return fileParts[0] + "." + fileParts[1];
}

function fillSelect(id,data,start){
  var el = getElementById(id);
  if(!start) start = 0;
  el.options.length = 0;
  //el.options.add(new Option(""));
  for(var i = start; i < data.length; i++){
	if(data[i].length > 0){
	  el.options.add(new Option(data[i]));
    }
	else {
	  if(typeof data[i] == "string") el.options.add(new Option(data[i]));
	  else el.options.add(new Option(data[i].name,data[i].filename));
	}
  }
}
function fillSelectFromObject(id,obj){
  var el = getElementById(id);
  el.options.length = 0;
  //el.options.add(new Option(""));
  for(var v in obj){ 
    el.options.add(new Option(v));
  }
}
function getSelect(id,data,select){
  var html,i;
  html = '<select multiple id="' + id + '" size="10">';
  for(i = 0; i < data.length;i++){
	html += '<option value="' + data[i] + '">' + data[i].split(".")[0] + "\n";
  }
  html += "</select>\n";
  return html;
}
function getSelectFromObject(id,obj,select){
  var html,v;
  html = '<select multiple id="' + id + '" size="5">';
  html += '<option value="">\n';
  for(v in obj){
    html += '<option value="' + v +'">' + v + "\n";
  }
  html += "</select>\n";
  return html;
}
function setSelectOptions(el,options){
  if(typeof el == "string") el = getElementById(el);
  var o,i;
  for (i = 0; i < el.options.length; i++ ){
    o = el.options[i];
    if ( options.indexOf(o.value) != -1 ) o.selected = true;
  }
}
function getSelectOptions(el,selectedOnly){
  if(typeof el == "string") el = getElementById(el);
  var i,r = [];
  for(i = 0; i < el.options.length; i++){
	if(selectedOnly){ if(el.options[i].selected) r.push(el.options[i].value);}
	else r.push(el.options[i].value);
  }
  return r;
}
function setRadioButton(el){
  if(typeof el == "string") el = getElementById(el);
  el.checked = true;
}
function getRadioButton(el){
  return document.querySelector('input[name="' + el + '"]:checked').value;
}
function getValue(el){
  return getElementById(el).value;
}
function bindRadioButton(el,fnc){
  var i,rb;
  rb = document.getElementsByName(el);
  for(i = 0; i < rb.length; i++){
	rb[i].onchange = fnc;
  }
}
function select2select(ids,idd){
  elementBindClick(ids,idsHnd);
  elementBindClick(idd,iddHnd);
  function idsHnd(evt){console.log(this,evt);
    getElementById(idd).options.add(new Option(this.value));
  }
  function iddHnd(evt){console.log(this,evt);
	this.options[this.selectedIndex].remove();
  }
}

function setCookie(name,value,days,path){
  var val,expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/" + (path || "");
}
function getCookie(name) {
  if(document.cookie.length > 0) {
    start = document.cookie.indexOf(name + "=");
    if(start != -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(";", start);
      if(end == -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}
function dropCookie(name){
  var domain,expires,cookie;
  var expires = new Date; expires.setTime(expires.getTime() - 1);
  for(var domain = window.location.hostname.split(".");2<domain.length;) 
	domain.shift();
  domain = ";domain=" + domain.join(".");
  cookie = name + "=none;expires=" + expires.toGMTString() + "path=/";
  cookie += ";path=/";
  document.cookie=cookie;
  try{document.cookie=cookie + domain}
  catch(d){}
}

function elementShow(el,value){
  var element;
  if(typeof el === "string") element = getElementById(el); else element = el;
  if(value) element.style.display = "block";
  else element.style.display = "none";
}
function elementResize(el,size){
  var element;
  if(typeof el === "string") element = getElementById(el); else element = el;
  el.style.top = size.top;
  el.style.left = size.left;
  el.style.width = size.width;
  el.style.height = size.height;
}
function getElementById(id){
  return document.getElementById(id);
}
function getElementsByClass(cls){
  return document.getElementsByClassName(cls);
}
function getIntProperty(style,property){
  return parseInt(style.getPropertyValue(property).replace('px',''));
}
function elementBindClick(el,fnc){
  if(typeof el == "string") el = getElementById(el);
  if(el){
    if(el.onclick) el.onclick = undefined;
    el.onclick = fnc;
  }
}
function elementBind(el,evt,fnc){
  if(typeof el == "string") el = getElementById(el);
  if(el){
	if(el["on" + evt]) el["on" + evt] = undefined;
	el["on" + evt] = fnc;
  }
}
function elementsBindClick(elements,fnc){
  if(typeof elements == "string") elements = getElementsByClass(elements);
  for(var i = 0; i < elements.length; i++){
    elements[i].onclick = fnc;
  }
}
function elementsBind(elements,evt,fnc){
  if(typeof elements == "string") elements = getElementsByClass(elements);
  for(var i = 0; i < elements.length; i++){
    elements[i]["on" + evt] = fnc;
  }
}
function clickElementById(id){
  var element = getElementById(id);
  element.click();
}
function elementBindToEvent(el,event,fnc){
  var evt = "on" + event;
  if(typeof el == "string") el = getElementById(el);
  if(el){
	if(el[evt]) el[evt] = undefined;
	el[evt] = fnc;
  }
}

function TranslateShow(status){
  if(status){
	elementShow("google_translate_element",true);
  }
  else{
	hideTranslateBanner();
	elementShow("google_translate_element",false);
	dropCookie("googtrans");
  }
}
function hideTranslateBanner(){
  if(getElementsByClass("goog-te-banner-frame").length > 0){
	var doc = getElementsByClass("goog-te-banner-frame")[0].contentDocument;
	doc.getElementsByClassName("goog-close-link")[0].click();
  }
  elementShow("goog-gt-tt",false);
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json'; 
    xhr.onload = function() {
        var status = xhr.status;    
        if (status == 200) { callback(null, xhr.response);}
		else {callback(status);}
    };    
    xhr.send();
};
function uploadJSON(book,fileName,data,callback){
  var url = "/Multibook/JUMbookUploaderJSON.php?book=" + book + "&filename=" + fileName;
  var data2 = JSON.stringify(data,undefined,2).replaceAll("&"," and ");
  postAjax(url,"json=" + data2,function(response){callback(response);});
}

function EventDispatcher(){
  var dummy = document.createTextNode('');
  this.off = dummy.removeEventListener.bind(dummy);
  this.on = dummy.addEventListener.bind(dummy);
  this.trigger = function(eventName, data){
    if( !eventName ) return;
    var e = new CustomEvent(eventName, {"detail":data});
    dummy.dispatchEvent(e);
  }
  //var myEventDispatcher = new EventDispatcher();
  //myEventDispatcher.on('foo', e =>{console.log(e.type, e.detail);});
  //myEventDispatcher.trigger('foo', 123);
}

function getAjax(url,success){
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("GET",url);
  xhr.onreadystatechange = function(){
    if(xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
  };
  xhr.send();
}
function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(
    function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&');
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}
function postAjaxFile(url,formData,success){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState>3 && req.status==200) { success(req.responseText); }
  };
  req.open('POST', url);
  req.send(formData);
  return req;
}

function doSerialFnc(data,dataArr,fnc,callback){ //calls function fnc with data from dataArr one after the other
  var i = 0;
  if(dataArr.length > 0) fnc(i,data,dataArr[i],nextStep);
  else nextStep();
  function nextStep(){
	i++;
	if(i < dataArr.length) fnc(i,data,dataArr[i],nextStep);
	else callback();
  }
}
function doParallelFnc(arr,fnc,callback){ //call parallel functions (fnc) with parameter from arr
  var waiting = Array.isArray(arr) ? arr.length : Object.keys(arr).length;
  if(waiting === 0) callback();
  else{
    if(Array.isArray(arr)) arr.forEach(function(data,index){doFnc(data,index);});
    else for(data in arr){doFnc(arr[data],data);}
  }
  function doFnc(data,id){fnc(data,id,function(){ if(!--waiting) callback();});}
}
function runScript(url,callback){
  scrl = document.createElement("script");
  document.body.appendChild(scrl);
  scrl.onload = function(evt){scrl.remove();callback();}
  scrl.src = url + "?rnd=" + Math.floor(Math.random() * 1000000);
}
