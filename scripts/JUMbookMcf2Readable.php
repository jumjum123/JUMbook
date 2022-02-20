<?php   

$filename = "../../Multibook/Multibooks/" . $_REQUEST["book"] . "/Fotobook/Fotobook.mcf";
$readable = "../../Multibook/Multibooks/" . $_REQUEST["book"] . "/Fotobook/Readable.json";
    
$fileContents= file_get_contents($filename);
$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
$fileContents = trim(str_replace('"', "'", $fileContents));

$simpleXml = simplexml_load_string($fileContents,"SimpleXMLElement",LIBXML_NOCDATA);

if ($simpleXml === false){
	echo "error in xml\n";
	print_r("simpleXML:");
	print_r($simpleXml);
	print_r(" xx\n");
	$errors = libxml_get_errors();
	print_r("Errors:" . $errors + "\n");
	foreach($errors as $error) {
		print_r("\tError:" . $error->message . "\n");
	}
}

$json = json_encode($simpleXml, JSON_PRETTY_PRINT);
$myfile = fopen($readable, "w");
fwrite($myfile, $json);
fclose($myfile);
echo $filename . " readable in " . $readable . "\n";

?>