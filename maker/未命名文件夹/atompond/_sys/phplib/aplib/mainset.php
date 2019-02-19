<?php
/*! AtomPond v1.0 atompond.com | AtomPond.com/info/license */

	// ap_set();							//按配置预设置项（开始计时）

	//------------按需加载-------------
	get_inc('_sys/phplib/aplib/file.php'); 		//文件操作
	get_inc('_sys/phplib/aplib/data.php');		//数据处理(操作数组/字符串)
	get_inc('_sys/phplib/aplib/view.php');		//皮肤，生成界面
	get_inc('_sys/phplib/aplib/safe.php');		//网络安全




	// f_write('_sys/set.txt',array(
	// 	'lang'=>'cn',
	// 	'charset'=>'utf-8',
	// 	'timezone'=>'asia/seoul',
	// 	'date'=>1,
	// 	'time'=>1,
	// 	'#session_path'=>'./_tmp/session',
	// 	'#session_use'=>1,
	// 	'server_os'=>1,
	// 	'err_show'=>1,
	// 	'err_type'=>0,
	// 	'get_runtime'=>1,
	// 	'mem_useage'=>1,
	// 	'cpu_useage'=>0,
	// 	'get_diskinfo'=>1,
	// 	'get_header'=>1,
	// 	'get_fun_list'=>0,
	// 	'get_cls_list'=>0,
	// 	'get_request'=>0,
	// 	'get_post_get_files'=>0,
	// 	'get_cookie'=>0,
	// 	'get_server'=>1,
	// 	'show_sysset'=>0,
	// 	'show_inc_loaded'=>0,
	// 	'show_tmpdir'=>0,
	// 	'safe_mode'=>1,//删除$_ENV
	// 	'debug_show'=>1//debug_show
	// ));



//==================================================================================================

	//主设置-------------------------- AtomPond.com, 아톰폰드, 원자연못, 原子吃糖 ---------------------
	function ap_set($set=0){
		autofile('w/localhost','set');		//引入网站设置
		//程序开始时配置

		$GLOBALS['_sys']['set']['isrun_apset']=1;
		runtime(1); if(isset($set)) $set=&$GLOBALS['_sys']['set'];
		if($set['mem_useage']) mem_useage(1);		//获取初始内存占用空间
		$GLOBALS['_sys']['w_set']['this_page']=trim($_SERVER['PATH_INFO'],'/');				//当前页
		if($set['lang']) $GLOBALS['_sys']['get']['lang']=$set['lang']?$set['lang']:'cn';	//默认值为中国
		if($set['charset']){
			$GLOBALS['_sys']['get']['charset']=$set['charset']?$set['charset']:'utf-8';
			header('Content-type:text/html;charset='.$GLOBALS['_sys']['get']['charset']);
		} //语言编码
		if($set['timezone']) date_default_timezone_set($set['timezone']);		//时区（ asia/seoul   asia/shanghai   Etc/GMT-8 ） 
		if($set['session_path']) session_save_path($set['session_path']);
		if($set['session_use']) session_start();
		if($set['server_os']) {
			if(PATH_SEPARATOR==':') $GLOBALS['_sys']['get']['server_os']='linux';
			else $GLOBALS['_sys']['get']['server_os']='windows';
			if($_ENV['Apple_Ubiquity_Message']) $GLOBALS['_sys']['get']['server_pc']='apple';
		}
		if($_set['server_sw'])$GLOBALS['_sys']['get']['server_sw']=$_SERVER['SERVER_SOFTWARE'];
		if($set['err_show']) { ini_set('display_errors',1); error_reporting(E_ALL & ~E_NOTICE );}//显示错误提示
		else ini_set('display_errors', 0);
		if($set['err_type']) err_format($set['err_type']);	//1为数组形式。  2为一行字符串型。  3为降序显示所有层级的字符串型（默认）4为升序..
		if($set['get_runtime']) runtime();			//新建计时器。开始计时

		if($set['get_header']){
			foreach ($_SERVER as $k=>$v) {
				if(substr_count($k, 'HTTP_')) $GLOBALS['_sys']['get']['client_header'][strtolower($k)]=$_SERVER[$k];//获取输出头信息
			}
			$GLOBALS['_sys']['get']['server_header']=headers_list();		//获取发送头信息
		} 

		if($set['show_tmpdir']) $GLOBALS['_sys']['get']['tmpdir']=$_ENV['TMPDIR'];//临时文件路径
		if($set['safe_mode']){
			header_remove('X-Powered-By');
			unset($_ENV);//为了安全默认删除，程序中也别使用
		}
		// if($set['get_server']){
		// 	// unset($_SERVER['SERVER_SIGNATURE']);
		// 	// unset($_SERVER['PATH']);
		// 	$GLOBALS['_sys']['get']['get_server']=$_SERVER;
		// 	$GLOBALS['_sys']['get']['get_server']['php_uname']=php_uname();
		// 	
		// }
		if(!$set['get_request']){ unset($_REQUEST);}
		if(!$set['get_post_get_files']){ unset($_POST);unset($_GET);unset($_FILES);}
		if(!$set['get_cookie']) unset($_COOKIE);

		if($set['get_diskinfo']) $GLOBALS['_sys']['get']['get_diskinfo']=get_diskinfo();	//DISK 硬盘空间（所有分区的可用空间）

			$GLOBALS['_sys']['get']['clientinfo']=get_clientinfo();
			$GLOBALS['_sys']['get']['serverinfo']=get_serverinfo();
			$GLOBALS['_sys']['get']['systeminfo']=get_systeminfo();
			$GLOBALS['_sys']['get']['pathinfo']=get_pathinfo();
			// unset($_SERVER);

		//程序结束后配置
		if(!function_exists('ap_end')){
			function ap_end($set=0){
				if(isset($set)) $set=&$GLOBALS['_sys']['set'];
				if($set['get_runtime']) runtime(2); //结束计时
				if($set['date']) $GLOBALS['_sys']['get']['date']=date('Y-m-d',time());
				if($set['time']) $GLOBALS['_sys']['get']['time']=date('H:i:s',time());
				if($set['mem_useage'] && !$GLOBALS['_sys']['get']['mem_useage']) mem_useage(2);		//MEM 内存使用情况
				if($set['cpu_useage']) $GLOBALS['_sys']['get']['cpu_useage']=cpu_useage(1);			//CPU 系统负载情况(代表系统再过去的1、5和15分钟内的平均负载),windows下无效

				if($set['get_fun_list']) $GLOBALS['_sys']['get']['get_fun_list']=get_defined_functions();
				if($set['get_cls_list']) $GLOBALS['_sys']['get']['get_cls_list']=get_declared_classes();
				if(!$set['get_server']) unset($_SERVER);
				if(!$set['show_sysset']){unset($GLOBALS['_sys']['set']);}
				if(isset($set['debug_show'])){									//----内存变量调试器----
					echo '<br><textarea style="width:900px;height:500px;">';	//查看内存中存储的变量集合
					print_r($GLOBALS);
					echo '</textarea>';
				}
			}
		}

	}
	//ap_set();//默认加载预设置项


