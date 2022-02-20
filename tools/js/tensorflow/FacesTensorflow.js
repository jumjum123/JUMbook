var bookName,bookFolder,dataFolder,imgFolder;
var images,faces = {};
function init(){
  fillProjects();
  elementBindClick("findFacesBtn",clickProject);
  elementBindClick("showFacesBtn",clickFace);
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
      ctx.rect(face[i].topLeft[0],face[i].topLeft[1],
			   face[i].bottomRight[0] - face[i].topLeft[0],face[i].bottomRight[1] - face[i].topLeft[1]);
	  ctx.stroke();
	}
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
    findFace(images[idx],canvas,ctx);
  }
  runScript(bookFolder + "/Data/Fotobook.js",function(){
    dataFolder = fotobook.dataDir + "Data/";
    imgFolder = fotobook.mediaDir + "Images/";
	runScript(dataFolder + "Images.js",function(data){
      img.src = imgFolder + images[idx];
	});
  });	
  async function findFace(imgName,canvas,ctx){
	var model = await blazeface.load();
	const prediction = await model.estimateFaces(canvas,false);
	faces[images[idx]] = prediction;
	idx++;
	if(idx < images.length) img.src = imgFolder + images[idx];
	else{
	  fillSelectFromObject("faces",faces);
	  console.log(faces);
	}
  }
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
