<table border = "1">
 <tr>
  <th colspan = "3">
   <button id = "exitAdminTools">Exit admin tools</button>
   <button id = "createMasterLists">Create Master Lists</button>
  </th>
 </tr>
 <tr><th>Image</th><th>Video</th><th>Audio</th></tr>
 <tr>
  <th>
   <button id = "showMissingImages">Missing Images</button>
   <br>
   <select id = "adminImageList" size = "8"></select>
   <br>
   <input type = "file" id = "imageFile" accept = "image/*">
   <button id = "uploadimage">Upload image</button>
  </th>
  <th>
   <button id = "showMissingVideos">Missing Videos</button>
   <br>
   <select id = "adminVideoList" size = "8"></select>
   <br>
   <input type="file" id="videoFile" accept="video/*">
   <button id="uploadvideo">Upload video</button>
  </th>
  <th>
   <button id = "showMissingAudios">Missing Audios</button>
   <br>
   <select id = "adminAudioList" size = "8"></select>
   <br>
   <input type="file" id="audioFile" accept="audio/*">
   <button id="uploadaudio">Upload audio</button>
   <br>
   <input type="text" id="filenameAudio">
   <button id="recordAudio">Record</button>
   <button id="stopAudio">Stop</button>
   <button id="saveAudio">Upload</button>
   <div id="recorded-audio"></div>
  </th>
 </tr>
</table>
