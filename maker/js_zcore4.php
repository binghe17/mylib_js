<?php
//路由到某页
function url_file($file='w/url.txt'){
	// $_SERVER['HTTP_HOST'];		// localhost
	// $_SERVER['SCRIPT_NAME'];		// /0906/_help/_js_study/maker/js_zcore4.php
	// $_SERVER['PATH_INFO'];		// a/b
	// $_SERVER['QUERY_STRING'];	// a=b&c=d
	$url=array('localhost/post'=>'post','localhost'=>'index');
	// file_put_contents($file, json_encode($url, JSON_UNESCAPED_SLASHES));
	// $url=json_decode(file_get_contents($file),1);
	$thisURL=rtrim($_SERVER['HTTP_HOST'].$_SERVER['PATH_INFO'],'/');//localhost/a/b/c
	foreach ($url as $k => $v) {
		if($k===$thisURL) return run_page($v);//第一次判断完全相等时
	}
	$num=substr_count($thisURL,'/');
	for ($i=0; $i <$num-1 ; $i++) { //第一位不能是随机数。
		$thisURL=substr($thisURL, 0, strrpos($thisURL,'/'));//第二次判断部分
		foreach ($url as $k => $v) {
			if($k===rtrim($thisURL,'/')) return run_page($v);
		}
	}
	return run_page('error404');//网页未找到。404错误
}
url_file();

function run_page($v){
	$file='w/pages/'.$_SERVER['HTTP_HOST'].'/'.$v.'/onload_php.txt';
	if(file_exists($file)) return print_r(file_get_contents($file)); 
	else return header('Location:'.$_SERVER['SCRIPT_NAME']);//跳转到主页。
}









?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<base href="/0906/_help/_js_study/maker/" />
<script type="text/javascript" src="jslib/jquery/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="jslib/zcore.js"></script>
<script type="text/javascript" src="jslib/r.js"></script>
</head>
<body>





</body>
</html>