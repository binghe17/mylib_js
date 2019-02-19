<?php




//====================================================文件操作

	// get_file('c/a/a.php','中文写入时UTF-8，只有英文时ASCII');	//写入文件内容
	// save_file('c/a/a.php');									//读取文件内容

	// copy_dir('b','d/e'); 					//测试复制文件夹 建立一个d/e文件夹，把b文件夹下的内容复制进去
	// copy_file('b/1/2/3.exe','b/b/3.exe'); 	//测试复制文件 建立一个b/b文件夹，并把b/1/2文件夹中的3.exe文件复制进去
	// move_dir('a/','b/c'); 					//测试移动文件夹 建立一个b/c文件夹,并把a文件夹下的内容移动进去，并删除a文件夹
	// move_file('b/1/2/3.exe','b/d/3.exe'); 	//测试移动文件 建立一个b/d文件夹，并把b/1/2中的3.exe移动进去

	// new_dir('a/1/2/3'); 						//测试建立文件夹 建一个a/1/2/3文件夹
	// new_file('b/1/2/3'); 					//测试建立文件 在b/1/2/文件夹下面建一个3文件
	// new_file('b/1/2/3.exe'); 				//测试建立文件 在b/1/2/文件夹下面建一个3.exe文件
	// del_dir('d'); 							//测试删除文件夹 删除d文件夹
	// del_file('b/d/3.exe'); 					//测试删除文件 删除b/d/3.exe文件



//新建目录
function new_dir($aimUrl) {
	$aimUrl = str_replace('', '/', $aimUrl);
	$aimDir = '';
	$arr = explode('/', $aimUrl);
	foreach($arr as $str) {
		$aimDir.= $str.'/';
		if(!file_exists($aimDir)) mkdir($aimDir);
	}
}
//新建文件
function new_file($aimUrl, $overWrite = false) {
	if(file_exists($aimUrl) && $overWrite == false) return false;
	elseif(file_exists($aimUrl) && $overWrite == true) del_file($aimUrl);
	$aimDir = dirname($aimUrl);
	createDir($aimDir);
	touch($aimUrl);
	return true;
}


//删除目录
function del_dir($aimDir) {
	$aimDir = str_replace('', '/', $aimDir);
	$aimDir = substr($aimDir, -1) == '/' ? $aimDir : $aimDir.'/';
	if(!is_dir($aimDir)) return false;
	$dirHandle = opendir($aimDir);
	while(false !== ($file = readdir($dirHandle))) {
		if($file == '.' || $file == '..') continue;
		if(!is_dir($aimDir.$file)) del_file($aimDir.$file);
		else del_dir($aimDir.$file);
	}
	closedir($dirHandle);
	return rmdir($aimDir);
}
//删除文件
function del_file($aimUrl) {
	if(file_exists($aimUrl)) { unlink($aimUrl); return true; } 
	else return false;
}


//移动目录
function move_dir($oldDir, $aimDir, $overWrite = false) {
	$aimDir = str_replace('', '/', $aimDir);
	$aimDir = substr($aimDir, -1) == '/' ? $aimDir : $aimDir.'/';
	$oldDir = str_replace('', '/', $oldDir);
	$oldDir = substr($oldDir, -1) == '/' ? $oldDir : $oldDir.'/';
	if(!is_dir($oldDir)) return false;
	if(!file_exists($aimDir)) new_dir($aimDir);
	@$dirHandle = opendir($oldDir);
	if(!$dirHandle) return false;
	while(false !== ($file = readdir($dirHandle))) {
		if($file == '.' || $file == '..') continue;
		if(!is_dir($oldDir.$file)) move_file($oldDir.$file, $aimDir.$file, $overWrite);
		else move_dir($oldDir.$file, $aimDir.$file, $overWrite);
	}
	closedir($dirHandle);
	return rmdir($oldDir);
}
//移动文件
function move_file($fileUrl, $aimUrl, $overWrite = false) {
	if(!file_exists($fileUrl)) return false;
	if(file_exists($aimUrl) && $overWrite = false) return false;
	elseif(file_exists($aimUrl) && $overWrite = true) del_file($aimUrl);
	$aimDir = dirname($aimUrl);
	new_dir($aimDir);
	rename($fileUrl, $aimUrl);
	return true;
}


