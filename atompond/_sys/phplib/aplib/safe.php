<?php

//--------------安全----------------------------
//删除为空的全局全局变量。//删除不必要的全局变量，会泄漏安全。
function _Gdel(){
	unset($GLOBALS['HTTP_POST_VARS']);		unset($GLOBALS['HTTP_GET_VARS']);
	unset($GLOBALS['HTTP_POST_FILES']);		unset($GLOBALS['HTTP_COOKIE_VARS']);
	unset($GLOBALS['HTTP_SERVER_VARS']);	unset($GLOBALS['HTTP_ENV_VARS']);
	unset($_ENV);							unset($_REQUEST);//unset($GLOBALS['_SERVER']);
	if(!$_POST) unset($_POST);				if(!$_GET) unset($_GET);
	if(!$_COOKIE) unset($_COOKIE);			if(!$_FILES) unset($_FILES);
}
//_Gdel();




	/*IP过滤规则，可以有如下形式： 
		1.完整的IP地址 如：192.168.0.1  
		2.某一段IP 如：192.168.0.* 。 
	*/
	function _ipRegexp($ip,$iprule){ //IP核心函数(下划线开头的规范为都是私用函数，函数内的函数使用)
		$ipruleregexp=str_replace('.*','ph',$iprule);
		$ipruleregexp=preg_quote($ipruleregexp,'/');
		$ipruleregexp=str_replace('ph','\.[0-9]{1,3}',$ipruleregexp);

		if(preg_match('/^'.$ipruleregexp.'$/',$ip)) return true;
		else return false;
	}

//白名单，当IP至少满足一条规则时继续执行操作 
function is_whiteIP($arrIPS,$showMSG='IP not in white list'){
	$curr_ip=$_SERVER['REMOTE_ADDR'];
	//$white_list=array('192.168.1.107'); //白名单规则
	$white_list=$arrIPS;
	$test_success=false;
	foreach($white_list as $iprule){
		if(_ipRegexp($curr_ip,$iprule)){
			$test_success=true;
			break;
		}
	}
	if(!$test_success) exit($showMSG);
}
	//is_whiteIP(array('192.*.*.*'),'你不在白名单，所以不能继续访问');


//黑名单，当IP不满足所有规则时继续执行操作 
function is_blackIP($arrIPS,$showMSG='IP in black list'){
	$curr_ip=$_SERVER['REMOTE_ADDR'];
	//$black_list=array('192.168.1.107'); //黑名单规则
	$black_list=$arrIPS;
	foreach($black_list as $iprule){
		if(_ipRegexp($curr_ip,$iprule)){
			exit($showMSG);
		}
	}
}
	//is_blackIP(array('192.168.1.77'),'你在黑名单，所有不能继续访问');



//--------User Info-------





//浏览器和屏幕像素
function is_browser(){
	if(isMobile()) return 'Mobile';
	$set = array('MSIE 9','MSIE 8','MSIE 7','MSIE 6','Firefox','Opera','Chrome','Safari');
	foreach($set as $val) if (strpos('_'.$_SERVER['HTTP_USER_AGENT'],$val)) return $val;
	return '';
}
	//echo is_Browser();


//系统平台（手机，电脑）
function is_mobile(){
	$d['magent']= array(
		'android=android',
		'ipod=ipod',
		'ipad=ipad',
		'iphone=iphone',
		'blackberry=blackberry',
		'windows ce=wince',
		'windows phone os 7=winos7',
		'mobile=mobile',
		//'windows nt=winpc',
		//'mac os=macpc'
	);
	$xagent = strtolower($_SERVER['HTTP_USER_AGENT']);
	foreach($d['magent'] as $val){
		$valexp = explode('=',trim($val));
		if(strpos($xagent,$valexp[0])) return $valexp[1];
	}
	return ;
}

	// $g['mobile'] = isMobile();
	// if($g['mobile']=='winpc') echo $g['mobile'] ;
	// if($g['mobile']!='winpc') echo 'not windows' ;


//获取客户端IP
function get_clientIP() {
	if(getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) $ip = getenv("HTTP_CLIENT_IP");
	else if(getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) $ip = getenv("HTTP_X_FORWARDED_FOR");
	else if(getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) $ip = getenv("REMOTE_ADDR");
	else if(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) $ip = $_SERVER['REMOTE_ADDR'];
	else $ip = "unknown";
	return($ip);
}
	//echo get_clientIP();


//密码加密
function PW($str){
	$str=trim($str);
	return md5(sha1(base64_encode('*'.$str.'AtomPond')));
}


