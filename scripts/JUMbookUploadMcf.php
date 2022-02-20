<?php   

$filename = "../../Multibook/Multibooks/" . $_REQUEST["book"] . "/Fotobook/Fotobook.mcf";

move_uploaded_file($_FILES["mcfFile"]["tmp_name"], $filename);

echo $_FILES["mcfFile"]["tmp_name"] . "mcf uploaded to " . $filename;

?>