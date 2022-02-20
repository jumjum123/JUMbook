<?php 

$filedest = "../Persons/" . $_REQUEST["person"] . "/" . $_REQUEST["fileName"];

move_uploaded_file($_FILES["faceFile"]["tmp_name"], $filedest);

echo $_FILES["faceFile"]["tmp_name"] . " uploaded to " . $filedest;

?>