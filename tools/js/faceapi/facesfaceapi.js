var bookName,bookFolder,dataFolder,imgFolder;
var images,faces = {};
var labeledFaceDescriptors,faceMatcher;
function init(){
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./js/faceapi/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./js/faceapi/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./js/faceapi/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./js/faceapi/models'),
    faceapi.nets.ageGenderNet.loadFromUri('./js/faceapi/models')
  ]).then(function(){
    initPersons();
    fillProjects();
    elementBindClick("findFacesBtn",clickProject);
    elementBindClick("showFacesBtn",clickFace);
	elementBindClick("uploadFaceBtn",clickUpload);
  });

}
async function initPersons(){
  labeledFaceDescriptors = await loadLabeledImages()
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
}
function loadLabeledImages() {
  const labels = ['Karin', 'Michelle', 'Fabian', 'Juergen'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`../Persons/${label}/${i}.jpg`);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
function clickFace(){
  var i,img,canvas,ctx,detection;
  img = new Image();
  canvas = getElementById("aktCanvas");
  img.onload = function(){
	var face,singleFace;
    canvas.width = img.width;
	canvas.height = img.height;
	ctx = canvas.getContext('2d');
	ctx.drawImage(img,0,0);
	face = faces[getValue("faces")];
	for(i = 0; i < face.length; i++){
	  ctx.strokeStyle = " rgba(75,221,17,1)";
	  ctx.beginPath();
      ctx.rect(face[i].x,face[i].y,face[i].w,face[i].h);
	  ctx.stroke();
	}
	canvas.onclick = function(data){
      var face = faces[getValue("faces")];
	  for(var i = 0; i < face.length; i++){
		if(data.layerX > face[i].x && data.layerX < (face[i].x + face[i].w)){
          if(data.layerY > face[i].y && data.layerY < (face[i].y + face[i].h)){
			alert(face[i].label + "\nAge:" + face[i].age + "\nGender:" + face[i].gender + "\nExpression:" + getExpressions(face[i].expressions));
		  }
		}
	  }
	  function getExpressions(expr){
		var r = [];
		for(var p in expr){
		  if(expr[p] > 0.2)r.push(p);
        }
        return r.join(",");		
	  }
    };
  };
  img.src = imgFolder + getValue("faces");
}
function clickProject(){
  var img,idx,canvas,ctx;
  bookName = getProj();
  bookFolder = "../Multibooks/" + bookName + "/";
  img = new Image();
  canvas = getElementById("aktCanvas");
  idx = 0;
  img.onload = function(){
	canvas.width = img.width;
	canvas.height = img.height;
    ctx = canvas.getContext('2d');
	ctx.drawImage(img,0,0);
    findFace(img,canvas,ctx);
  }
  runScript(bookFolder + "/Data/Fotobook.js",function(){
    dataFolder = fotobook.dataDir + "Data/";
    imgFolder = fotobook.mediaDir + "Images/";
	runScript(dataFolder + "Images.js",function(data){
      img.src = imgFolder + images[idx];
	});
  });	
  async function findFace(image,canvas,ctx){
	var found = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptors()
	var results = found.map(d => faceMatcher.findBestMatch(d.descriptor))
	if(found.length > 0){
	  faces[images[idx]] = [];
	  for(i = 0; i < found.length;i++){
        var box = found[i].detection._box;
        faces[images[idx]].push({x:box._x,y:box._y,w:box._width,h:box._height
	                            ,age:parseInt(found[i].age),gender:found[i].gender
	                            ,expressions:found[i].expressions,label:results[i].label
							 });
	  }
	}
	idx++;
	if(idx < images.length) img.src = imgFolder + images[idx];
	else{
	  fillSelectFromObject("faces",faces);
	}
  }	
}
function clickUpload(){
  var url = "../scripts/JUMbookUploadData.php?book=" + getProj();
  var data = JSON.stringify(faces,undefined,2);
  var r = postAjax(url + "&type=Faces&varname=faces","js=" + data,function(a){
    alert("faces uploaded " + a);
  });
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
