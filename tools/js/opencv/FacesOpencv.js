var bookName,bookFolder,dataFolder,imgFolder;
var images,faces = {};

function init(){
  fillProjects();
  elementBindClick("findFacesBtn",clickProject);
  elementBindClick("showFacesBtn",clickFace);
}
function loadModelss(callback){
  var utils = new Utils('');
  var proto = 'https://raw.githubusercontent.com/opencv/opencv/4.x/samples/dnn/face_detector/deploy_lowres.prototxt';
  var weights = 'https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel';
  var recognModel = 'https://raw.githubusercontent.com/pyannote/pyannote-data/master/openface.nn4.small2.v1.t7';
  utils.createFileFromUrl('face_detector.prototxt', proto, () => {
    document.getElementById('status').innerHTML = 'Downloading face_detector.caffemodel';
    utils.createFileFromUrl('face_detector.caffemodel', weights, () => {
      document.getElementById('status').innerHTML = 'Downloading OpenFace model';
      utils.createFileFromUrl('face_recognition.t7', recognModel, () => {
        document.getElementById('status').innerHTML = '';
        netDet = cv.readNetFromCaffe('face_detector.prototxt', 'face_detector.caffemodel');
        netRecogn = cv.readNetFromTorch('face_recognition.t7');
        callback();
      });
    });
  });
};
function detectFacess(img) {
  var blob = cv.blobFromImage(img, 1, {width: 192, height: 144}, [104, 117, 123, 0], false, false);
  netDet.setInput(blob);
  var out = netDet.forward();
  var imgfaces = [];
  for (var i = 0, n = out.data32F.length; i < n; i += 7) {
    var confidence = out.data32F[i + 2];
    var left = out.data32F[i + 3] * img.cols;
    var top = out.data32F[i + 4] * img.rows;
    var right = out.data32F[i + 5] * img.cols;
    var bottom = out.data32F[i + 6] * img.rows;
    left = Math.min(Math.max(0, left), img.cols - 1);
    right = Math.min(Math.max(0, right), img.cols - 1);
    bottom = Math.min(Math.max(0, bottom), img.rows - 1);
    top = Math.min(Math.max(0, top), img.rows - 1);
    if (confidence > 0.5 && left < right && top < bottom) {
      imgfaces.push({x: left, y: top, width: right - left, height: bottom - top})
    }
  }
  blob.delete();
  out.delete();
  return imgfaces;
};
function clickProject(){
  if(netDet == undefined || netRecogn == undefined) loadModelss(getFaces);
  else getFaces();
  function getFaces(){
    var img,cvimg,idx;//,canvas,ctx;
    bookName = getProj();
    bookFolder = "../Multibooks/" + bookName + "/";
    img = new Image();
    //canvas = getElementById("aktCanvas");
    idx = 0;
    img.onload = function(){
      var canvas,ctx;
	  canvas = document.createElement('canvas');
	  canvas.width = img.width;
	  canvas.height = img.height;
      ctx = canvas.getContext('2d');
	  ctx.drawImage(img,0,0);
      frameBGR = new cv.Mat(img.height, img.width, cv.CV_8UC3);
	  frame = cv.imread(canvas);
	  cv.cvtColor(frame, frameBGR, cv.COLOR_RGBA2BGR);
      faces[images[idx]] = detectFacess(frameBGR);
	  document.getElementById('status').innerHTML = idx.toString();
	  idx++;
	  frame.delete();
	  frameBGR.delete();
	  delete canvas;
	  if(idx < images.length) img.src = imgFolder + images[idx];
	  else {console.log(faces); fillSelectFromObject("faces",faces);}
    }
    runScript(bookFolder + "/Data/Fotobook.js",function(){
      dataFolder = fotobook.dataDir + "Data/";
      imgFolder = fotobook.mediaDir + "Images/";
	  runScript(dataFolder + "Images.js",function(data){
        img.src = imgFolder + images[idx];
	  });
    });
  };	
}
function clickFace(){
  var i,img,canvas,ctx;
  img = new Image();
  canvas = getElementById("aktCanvas");
  img.onload = function(){
	var face;
    canvas.width = img.width;
	canvas.height = img.height;
	ctx = canvas.getContext('2d');
	ctx.drawImage(img,0,0);
	face = faces[getValue("faces")];
	for(i = 0; i < face.length; i++){	
      ctx.strokeStyle = " rgba(75,221,17,1)";
	  ctx.beginPath();
      ctx.rect(face[i].x,face[i].y,face[i].width,face[i].height);
	  ctx.stroke();
	}
  };
  img.src = imgFolder + getValue("faces");
}

function getProj(){ return getElementById("projects").value;}
function fillProjects(){
  var url = "../scripts/JUMbookGetBooks.php"; 
  getAjax(url,function(data){
    var el = getElementById("projects");
	data = JSON.parse(data);
	el.options.length = 0;
	data.forEach(function(item){el.options.add(new Option(item.split("/")[2]));});
  });
}