//唯一值 uniqid   (生成唯一标识符) "默认用 安全散列算法（SHA1）"
function uid($type='sha1') {
	$unique_id = $_SERVER['HTTP_USER_AGENT'] .$_SERVER['REMOTE_ADDR'] .microtime() .rand();
	if($type=='sha1') return sha1($unique_id);
	elseif($type=='md5') return md5($unique_id);
	else return $unique_id;
}
//echo uid();


//防灌水例子。
// function demo_forSend(){
// 	session_start();
// 	p($_SESSION);
// 	echo $_POST['uniqid'];
// 	//只有正常从当前表单发送的数据才能正常访问。
// 	//$_POST['uniqid']和$_SESSION['uniqid']值的相不相等来代替验证码。（防灌水）
// 	if($_SESSION['uniqid']===$_POST['uniqid']){
// 		echo '正常访问';
// 	}
// 	$_SESSION['uniqid'] = $_uniqid =md5(uniqid(rand()));//新建唯一值，每刷新都会替换.
// echo <<<html
// <form name="input" action="option.php" method="post">
// <input type="hidden" name="uniqid" value="$_uniqid" />
// <input type ="submit" value ="Submit">
// </form>
// html;
// }
//demo_forSend();









//-----------------------过滤

//-----------------if filter

//ifok nextrun 认证通过才能继续往下执行，不然直接显示无权访问。
function auth_ok($a,$b=1){
	return ($a==$b) ? 'auth ok!' : exit('No Auth!');
}
// $if1='ok';
// $if2='bbb';
// $if3='bbb';
// $if4=(bool)$if1;
// echo auth_ok($if1,'ok');
// echo auth_ok($if2,'bbb');
// echo auth_ok($if2,$if3);
// echo auth_ok($if4);


//------------------mysql filter


//预防数据库攻击的正确做法
function check_in($value){
	if (get_magic_quotes_gpc()) $value = stripslashes($value);					//去除斜杠
	if (!is_numeric($value)) $value = "'".mysql_real_escape_string($value)."'";	//如果不是数字则加引号
	return $value;
}


function inject_check($sql_str){
	//  ;|and|exec|insert|select|delete|update|count|*|%|chr|mid|master|truncate|char|declare|'|"|,
	//  $,#,’,%,^,&,?,(,),<,>,[,],{,},/,\,;,:,
	return preg_match('/select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/i', $sql_str); // 进行过滤
}
/* sql 注入问题
一、防止注入的几种办法 
其实原来就是我们需要过滤一些我们常见的关键字和符合如：
Select，insert，update，delete，and，*，等等

Addslashes(需要被过滤的内容)通过系统函数间的过滤特殊符号

二、 PHP其他地方安全设置
1、register_globals = Off 设置为关闭状态
2、SQL语句书写时尽量不要省略小引号和单引号
Select * From Table Where id=2 (不规范)
Select * From ·Table· Where ·id·=’2’ (规范)
3、正确的使用 $_POST $_GET $_SESSION 等接受参数，并加以过滤
4、提高数据库命名技巧，对于一些重要的字段可根据程序特点命名
5、对于常用方法加以封装，避免直接暴露SQL语句
*/

//----------ajax filter






//处理接收到的数据。(ajax,sql,txt,html)
function indata($str,$type=null){
	if(!function_exists('ajax_urlbug')){
		function ajax_urlbug($char) {			//修复ajax方式发送url编码时的 ‘加号’小bug
			if ($char == '%2B') return '+'; 	//解决url加号问题bug
			return $char;
		}
	}
	if($type=='ajax') {
		$str=ajax_urlbug($str);
		$str=stripslashes($str);
		return $str;
	}
	$data= urldecode($str);										//转为中文
	if($type=='sql') {
		if (!get_magic_quotes_gpc()) $data = addslashes($data);
		return $data;											//sql保存 到数据库			
	}
	//if($type=='html') return htmlentities($data, ENT_NOQUOTES);//html标签 实体 不处理双引号	
	$data = stripslashes($data);								//去掉反斜杠
	if($type=='txt') return $data;								//text文本 （什么都不过滤）
	if($type=='html') return $data=htmlspecialchars($data);			//html标签 实体 & " ' < >	
	return $data;
}
//处理输出变量
function outdata($str,$type=null){
	$str = stripslashes($str);									//去掉反斜杠
	if($type=='html') $str=htmlspecialchars_decode($str);		//html实体转换为字符（显示时不用）保存用
	if($type=='reply') $str=nl2br(trim($str));					//评论专用
	return $str;
}

