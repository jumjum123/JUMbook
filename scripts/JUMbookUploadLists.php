<?php

function createJSON($obj)
{	$path = '../../Multibook/Multibooks/' . $_REQUEST["book"] . '/' . $obj . '/*';
	echo $path;
	$filename = '../../Multibook/Multibooks/' . $_REQUEST["book"] . '/JSON/' . $obj . '.json';
    $first = 1;
    $myfile = fopen($filename,"w");
    fwrite($myfile,"[\n");
	fwrite($myfile,"\"\"");
    foreach(glob($path) as $file)
    {	fwrite($myfile,",\n");
		$parts = explode("/",$file);
		$cnt = count($parts);
		fwrite($myfile,"\"" . $parts[$cnt - 1] . "\"");
	}
	fwrite($myfile,"\n]\n");
	fclose($myfile);
}

createJSON("Videos");
createJSON("Audios");
createJSON("Images");
copy('../JSON/Translate.json','../../Multibook/Multibooks/' . $_REQUEST["book"] . '/JSON/Translate.json');
echo "JSON list for Videos, Audios, Images created"; 
	
?>