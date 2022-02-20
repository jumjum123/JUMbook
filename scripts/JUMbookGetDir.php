<?php

function createJSON()
{	$path = '../' . $_REQUEST["path"] . '/*' . $_REQUEST["extension"];
    $first = 1;
	$comma = ' ';
    echo "[\n";
	#echo "\"\"";
    foreach(glob($path) as $file)
    {	
		echo $comma;	
		$parts = explode("/",$file);
		echo "\"" . $file . "\"";
		$comma = ',';
	}
	echo "\n]\n";
}

createJSON();
	
?>