<?php   

$url = "../../Multibook/Multibooks/" . $_REQUEST["book"];
if (!file_exists($url)) {
  $ret = mkdir($url, 0777, true);
  mkdir($url . "/Audios", 0777, true);
  mkdir($url . "/Fotobook", 0777, true);
  mkdir($url . "/Images", 0777, true);
  mkdir($url . "/JSON", 0777, true);
  mkdir($url . "/Videos", 0777, true);
  mkdir($url . "/Data",0777,true);
}
copy("../JSON/autorun.json", $url . "/JSON/autorun.json");
copy("../JSON/Translate.json", $url . "/JSON/Translate.json");
echo "project " . $url . " created\n";

?>
