<?php

$filename = "../../Multibook/Multibooks/" . $_REQUEST["book"] . "/JSON/" . $_REQUEST["name"] . ".json";
echo "uploading:" . $filename;
$myfile = fopen($filename, "w");
fwrite($myfile, $_POST["json"]);
fclose($myfile);

?>