// if($_POST['action']=='show') echo indata($_POST['txt']);
// if($_POST['action']=='save'){
// 	$rs= indata($_POST['txt'],'ajax');
// 	include 'File.class.php';
// 	File::writeFile('a.php', $rs);
// 	echo '<a href="a.php" >savefile</a>';//把结果反馈给浏览器
// }


//echo strip_tags("Hello <b><i>world!</i></b>","<b>");//允许的tag标签为<b>



//----------sql filter

	//有此函数时，对数据使用一次。（数组或字符串等类型）
	function _funName($funName,&$val){
		if(function_exists($funName)){
			if(is_array($val)) {
				foreach($val as $k => $v) {
					if(is_array($v)) _funName($funName,$v);
					else $val[$k]=$funName($v); 	//数组时，去掉转义
				}
			}
			else $val=$funName($val); //字符串等类型时，去除转义
		}
		return $val;
	}
		//$a='a""'; print_r(_funName('addslashes',$a)); //例子


//过滤 数据库变量 转义。0：自动转义开启时去除转义（默认）      1：强行转义     2：强行去除转义
function val2db(&$val,$type=0){
	//magic_quotes_gpc 		的设定值将会影响通过Get/Post/Cookies获得的数据（获取时已经是转义的）
	//magic_quotes_runtime 	的设定值将会影响从文件中读取的数据或从数据库查询得到的数据 
	if(get_magic_quotes_runtime()) $get_file=@set_magic_quotes_runtime(0); //文件中获取的值，转义与否。
	else{
		//客户端发送的数据（如post,get,cookie）清除转义。
		if($type==0){
			if(get_magic_quotes_gpc()) _funName('stripslashes',$val); //开启自动转义时，去除转义（数组和字符串型都支持）
		}
		//文件或手写变量（如get_file_contents），强行转义或强行去除转义。
		if($type==1) _funName('addslashes',$val); 	//addslashes 强行转义（不判断自动）
		if($type==2) _funName('stripslashes',$val); 	//stripslashes 强行去除转义（不判断自动）

	}
	return $val; 
}
	//$data2 = implode(file('1.txt')); 		//按行提取给数组，然后 数组转字符串。
	//$data2 = file_get_contents('1.txt'); 	//结果 同上 
	//echo '<pre>';
	//print_r(val2db($data2));
	//print_r(val2db($_GET));
	//echo '</pre>';


//------------url filter  (get,post,cookie)

//去掉转义 变量是否合法（权限认证） //这个变量合法才通过，不然错误提示。
function val2ok($val,$preg,$echo=0,$href='../'){
	if($val==null) exit;
	if(is_int($preg)){
		if($preg==null) exit;
		if($preg==1) $preg='/^[\w\x80-\xff]{3,15}$/';//1:name
		if($preg==2) ;//1:password
	}
	if(!preg_match($preg, $val)) {
		if(is_int($echo)){
			if($echo==0) $echo='error value';			//默认，错误信息
			if($echo==1) $echo='<script type="text/javascript">history.go(-1);</script>';					//调回前一页（-2时跳两次，上上页）
			if($echo==2) $echo='<script type="text/javascript">window.location.href="'.$href.'"</script>';	//js方式的跳转到某页
			if($echo==3) header('Location: '.$href); 								//php方式的跳到某页
			if($echo==4) header('Location: '.basename($_SERVER['SCRIPT_NAME'])); 	//php方式的跳到当前页（刷新,去掉GET值）
		} 
		exit($echo);
	}
}
	//val2ok($_GET['a'],1);


	//接收数据
	// if(!empty($_POST))   val2db($_POST,  0);	//POST去掉转义
	// if(!empty($_GET))    val2db($_GET,   0);	//GET去掉转义
	// if(!empty($_COOKIE)) val2db($_COOKIE,0);	//COOKIE去掉转义
	// //echo '<pre>';print_r($_COOKIE);echo '</pre>';
	// echo '<pre>'; print_r($_GET); echo '</pre>';






//-------------------------