//================================== 补助，上面程序的正常执行。




	//-----引入函数定义。include文件都用这个函数
	function get_inc($inc){
		if(getType($inc)==='array'){
			foreach ($inc as $k => $v) {
				if(file_exists($inc)){ include $inc; $GLOBALS['_sys']['log']['inc_loaded'][]=$inc;} //记录引入库的顺序。
			}
		}else{
			if(file_exists($inc)) { include $inc; $GLOBALS['_sys']['log']['inc_loaded'][]=$inc; }//记录引入库的顺序。
		}
	}


	//自动格式文件的引入set.txt
	function autofile($fp,$type='set'){//这个目录下有这种文件就这种方式，
		$set=$fp.'/set.txt';
		if(is_file($set)){
			$arr=json_decode(file_get_contents($set),1);
			foreach ($arr as $k => $v) { $GLOBALS['_sys'][$type][$k]=$v; }
		}
	}
	//autofile('_w');	//引入网站的设置autofile('_w');		//引入网站的设置 // {"webstart":"maker"}


	//CPU运行时间 cpu_runtime
	function runtime($type=0,$long=6){
		list($msec, $sec) = explode(' ', microtime());
		$fn_time=bcadd($msec, $sec,$long);//加法运算，转为字符串
		if($type==0) return bcsub( $fn_time , $GLOBALS['_sys']['get']['microtime'] ,$long); //整页运算时间
		if($type==1) return $GLOBALS['_sys']['get']['microtime']=$fn_time;	//重新计时开始时间
		if($type==2){//重新计时结束时间
			return $GLOBALS['_sys']['get']['runtime']=bcsub( $fn_time , $GLOBALS['_sys']['get']['microtime'] ,$long);
		}
	}
	//runtime();//新建计时器。开始计时

	//CPU负载情况
	function cpu_useage($type=1){
		if($type==1) return sys_getloadavg();
		else { $rs=sys_getloadavg(); return "CPU-1m: $rs[0]\nCPU-5m: $rs[1]\nCPU-15m: $rs[2]";}
	}

	//内存使用情况
	function mem_useage($type=0){	//函数定义的多少也会对，使用前的内存占用数也有所改变（预先读取到的类或函数定义）
		if($type==0) return $GLOBALS['_sys']['get']['mem_def']=int_filesize(memory_get_usage());
		if($type==1) return $GLOBALS['_sys']['get']['mem_def']=memory_get_usage();//现在为止使用的内存空间。（系统函数定义和自定义函数定义）
		if($type==2){
			$m1=memory_get_usage()-$GLOBALS['_sys']['get']['mem_def'];
			$GLOBALS['_sys']['get']['mem_def']=int_filesize($GLOBALS['_sys']['get']['mem_def']);//（转换）上次记录的内存空间
			return $GLOBALS['_sys']['get']['mem_useage']=int_filesize($m1);//(转换)AB之间的内存变化
		}
	}
	//memory_useage();//获取初始内存占用空间


		//大小转换
		function int_filesize($size){
			$unit=array('B','KB','MB','GB','TB','PB');
			return @round($size/pow(1024,($i=floor(log(abs($size),1024)))),2).' '.$unit[$i];
		}


	//输出（开发阶段 调试用，格式化数组输出）
	function p($val,$type=0){
		if(is_array($val)) {
			echo '<pre>';
			if($type==0) print_r($val);
			if($type==1) var_dump($val);
			if($type==2) var_export($val);
			echo '</pre>';
		}else{
			if($type) echo '<textarea style="width:500px;height:300px;">'.$val.'</textarea>';
			else echo $val;
		}
	}

