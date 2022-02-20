<?php   

$url = "../Persons/" . $_REQUEST["person"];
mkdir($url, 0777,true);

echo "person " . $_REQUEST["person"] . " created\n";

?>
