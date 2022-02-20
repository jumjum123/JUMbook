<?php

$filename = "../Persons/" . $_REQUEST["person"] . "/descriptor.json";
echo "uploading:" . $filename;
$myfile = fopen($filename, "w");
fwrite($myfile, $_POST["js"]);
fclose($myfile);
echo " done";

?>