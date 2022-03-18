var labeledFaceDescriptors = [],faces,faceMatcher;
var foundFaces;
function initFaces(cb){
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./js/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./js/models'),
    faceapi.nets.ageGenderNet.loadFromUri('./js/models')
  ]).then(function(){
    fillPersons(updateFaces);
	elementBindClick("createFaceDescBtn",createFaceDesc);
	elementBindClick("createFaceDataBtn",createFaceData);
	elementBind("personsList","change",updateFaces);
	elementBindClick("uploadFaceBtn",uploadFace);
    elementBindClick("createNewPersonBtn",createNewPerson);
  });
}
function preloadFaces(cb){
  var img,i,name;
  foundFaces = {};
  if(fotobook.facesReplace){
    for(i = 0; i < fotobook.facesReplace.length;i++) 
	  foundFaces[fotobook.facesReplace[i].to] = {img:new Image(),landmarks:{},x:0,y:0,w:0,h:0};
  }
  doParallelFnc(foundFaces,getImage,function(){cb();});
  function getImage(data,id,cb){
    data.img.onload = function(){
      getAjax("Persons/" + id + "/descriptor.json",function(personData){
        personData = JSON.parse(personData);
        data.landmarks = personData.landmarks;
        data.x = personData.x; data.y = personData.y;
        data.w = personData.w; data.h = personData.h; 
        cb();
      });
    }
    data.img.src = "Persons/" + id + "/1.jpg";
  }
}
function fillPersons(cb){
  var url= "scripts/JUMbookGetDir.php?path=Persons&" + getRnd();
  getAjax(url,function(data){
	fillSelectList("personsList",data,function(){
	  fillSelectList("allFacesList",data,cb);
    });
  });
}
function getLandmarks(landmarks){
  return {
    outline:landmarks.slice(0,17),
    leftEyeBrow:landmarks.slice(17,22),leftEye:landmarks.slice(36,42),
    rightEyeBrow:landmarks.slice(22,27),rightEye:landmarks.slice(42,48),
    nose:landmarks.slice(27,36),mouth:landmarks.slice(48,68)
  };
}
function createFaceDesc(){
  var url = "scripts/JUMbookGetDir.php?path=Persons/" + getValue("personsList") + "&" + getRnd();
  var retData = {label:getValue("personsList"),detections:[],landmarks:[],boxes:[],x:0,y:0,w:0,h:0};
  getAjax(url,function(data){
	data = JSON.parse(data);
	doSerialFnc(retData,data,getFaceDesc,gotData);
  });
  function gotData(){
	var url = "./scripts/JUMbookUploadPerson.php?person=" + retData.label;
	var data = JSON.stringify(retData,undefined,2);
    var r = postAjax(url,"js=" + data,function(a){
      alert("person detector uploaded " + a);
    });
  }
  async function getFaceDesc(i,retData,item,cb){
	var items = item.split("/");
	var path = items[items.length - 1];
	if(path.split(".")[1] == "jpg"){
	  var url = "./Persons/" + retData.label + "/" + items[items.length - 1];
      var img = await faceapi.fetchImage(url);
      var detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
      var box = detection.alignedRect._box;
      retData.x = box._x;retData.y = box._y;
      retData.w = box._width;retData.h = box._height;
      retData.fileName = items[items.length - 1];
	  retData.boxes.push({x:box._x,y:box._y,w:box._width,h:box._height});
      retData.detections.push(Array.from(detection.descriptor));
      retData.landmarks.push(getLandmarks(detection.landmarks.positions));
    }
	cb();
  }
}
function createFaceData(){
  var img,idx,canvas,ctx;
  faces = {};
  labeledFaceDescriptors = [];
  bookName = getExistingProject();
  bookFolder = "./Multibooks/" + bookName + "/";
  img = new Image();
  canvas = document.createElement("canvas");
  idx = 0;
  img.onload = function(){
	canvas.width = img.width;
	canvas.height = img.height;
    ctx = canvas.getContext('2d');
	ctx.drawImage(img,0,0);
    findFace(img,canvas,ctx);
  }
  getFacesDescription(function(){
    runScript(bookFolder + "Data/Fotobook.js",function(){
      dataFolder = fotobook.dataDir + "Data/";
      imgFolder = fotobook.mediaDir + "Images/";
	  runScript(dataFolder + "Images.js",function(data){
	    getElementById("imageCnt").innerHTML = "0 / " + images.length.toString();
        img.src = imgFolder + images[idx];
	  });
    });  
  });
  function getFacesDescription(cb){
    var url= "scripts/JUMbookGetDir.php?path=Persons&" + getRnd();
    getAjax(url,function(data){
      data = JSON.parse(data);
	  doSerialFnc(labeledFaceDescriptors,data,getFaceDescription,gotData);
	})
    function getFaceDescription(i,retData,item,cb){
      var url = "./Persons/" + item + "/descriptor.json?" + getRnd();
	  getAjax(url,function(data){
		data = JSON.parse(data);
		var detects = data.detections.map(function (d) {return new Float32Array(d);});
        labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(data.label,detects));
		cb();
      });
	}
	function gotData(){
	  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
	  cb();
	}
  }
  async function findFace(image,canvas,ctx){
	var found = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptors();
	var results = found.map(d => faceMatcher.findBestMatch(d.descriptor));
	if(found.length > 0){
	  faces[images[idx]] = [];
	  for(i = 0; i < found.length;i++){
        var box = found[i].detection._box;
        faces[images[idx]].push({x:box._x,y:box._y,w:box._width,h:box._height
	                            ,age:parseInt(found[i].age),gender:found[i].gender
	                            ,expressions:found[i].expressions,label:results[i].label
                                ,landmarks:getLandmarks(found[i].landmarks.positions)
							 });
	  }
	}
	idx++;
	getElementById("imageCnt").innerHTML = idx.toString() + " / " + images.length.toString();
	if(idx < images.length) img.src = imgFolder + images[idx];
	else uploadFaces(); 
  }	
  function uploadFaces(){
	var url = "./scripts/JUMbookUploadData.php?book=" + bookName;
    var data = JSON.stringify(faces,undefined,2);
    var r = postAjax(url + "&type=Faces&varname=faces","js=" + data,function(a){
      alert("faces uploaded " + a);
    });
  }
}
function createNewPerson(){
  var url = "scripts/JUMbookCreatePerson.php?person=" + getValue("newPersonName");
  getAjax(url,function(data){fillPersons(function(){console.log(data);});});
}
function updateFaces(){
  var url = "scripts/JUMbookGetDir.php?path=Persons/" + getValue("personsList") + "&extension=.jpg";
  getAjax(url,function(data){fillSelectList("facesList",data);});
}
function uploadFace(){
  var lst = getElementById("faceFile").files;
  var formData = new FormData();
  formData.append("faceFile",lst[0]);
  var url ="scripts/JUMbookUploadFace.php?person=" + getValue("personsList") + "&fileName=" + (getElementById("facesList").options.length + 1) + ".jpg";
  postAjaxFile(url,formData,function(data){updateFaces();console.log(data);});
}
function replaceFace(image,canvas,ctx,label,replaceLabel){
  var i,persons,person,replacePerson,pos;
  var scaleX = image.imagePart.width / canvas.width;
  var scaleY = image.imagePart.height / canvas.height;
  if(faces[image.fileName]){
    persons = faces[image.fileName];
    for(i = 0; i < persons.length; i++){
      if(persons[i].label == label){
        person = persons[i];
        replacePerson = foundFaces[replaceLabel];
        ctx.save();
        outlineFace(person.landmarks,person);
        drawImage(person,replacePerson);
        ctx.restore();
      }
    }
  }
  function getTargetXY(pos){
    return {x:parseInt((pos._x - image.imagePart.left) / scaleX)
           ,y:parseInt((pos._y - image.imagePart.top) / scaleY)};
  }
  function drawImage(person,replacePerson){
    var size = getFaceRect(person.landmarks,person);
    var pos = getTargetXY({_x:size.x,_y:size.y});
    var replaceSize = getFaceRect(replacePerson.landmarks[0],replacePerson);
    ctx.drawImage(replacePerson.img,replaceSize.x,replaceSize.y,replaceSize.w,replaceSize.h,
                  pos.x,pos.y,size.w / scaleX,size.h / scaleY);
  }
  function getFaceRect(landmarks,box){
    var i,r = {x:0,y:0,w:0,h:0};
    r.x = landmarks.outline[0]._x;
    r.w = landmarks.outline[16]._x - r.x;
    r.y = box.y;
	r.y = Math.min(r.y,landmarks.outline[16]._y);
	r.y = Math.min(r.y,landmarks.outline[0]._y);
    for(i = 0; i < 5;i++) r.y = Math.min(r.y,landmarks.leftEyeBrow[i]._y);
    for(i = 0; i < 5;i++) r.y = Math.min(r.y,landmarks.rightEyeBrow[i]._y);
    r.h = landmarks.outline[8]._y - r.y;
    return r;
  }
  function outlineFace(landmarks,box){
    var pnt;
    var size = getFaceRect(landmarks,box);
    var targets = landmarks.outline.map(pnt => getTargetXY(pnt));
    ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.lineWidth = 5;
    ctx.beginPath();
    pnt = getTargetXY({_x:landmarks.leftEyeBrow[0]._x,_y:size.y});
    ctx.moveTo(pnt.x,pnt.y);
    for(var i = 0; i < targets.length; i++){ ctx.lineTo(targets[i].x,targets[i].y); }
	pnt = getTargetXY({_x:landmarks.rightEyeBrow[4]._x,_y:box.y});
	ctx.lineTo(pnt.x,pnt.y);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();
  }
}
function faceDrawSmiley(image,canvas,ctx){
  var persons,box,x,y,w,h;
  var scaleX = image.imagePart.width / canvas.width;
  var scaleY = image.imagePart.height / canvas.height;
  if(faces[image.fileName]){
    persons = faces[image.fileName];
	for(i = 0; i < persons.length; i++){
       box = persons[i];
	   drawSmiley(ctx,(box.x - image.imagePart.left) / scaleX,
	                  (box.y - image.imagePart.top) / scaleY,box.w / scaleX,box.h / scaleY);
	}
  }
  function drawSmiley(ctx,x,y,w,h){
    ctx.fillStyle = 'LawnGreen';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + w/2,y + h/2,w / 2,h / 2,0,0,2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //eyes
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(x + w / 3,y + h / 3,w /15,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x + w / 3 * 2,y + h/3,w/15,0,2 * Math.PI)
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //mouth
    ctx.strokeStyle = 'magenta';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(x + w / 2,y + h / 3 * 2,w / 3,h/4,0,0,-1*Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
