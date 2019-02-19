<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>Navigation</title> </head> <body> <ul><hr><a href="storage.zip">下载源码 by 2014/12/21 02:14</a><?php

function create_link($name, $href)
{
	$name=urlencode($name);
	$href=urlencode($href);
	printf('<li><a href="%s" target="view_frame">%s</a></li>', $name, $href);
}

$dir=scandir(dirname(__FILE__));
$dir=array_filter($dir,function($filename){
	return strpos($filename,'_')!==0;
});
$diff=array('.','..', 'index.html','main.css','main.js','storage.zip');
$dir=array_diff($dir, $diff);
$diff=null;

foreach ($dir as $filename) {
	create_link($filename,$filename);
}

?></ul> </body> </html>