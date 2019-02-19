<?php
//---------post phpfile 只能用于此模块传来的post数据时执行的php

	$thispage=url1();
	if($thispage==='*MAKER*') $p1=isset($_POST['filepath']) ? $_POST['filepath'] : '_sys/devpage';
	else $p1=isset($_POST['filepath']) ? $_POST['filepath'] : 'w/'.$_SERVER['HTTP_HOST'].'/'.$thispage; //临时路径限制
	$fname=rtrim($_POST['filename'],'/');	//待安全过滤
	// $fname=$_POST['filename'];
	$data=$_POST['savedata'];		//待安全过滤
	// $hz='.txt';

	if($_POST['act']==='get_file'){
		echo get_file($p1.$fname.$hz);
	}
	elseif($_POST['act']==='save_file'){
		if(save_file($p1.$fname.$hz, $data)) echo 'ok'; else echo 'no';
	}
	//elseif($_POST['act']==='load_file') echo 'ENG 中文 한글';
	elseif($_POST['act']==='get_filelist'){
		$arr=str_replace($p1, '', glob($p1.$fname.'/*'));
		// $arr=str_replace($hz, '', $arr);
		if($arr) echo json_encode($arr, JSON_UNESCAPED_SLASHES);
	}
	elseif($_POST['act']==='del_file'){
		if(@unlink($p1.$fname.$hz)) echo 'ok'; else echo 'no';
	}

	// if($_GET['p']=='save') file_put_contents($POST['pathname'], $_POST['data']);
	// if($_GET['p']=='load') echo 'ENG 中文 한글';
	// if($_GET['p']=='get') echo file_get_contents('F0001.txt');