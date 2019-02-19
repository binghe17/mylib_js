<?php


/* PHP重定向
方法一：header("Location:url地址");
方法二：echo "<scrīpt>window.location ="url地址";</scrīpt>";
方法三：echo "<meta http-equiv="Refresh" content="0;  url=url地址">"; 
 */



//获取URL中的源代码
function get_urlcode($url){
	$curl = curl_init(); 							// 初始化一个cURL对象
	curl_setopt($curl, CURLOPT_URL, $url);			// 设置您需要抓取的URL
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);	// 设置cURL参数，要求结果保存到字符串中还是输出到屏幕上
	$data = curl_exec($curl);						// 运行cURL，请求网页
	curl_close($curl);								// 关闭URL请求
	return $data;
}
// $ip_api1=get_urlcode('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ie=utf-8');//新浪api_ip
// $ip_api1=json_decode($ip_api1,1);
// $ip_api2=get_urlcode('http://pv.sohu.com/cityjson?ie=utf-8');	//搜狐api_ip
// $ip_api2=substr($ip_api2, strpos($ip_api2, '=')+2, -1);		//字符串截取
// $ip_api2=json_decode($ip_api2,1);
// $ip_api3=get_urlcode('http://ip.taobao.com/service/getIpInfo.php?ip=222.169.37.197');	//搜狐api_ip
// $ip_api3=json_decode($ip_api3,1);
// echo '<pre>';
// print_r($ip_api1);
// print_r($ip_api2);
// print_r($ip_api3);
// echo '</pre>';


//------------从浏览器发来的数据 编码，译码。

// $data= urlencode('{"name":"<b>中文</b>"}');
// echo $data= urldecode($data);

function js_encodeURI($data,$lang1='gb2312',$lang2='UTF-8'){
	$rs=iconv($lang1, $lang2, $data);
	return urlencode($rs);				//等同于javascript encodeURI(“电影”);
}
function js_decodeURI($data,$lang1='utf-8',$lang2='gb2312'){
	$rs=urldecode($data);
	return iconv($lang1,$lang2,$rs);	//等同于javascript decodeURI(“%E7%94%B5%E5%BD%B1″);
}


function get_toUTF($str,$lang1='gb2312',$lang2='utf-8'){//gb2312    euc-kr   utf-8
	return iconv($lang1,$lang2,$str);
}


//-----------------send
//이메일전송
function getSendMail($to,$from,$subject,$content,$html) 
{
	if ($html == 'TEXT') $content = nl2br(htmlspecialchars($content));
	$to_exp   = explode('|', $to);
	$from_exp = explode('|', $from);
	$To = $to_exp[1] ? "\"".$to_exp[1]."\" <$to_exp[0]>" : $to_exp[0];
	$Frm = $from_exp[1] ? "\"".$from_exp[1]."\" <$from_exp[0]>" : $from_exp[0];
	$Header = "From:$Frm\nReply-To:$frm\nX-Mailer:PHP/".phpversion();
	$Header.= "\nContent-Type:text/html;charset=UTF-8\r\n"; 
	return @mail($To,getUTFtoKR($subject),getUTFtoKR($content),$Header);
}

//---------------------curl


//-----------------curlput.php

//给一个接口put一个文件。
function curl($url,$data,$type='file',$method='post',$size='all'){
	if($type=='file'){
		if($size=='all')$size=filesize($data);
		$data=fopen($data,'r');		//提取路径中的数据。只做了 file可以写路径。其他直接传数据。
	}
	if($url == '') return ;
	switch ($type) {
		case 'xml':$header[] = "Content-type: text/xml";break;
		case 'json':$header[] = "Content-type: application/javascript";break;
		case 'file':$header[] = "Content-type: multipart/form-data";break;//文件上传
		case 'send':$header[] = "Content-type: application/x-www-form-urlencoded";break;//表单
		default:$header[] = "Content-type: text/html";
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	if($method == "post"){
		curl_setopt($ch, CURLOPT_PUT, 1);
		curl_setopt($ch, CURLOPT_INFILE, $data);
		curl_setopt($ch, CURLOPT_INFILESIZE,$size);
	}
	$response = curl_exec($ch);
	$info = curl_getinfo($ch);
	curl_close($ch);
	fclose($data);
	return $info;
}

// $resp=curl('http://localhost/atompond/_sys/upload_file.php', 'zhengli/bb.php', 'file', 'post');
// //sleep(3);//循环上传时，因为接口的频繁提交会造成服务器瞬时压力增大，所以用间隔3秒的方式来提交数据
// echo '<textarea style="width:500px;height:300px;">';
// print_r($resp);
// echo '</textarea>';



//---------------other


//路径未定义时默认路径。
//$url = $url ? $url : "home.php";

//JS方式跳转页面
//echo "<script type='text/javascript'> location.href='admin.php';</script>";


//路径合法过滤
// function parent_directory($path, $convert_backslashes = true) {
// 	if( strstr($path, '\\') ) $backslash = true;// 检测是否包含反斜杠
// 	$path = str_replace('\\', '/', $path);// 将反斜杠转换成正斜杠
// 	if( substr($path, strlen($path) - 1) != '/' ) $path .= '/';// 如果输入路径结尾包含斜杠，则自动加上
// 	$path = substr($path, 0, strlen($path) - 1);// 获取父路径
// 	$path = substr( $path, 0, strrpos($path, '/') ) . '/';
// 	if( !$convert_backslashes && $backslash ) $path = str_replace('/', '\\', $path);// 转换回反斜杠
// 	return $path;
// }
// echo parent_directory('http://192.168.1.107\CMS11.5/list.php?id=9');
// echo $_SERVER['DOCUMENT_ROOT'];
// echo parent_directory('\CMS11.5\list.php',0);//windows的路径规则