//复制目录
function copy_dir($oldDir, $aimDir, $overWrite = false) {
	$aimDir = str_replace('', '/', $aimDir);
	$aimDir = substr($aimDir, -1) == '/' ? $aimDir : $aimDir.'/';
	$oldDir = str_replace('', '/', $oldDir);
	$oldDir = substr($oldDir, -1) == '/' ? $oldDir : $oldDir.'/';
	if(!is_dir($oldDir)) return false;
	if(!file_exists($aimDir)) new_dir($aimDir);
	$dirHandle = opendir($oldDir);
	while(false !== ($file = readdir($dirHandle))) {
		if($file == '.' || $file == '..') continue;
		if(!is_dir($oldDir.$file)) copy_file($oldDir.$file, $aimDir.$file, $overWrite);
		else copy_dir($oldDir.$file, $aimDir.$file, $overWrite);
	}
	return closedir($dirHandle);
}
//复制文件
function copy_file($fileUrl, $aimUrl, $overWrite = false) {
	if(!file_exists($fileUrl)) return false;
	if(file_exists($aimUrl) && $overWrite == false) return false;
	elseif(file_exists($aimUrl) && $overWrite == true) del_file($aimUrl);
	$aimDir = dirname($aimUrl);
	new_dir($aimDir);
	copy($fileUrl, $aimUrl);
	return true;
}


//写入文件
function save_file($aimUrl, $fileData) {
	$aimDir = dirname($aimUrl);
	new_dir($aimDir);
	return @file_put_contents($aimUrl,$fileData);
}
//读取文件
function get_file($fileUrl) {
	return @file_get_contents($fileUrl);
}



//-------------------------






class txt {

	//按行分割，字符串到数组。
	function line2arr($str,$type=0){
		$arr=explode("\n", $str);//（不删除行为空白的值）
		foreach ($arr as $k => $v) {
			if($type==0 and $v) $rs[]=$v;	//输出索引数组，去掉原始键名
			if($type==1 and $v) $rs[$k]=$v;	//输出索引数组，保留原始键名
		}
		return $rs;
	}


	//----------------------txt格式1
	/*
		a=aaaaaa 		//键名1=值1
		bbb=bbbbbbbb 	//键名2=值2
		cc=ccccccc 		//...
	*/
	//------------------------------
	//数组转为字符串 $arr=array('a'=>'aaaaa','bbb'=>'bbbbbbbb','cc'=>'ccccccc');
	function encode1($arr,$type=2,$fu='='){
		if($type==0) return implode($fu, array_keys($arr)) . "\r\n";
		if($type==1) return implode($fu, array_values($arr)) . "\r\n";
		if($type==2) {
			foreach ($arr as $k => $v) {
				$rs.=$k.$fu.$v."\r\n";
			}
			return $rs;
		}
	}
	//字符串转为数组 
	function decode1($str,$type=2,$fu='='){
		if($type==0) return explode($fu, $str);
		if($type==1) return explode($fu, $str);
		if($type==2) {
			$arr0=explode("\r\n", $str);//（不删除行为空白的值）
			foreach ($arr0 as $v) if($v) $arr[]=$v;	//去掉空白值,
			foreach ($arr as $k => $v) {
				$arr2=explode($fu, $v);
				$rs[$arr2[0]]=$arr2[1];
			}
			return $rs;
		}
	}

