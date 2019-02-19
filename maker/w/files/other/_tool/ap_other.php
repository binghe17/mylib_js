<?php

//-----------------//代码垃圾箱
//【高级技巧】自定义变量名(变量名连接)
//${"result".$i} 代表的是一个变量,变量名是根据$i变化的.
//${'aaa'.$test}='aaaaaaa'; 		//@@@自定义变量名
//------------------------------










//-----【不用了】--------CORE DEV开发者专用类
/*


//保存安全的php文件
function safe_file($path, $cont , $type==0){
	$tou="<?php if(\$is_who!=='DEV') exit(' '); ?>\n";
	if(file_exists($path) and $type==1) {//读
		$read=file_get_contents($path);
		$rs=str_replace($tou, '', $read);
	}else {//写
		$rs=$tou.$cont ;
	}
	File::writeFile($path, $rs);	//保存文件
}


//保存安全的php文件
function save_php($path, $cont){
	ob_start();//开启缓存 （OB函数的功能是把echo缓存后一次性输出）
//--- <<< 输出部分 start --------
print <<<EOT
<?php
if(\$is_who!=='DEV') exit(' ');
print <<<SHOW

EOT;
print $cont;
print <<<EOT

SHOW;
?>
EOT;
//------ end 输出部分 >>> -------
	$rs = ob_get_contents();//把要输出的部分数据转为变量
	ob_clean();//清空缓存
	File::writeFile($path, $rs);	//保存文件（写入文件中）
}

// $tpl=File::readFile('div/tpl.php');
// save_php('div/tpl1.php', $tpl);




//获取变量，安全的PHP文件
function var_php($path){
	$is_who='DEV';	//是谁(权限)
	ob_start();//开启缓存
	include $path;//导入文件（包含打印）
	$rs = ob_get_contents();//把要输出的部分数据转为变量
	ob_clean();//清空缓存
	return $rs;
}


*/
//-------------------------
/*

//HTML模版输出
function html5(&$html){
allVal($html['head']);
allVal($html['body']);
print <<<part1
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>{$html['title']}</title>
	<!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js" type="text/javascript"></script> 
	{$html['head']}
</head>
<body>
{$html['body']}
</body>
</html>
part1;
}
$html['body'] = array("wang" => 18, "li" => 20, "zhang" => array("name" => "小张", "age" => 25, "xin" => array("name" => "asdf", "age" => 28)),array("name" => "asdf", "age" => 28));
html5($html);



//HTML模版输出
function print_tpl($template){
print <<<part1
{$template}
part1;
}
print_tpl("<p>aaaaaa</p>");
print_tpl("<p>kr</p>");
	

*/
//-----------------
/*

//引入列表数组中的所有文件
function inc_list($filelist){
	foreach ($filelist as $k => $v) {
		$rs[]=include($filelist[$k]);
	}
	return $rs;
}
$list=inc_list($filelist);


//type=all时所有文件列表,	type=user自定文件列表
function skin($filesrc,$type='all'){
	if($type=='all') $filelist=glob($filesrc);
	if($type=='user') $filelist=explode(',',$filesrc);
	for ($i=0; $i <count($filelist) ; $i++) {
		auto_div($filelist[$i]);
	}
}
skin('skin/var.php,skin/tpl.php','user');
skin('skin/*.php');


//给模板文件tpl.php自动赋值var.php
function auto_var2tpl($tpl, $var){
	if(!$tpl or !$var) return ;
	foreach ($var as $k => $v) {
		$tpl=str_replace('{$'.$k.'}', $v, $tpl);
	}
	return $tpl;//10000次 0.036441
}
echo auto_var2tpl($tab[0]['tpl'],$tab[0]['var']);

*/

//-----------变量赋值，方法过期不用。
/*
//在函数内把全局变量赋值给谁
function val2(&$a,&$b=null){
	return $b=$a;
}
//val2($GLOBALS['html'],$html); //函数内获取全局的变量. //（等同于）// $html=$GLOBALS['html']; 


//字符串的变量赋值(只支持到二维数组)
function funGval($k,$g='$GLOBALS'){
	$Akey=strPart($k,'$','[');
	$Aname=strPart($k,'$');
	$Bkey=strPart($g,'$','[');
	$Bname=strPart($g,'[',']');
	global ${$Akey};
	global ${$Bkey};
	${$Bkey}[$Bname]=${$Akey}[$Aname];
}
// $cfg['a']='aaaaaaaa';
// funGval('$cfg[a]','$bb[c]');
*/	


//==========================================================