//------------修改异常的显示格式。
function err_format($type=0){//使用自定义错误样式
	if($type===0) return set_error_handler('debug_customError0');	//0为系统默认输出格式
	if($type===1) return set_error_handler('debug_customError1');	//1为数组形式。
	if($type===2) return set_error_handler('debug_customError2');	//2为一行字符串型。 
	if($type===3) return set_error_handler('debug_customError3');	//3为降序显示所有层级的字符串型（默认）
	if($type===4) return set_error_handler('debug_customError4');	//4为升序..
}
//err_format();//1为数组形式。  2为一行字符串型。  3为降序显示所有层级的字符串型（默认）4为升序..
//trigger_error('自定义报错'); //坡出错误。
//p(error_get_last());//过去最后一个错误。
	function debug_customError0($errno, $errstr, $errfile, $errline){//设置自定义错误样式
		if(!$GLOBALS['_sys']['err_info']) err_info();
		$f=str_replace($_SERVER['DOCUMENT_ROOT'],'',$errfile);
		$GLOBALS['_sys']['err_msgList'][]=$GLOBALS['_sys']['err_info'][$errno].": $errstr in $f on line $errline\n";
	}
	function debug_customError1($errno, $errstr, $errfile, $errline){//设置自定义错误样式
		if(!$GLOBALS['_sys']['err_info']) err_info();
		$f=str_replace($_SERVER['DOCUMENT_ROOT'],'',$errfile);
		$GLOBALS['_sys']['err_msgList'][]=array('type'=>$errno, 'message'=>$errstr, 'file'=>$f, 'line'=>$errline,'time'=>time());
	}
	function debug_customError2($errno, $errstr, $errfile, $errline){//设置自定义错误样式
		if(!$GLOBALS['_sys']['err_info']) err_info();
		$f=str_replace($_SERVER['DOCUMENT_ROOT'],'',$errfile);
		$GLOBALS['_sys']['err_msgList'][]="✘ [E_Path] ▪ $f ($errline) ➨(".$GLOBALS['_sys']['err_info'][$errno]."): $errstr ♪\n";
	}
	function debug_customError3(){//设置自定义错误样式
		if(!$GLOBALS['_sys']['err_info']) err_info();
		$l=debug_backtrace();//查找到源头（只能用在函数体内）
		$n=count($l);
		$rs='✘';// 升序方式
		for ($i=$n-1; $i>0 ; $i--) { 
			$rs.=($n-$i).' 文件路径: '.str_replace($_SERVER['DOCUMENT_ROOT'],'',$l[$i]['file']).' ('.$l[$i]['line'].') 错误函数: '.$l[$i]['function']."();\n ➥";
		}
		$rs.=$n.' [错误信息('.$l[0]['args'][0].'): '.$l[0]['args'][1]."  ]\n";
		$GLOBALS['_sys']['err_msgList'][]=$rs;
	}
	function debug_customError4(){//设置自定义错误样式
		if(!$GLOBALS['_sys']['err_info']) err_info();
		$l=debug_backtrace();//查找到源头（只能用在函数体内）
		$n=count($l);
		$rs='✘'.$n.' [错误信息('.$l[0]['args'][0].'): '.$l[0]['args'][1]."  ]\n";//降序方式
		for ($i=1; $i<$n ; $i++) { 
			$rs.='⇡'.($n-$i).' 文件路径: '.str_replace($_SERVER['DOCUMENT_ROOT'],'',$l[$i]['file']).' ('.$l[$i]['line'].') 错误函数: '.$l[$i]['function']."();\n";
		}
		$GLOBALS['_sys']['err_msgList'][]=$rs;
	}
		function err_info(){
			$GLOBALS['_sys']['err_info']=array('2'=>'E_WARNING','8'=>'E_NOTICE','256'=>'E_USER_ERROR','512'=>'E_USER_WARNING','1024'=>'E_USER_NOTICE','4096'=>'E_RECOVERABLE_ERROR','8191'=>'E_ALL');
		}


	//---------重大异常 不往下执行  (不能修复)
	// function myException($exception){ //修改自定义异常样式
	// 	echo "<b>错误标题:</b> " ;
	// 	echo $exception->getMessage();
	// 	echo 'aaa';
	// }
	// set_exception_handler('myException'); //使用自定义异常
	// throw new Exception('错误内容'); //坡出异常。不往下执行了。
	// try {
	// 	getType();  
	// 	function_exists(function_name);
	// 	echo 3/d;
	// 	throw new Exception('错误内容'); //坡出异常。
	// } catch (Exception $e) {
	// 	echo 'aaaa';//修复后可以往下执行了。
	// }
	//----------------
	// die('die!');
	// exit('exit!');



