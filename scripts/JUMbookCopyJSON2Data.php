<?php

function copy2Data($file,$variable)
{	$src = '../../Multibook/Multibooks/' . $_REQUEST["book"] . '/JSON/' . $file . ".json";
	$dest = '../Multibooks/' . $_REQUEST["book"] . '/Data/' . $file . ".js";
	$filesrc = fopen($filename,"r");
	$filedest = fopen($dest,"w");
	$data = file_get_contents($src);
	fwrite($filedest,$variable);
	fwrite($filedest,' = ');
	fwrite($filedest,$data);
	fwrite($filedest,';');
	fclose($filesrc);
	fclose($filedest);
}

mkdir('../Multibooks/' . $_REQUEST["book"], 0777, true);
mkdir('../Multibooks/' . $_REQUEST["book"] . '/Data', 0777, true);
mkdir('../Multibooks/' . $_REQUEST["book"] . '/Fotobook', 0777,true);
copy2Data('Audios','audios');
copy2Data('autorun','settings');
copy2Data('Fotobook','fotobook');
copy2Data('Images','images');
copy2Data('PagesExtended','pagesextended');
copy2Data('Translate','translate');
copy2Data('Videos','videos');

copy('../../Multibook/Multibooks/' . $_REQUEST["book"] . '/Fotobook/Fotobook.json' , '../Multibooks/' . $_REQUEST["book"] . '/Fotobook/Fotobook.json');
copy('../../Multibook/Multibooks/' . $_REQUEST["book"] . '/Fotobook/Fotobook.mcf' , '../Multibooks/' . $_REQUEST["book"] . '/Fotobook/Fotobook.mcf');
copy('../../Multibook/Multibooks/' . $_REQUEST["book"] . '/Fotobook/Readable.json' , '../Multibooks/' . $_REQUEST["book"] . '/Fotobook/Readable.json');

echo 'Data Files created in Multibooks/' . $_REQUEST["book"] . '/Data';
?>