//按权限过滤引入列表
function auth($dirlist='tab/*.php',$auth_src='auth/auth.php'){
	$auth_src=dirname(dirname($dirlist)).'/'.$auth_src;
	//print_r($auth_src);
	if(glob($auth_src)) $auth=include($auth_src);
	// if($is_dir==1) {
	// 	if(glob($dirlist,GLOB_ONLYDIR)) $tablist=glob($dirlist,GLOB_ONLYDIR);
	// }else{
		if(glob($dirlist)) $tablist=glob($dirlist);
	// }
	if($auth['if_login']==0) {
		if(is_array($auth['list_guest'])) $authlist=$auth['list_guest'];//未登录时
		else return $tablist;
	}
	if($auth['if_login']==1) {
		if(is_array($auth['list_login'])) $authlist=$auth['list_login'];//登录成功时
		else return $tablist;
	}
	if($auth['if_rule']==0) return arr_getval($authlist,$tablist);
	if($auth['if_rule']==1) return arr_getval($authlist,$tablist,0,1);

}
	// $who['user']='user1';
	// $filelist=auth();



//使用时（权限判断用）
function if_auth($if){
	return ($if) ? 1 : 0 ;
}
//权限auth
// return array(
// 	//'if_rule'=>0,										//0为白名单方式，1为黑名单方式
// 	'if_login'=>if_auth($GLOBALS['who']['user']),		//1表示登陆成功，0表示未登录
// 	'list_login'=>array('tab_1','tab_2','tab_3'),		//1时，登陆成功时引入的list (没有时显示全部)
// 	'list_guest'=>array('tab_3','tab_2')				//0时，未登录时引入的list

// );

//------------------------auth.php

//会员权限例子

//权限页
function user_shell($uid,$shell,$m_id){
	$sql="select * from user_list where `uid`='$uid'";
	$query=mysql_query($sql);
	$us=is_array($row=mysql_fetch_array($query));
	$shell=$us ? $shell==md5($row['username'].$row['password']) : false;
	if($shell){
		if($row['m_id']<=$m_id) return $row;
		else {
			echo '你的权限不足';exit;
		}
	}else {echo '你无权限访问该页';exit;}
}

function user_mktime($onlinetime){
	$new_time=mktime();
	echo $new_time-$onlinetime;
	if($new_time-$onlinetime>'100'){
		echo '登陆超时';
		exit();
		session_destroy();
	}else $_SESSION['times']=mktime();
}


// $arr=user_shell($_SESSION['uid'],$_SESSION['user_shell'],1);
// user_mktime($_SESSION['times']);
// echo $arr['uid'];
// echo '权限内容sssssss';

//user.php
// if($_POST['submit']){
// 	$username=str_replace(' ','',$_POST['username']);
// 	$sql="select * from user_list whrer `username`='$username'";
// 	$query=mysql_query($sql);
// 	$us=is_array($row=mysql_fetch_array($query));
// 	$ps=$us ? md5($row['username'].$row['password']) : false;
// 	if($ps){
// 		$_SESSION['uid']=$row['uid'];
// 		$_SESSION['user_shell']=md($row['username'].$row['password']);
// 		$_SESSION['times']=mktime();
// 		echo '登陆成功';
// 	}else{
// 		echo '密码或用户名错误';
// 		session_destroy();
// 	}
// }



//------------inctest


//-------------testdata---------------(模拟函数体外的数据)
//$GLOBALS['who']['userid']='user1';					//获取登录用户。（如果在全局变量中有此变量时）
//$GLOBALS['who']['usergp']='usergp';				//获取登录用户。（如果在全局变量中有此变量时）
//$GLOBALS['who']['level']=5;							//获取用户级别




//主入口中引入的文件。
function check_file($filepath){
	//限制的文件夹路径
	$sitepath=ltrim($filepath, $_SERVER['DOCUMENT_ROOT']);			//截取root，从网站根到当前文件的路径（注意,它会自动删除 / 的）
	//$auth_1=substr_count($sitepath,'0906/DevSystem/preg/auth') > 0;	//限制此路径下的所有文件
	if($auth_1) die('禁止访问目录');

	//限制用户组与用户级别
	if(!$GLOBALS['who']['userid']) die('没有登录'); 									//限制访客访问
	if($GLOBALS['who']['usergp']=='usergp') die('受限的用户组'); 						//限制用户组
	if(!$GLOBALS['who']['level'] || $GLOBALS['who']['level'] < 5 ) die('权限不足'); 	//限制小级别用户
	//。。。可以无限制的增加，限制逻辑
}

	//include 'incpath/safefile.php';
	//---------------------------
	// //每个单页文件开头(所有文件都不用改下面一行代码，就可以动态实现权限)
	// if(!function_exists('check_file')) die('非法访问'); else check_file(__FILE__);
	// //没有此函数时，表示浏览器中直接访问此页面，所以，禁止访问。
	// //有此函数时，直接运行权限认证。看自己属于什么权限。管理员的话，可往下执行，（无限加规则）
	// echo '<pre>';
	// print_r($_SERVER);
	// echo 'aaaaaaaa';
	//-----------------------------





