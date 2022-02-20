<?php

function createJSON()
{	$path = '../Multibooks/*';
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