<?php

$filename = "../Multibooks/" . $_REQUEST["book"] . "/Data/" . $_REQUEST["type"] . ".js";
echo "uploading:" . $filename;
$myfile = fopen($filename, "w");
fwrite($myfile, $_REQUEST["varname"]);
fwrite($myfile, ' = ');
fwrite($myfile, $_POST["js"]);
fwrite($myfile, ';');
fclose($myfile);
echo " done";

?>