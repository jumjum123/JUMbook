<div style="position:absolute;width:600px;height:550px;left:50px;top:50px;z-index:99;background:#00c000;" id="AdminTextDiv">
 Page
 <br>Header<input type="text" id="pageHeader" size="25">
 <br>Backnoise<input type="text" id="adminBackNoise" size="50">
 <br>Plugins:<select id="adminPlugins" size="5"></select>
 <br><button id="AdminSavePage">Save Page</button>
 <button id="AdminUpload">Upload all</button>
 <button id="AdminExit">Exit admin</button>
 <hr>
 Image
 <br>Text<input id="speakTextRadio" type="radio" value="text" name="nametextSpeak">
 Audio<input id="speakAudioRadio" type="radio" value="audio" name="nametextSpeak">
 <div id="speakTextField"><textarea id="AdminTextBox" cols="80" rows="5"></textarea></div>
 <div id="speakAudioField">
  <input id="speakTextFileName" type="text" value="audio_" readOnly>
  <button id="recordAudio">Record</button>
  <button id="stopAudio">Stop</button>
  <button id="saveAudio">Upload Audio</button>
  <div id="recorded-audio"></div>
 </div>
 <br>Video<select id="adminVideo" size="8"></select>
 <br>WebUrl<textarea cols="50" rows="2" id="adminWebUrl"></textarea>
 <br><button id="AdminSaveImage">Save image</button>
</div>