//==========================自动引入插件函数。

	//引入插件函数定义。  （核心函数，项目函数。解决同名函数不能重复引入而报错问题）
	function plugin_fun($fn,$path='_lib/extfun/'){
		$allpath=$path.$file.'_fun.php';	//路径 _lib/extfun/{$gongneng}_fun.php
		if(!file_exists($allpath)){		//没有此函数时引入，只引入一次。等同于include_once更快
			if(function_exists($fn)) include $allpath;
			return true;
		}
		return false;
	}





//---------------------------------------------------------------------
function f_read($fname,$type='json'){
	if($type=='json' && file_exists($fname)) return json_decode(file_get_contents($fname),1);
	return false;
}
function f_write($fname,$val,$type='json'){
	file_put_contents($fname,json_format(json_encode($val,JSON_UNESCAPED_UNICODE)));
}




//在指定目录下有哪些文件和二级目录
function get_dirlist($path){
	$path=rtrim($path,'/').'/*';
	$filelist=glob($path);
	foreach ($filelist as $v){
		$rs[filetype($v)][]=basename($v);
	}
	return $rs;
}
//p(get_dirlist('_w'));

//--------------------------



//网站有什么	(依赖：arr_xiugai,list_dir)
function w_site_list(){
	$site=arr_xiugai(list_dir('_w/*','dir'),'_w/','');//批量修改路径前缀，查看有哪些网站
	foreach ($site as $v) {
		$rs[$v]=arr_xiugai(list_dir('_w/'.$v.'/*','dir'),'_w/'.$v.'/','');//有哪些页面
	}
	return $rs;
}
// $AA=__FILE__;
// $GLOBALS['_sys']['get']['w_site_list']=w_site_list();




// $d['lang']['set']['a001']=array('开始','系统','内容','订单','会员','文件','栏目');
// $d['lang']['set']['a002']=array('全局设置','系统设置','会员设置','积分设置');
// $d['lang']['set']['a003']=array('系统设置','邮件设置','上传设置','访问设置');
// $d['lang']['set']['a004']=array('维护状态','维护说明','网站名称','网址','ICON标志','SEO标题内容','SEO关键词','SEO网站描述');
// $d['lang']['set']['a005']=array('开启','关闭');
// $d['lang']['set']['a006']=array('请填写维护说明','请填写网站名称','请填写网址','+ 浏览文件','title标题内容，用于搜索引擎优化','站点关键词，用于搜索引擎优化','网站的描述，用于搜索引擎优化');
// $fp='_w/maker/info.txt';
// f_write($fn);
// p(f_read($fn));

