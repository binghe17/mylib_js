<?php


//===================================URL路由 (必须)(php专属功能)

//路由到某页的action
function url_file(){
	if($_SERVER['PATH_INFO']==='/post'&& is_ajax()) return run_page(url1());//如果它是post路径的ajax请求时（第三次访问）

	//如果它时post路径的ajax请求时
	// $_SERVER['HTTP_HOST'];		// localhost
	// $_SERVER['SCRIPT_NAME'];		// /0906/_help/_js_study/maker/js_zcore4.php
	// $_SERVER['PATH_INFO'];		// a/b
	// $_SERVER['QUERY_STRING'];	// a=b&c=d
	// $url=array('localhost/post'=>'post','localhost/maker'=>'*MAKER*','localhost'=>'index');
	// file_put_contents($file, json_encode($url, JSON_UNESCAPED_SLASHES));
	$file='w/'.ltrim($_SERVER['HTTP_HOST'],'www.').'/url.txt';//如果时www.的时候去掉
	$url=json_decode(file_get_contents($file),1);
	$thisURL=($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:'/';//没有时根路径
	foreach ($url as $k => $v) {
		if($k===$thisURL) return run_page($v);//第一次判断完全相等时
	}
	$num=substr_count($thisURL,'/');
	for ($i=0; $i <$num-1 ; $i++) { //pathinfo第一位不能是随机数。
		$thisURL=substr($thisURL, 0, strrpos($thisURL,'/'));//pathinfo第二次判断部分
		foreach ($url as $k => $v) {
			if($k===rtrim($thisURL,'/')) return run_page($v);
		}
	}
	return run_page('error404');//网页未找到。404错误
}
url_file();

function url1(){//thispage 如index
	$thisURL=str_replace($_SERVER['HTTP_ORIGIN'].$_SERVER['SCRIPT_NAME'], '', $_SERVER['HTTP_REFERER']);
	if($thisURL==='') $thisURL='/';//p($thisURL);
	$file='w/'.ltrim($_SERVER['HTTP_HOST'],'www.').'/url.txt';//如果时www.的时候去掉
	$url=json_decode(file_get_contents($file),1);
	return $url[$thisURL];
}


function run_page($v){//调度层
	// if($v==='error404') ;//显示出错页
	if($_POST['cmd']==='js_loaded') {//面加载之后客户端用ajax自动进行第二次请求（默认让客户端做的事情）2 run.js.txt
		$thispage=url1();
		if($thispage==='*MAKER*'){echo file_get_contents('_sys/devpage/run.js.txt'); return;}
		else{ echo file_get_contents('w/'.$_SERVER['HTTP_HOST'].'/'.$thispage.'/run.js.txt'); return;}
		//不是系统自动请求的ajax的时候，会运行post/php/run.txt
	}else{
		if(is_ajax()){//单页的第三次访问开始 3 run.post.txt
			if($v==='*MAKER*') $file='_sys/devpage/run.post.txt'; 
			else $file='w/'.$_SERVER['HTTP_HOST'].'/'.$v.'/run.post.txt';
		}else{//第一次页面访问，（默认服务器做的事）1 run.php.txt
			if($v==='*MAKER*') $file='_sys/devpage/run.php.txt'; 
			else $file='w/'.$_SERVER['HTTP_HOST'].'/'.$v.'/run.php.txt';
		}
		if(file_exists($file)){//获取指定的动作序列文件并执行
			_Gdata('getfile_run',json_decode(file_get_contents($file),1));//动作序列如[{'fun':'file_get_contents','opt':'m/devpage/php/tpl.txt'}]
			return run_line('getfile_run');//运行动作序列
		}// else return header('Location:'.$_SERVER['SCRIPT_NAME']);//跳转到主页。	

	}
}


//--------------//单页的配置单来执行。

//输出html5基本结构（php动作序列中使用）（第一次访问，不会有post请求，输出html基本结构）
function showpage(){
$base='<base href="'.dirname($_SERVER['SCRIPT_NAME']).'/" />';
// $title='<title></title>'; // $keyword='';
$rs=<<<html5
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
{$base}
<script type="text/javascript" src="_sys/jslib/jquery/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="_sys/jslib/_core/zcore.js"></script>
</head>
<body>

</body>
</html>
html5;
echo $rs;
}

// w_file('w/localhost/head.txt', json_encode(_Gdata('head'), JSON_UNESCAPED_SLASHES));
// $head=json_decode(r_file('w/localhost/head.txt'),1);
// foreach ($head as $k => $v) { $rs.=$v."\n"; }
// p($rs);

function postphp($fname){//插件文件有post请求时让服务器做的事。php文件形式的post认证（第三次访问开始可能执行到这里）
	if($_POST || $_FILES){;//用户操作开始，会发送各种请求。做完本职工作后终止继续执行。
		if($fname){
			// p($_POST);
			$thispage=url1();
			if($thispage==='*MAKER*') $file='_sys/devpage/db/'.$fname.'.php';
			else $file='w/'.$_SERVER['HTTP_HOST'].'/'.$thispage.'/db/'.$fname.'.php';
			if(file_exists($file)) include($file);//php来写逻辑认证执行。
			die();			
		}
	}
}


function file_upload($file=null, $path='x/upimgs/'){
	// echo json_encode($_FILES);//p($_FILES);
	if($_FILES){
		// $_FILES["file_upload"]["name"] - 被上传文件的名称
		// $_FILES["file_upload"]["type"] - 被上传文件的类型
		// $_FILES["file_upload"]["size"] - 被上传文件的大小，以字节计
		// $_FILES["file_upload"]["tmp_name"] - 存储在服务器的文件的临时副本的名称//sys_get_temp_dir()
		// $_FILES["file_upload"]["error"] - 由文件上传导致的错误代码
		$f=$_FILES["file_upload"];
		$filetype=array('image/jpg','image/jpeg','image/gif','image/png');
		if(gettype($f['tmp_name'])=='array'){//多个文件同时上传时
			foreach ($f["tmp_name"] as $k => $v) {
				if (in_array($f["type"][$k], $filetype)) { //允许上传的文件类型
					if($f['error'][$k]===0){//没有错误时
						$arr=explode('.', $f['name'][$k]);
						if($arr[1]) $endfix='.'.$arr[1];
						// $name1=(md5_file($f['tmp_name']).'.'.$arr[1]);
						// $name1=hash_file( 'crc32', $f['tmp_name']).'.'.$arr[1];//0378df90
						$name1=hash_file( 'crc32b', $f['tmp_name'][$k]).$endfix;//ed4e5efd
						// $name1=sprintf("%x",crc32(file_get_contents($f['tmp_name']))).'.'.$arr[1];//ed4e5efd
						// $path=$path.date('Ymd',time()).'/';
						// $n=str_split($name1,12); $name1=implode('/', $n);
						move_file($f["tmp_name"][$k], $path.$name1);
						$rs[$k]['src']=$path.$name1;
					}else echo 0;//有错误时报错
				} else echo '不是图片类型。jpg,jpeg,gif,png';		
			}
			if($_POST) $rs['post']=var_export($_POST,1);//有post数据时显示
			echo json_encode($rs);
			// echo json_encode($_FILES);
		}else{//单个文件上传时
			if (in_array($f["type"], $filetype)) { //允许上传的文件类型
				if($f['error']===0){//没有错误时
					$arr=explode('.', $f['name']);
					if($arr[1]) $endfix='.'.$arr[1];
					// $name1=(md5_file($f['tmp_name']).'.'.$arr[1]);
					// $name1=hash_file( 'crc32', $f['tmp_name']).'.'.$arr[1];//0378df90
					$name1=hash_file( 'crc32b', $f['tmp_name']).$endfix;//ed4e5efd
					// $name1=sprintf("%x",crc32(file_get_contents($f['tmp_name']))).'.'.$arr[1];//ed4e5efd
					// $path=$path.date('Ymd',time()).'/';
					// $n=str_split($name1,12);$name1=implode('/', $n);
					move_file($f["tmp_name"], $path.$name1);
					if($_POST) $rs['post']=var_export($_POST,1);//有post数据时显示
					$rs['src']=$path.$name1;
					echo json_encode($rs);//p($_FILES);
				}else echo 0;//有错误时报错
			} else echo '不是图片类型。jpg,jpeg,gif,png';	
		}
	}else echo '不是正常访问';
}



//================================================================


function json_encode1($arr){
	return json_encode($arr, JSON_UNESCAPED_SLASHES);//中文直接显示（不转码）
}


//-------json filter

//使用不规范的JSON,也能正常识别。
function json_decode1($s, $mode=1){
	if(!function_exists('json_decode2')){
		function json_decode2($s, $mode=1) { //处理不规范的JSON，转为规范的JSON串
			if(preg_match('/\w/' , $s)) $s = preg_replace('/\'\s*(\w+|[^\']+)\s*\'/is'	, '"$1"'	, $s);//单引号改为双引号
			if(preg_match('/\w/' , $s)) $s = preg_replace('/\s*(\w+)\s*:/is'			, ' "$1":'	, $s);//冒号前的处理
			if(preg_match('/\w/' , $s)) $s = preg_replace('/:\s*([\w.]+)\s*/is'			, ': "$1"'	, $s);//冒号后的处理
			if(preg_match('/\d/' , $s)) $s = preg_replace('/:\s*\"(\d+)\s*\"/is'		, ': $1'	, $s);//数字的去掉双引号
			return json_decode($s, $mode);
		}
	}
	$rs=json_decode($s,$mode);
	if(!$rs) {return json_decode2($s,$mode);}
	return $rs;
}
// $s=<<<json
// {name    : '  bra  ndId啊  \"d1 ' , ' type ': '1', a  :{'name': "bran你dId1 adsf", type: String1}}
// json;
// p(json_decode1($s));



//JSON格式缩进
function json_format($json) {
	//将字符串形式的 JSON 数据格式化为缩进形式。(通常json_encode 转换出来的 JSON 串没有缩进)
	$result = '';
	$pos = 0;
	$strLen = strlen($json);
	$indentStr = '	';		//这里我默认使用了4个空格，如果要改成tab 缩进。
	$newLine = "\n";
	$prevChar = '';
	$outOfQuotes = true;

	for($i = 0; $i <= $strLen; $i++) {
		$char = substr($json, $i, 1);
		if($char == '"' && $prevChar != '\\') {
			$outOfQuotes = !$outOfQuotes;
		} else if(($char == '}' || $char == ']') && $outOfQuotes) {
			$result.= $newLine;
			$pos--;
			for($j = 0; $j < $pos; $j++) {
				$result.= $indentStr;
			}
		}
		$result.= $char;

		if(($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
			$result.= $newLine;
			if($char == '{' || $char == '[') {
				$pos++;
			}
			for($j = 0; $j < $pos; $j++) {
				$result.= $indentStr;
			}
		}
		$prevChar = $char;
	}

	return $result;
}
// $arr=array('a','b',array('a'=>1,'b'=>2));
// $str1=json_encode($arr);
// p(json_format($str1),1);



//=============================================================================


//---------------data-----------------


//存取数据。用路径变量来获取值，写入值（手写函数结构用）//注意：最多可添加四级。
function _Gdata($key,$val=null){
	$key=trim($key,$fu);
	$f=explode('/', $key); // 斜杠来分割
	$n=count($f);
	if(!isset($val)) {
		if($n==1) {return $GLOBALS[$f[0]];}//获取值
		elseif($n==2) {return $GLOBALS[$f[0]][$f[1]];}
		elseif($n==3) {return $GLOBALS[$f[0]][$f[1]][$f[2]];}
		elseif($n==4) {return $GLOBALS[$f[0]][$f[1]][$f[2]][$f[3]];}
		elseif($n==5) {return $GLOBALS[$f[0]][$f[1]][$f[2]][$f[3]][$f[4]];}//够用了
	}elseif($val==='*DEL*') {//写 *DEL* 概率很少，所以用这个定义
		if($n==1) {unset($GLOBALS[$f[0]]);return ;}//删除值，删除只能用全路径方式
		elseif($n==2) {unset($GLOBALS[$f[0]][$f[1]]);return ;}
		elseif($n==3) {unset($GLOBALS[$f[0]][$f[1]][$f[2]]);return ;}
		elseif($n==4) {unset($GLOBALS[$f[0]][$f[1]][$f[2]][$f[3]]);return ;}
		elseif($n==5) {unset($GLOBALS[$f[0]][$f[1]][$f[2]][$f[3]][$f[4]]);return ;}//够用了
	}else{//增加，修改值
		$i=1; $tmp=&$GLOBALS;
		foreach ($f as $k => $v) {//可无限制多维增加数据
			$v=trim($v);
			if(isset($tmp[$v])&&is_string($tmp[$v])) unset($tmp[$v]);//不是字符串类型时删除
			$tmp=&$tmp[$v];//没有定义的时候
			if($n==$i) $tmp=$val;	//最后一步，赋值（模拟return值）
			$i++; //计数，为了知道最后一步。
		}
	}
}
// _Gdata('data/custom/k1','aaa');//添加或修改值
// echo _Gdata('data/custom/k1');//获取值
// _Gdata('dd/dt/c','ccc');
// _Gdata('dd/dt/d','ddd');
// _Gdata('dd/aa','bbb');
// _Gdata('dd/aa','*DEL*');//删除值

// _Gdata('val:data:a','aabbbccc');//$val['data']=array('a'=>'aabbbccc','b'=>'dddeeefff');
// _Gdata('val:data:b','dddeeefff');
// _Gdata('html:data_a','111111');//$a['data']=array('a'=>'111','b'=>'22222');
// _Gdata('html:data_b','22222');
// _Gdata('json:a','{"a":"aaa","b":"bbbbb"}');//直接保存为字符串。



//------------------------run运行、flow流程控制

//运行类
function run_cls(&$fn,$to){
	if(strstr($fn['fun'], '::')){
		$n=explode('::', $fn['fun']);
		$o=&$fn['opt'];
		if($fn['fun']){
			if(!$o) return $n[0]::$n[1]();
			$num=count($o);
			switch ($num) {//参数写多了，1系统函数会出错，2自定义函数会影响性能。（可能是条件语句的关系）
				case 1: if(is_array($o)) $rs=$n[0]::$n[1]($o[0]);else $rs=$n[0]::$n[1]($o);break;
				case 2: $rs=$n[0]::$n[1]($o[0],$o[1]);break;
				case 3: $rs=$n[0]::$n[1]($o[0],$o[1],$o[2]);break;
				case 4: $rs=$n[0]::$n[1]($o[0],$o[1],$o[2],$o[3]);break;
				case 5: $rs=$n[0]::$n[1]($o[0],$o[1],$o[2],$o[3],$o[4]);break; 
				default: break;
			}		
		}		
	}elseif(strstr($fn['fun'], '->')){
		$n=explode('->', $fn['fun']);
		$n[0]=&$GLOBALS[$n[0]];
		$o=&$fn['opt'];
		if($fn['fun']){
			if(!$o) return $n[0]->$n[1]();
			$num=count($o);
			switch ($num) {//参数写多了，1系统函数会出错，2自定义函数会影响性能。（可能是条件语句的关系）
				case 1: if(is_array($o)) $rs=$n[0]->$n[1]($o[0]);else $rs=$n[0]->$n[1]($o);break;
				case 2: $rs=$n[0]->$n[1]($o[0],$o[1]);break;
				case 3: $rs=$n[0]->$n[1]($o[0],$o[1],$o[2]);break;
				case 4: $rs=$n[0]->$n[1]($o[0],$o[1],$o[2],$o[3]);break;
				case 5: $rs=$n[0]->$n[1]($o[0],$o[1],$o[2],$o[3],$o[4]);break; 
				default: break;
			}			
		}
	}
	elseif(strstr($fn['fun'], 'new ')){
		$fun=str_replace('new ', '', $fn['fun']);
		$o=&$fn['opt'];
		if($fn['to']){
			if(!$o) $rs=new $fun();
			$num=count($o);
			switch ($num) {//参数写多了，1系统函数会出错，2自定义函数会影响性能。（可能是条件语句的关系）
				case 1: if(is_array($o)) $rs=$fun($o[0]);else $rs=$fun($o);break;
				case 2: $rs=$fun($o[0],$o[1]);break;
				case 3: $rs=$fun($o[0],$o[1],$o[2]);break;
				case 4: $rs=$fun($o[0],$o[1],$o[2],$o[3]);break;
				case 5: $rs=$fun($o[0],$o[1],$o[2],$o[3],$o[4]);break; 
				default: break;
			}
		}
	}
	if($fn['to']) $GLOBALS[$fn['to']]=$rs;
	else return $rs;
}

// class a {function fun1($a){ return $a; } }
// $act[]=array('fun'=>'new a','to'=>'cls1');				// $cls1=new_class('a');// function new_class($cls){ return new $cls(); } 
// $act[]=array('fun'=>'cls1->fun1','opt'=>'class ->');	// echo $cls1->fun1('aaaa');
// run_cls($act[0]);
// echo run_cls($act[1]);
// $act[]=array('fun'=>'a::fun1','opt'=>'class ::');
// echo run_cls($act[2]);





//运行函数
function run_fun($fn){
	$fun=&$fn['fun'];
	$o=&$fn['opt'];
	if($fun){
		if(!$o) return $fun();
		$num=count($o);
		switch ($num) {//参数写多了，1系统函数会出错，2自定义函数会影响性能。（可能是条件语句的关系）
			case 1: if(is_array($o)) $rs=$fun($o[0]);else $rs=$fun($o);break;
			case 2: $rs=$fun($o[0],$o[1]);break;
			case 3: $rs=$fun($o[0],$o[1],$o[2]);break;
			case 4: $rs=$fun($o[0],$o[1],$o[2],$o[3]);break;
			case 5: $rs=$fun($o[0],$o[1],$o[2],$o[3],$o[4]);break;
			default: break;
		}		
	}
	return $rs;
}
// $e['f']='-string-';
// $e['e']='eeeee';
// function fun4($a,$b){ return $a.'====='.$b; }
// function p_echo($str){echo $str;}
// $act[0]=array('fun'=>'fun4','opt'=>array('e/f','e/e'),'isvar'=>array(1,1),'save'=>'c/c');
// $act[1]=array('fun'=>'p_echo','opt'=>array('aaaaa'));
// $act[2]=array('fun'=>'str_replace','opt'=>array('a','*','aaabbbcccaaabbb'));
// echo run_fun($act[0]); 
// echo run_fun($act[1]);
// echo run_fun($act[2]);


//执行一个命令（执行一条命令，执行一个函数）//放入的参数是不是变量池中获取的数据！
function run_one($who){//调度器dispatcher （注意：依赖run_fun，_Gdata函数）
	if(is_array($who)) $gr=$who;
	else  $gr=&_Gdata($who);
	if(is_string($who)) $GLOBALS['_sys']['this_run']=$who;//记录运行到哪儿了
	if(!function_exists($gr['fun'])) { echo '没有函数'.$gr['fun'].'跳过！';return false;}//!!!!写入日志
	$savevar = isset($gr['save']) ? $gr['save'] : 0 ;
	if($gr['isvar']){
		$n=count($gr['opt']);
		for ($i=0; $i <$n ; $i++) { //第一个参数为变量参数，从变量地址中取出之后放入到第几个函数当中运行
			if($gr['isvar'][$i]==1){
				$gr['opt'][$i]= &_Gdata($gr['opt'][$i]);		//替换原数据
			}
		}
	}
	//if($gr['echo']) echo run_fun($gr);//只输出字符串
	if($gr['echo']){ $rs=run_fun($gr); if(is_array($rs)) var_dump($rs); else echo $rs;}
	if($savevar===0) return run_fun($gr);
	else _Gdata($savevar,run_fun($gr));
}
// run_one('act/0');
// run_one('act/1');


//执行多个命令（执行一组命令，循环执行函数）
function run_more($actlist){//(注意：依赖函数_Gdata,run_one)
	$arr=&_Gdata($actlist);
	foreach ($arr as $k => $v) {
		run_one($actlist.'/'.$k);
	}
	if(!substr_count( $actlist,'_myfun')) del_valnull($actlist);//命令执行后删除
}
//run_more('act');


	//删除空变量
	function del_valnull($vp){
		_Gdata($vp, '*DEL*');
		$arr=explode('/', $vp);
		for ($i=count($arr); $i > 0 ; $i--) { 
			$vp=substr($vp, 0,strrpos($vp,'/'));
			if(_Gdata($vp)==null) _Gdata($vp, '*DEL*');
		}	
	}
	//del_valnull('act3/b/6');




// function p_echo($str){echo $str;}
// function jd($a){ return json_decode($a,1); }

// $act[0]=array('fun'=>'_Gdata','opt'=>array('if/test/1',true));//php中动态生成变量
// $act[1]=array('fun'=>'p_echo','opt'=>array('aaaaa'));
// $act[2]=jd('{"fun":"if_run","opt":["if/test/1","act/1"]}');
// $act[3]=jd('{"fun":"run_one","opt":["act/1"]}');
// $act[4]=array('fun'=>'time');
// $act[5]=array('fun'=>'str_replace','opt'=>array('a','*','asdfasdgewaf'));
// $acts=jd('{"fun":"run_more","opt":["act"]}');

//echo run_fun($act[4]);
//echo run_one('act/4');
// if_run('if/test/1','act/2');
//run_one('acts');

// $act1['a'][6]=array('fun'=>'time','save'=>'data/time');
// $act1['a'][7]=array('fun'=>'date','opt'=>array('Y-m-d H:i:s','data/time'),'isvar'=>array(0,1),'save'=>'data/time');
// //run_more('act1/a');

// //arr_copy('act1/a','_tmp');//多个一次复制
// arr_copy('act1/a/6','_tmp/0');//单个一个一个复制
// arr_copy('act1/a/7','_tmp/1');


//记录运行到哪儿了。还有要运行哪些？---引入了模块
// $act2['a'][6]=array('fun'=>'time','save'=>'data/time');
// $act2['a'][7]=array('fun'=>'date','opt'=>array('Y-m-d','data/time'),'isvar'=>array(0,1),'save'=>'data/time');
// $act2['a'][8]=array('fun'=>'var_show','opt'=>array('data/time'));
// $act3['b'][6]=array('fun'=>'time','save'=>'data/time2');
// $act4['b'][7]=array('fun'=>'date','opt'=>array('H:i:s','data/time2'),'isvar'=>array(0,1),'save'=>'data/time2');

//执行多组命令
function run_line($vps){ // 'act2/a,act3/b,act4/b'   or $var
	if(is_string($vps)) $vps=str_arr1($vps);
	foreach ($vps as $k => $v) { run_more($v); }
}
// run_one(array('fun'=>'str_arr1','opt'=>array('act2/a,act3/b,act4/b'),'save'=>'actx'));//$actx=str_arr1('act2/a,act3/b,act4/b');
// run_one(array('fun'=>'run_line','opt'=>array('act2/a')));//run_line('g1/a1');//执行模块顺序

// run_one(array('fun'=>'json_encode','opt'=>array('act2'),'isvar'=>array(1),'save'=>'data/json/act2'));//echo json_encode($act2);
// run_one(array('fun'=>'file_put_contents','opt'=>array('_w/maker/a.txt','data/json/act2'),'isvar'=>array(0,1)));//file_put_contents('_w/maker/a.txt', $act2);
// run_one(array('fun'=>'file_get_contents','opt'=>array('_w/maker/a.txt'),'save'=>'xx','echo'=>1));//$xx=file_put_contents('_w/maker/a.txt', $GLOBALS['data']['json']['act2']);echo $rs;
// run_one(array('fun'=>'json_decode','opt'=>array('xx',1),'isvar'=>array(1,0),'save'=>'act2'));//$xx2= json_decode($xx,1);
//run_one(array('fun'=>'run_line','opt'=>array('act2/a')));//run_line('g1/a1');






function var_show($vp){
	$rs=_Gdata($vp); if(is_array($rs)) var_dump($rs); else echo $rs;
}
//run_one(array('fun'=>'var_show','opt'=>array('data/json/act2')));//echo $GLOBALS['data']['json']['act2'];




//-------------------------------------act命令链条
//使用函数。执行片段打包成模拟函数体
function run_myfun($arr){
	if(!function_exists('get_myfun')){ //把命令包装成函数（模拟一个函数定义）
		function get_myfun($arr){
			$dd=&$GLOBALS['_myfun'][$arr['myfun']];
			if(isset($dd['_acts']) && is_string($dd['_acts'])) $GLOBALS['_myfun'][$arr['myfun']]['_acts']=_Gdata($dd['_acts']);//变量地址中获取数据
			if(isset($dd['_re'])){ //1程序执行之前配置
				foreach ($dd['_re'] as $k => $v) {
					$tt=explode(',', $k);
					foreach ($tt as $v2) { _Gdata( '_myfun/'.$arr['myfun'].'/_acts/'.$v2, $v); }
				}
			}
			if(isset($dd['_re1'])){ run_more('_myfun/'.$arr['myfun'].'/_re1'); } //2程序执行之前修改
			if(isset($dd['_args'])){
				if(is_string($dd['_args'])) $dd['_args']=str_arr1($dd['_args']);
				foreach ($dd['_args'] as $k => $v) {
					$tt=explode(',', $v);
					foreach ($tt as $v2) { _Gdata( '_myfun/'.$arr['myfun'].'/_acts/'.$v2, $arr['opt'][$k]); }
				}
			}
			run_more('_myfun/'.$arr['myfun'].'/_acts'); //3修改好的代码片段，执行。
			if(isset($dd['_re2'])){ run_more('_myfun/'.$arr['myfun'].'/_re2'); } //4程序执行完后修改
		}
	}
	if(is_string($arr)) $arr=_Gdata($arr);
	return array_map('get_myfun',array($arr));//用回调函数来模拟放入参数的功能。
}
//定义函数。对多行代码进行改写规则和打包成函数
function set_myfun($arr){
	if(is_string($arr)) $arr=_Gdata($arr);
	$t=$arr['_myfun']; unset($arr['_myfun']);
	return $GLOBALS['_myfun'][$t]=$arr;
}
// set_myfun(array('_acts'=>'act2/a','_myfun'=>'demofun','_args'=>array('6/save,7/opt/1','7/opt/0','7/save,8/opt/0')));
// run_myfun(array('myfun'=>'demofun','opt'=>array('xxx','Y/m/d','zzz')));
// set_myfun(array(
// 	'_myfun'=>'demofun',		//函数方法名
// 	'_acts'=>array(6=>array('fun'=>'time','save'=>'data/time'),
// 			7=>array('fun'=>'date','opt'=>array('Y-m-d','data/time'),'isvar'=>array(0,1),'save'=>'data/time'),
// 			8=>array('fun'=>'var_show','opt'=>array('data/time'))
// 			),				//动作集合，代码片段
// 	'_re1'=>array(array('fun'=>'time','save'=>'_myfun/demofun/_acts/8/opt/1')),	//2运行程序之前，动态修改(获取保存写全路径)
// 	'_re2'=>array(array('fun'=>'_Gdata','opt'=>array('xxx','*DEL*'))),			//4运行程序完之后，动态修改(获取保存写全路径)
// 	'_re'=>array('6/save,7/opt/1'=>'xxx'),			//1运行程序之前，修改默认配置
// 	'_args'=>array('7/opt/0','7/save,8/opt/0')		//3转参位置(参数顺序可以自定)
// 	)
// );
// run_myfun(array('myfun'=>'demofun','opt'=>array('Y/m/d','zzz')));//执行
// run_one(array('fun'=>'json_encode','opt'=>array('_myfun'),'isvar'=>array(1),'save'=>'_myfun2'));		//JSON转码后
// run_one(array('fun'=>'file_put_contents','opt'=>array('_w/maker/mf_demofun.txt','_myfun2'),'isvar'=>array(0,1)));//保存



//简化命令生成数组。生成有格式的数组（用于制作二维变量，给函数体传参用）//只生成数组不运行
function run_args(){
	$num=func_num_args();//参数个数
	$arr=func_get_args();//获取所有参数 //p(func_get_arg(1));//获取单个参数，获取第几个参数。
	if(is_string($arr[0])){
		if($arr[0]==='run_one()') $arr[0]='fun|opt|isvar|save|echo';//制作run_one函数上用的变量参数
		$key=explode('|', $arr[0]);//一维关联数组
	} 
	else $key=$arr[0];
	unset($arr[0]);
	for ($i=1; $i <$num ; $i++) { 
		if($arr[$i]!==0){
			if($key[$i-1]){
				if(is_string($arr[$i]) && strstr($arr[$i],'|')) $rs[$key[$i-1]]=explode('|', $arr[$i]);//二维索引数组
				else $rs[$key[$i-1]]=$arr[$i];	
			}else $rs[$i]=$arr[$i];
		}
	}
	return $rs;
}
// p(run_args('fun|opt|isvar|save|echo', 'demofun','aaaa|bbbb','1|0','aaa/a',1));
// set_myfun(run_args('_acts|_myfun|_args', 'act2/a','demofun','6/save,7/opt/1|7/opt/0|7/save,8/opt/0'));
// run_myfun(run_args('myfun|opt', 'demofun','xxx|Y/m/d|zzz'));
// _Gdata('aa',run_args('run_one()', 'demofun','aaaa|bbbb','1|0','aaa/a'));
// $a1=run_args('fun|opt|isvar|save|echo', 'demofun','aaaa|bbbb','1|0','aaa/a',1);












//--------------------------mind逻辑块
//把机器语言变成人容易理解的逻辑语言(把什么做什么)，按需求来运行程序。我要干什么？

//我要把数据， 做什么处理123后，存到文件中。
//文件的增删改，
//变量的增删改，新建，
//外部变量的处理

//系统变量进行修改传参顺序。


//逻辑写法： 对谁？做什么(修改项)? 对自己修改？---mind方式执行程序（对外公开）
function _mind($in){
	if(!is_array($in)){$vp=$in;$in=_Gdata('l/'.$in);} 
	if(substr_count($in['action'],'/')===1) $in['action']=$in['action'].'/_def';
	$m1=_Gdata('m/'.$in['action']);
	if($m1['fun']) $rs['fun']=$m1['fun']; else return ;

	if(isset($m1['whois'])){
		if($in['who']) $rs['opt'][$m1['whois']]=$in['who'];		//否则从输入的位置中获取数据
		else $rs['opt'][$m1['whois']]='_room';					//如果who为空时从_room操作空间中获取数据

	}else {
		if($in['who']) $rs['who']=$in['who'];					//否则从输入的位置中获取数据
		else $rs['who']='_room';								//whois没有定义，并且who为空时从_room操作空间中获取数据
	}
	if(isset($m1['saveis'])){
		if($in['save']){
			if($in['save']==='this') $rs['opt'][$m1['saveis']]=$in['who']; //this时保存到来源数据上
			else $rs['opt'][$m1['saveis']]=$in['save'];			//否则从输入的位置中获取数据
		}else $rs['opt'][$m1['saveis']]='_room';				//如果save为空时从_room操作空间中获取数据
	}else {
		if($in['save']){
			if($in['save']==='this') $rs['save']=$in['who'];	//this时保存到来源数据上
			else $rs['save']=$in['save'];						//否则从输入的位置中获取数据
		}else $rs['save']='_room';								//如果save值为空时保存在_room操作空间中等待下一个命令对它修改。	
	}
	if(isset($m1['whois'])){
		if(!array_key_exists($m1['whois'], $m1['opt'])) $rs['isvar'][$m1['whois']]=1;		//必须是变量路径
	} 
	if(isset($m1['saveis'])) $rs['isvar'][$m1['saveis']]=1;		//必须是变量路径
	if(isset($m1['isvar'])) {
		if(is_array($m1['isvar'])) $rs['isvar']=$m1['isvar'];
		else{
			$isvar=explode(',', $m1['isvar']);
			foreach ($isvar as $k=>$v) { $rs['isvar'][$k]=$v; }			
		}
	}	
	if(isset($m1['optis'])){//传参规则：不然输入参数也当作无参数
		if($in['opt'] or $m1['opt']){
			$optis=explode(',', $m1['optis']);//optis重定义传参顺序
			if(isset($in['opt'])){		//传入值（优先）：不保存opt配置，执行后消失
				if(is_array($in['opt']))$rs['opt']=$in['opt'];
				else{
					$opt=explode('|', $in['opt']);
					foreach ($optis as $k=>$v) { $rs['opt'][$v]=$opt[$k]; }
				}
			}else{//不传值（以在配置方案走）：保存opt配置，代码重用（这里的opt可以当作成默认值）
				if(is_array($m1['opt'])) $rs['opt']=$m1['opt'];
				else{
					$opt=explode('|', $m1['opt']);
					foreach ($optis as $k=>$v) { $rs['opt'][$v]=$opt[$k];}
				} 
			}			
		}
	}

	if($rs['opt']) ksort($rs['opt']);							//解决排序问题（按键名升序排序）
	if($rs['isvar']) ksort($rs['isvar']);
	if($in['echo']) $rs['echo']=$in['echo'];					//输出结果
	_Gdata('l/'.$vp, $rs); //run_one('l/'.$vp);
	//run_one($rs);//p($rs);										//运行以生成好的一段命令
	//if($in['save']&&$GLOBALS['_room']) unset($GLOBALS['_room']);//最后给save传参了就把操作空间给删除。
}
//-------------模块（先引入先执行把结果保存起来，等下一个流程中调用结果）
//m的资源。这是一个功能函数。       //who为操作对象，action为操作方法，opt为细微配置，save为结果保存。
// //说明：fun运行函数名，opt参数的默认值，optis参数是第几个，whois从哪里获取数据，saveis保存到哪里,isvar是不是变量位置。
// $m['data']['copy']['_def']=array('fun'=>'_Gdata','isvar'=>'0','optis'=>1,'whois'=>1,'saveis'=>0,'name'=>'复制数据');
// $m['data']['add']['_def']=array('fun'=>'_Gdata','isvar'=>'0,0','optis'=>1,'whois'=>1,'saveis'=>0,'name'=>'添加与修改数据');
// $m['data']['del']['_def']=array('fun'=>'_Gdata','opt'=>'*DEL*','isvar'=>'0,0','optis'=>1,'whois'=>1,'saveis'=>0,'name'=>'删除数据');
// $m['string']['edit']['_def']=array('fun'=>'str_replace','opt'=>'111|a','optis'=>'1,0','whois'=>2,'name'=>'替换a为*');//这里的opt可以当作成默认值
// $m['string']['edit']['cfg1']=array('fun'=>'str_replace','opt'=>'f|222','optis'=>'0,1','whois'=>2,'name'=>'替换s为222');//保存opt配置，代码重用
// $m['file']['save']['_def']=array('fun'=>'file_put_contents','optis'=>0,'whois'=>1,'name'=>'保存文件');
// $m['file']['get']['_def']=array('fun'=>'file_get_contents','optis'=>0,'name'=>'读取文件');//args的第几个

// $l['maker']['act1']['a000']=array('action'=>'data/add','opt'=>'asdfasdfasdfasd','save'=>'a/a');
// $l['maker']['act1']['a001']=array('action'=>'data/add','opt'=>'asdfasdfasdfasd');
// $l['maker']['act1']['a002']=array('action'=>'data/copy','save'=>'xxxx');
// $l['maker']['act1']['a003']=array('action'=>'data/del','who'=>'_room');
// $l['maker']['act1']['a004']=array('action'=>'string/edit/cfg1','opt'=>'s|xxxx','who'=>'a/a','save'=>'this');//不保存opt配置，执行后消失（尽量别使用）
// $l['maker']['act1']['a005']=array('action'=>'string/edit','who'=>'a/a');
// $l['maker']['act1']['a006']=array('action'=>'string/edit/cfg1','opt'=>'xxx|***','save'=>'ccc');
// $l['maker']['act1']['a007']=array('action'=>'file/get','opt'=>'_w/maker/m.txt');

// _mind('maker/act1/a000');
// _mind('maker/act1/a001');
// _mind('maker/act1/a002');
// _mind('maker/act1/a003');
// _mind('maker/act1/a004');
// _mind('maker/act1/a005');
// _mind('maker/act1/a006');
// _mind('maker/act1/a007');

// function run_line($vps){ // 'act2/a,act3/b,act4/b'   or $var
// 	if(is_string($vps)) $vps=str_arr1($vps);
// 	foreach ($vps as $k => $v) { run_more($v); }
// }
function run_mind($vps){//maker/act1,maker/act2
	if(substr_count( $vps,',')){

	}
	$p=$vps;
	if(is_string($vps)) $vps=_Gdata('l/'.$vps);
	foreach ($vps as $k => $v) {
		$p2=$p.'/'.$k;
		_mind($p2);
		run_one('l/'.$p2);
	}
	
}
// run_mind('maker/act1');

// //d的资源。外部获取数据的命令。（从D文件夹中获取的数据都放到D变量上，从数据库中要获取的数据放到这里）
// $d['mysql']['get']['a001']=array();//单页中要读入的所有数据接口。
// $d['mysql']['put']['a001']=array();//单页中要写入的所有数据接口。
// $d['post']['get']['aa']=array();
// $d['cookie']['get']['aa']=array();
// $d['file']['get']['a']=array();

// $s['maker']['mysql']['okname']=array();//完成操作后获取的数据放到这里。列表。待操作的列表。
// $s['maker']['mysql']['']=array();

// //v的资源[w/site/div]
// $v['web']['div']['na']=array();//布局
// $v['web']['img']['aa']=array();
// $v['web']['a']['aa']=array();
// $v['web']['menu']['a']=array();

// $w['maker'][]=array();
// $w['maker'][]=array();
// //--------------流程（对预先做好的模块结果，修改程序运行顺序）
// //使用函数。流程线。代码列表
// $r['start']='';//
// $r['line']['acts'][0]=array();

//扩展工具，扩展插件，官网商店中可下载
// _sys/_m/系统/s设置，m模板，v插件，c流程
// _w/网站/单页/部分
// _w/网站/分类/部分
	




//-----------流程控制

//条件执行。真时运行真流程，假时运行假流程
function if_run($if,$str){//(注意：依赖函数_Gdata,run_one)
	$if=(is_string($if)) ? _Gdata($if) : $if;
	if( $if ){ run_one($str); return true; }
	else false;
}
// $if['test'][1]=1;
// $if['test'][0]=0;
// $data['cus']['aaa']='aaaaaa';
// $data['cus']['bbb']='bbbbbb';
// $data['bb']='aaabbbcccaaabbb';
// $act[1]=array('fun'=>'p','opt'=>array('aaaaa'));
// $act[2]=array('fun'=>'str_replace','opt'=>array('a','*','data/bb'),'isvar'=>array(0,0,1),'save'=>'cc');
//run_one('act/2');
//if_run('if/test/1','act/2');//判断变量，真时：干什么，保存到哪里

//有限循环，重复运行n次代码段
function for_run($num,$actid){
	for ($i=0; $i <$num; $i++) run_one($actid);
}
//无限循环，重复运行代码段直到条件不满足为止
function while_run($if,$actid,$r_one=0){
	if($r_one){ do { run_one($actid); } while ($if); }//先运行一次后在按条件判断是否继续重复循环运行
	else { while ($if) run_one($actid); }//直到条件不满足为止一直重复运行代码段
}




//------------------------if条件



//判断变量的数据类型。
function if_vartype($vp,$type=0){
	$vp=_Gdata($vp);					//判断标量函数is_scalar();
	if($type===0) return gettype($vp);	//反馈: NULL,(标量boolean,  integer,double,  string)  //array,object,  resource
	if(gettype($vp)==$type)return true;
	else return false;
}
//p(if_vartype('act2/a/6','array'));




function if_bool($str){
	return (bool)$str;	//强制转换类型为布尔值
}
//var_dump(if_bool('aaa'));

function if_and($a,$b){
	return $a and $b;	//&& and
}
function if_or($a,$b){
	return $a or $b;	//|| or
}
// var_dump(if_and(1,1));
// var_dump(if_or(1,0));

function if_dengyu($a,$b,$type=0){
	if($type==0) return $a==$b;		//0数据类型不判断，等于
	else return $a===$b;			//1数据类型也判断，全等
}
function if_budengyu($a,$b,$type=0){
	if($type==0) return $a!=$b;		//0数据类型不判断，不等于
	else return $a!==$b;			//1数据类型也判断，全不等
}
// var_dump(if_dengyu(0,'0'));
// var_dump(if_dengyu(1,'1',1));
// var_dump(if_budengyu(0,'0'));
// var_dump(if_budengyu(1,'1',1));

//类型转换
function val_format($data,$type='string'){
	if($type=='string') return (string)$data;
	elseif($type=='int') return (int)$data;
	elseif($type=='bool') return (bool)$data;
	elseif($type=='json') return json_decode($data,1);
}









//-----------------try_catch异常处理

//异常处理的方式来执行一段代码（一段代码可以是一条代码也可以是嵌套的多行代码）
function try_catch($run){
	try { run_one($run); } catch (Exception $e) { p($e); }//!!!!写入日志
}
// try_catch('act/5');
// run_one('act/5');


//===============================================运算符
//-----int
//-----float

function m_yunsuan($a,$fu,$b){
	if($fu==='+') return $a+$b;
	if($fu==='-') return $a-$b;
	if($fu==='*') return $a*$b;
	if($fu==='/') return $a/$b;
	if($fu==='%') return $a%$b;
	if($fu==='.') return $a.$b;
}
// p(m_yunsuan(5,'/',5));

function m_zizeng(&$a){$a++;}
function m_zijian(&$a){$a--;}
// $a=10;
// m_zizeng($a);
// m_zizeng($a);
// m_zijian($a);

function m_bijiao($a,$fu,$b){
	if($fu==='==') return $a==$b;
	if($fu==='===') return $a===$b;
	if($fu==='!=') return $a!=$b;
	if($fu==='!==') return $a!==$b;
	if($fu==='>') return $a>$b;
	if($fu==='<') return $a<$b;
	if($fu==='>=') return $a>=$b;
	if($fu==='<=') return $a<=$b;
}
// p(m_bijiao(1,'===','1'));

function m_luoji($a,$fu,$b){
	if($fu==='&&') return $a && $b;
	if($fu==='||') return $a || $b;
	if($fu==='!') return !($a == $b);
}
// p(m_luoji(1,'&&','1'));




//---------------------------------------

// 高精度运算函数
// bcmod — 求余数($a,$x)
// bcpow — 次方($a,$b,4)
//  bcpowmod — 先次方然后求余数($a,$b,$x,4)
//  bcsqrt — 求平方根($a,4)
//  bcscale — 给所有函数设置小数位精度(4)
//  bccomp — 比较($a,$b,4)



//高精度运算。（未完善版）不管优先顺序，只能按顺序依次运算。
function m_math($str,$fu='+',$long=30){
	$num = preg_split("/[^0-9.]/", $str);
	$fu = preg_split("/[\d.\ ]*/", $str);
	$fu=array_filter($fu);
	$fu=array_values($fu);
	// print_r($num); print_r($fu);
	$rs=$num[0];
	for ($i=0; $i <count($num) ; $i++) { 
		if($fu[$i]=='+') $rs=bcadd($rs, $num[$i+1],$long);		// bcadd — 加法($a,$b,4)
		elseif($fu[$i]=='-') $rs=bcsub($rs, $num[$i+1],$long);	// bcsub — 减法($a,$b,4)
		elseif($fu[$i]=='*') $rs=bcmul($rs, $num[$i+1],$long);	// bcmul — 乘法($a,$b,4)
		elseif($fu[$i]=='/') $rs=bcdiv($rs, $num[$i+1],$long);	// bcdiv — 相除($a,$b,4)
	}
	return $rs;
}
// print_r(m_math('123456789012345678901234567890+0.123456789012345678901234567890*2'));//不管优先顺序，只能按顺序依次运算。






//======================================数据格式转换

//自定义数组方式，在一个模板中替换所有数据（单行）
function tpl_obj($dd,$tpl,$save=0){
	if(getType($dd)==='string'){ $dd=_Gdata($dd); $x=1;}//数据池中获取kv数组
	$t1=_Gdata($tpl); if(isset($t1)) $tpl=$t1;//数据池中获取tpl模板
	$rs=$tpl;
	foreach ($dd as $k => $v) {
		$rs=str_replace('{'.$k.'}',$v, $rs);
	}
	if($save==='this' && $x===1) return _Gdata($dd,$rs);
	if($save===0) return $rs;
	else return _Gdata($save,$rs);
}
// $dd=json_decode('{"aaa":"111","ccc":"22222"}',1);
// $tpl = "---{aaa}--{bbb}---{ccc}==";//输出1个
// p(tpl_obj($dd,$tpl));
// $dd=json_decode('["ccc","ddd"]',1);
// $tpl='---{0}----{1}----';
// p(tpl_obj($dd,$tpl));


//kv数组方式，按模板格式合并成多个数组。（循环）
function tpl_kv($dd,$tpl,$save=0){//数据可以是关联数组也可以是索引数组。{k} {v}
	if(getType($dd)==='string'){ $dd=_Gdata($dd); $x=1;}//数据池中获取kv数组
	$t1=_Gdata($tpl); if(isset($t1)) $tpl=$t1;//数据池中获取tpl模板
	$rs='';
	foreach ($dd as $k => $v) {
		$a=str_replace('{k}',$k, $tpl);
		$rs.=str_replace('{v}',$v, $a);
	}
	if($save==='this' && $x===1) return _Gdata($dd,$rs);
	if($save===0) return $rs;
	else return _Gdata($save,$rs);
}

// $tpl='---{k}----{v}----';
// $dd=json_decode('{"aaa":"111","ccc":"22222"}',1);
// p(tpl_kv($dd,$tpl));
// $dd=json_decode('["ccc","ddd"]',1);
// p(tpl_kv($dd,$tpl));

// _Gdata('uitest/dd',json_decode('{"aaa":"111","ccc":"22222"}',1));
// _Gdata("uitest/dd2",json_decode('["aaa","bbb"]',1));
// _Gdata("uitest/tpl",'<input type="text" class="c{k}" value="{v}" />');
// tpl_kv('uitest/dd2','uitest/tpl','save1');
// p(_Gdata('save1'));//输出dom 
// _Gdata('uitest/tpl','<input type="text" class="{aaa}" value="{ccc}" />');
// _Gdata('uitest/tpl2','<input type="text" class="{0}" value="{1}" />');
// tpl_obj('uitest/dd','uitest/tpl','save2');
// p(_Gdata('save2'));//输出dom 





//======================================其他，补助功能
//判断是否为ajax请求
function is_ajax(){ if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])=="xmlhttprequest") return true; else return false;}