//--------------url------------------------

//获取URL中的源代码
function url_code($url){
	$curl = curl_init(); 							// 初始化一个cURL对象
	curl_setopt($curl, CURLOPT_URL, $url);			// 设置您需要抓取的URL
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);	// 设置cURL参数，要求结果保存到字符串中还是输出到屏幕上
	$data = curl_exec($curl);						// 运行cURL，请求网页
	curl_close($curl);								// 关闭URL请求
	return $data;
}
	// $ip_api1=url_code('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ie=utf-8');//新浪api_ip
	// $ip_api1=json_decode($ip_api1,1);
	// echo '<pre>';print_r($ip_api1);echo '</pre>';




//路径中获取文件名加后缀
// function getFile($url){
// 	return substr($url, strrpos($url, "/")+1);
// }
// echo getFile('http://www.baidu.com/index.php').'<br>';
// echo getFile('/url/www/index.jsp').'<br>';
// echo getFile('../../images/bgcolor.gif').'<br>';
// echo getFile('c:/hello/demo.rar').'<br>';


//--------------过滤
//邮件格式，电话格式。。


/* ubb
$ubbcodes=array(
	'/\[b\](.*?)\[\/b\]/i',
	'/\[u\](.*?)\[\/u\]/i',
	'/\[i\](.*?)\[\/i\]/i',
	'/\[color=(.*?)\](.*?)\[\/color\]/',
	'/\[size=(.*?)\](.*?)\[\/size\]/',
	'/\[align=(.*?)\](.*?)\[\/align\]/'
	);

$htmls=array(
	'<b>\1</b>',
	'<u>\1</u>',
	'<i>\1</i>',
	'<font color="\1">\2</font>',
	'<font size="\1">\2</font>',
	'<p align="\1">\2</p>'
	);

echo preg_replace($ubbcodes,$htmls,$str);
*/




/*
$a = urlencode(iconv("gb2312", "UTF-8", "电影"));	//等同于javascript encodeURI(“电影”);
$b = iconv("utf-8","gb2312",urldecode($a));			//等同于javascript decodeURI(“%E7%94%B5%E5%BD%B1″);

$data= urlencode('{"name":"<b>中文</b>"}');
echo $data= urldecode($data);
*/





//--------------------------------------
// authcode 加密，解密函数
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {// （明文、密文）（DECODE表示解密,其它表示加密）（密匙）（密文有效期）
	$ckey_length = 4;	// 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙
	$key = md5($key ? $key : $GLOBALS['auth_key']);	// 密匙
	$keya = md5(substr($key, 0, 16));	// 密匙a会参与加解密
	$keyb = md5(substr($key, 16, 16));	// 密匙b会用来做数据完整性验证
	$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';	// 密匙c用于变化生成的密文
	$cryptkey = $keya.md5($keya.$keyc);	// 参与运算的密匙
	$key_length = strlen($cryptkey);
	// 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性
	// 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确
	$string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
	$string_length = strlen($string);
	$result = '';
	$box = range(0, 255);
	$rndkey = array();
	for($i = 0; $i <= 255; $i++) {	// 产生密匙簿
		$rndkey[$i] = ord($cryptkey[$i % $key_length]);
	}
	for($j = $i = 0; $i < 256; $i++) {	// 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;
		$tmp = $box[$i];
		$box[$i] = $box[$j];
		$box[$j] = $tmp;
	}
	for($a = $j = $i = 0; $i < $string_length; $i++) {	// 核心加解密部分
		$a = ($a + 1) % 256;
		$j = ($j + $box[$a]) % 256;
		$tmp = $box[$a];
		$box[$a] = $box[$j];
		$box[$j] = $tmp;
		$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));		// 从密匙簿得出密匙进行异或，再转成字符
	}
	if($operation == 'DECODE') {
		// substr($result, 0, 10) == 0 验证数据有效性
		// substr($result, 0, 10) - time() > 0 验证数据有效性
		// substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16) 验证数据完整性
		// 验证数据有效性，请看未加密明文的格式
		if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
			return substr($result, 26);
		} else return '';
	} else {
		// 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因
		// 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码
		return $keyc.str_replace('=', '', base64_encode($result));
	}
}

	//echo $a=authcode('<b>aaaaaaaaaaaaaa</b>', 'ENCODE', 'asdf');
	//echo authcode($a, 'DECODE', 'asdf');
	//echo '<pre>';print_r($GLOBALS);echo '</pre>';