// runtime(1);
// for ($i=0; $i <100 ; $i++) { 
// 	$a='aaasssdsdsdfsdfsdfsdfsdfsdfs';
// }
// runtime(2);



//----------------------------------------------------------------------test

	//echo __DIR__;//获取文件夹完整路径
	//echo __FILE__;//获取文件完整路径
	//echo __LINE__;




//$path = "_sys/_tool/cls_file.php";
//echo dirname($path).'/'.basename(__FILE__);


//获取路径信息
function get_path($path){
	$pathinfo = pathinfo($path);			//获取路径变量
	$pathinfo['realpath']=realpath($path);	// 有文件时，获取完整路径
	return $pathinfo;
}
//p(get_path('_w/maker/info.txt'));



//获取文件信息
function get_fileinfo($file,$clear=0){
	if($clear) clearstatcache();							//清除缓存信息
	// $rs=stat($file);										//获取所有文件相关信息
	$rs['ino']=fileinode($file);							//获取文件的 inode 编号
	$rs['mode']=substr(sprintf("%o",fileperms($file)),-4);	//获取文件的权限1777
	$rs['uid']=fileowner($file);							//获取文件的所有者user ID
	$rs['gid']=filegroup($file);							//获取文件的组 ID
   	$rs['size']=filesize($file);							//获取文件大小
	$rs['atime']=fileatime($file);							//获取文件的上次访问时间
	$rs['mtime']=filemtime($file);							//获取文件的上次修改时间
	$rs['ctime']=filectime($file);							//获取文件的上次创建时间
    // [dev] => 16777218
    // [nlink] => 1
    // [rdev] => 0
    // [blksize] => 4096
    // [blocks] => 8
	return $rs;
}
//p(get_fileinfo('_w/maker/info.txt'));

//修改文件信息（设置权限）
function put_fileinfo($file,$setarr){ 
	if($setarr['gid']) chgrp($file,$setarr['gid']);		//改变文件组
	if($setarr['uid']) chown($file,$setarr['uid']);		//改变文件所有者。
	if($setarr['mode']) chmod($file,$setarr['mode']);	//改变文件模式,(所有者有所有权限，其他所有人可读和执行)
	if($setarr['mtime'] or $setarr['atime']) touch($file,$setarr['mtime'],$setarr['atime']);//改变文件的访问和修改时间
}




//获取硬盘空间
function get_diskinfo($type=0){
	if($type===0){ //windows, linux 系统都可以
		$rs['disk_total_space']=disk_total_space($_SERVER['DOCUMENT_ROOT']);
		$rs['disk_free_space']=disk_free_space($_SERVER['DOCUMENT_ROOT']);
		$rs['disk_used_space']=$rs['disk_total_space']-$rs['disk_free_space'];
		$rs['disk_total_space']=int_filesize($rs['disk_total_space']);//磁盘总容量
		$rs['disk_free_space']=int_filesize($rs['disk_free_space']);//硬盘可用空间
		$rs['disk_used_space']=int_filesize($rs['disk_used_space']);//硬盘占用空间
		return $rs;
	}else{
		if(!$_SERVER['WINDIR']){//mac linux时 /Volumes/*
			$disks=glob('/Volumes/*',GLOB_ONLYDIR);
			foreach ($disks as $disk) {
				$pan=basename($disk);
				$rs[$pan]['disk_total_space']=disk_total_space($disk);
				$rs[$pan]['disk_free_space']=disk_free_space($disk);
				$rs[$pan]['disk_used_space']=$rs[$pan]['disk_total_space']-$rs[$pan]['disk_free_space'];
				$rs[$pan]['disk_total_space']=int_filesize($rs[$pan]['disk_total_space']);//磁盘总容量
				$rs[$pan]['disk_free_space']=int_filesize($rs[$pan]['disk_free_space']);//硬盘可用空间
				$rs[$pan]['disk_used_space']=int_filesize($rs[$pan]['disk_used_space']);//硬盘占用空间
			}
		}
	}
}
// print_r(get_diskinfo());