/*
//---------------
site
member
content
theme
extenstions
settings


//多国语言
//回收站

set|edit|del|add



addon//插件
counter
member
point_level
skins
schemas
column
default
size
type
index
notnull
ruleset
lang
ajax.filter.php
_common.php


//------lang---
en,English
ko,한국어
jp,日本語
zh-CN,中文(中国)
zh-TW,中文(臺灣)

//---------------

//人类语言，指令规范
read //读
write//写

open //打开
close //关闭

new//新建
edit//编辑
del//删除

//文件操作指令规范
{
	'action':'file_upload',		//文件上传(上传什么文件，到哪里)
	'option':
}



*/
//Copyright © 2016 AtomPond Corp. All Rights Reserved.
//-------------------------------------

// .
// ├── controllers                    // 控制层
// |   ├── site.js                    // 注册登录控制
// |   └── topic.js                   // 话题控制
// ├── models                         // 数据模型
// |   ├── index.js                   // 出口文件
// |   ├── topic.js                   // 话题模型
// |   └── user.js                    // 用户模型
// ├── proxy                          // 数据控制层
// |   ├── topic.js                   // 话题数据控制
// |   └── user.js                    // 用户数据控制
// ├── tests                          // 单元测试
// |   ├── support/support.js         // 模拟数据
// |   ├── user.test.js               // 注册登录控制测试
// |   └── topic.test.js              // 话题控制测试
// ├── app.js                         // 项目主文件
// ├── consig.js                      // 项目配置文件
// ├── package.json                   // 包文件
// └── router.js                      // 路由配置

//----------------------------------------
//前端 AngularJS + Bootstrap，后端 Express+Sequelize(nodejs，部分使用rails)
//-------------Bootstrap 模板
// https://wrapbootstrap.com/theme/    商业收费（参考）
// http://themeforest.net/category/site-templates/admin-templates   商业收费（参考）
// http://bootstrapbay.com/themes   商业收费（参考）
// http://www.25xt.com/html5css3/9680.html  免费5个
// http://blacktie.co   免费
/*
Credits

Bootstrap - http://getbootstrap.com
jQuery - http://jquery.com
AngularJs - https://angularjs.org/
Bower - http://bower.io/
GruntJs - http://gruntjs.com
Angular Loading Bar - http://chieffancypants.github.io/angular-loading-bar/
Angular UI Router - https://github.com/angular-ui/ui-router
OC Lazy Load for AngularJs - https://github.com/ocombe/ocLazyLoad
Animate.css - http://daneden.github.io/animate.css/
Auto Size Textarea - http://www.jacklmoore.com/autosize/
Bootgrid - https://github.com/rstaib/jquery-bootgrid
Date Time Picker - http://eonasdan.github.io/bootstrap-datetimepicker/
Bootstrap Select - http://silviomoreto.github.io/bootstrap-select/
Bootstrap Wizard - http://vadimg.com/twitter-bootstrap-wizard-example/
Chosen - http://harvesthq.github.io/chosen/
EasyPieChart - http://rendro.github.io/easy-pie-chart/
Color Picker - http://acko.net/blog/farbtastic-jquery-color-picker-plug-in/
Simple File Input - http://jasny.github.com/bootstrap/javascript/#fileinput
Flot Chart - http://www.flotcharts.org/
Full Calendar - http://fullcalendar.io
Input Mask - http://blog.igorescobar.com
Material Design Icon - http://zavoloklom.github.io/material-design-iconic-font/icons.html
MediaELement JS - http://mediaelementjs.com/
Moment JS - http://momentjs.com/
Malihu Content Scroller - http://manos.malihu.gr/jquery-custom-content-scroller/
NoUiSlider - http://refreshless.com/nouislider/
Simple Weather - http://simpleweatherjs.com/
SparkLine Chart - http://omnipotent.net/jquery.sparkline/
SummerNote - http://summernote.org
Waves - https://github.com/fians/Waves
Material Shdow - https://github.com/mrmlnc/material-shadows
Roboto Font - https://www.google.com/fonts/specimen/Roboto
Satisfy Font - https://www.google.com/fonts/specimen/Satisfy
Shadow Light Font - https://www.google.com/fonts/specimen/Shadows+Into+Light
ng-table - http://ng-table.com/
SweetAlert - http://t4t5.github.io/sweetalert/
*/
//--------------------------------------------------------

// http://www.open-open.com/news/view/2be78b
// 前段框架 http://getuikit.com     http://www.bootcss.com     http://www.supermgr.cn

// 免费的 Bootstrap 主题包 http://bootswatch.com

//---------Bootstrap UI 编辑器
// https://jetstrap.com/demo
// http://www.bootply.com/new
// http://vitalets.github.io/x-editable/
// http://mianfolio.com/ultimateblocks/#
//------------------------在线HTML5工具 http://www.html580.com/8674
// https://spaces.proto.io
// http://enjoycss.com