	//----------------------txt格式2
	/*
		a|bbb|cc 						//第一行为，字段
		aaaaa|bbbbbbbb|ccccccc 			//第二行开始是值
		asdf|bbbwwwwbbbbb|cccc343ccc
	*/
	//------------------------------
	//数组转为字符串 $arr[0]=array('a'=>'aaaaa','bbb'=>'bbbbbbbb','cc'=>'ccccccc');
	function encode2($arr,$fu='|'){
		foreach ($arr as $k => $v) {
			if(!$key) $key=implode($fu, array_keys($arr[$k])) . "\r\n";
			$val.=implode($fu, array_values($arr[$k])) . "\r\n";
		}
		return $key.$val;
	}
	//字符串转为数组 
	function decode2($str,$fu='|'){
		$arr0=explode("\r\n", $str);//（不删除行为空白的值）
		foreach ($arr0 as $v) if($v) $arr[]=$v;	//去掉空白值,
		$arr2['key']=explode($fu,$arr[0]);
		for ($i=1; $i <count($arr) ; $i++) {
			$arr2['val'][]=explode($fu, $arr[$i]);
		}
		foreach ($arr2['val'] as $k=>$v) {
			foreach ($v as $k2 => $v2) {
				$rs[$k][$arr2['key'][$k2]] = $v2;
			}
		}
		return $rs;
	}

}


//print_r(txt::line2arr("aaa\nbbb\nccc\n"));
//---------------
// $arr=array('a'=>'aaaaa','bbb'=>'bbbbbbbb','cc'=>'ccccccc');
// echo $str=txt::encode1($arr);
// print_r(txt::decode1($str));
// //---------------
// $arr2[0]=array('a'=>'aaaaa','bbb'=>'bbbbbbbb','cc'=>'ccccccc');
// print_r($str2=txt::encode2($arr2));	
// print_r(txt::decode2($str2));



//===============================================


//디렉토리사이즈/파일갯수
function DirSizeNum($t_dir){
	$dirh = opendir($t_dir); 
	while(false !== ($filename = readdir($dirh))) { 
		if($filename != '.' && $filename != '..') {
			if(!is_file($t_dir.'/'.$filename)) {
				$s = DirSizeNum($t_dir.'/'.$filename);
				$d['size'] += $s['size'];
				$d['num'] += $s['num'];
			}else { 
				$d['size'] += filesize($t_dir.'/'.$filename); 
				$d['num']++;
			}
		}
	} 
	closedir($dirh);
	return $d;
}

//文件夹权限0755
function DirChmod($t_dir,$mode){
	$dirh = opendir($t_dir); 
	while(false !== ($filename = readdir($dirh))) { 
		if($filename != '.' && $filename != '..') {
			if(!is_file($t_dir.'/'.$filename)) {
				@chmod($t_dir.'/'.$filename,$mode); 
				DirChmod($t_dir.'/'.$filename,$mode);
			}else @chmod($t_dir.'/'.$filename,$mode); 
		}
	} 
	closedir($dirh);
	@chmod($t_dir,$mode);
}


//创建目录
function dir_create($path, $mode = 0777) {
    if(is_dir($path)) return TRUE;
    $ftp_enable = 0;
    $path = dir_path($path);
    $temp = explode('/', $path);
    $cur_dir = '';
    $max = count($temp) - 1;
    for($i=0; $i<$max; $i++) {
        $cur_dir .= $temp[$i].'/';
        if (@is_dir($cur_dir)) continue;
        @mkdir($cur_dir, 0777,true);
        @chmod($cur_dir, 0777);
    }
    return is_dir($path);
} 

//路径 转化 \ 为 /
function dir_path($path) {
	$path = str_replace("\\", '/', $path);
	if(substr($path, -1) != '/') $path = $path.'/';
	return $path;
}


//압축
function DirZip($t_dir,$n_dir,$zipfile){
	$dirh = opendir($t_dir); 
	while(false !== ($filename = readdir($dirh))) { 
		if($filename != '.' && $filename != '..') {
			if(!is_file($t_dir.'/'.$filename)) {
				$zipfile -> new_file('',$n_dir.'/'.$filename.'/');
				DirZip($t_dir.'/'.$filename,$n_dir.'/'.$filename,$zipfile);
			} else $zipfile -> new_file($t_dir.'/'.$filename,$n_dir.'/'.$filename);
		}
	} 
	closedir($dirh);
}