function get_clientinfo(){
	$rs['request_method']=$_SERVER['REQUEST_METHOD']; 	// [REQUEST_METHOD] => GET
	$rs['client_ip']=$_SERVER['REMOTE_ADDR'];			// [REMOTE_ADDR] => 127.0.0.1
	$rs['client_port']=$_SERVER['REMOTE_PORT'];			// [REMOTE_PORT] => 2188
	// $rs['request_time']=$_SERVER['REQUEST_TIME'];		// [REQUEST_TIME] => 1467015130
	// $rs['cgi_version']=$_SERVER['GATEWAY_INTERFACE']; 	// [GATEWAY_INTERFACE] => CGI/1.1
	// $rs['http_version']=$_SERVER['SERVER_PROTOCOL']; 	// [SERVER_PROTOCOL] => HTTP/1.1

	//header
	$rs['accept']=$_SERVER['HTTP_ACCEPT'];
	// [HTTP_ACCEPT] => text/html,application/xhtml+xml,application/xml;q=0.9,* / *;q=0.8
	// [HTTP_ACCEPT] => image/gif, image/jpeg, image/pjpeg, image/pjpeg, application/x-shockwave-flash, application/xaml+xml, application/vnd.ms-xpsdocument, application/x-ms-xbap, application/x-ms-application, * / *
	$rs['user_agent']=$_SERVER['HTTP_USER_AGENT'];	
    // [HTTP_USER_AGENT] => Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET4.0C; .NET4.0E)
    // [HTTP_USER_AGENT] => Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/6.2.8 Safari/537.85.17
	$rs['cache_control']=$_SERVER['HTTP_CACHE_CONTROL'];	// [HTTP_CACHE_CONTROL] => max-age=0
 

    // [HTTP_REFERER] => http://localhost/
    // [HTTP_ACCEPT_LANGUAGE] => zh-cn
    // [HTTP_ACCEPT_ENCODING] => gzip, deflate
    // [HTTP_HOST] => localhost
    // [HTTP_CONNECTION] => Keep-Alive
    // [HTTP_COOKIE] => CNZZDATA3302454=cnzz_eid%3D1099472223-1464887009-%26ntime%3D1464887009
	return $rs;

}
function get_serverinfo(){
	$rs['server_name']=$_SERVER['SERVER_NAME'];	// [SERVER_NAME] => localhost
	$rs['server_ip']=$_SERVER['SERVER_ADDR'];	// [SERVER_ADDR] => 127.0.0.1
	$rs['server_port']=$_SERVER['SERVER_PORT'];	// [SERVER_PORT] => 80
	return $rs;
}
function get_systeminfo(){
	$rs['server_sw']=$_SERVER['SERVER_SOFTWARE'];	// [SERVER_SOFTWARE] => Apache/2.0.63 (Win32) PHP/5.2.14
	$rs['path']=$_SERVER['PATH'];					// [PATH] => C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem 	[PATH] => /usr/bin:/bin:/usr/sbin:/sbin
    //  [SystemRoot] => C:\WINDOWS 										(windows专属)
    //  [COMSPEC] => C:\WINDOWS\system32\cmd.exe						(windows专属)
    //  [PATHEXT] => .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH	(windows专属)
    //  [WINDIR] => C:\WINDOWS											(windows专属)
    return $rs;
}
function get_pathinfo(){
	$rs['r_htdocs']=$_SERVER['DOCUMENT_ROOT'];		// [DOCUMENT_ROOT] => E:/PHPnow-1.5.6/htdocs  	[DOCUMENT_ROOT] => /Volumes/Mac220G/Dpan/htdocs 
	$rs['r_file']=$_SERVER['SCRIPT_FILENAME'];		// [SCRIPT_FILENAME] => E:/PHPnow-1.5.6/htdocs/test.php 	[SCRIPT_FILENAME] => /Volumes/Mac220G/Dpan/htdocs/atompond/main.php
	$rs['w_url']=$_SERVER['REQUEST_URI']; 			// [REQUEST_URI] => /atompond/main.php/maker/a?a=a&asdfa=2
	$rs['w_pro_file_var']=$_SERVER['PHP_SELF']; 	// [PHP_SELF] => /atompond/main.php/maker/a
	$rs['w_pro_file']=$_SERVER['SCRIPT_NAME']; 		// [SCRIPT_NAME] => /atompond/main.php
	$rs['w_pro']=$_SERVER['PATH_INFO']; 			// [PATH_INFO] => /maker/a
	$rs['w_var']=$_SERVER['QUERY_STRING']; 			// [QUERY_STRING] => a=a&asdfa=2
    return $rs;
}




//================================================== 
if($GLOBALS['_sys']['set']['isrun_apset']) ap_end();//调试器（结束计时）