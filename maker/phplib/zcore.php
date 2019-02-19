<?php


//客户端要什么数据。就给什么数据。

$url=trim($_SERVER['PATH_INFO'],'/');//路由，指定单页
if($url==='post'){
	$p1=isset($_POST['filepath']) ? $_POST['filepath'] : 'w/localhost/'; //临时路径限制
	$fname=rtrim($_POST['filename'],'/');	//待安全过滤
	$data=$_POST['savedata'];		//待安全过滤
	$hz='.txt';

	if($_POST['act']==='get_file'){
		echo get_file($p1.$fname.$hz);
	}elseif($_POST['act']==='save_file'){
		if(put_file($p1.$fname.$hz, $data)) echo 'ok'; else echo 'no';
	}elseif($_POST['act']==='load_file') echo 'ENG 中文 한글';
	elseif($_POST['act']==='get_filelist'){
		$arr=str_replace($p1, '', glob($p1.$fname.'/*'));
		$arr=str_replace($hz, '', $arr);
		echo json_encode($arr, JSON_UNESCAPED_SLASHES);
	}

}elseif($url==='upload'){

	file_upload();

}else{

	//=============================调度层
	//文件路径路径
	$GLOBALS['f']['webname']=$_SERVER['HTTP_HOST'];//localhost制作指定域名才能访问的网站
	// $GLOBALS['f']['pagepath']=trim(dirname($_SERVER['PHP_SELF'])).'/w/'.$_SERVER['HTTP_HOST'].'/pages';//pathinfo单页
	// echo $GLOBALS['f']['pagepath'];


	function w_webstart($start='atom/html/index'){//模板文件
		$act=file_get_contents('w/'.$GLOBALS['f']['webname'].'/'.$start.'.txt');
		echo $act;
	}
	w_webstart();

}
// echo get_file('w/localhost/atom/html/tpl');
// echo '<pre>'; print_r($rs); print_r($_SERVER);	


// if($_GET['p']=='save') file_put_contents($POST['pathname'], $_POST['data']);
// if($_GET['p']=='load') echo 'ENG 中文 한글';
// if($_GET['p']=='get') echo file_get_contents('F0001.txt');



//====================================================文件上传

function file_upload($file=null, $path='uploads/'){

	// $_FILES["file_upload"]["name"] - 被上传文件的名称
	// $_FILES["file_upload"]["type"] - 被上传文件的类型
	// $_FILES["file_upload"]["size"] - 被上传文件的大小，以字节计
	// $_FILES["file_upload"]["tmp_name"] - 存储在服务器的文件的临时副本的名称
	// $_FILES["file_upload"]["error"] - 由文件上传导致的错误代码

	// $fileTypes = array('image/jpg','image/jpeg','image/gif','image/png'); // File extensions
	// if (in_array($_FILES["file_upload"]["type"], $fileTypes)) {

	if(gettype($_FILES["file_upload"]['tmp_name'])=='array'){
		foreach ($_FILES["file_upload"]["tmp_name"] as $k => $v) {
			move_file($_FILES["file_upload"]["tmp_name"][$k], $path.$_FILES["file_upload"]["name"][$k]);
		}
		echo '1';
	}else{
		move_file($_FILES["file_upload"]["tmp_name"],'uploads/'.$_FILES["file_upload"]["name"]); echo '1';
	}
	// } else echo 'Invalid file type.';
}



//====================================================文件操作

	// put_file('c/a/a.php','中文写入时UTF-8，只有英文时ASCII');	//写入文件内容
	// get_file('c/a/a.php');									//读取文件内容
	// add_dir('a/1/2/3'); 						//测试建立文件夹 建一个a/1/2/3文件夹
	// add_file('b/1/2/3'); 					//测试建立文件 在b/1/2/文件夹下面建一个3文件
	// add_file('b/1/2/3.exe'); 				//测试建立文件 在b/1/2/文件夹下面建一个3.exe文件
	// del_dir('d'); 							//测试删除文件夹 删除d文件夹
	// del_file('b/d/3.exe'); 					//测试删除文件 删除b/d/3.exe文件

	// copy_dir('b','d/e'); 					//测试复制文件夹 建立一个d/e文件夹，把b文件夹下的内容复制进去
	// copy_file('b/1/2/3.exe','b/b/3.exe'); 	//测试复制文件 建立一个b/b文件夹，并把b/1/2文件夹中的3.exe文件复制进去
	// move_dir('a/','b/c'); 					//测试移动文件夹 建立一个b/c文件夹,并把a文件夹下的内容移动进去，并删除a文件夹
	// move_file('b/1/2/3.exe','b/d/3.exe'); 	//测试移动文件 建立一个b/d文件夹，并把b/1/2中的3.exe移动进去


//新建目录
function add_dir($aimUrl) {
	$aimUrl = str_replace('', '/', $aimUrl);
	$aimDir = '';
	$arr = explode('/', $aimUrl);
	foreach($arr as $str) {
		$aimDir.= $str.'/';
		if(!file_exists($aimDir)) mkdir($aimDir);
	}
}
//新建文件
function add_file($aimUrl, $overWrite = false) {
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
	if(!file_exists($aimDir)) add_dir($aimDir);
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
	add_dir($aimDir);
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
	if(!file_exists($aimDir)) add_dir($aimDir);
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
	add_dir($aimDir);
	copy($fileUrl, $aimUrl);
	return true;
}


//写入文件
function put_file($aimUrl, $fileData) {
	$aimDir = dirname($aimUrl);
	add_dir($aimDir);
	return @file_put_contents($aimUrl,$fileData);
}
//读取文件
function get_file($fileUrl) {
	return @file_get_contents($fileUrl);
}