//폴더네임얻기
function getFolderName($file){
	if(is_file($file.'/name.txt')) return implode('',file($file.'/name.txt'));
	return basename($file);
}




//私用函数，取目录名（取出最后一个斜杠后的名字）
function dirname1($val){
	if(is_array($val)){
		foreach ($val as $v) {
			$rs[]=substr($v,strrpos($v,'/')+1);
		}
	} else $rs=substr($val,strrpos($val,'/')+1);
	return $rs;
}

//-------------------------------保存文件版本。用这个函数保存的文件，每一次修改都会对原有文件备份后保存起来（待制作。）



//-----------------编码。译码

function iniFile2arr($file){
	return parse_ini_file($file, 1); //ini.txt  //10000次时0.72233秒（ini 慢些）
}
function xmlFile2arr($file){
	return simplexml_load_file($file); ///xml.txt	//10000次时1.01983秒（simplexml）输出为对象
}
function serFile2arr($file){ //serialize
	return unserialize(file_get_contents($file)); //serialize.txt	//10000次时0.50686秒（serialize）
}
function json2arr($file){
	json_decode(file_get_contents($file), 1);	//json.txt	//10000次时0.55496秒（json更快）(推荐)
	//json_decode(str_replace('<?php','',file_get_contents($file)), 1);	//10000次时0.55496秒（json更快）(加安全)
}
// function returnArrFile2arr($file){ 
// 	return include($file);  //array.php  //10000次时0.71845秒（include）（不安全，引入函数危险性）(打开空文件时0.4224)
// 	//return eval(str_replace('<?php','',file_get_contents($file))); //10000次时0.65641（仿include）（不安全）(打开空文件时0.3439)
// }



function arr2ser($arr){
	return serialize($arr);
}
function arr2json($arr){
	return json_encode($arr);
}
function savefile($file, $cont){
	file_put_contents($file, $cont);
}




//----------------------
/*
//------ini.txt
; 分号是注释
; 键名 = 键值

[first_section]
one = 1 		;类型都是字符串
five = 5
animal = BIRD 	;常量，有定义的话被替换

[second_section]
path = "/usr/local/bin"
URL = "http://www.example.com/~username"

[third_section]
phpversion[] = "5.0"
phpversion[] = "5.1"
phpversion[] = "5.2"
phpversion[] = "5.3"



//----json.txt
{
	"first_section":{
		"one":"1",
		"five":"5",
		"animal":"BIRD"
	},
	"second_section":{
		"path":"\/usr\/local\/bin",
		"URL": "http:\/\/www.example.com\/~username"
	},
	"third_section":{
		"phpversion":["5.0","5.1","5.2","5.3"]
	}
}

//------serialize.txt
a:3:{s:13:"first_section";a:3:{s:3:"one";s:1:"1";s:4:"five";s:1:"5";s:6:"animal";s:4:"BIRD";}s:14:"second_section";a:2:{s:4:"path";s:14:"/usr/local/bin";s:3:"URL";s:32:"http://www.example.com/~username";}s:13:"third_section";a:1:{s:10:"phpversion";a:4:{i:0;s:3:"5.0";i:1;s:3:"5.1";i:2;s:3:"5.2";i:3;s:3:"5.3";}}}

//------xml.txt
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note>


//------array.php
return array(
	'first_section' => array(
		'one' => '1',
		'five' => '5',
		'animal' => 'BIRD',
	),
	'second_section' => array(
		'path' => '/usr/local/bin',
		'URL' => 'http://www.example.com/~username',
	),
	'third_section' => array(
		'phpversion' => array(
			0 => '5.0',
			1 => '5.1',
			2 => '5.2',
			3 => '5.3',
		),
	),
);
*/

