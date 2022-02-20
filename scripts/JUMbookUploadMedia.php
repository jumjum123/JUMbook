<?php   

$filedest = "../../Multibook/Multibooks/" . $_REQUEST["book"] . "/" . $_REQUEST["type"] . "/" . $_REQUEST["fileName"];

move_uploaded_file($_FILES["mediaFile"]["tmp_name"], $filedest);

echo $_REQUEST["fileName"] . " uploaded to " . $filedest;

?>