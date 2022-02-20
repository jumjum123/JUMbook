<?php
$path = '../../Multibook/Multibooks/' . $_REQUEST["book"] . '/' . $_REQUEST["type"] . '/*';
$comma = ' ';
echo "[\n";
foreach(glob($path) as $file)
{
	echo $comma;
	echo "\"" . $file . "\"";
	$comma = ',';
}
echo "\n]\n";
?>