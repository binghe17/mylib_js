<?php



//复制变量
function arr_copy($from,$to){ _Gdata($to,_Gdata($from)); }
// //arr_copy('act1/a','_tmp');		//多个一次复制
// arr_copy('act1/a/6','_tmp/0');	//单个一个一个复制。可用在制作新的动作链条时用。
// arr_copy('act1/a/7','_tmp/1');


//生成索引数组（批量添加）
function str_arr1($str,$p=','){ return explode($p, $str); }
//生成关联数组（批量添加）
function str_arr2($str,$type=',:'){
	$s=str_split($type);
	$arr=explode($s[0], $str);
	foreach ($arr as $v) {
		$arr2=explode($s[1], $v);
		$rs[$arr2[0]]=$arr2[1];
	}
	return $rs;
}
// _Gdata('tt/3',array('a','b','c'));
// _Gdata('tt/4',str_arr1('a,b,c'));
// _Gdata('tt/5',str_arr2('a:1,b:2'));


//----------变量定位----（_Gdata代替这个功能）

//定位修改，变量位置 (真正的指针定位变量，可读写)(改_varRW这里的数据等同于改被引用的元数据)
function varRW($path,$reset=false,$def='_varRW'){
	if($reset) unset($GLOBALS[$def]);
	if(!$GLOBALS[$def] && $path) $GLOBALS[$def]=&$GLOBALS;
	$p=explode('/', rtrim(ltrim($path)));
	foreach ($p as $k => $v) {
		$v=trim($v);
		if($v) $GLOBALS[$def]=&$GLOBALS[$def][$v];//递归进入指定的变量位置上
	}
	return $GLOBALS[$def];
}
//$arr1=array('aaaa'=>array('1111','2222',array('cc'=>'3333','d'=>'4444')),'eeee'=>'5555','fffff'=>'6666','yyy'=>'888888','zzz'=>'999999');
//p(varRW('_SERVER',1,'vv'));
//p(varRW('_SERVER/HTTP_USER_AGENT',1,'mm'));
//arr_addstr('HTTP_USER_AGENT','=====',$vv);
//arr_delstr('HTTP_USER_AGENT',$vv);
// p(varRW('arr1/aaaa'));
// arr_addstr('=a=','=====',$_varRW);
// arr_addstr('=b=','=====',$_varRW);
// varRW('2');
// arr_addstr('==','=====',$_varRW);
// p($arr1);


//复制 把什么保存到哪里
function varVR($save='_varVR',$where='_varRW'){
	varRW($save,1,'_tmp1');
	varRW($where,1,'_tmp2');
	$GLOBALS['_tmp1']=$GLOBALS['_tmp2'];
	unset($GLOBALS['_tmp1']);
	unset($GLOBALS['_tmp2']);
}
//$arr=array('1'=>'a1','3'=>'a11','2'=>'A2','7'=>'2bbbb','a'=>'222aa');
// varRW('arr1/aaaa/2',1);
// varVR();
// p(arr_addstr('a','b',$_varVR));
//p(arr_addstr('a','b',$_COOKIE));


//------------添加与删除（只对数组里面的一个值进行处理）

//添加数据。给指定数组添加或替换一个字符串
function arr_addstr($k,$v,&$toArr){
	$toArr[$k]=$v;return $toArr;
}
//arr_addstr('a','b',$arr);
//arr_addstr('1','b',$arr);

//删除数据。从指定数组中删除一个字符串
function arr_delstr($k,&$toArr){
	unset($toArr[$k]);return $toArr;
}
//arr_delstr('1',$arr);


//-------
//添加数据。在数组的什么位置（前面/后面）
function arr_addstr2(&$arr,$str,$cfg='end'){
	if($cfg=='frist') return array_unshift($arr,$str);	//在数组开头插入一个或多个元素
	if($cfg=='end') return array_push($arr,$str);		//在数组末尾插入一个或多个元素（入栈）
}

//删除数据。在数组的什么位置（前面/后面）
function arr_delstr2(&$arr,$cfg='frist'){
	if($cfg=='frist') return array_shift($arr);		//删除数组中的第一个元素
	if($cfg=='end') return array_pop($arr);			//删除数组中的最后一个元素（出栈）
}
// $arr3=array('aa'=>'====1111','3'=>'===bb','ccc');
// arr_addstr2($arr3,'===');
// arr_delstr2($arr3);


//-----
//更名：只改键名，数据不变。
function arr_editkey($k,$k2,&$toArr){
	$tmp=$toArr[$k];
	$toArr[$k2]=$tmp;
	unset($toArr[$k]);
}
//arr_editkey('a','bbb',$arr);



//----------------数组替换（批量）


//数据归类，一维数据里的什么数据归类到哪里（变二维数组）
function arr_baoguo2($arr1,$arr2,$type=1){
	$karr2=array_keys($arr2); 
	if($karr2[0]===0) $arr1=array_values($arr1);//arr2为索引数组时把arr1的数据也变成索引
	foreach ($arr2 as $k => $v) {
		if($type==1) $rs[$v][$k]=$arr1[$k];
		else $rs[$v][]=$arr1[$k];
	}
	return $rs;
}
// $a1=array('a'=>'aaa','b'=>'bbb','c'=>'ccc',0=>'dddd');
// $a2=array('a'=>'bb','b'=>'bb',0=>'aa');//把数组$a1中的什么数据放入到哪里
// //$a2=array('aa','bb','bb');//把$a1中的数据依次放到这个组里
// $rs=arr_baoguo2($a1,$a2,0);


//数据归类，一维数据里的什么数据归类到哪里（变二维数组）
function arr_baoguo3($arr,$rstr,$type='/',$suo=0){
	if(strlen($type)==1){//索引
		$arr1=array_values($arr);
		$arr2=explode($type, $rstr);
		foreach ($arr2 as $k => $v) {
			$rs[$v][]=$arr1[$k];
		}
	}else{//关联 type为;=时按规则，0=aa;b=bb;c=bb
		$tt=str_split($type);
		$r1=explode($tt[0], $rstr);
		foreach ($r1 as $v) {
			$r2=explode(trim($tt[1]), $v);
			$r2[0]=trim($r2[0]);$r2[1]=trim($r2[1]);
			if($suo) $rs[$r2[1]][]=$arr[$r2[0]];
			else $rs[$r2[1]][$r2[0]]=$arr[$r2[0]];
		}
	}
	return $rs;
}
//$a1=array('aaa','b'=>'bbb','c'=>'ccc');
//$a2=arr_baoguo3($a1,'0:aa/b:bb/c:bb','/:');
//$a2=arr_baoguo3($a1,'0=aa;b=bb',';=');
//$a2=arr_baoguo3($a1,'aa/bb/bb');



//包裹：批量添加前缀。给数组里的所有键或值的前或后增加字符
function arr_baoguo(&$arr,$profix='',$who='key_left'){
	if($who=='key_left'){
		$ks=array_keys($arr);
		foreach ($ks as &$v) $v=$profix.$v;
		$arr=array_combine($ks,$arr);return;
	}elseif($who=='key_right'){
		$ks=array_keys($arr);
		foreach ($ks as &$v) $v=$v.$profix;
		$arr=array_combine($ks,$arr);return;
	}elseif($who=='val_left'){
		foreach ($arr as &$v) $v=$profix.$v;return;
	}elseif($who=='val_right'){
		foreach ($arr as &$v) $v=$v.$profix;return;
	}
}
//$arr4=array('aaaaxxx'=>'aaaxxxaa','bbxxbbb'=>'bbxxxxbb','cccxxxxcc'=>'xcccc');
//arr_baoguo($arr1,'<b>','val_left');
//arr_baoguo($arr1,'</b>','val_right');

// $t1=microtime();
// for ($i=0; $i < 5000 ; $i++) { 
// 	arr_baoguo($arr1,'=','key_left');//5000次0.275042     反转0.261494
// }
// p(microtime()-$t1);


//批量替换内容部分。修改数组键名或键值
function arr_xiugai($arr,$find,$replace,$who='val'){
	if($who=='val'){
		foreach ($arr as &$v) $v=str_replace($find,$replace,$v); return $arr;
	}
	if($who=='key'){
		foreach ($arr as $k => &$v) {
			if(substr_count($k, $find)>0){
				$tmp=$v;
				$k2=str_replace($find,$replace,$k);
				$arr[$k2]=$tmp;
				unset($arr[$k]);
			}
		}
		return $arr;
	}
}
//p(arr_xiugai($arr4,'xxx','====','key'));




//处理（大小写）
function arr_chuli(&$arr,$type='key',$cap=1){
	if($type=='key') {
		if($cap==0) return $arr=array_change_key_case($arr,CASE_LOWER);		//把键替换为全小写
		if($cap==1) return $arr=array_change_key_case($arr,CASE_UPPER);		//把键替换为小大写
	}
	if($type=='val') {
		if($cap==0)foreach ($arr as &$v) $v=strtolower($v);
		elseif($cap==1)foreach ($arr as &$v) $v=strtoupper($v);
		return $arr;
	}
}
//p(arr_chuli($arr1,'key',1));


//填充 把值替换给范围内的键值当中（有顺序的填充）
function arr_tiancong($start,$count,$val=null,&$who=null){
	if($val){
		$arr= array_fill($start,$count,$val);		//填充数量,从哪里到几个（数字m-）
		foreach ($arr as $k => $v) $who[$k]=$v; return $who;
	}
	else return range($start,$count);				//填充范围,从哪里到哪里（字母a-z或数字m-n）
}
	//p(arr_tiancong(3,2,'aaa',$arr));
	//p(arr_tiancong('20','35'));
	//p(arr_tiancong(5,10));
	//p(arr_tiancong('a','z'));



//填充 把值替换给某几个键值当中（无顺序的自定义填充）
function arr_tiancong2($str,$val=null,&$who=null){
	$arr=explode(',', $str);
	if($val){
		$arr=array_flip($arr);
		unset($arr['']);
		foreach ($arr as &$v) $v=$val;
		if($who) {
			foreach ($arr as $k => $v) $who[$k]=$v; return $who;
		}
	}
	return $arr;
}
//p(arr_tiancong2('t,b,c,2,3,,5,33','aaaa',$arr));
//p(arr_tiancong(3,5,'aaa'));


//填充 按数量来填充（不到个数时才填充数据）(正数时在后面填充，负数时在前面填充)，注意：键名会变
function arr_tiancong3($count,$str,&$who=null){
	if(!$who) $arr=array();
	return $who=array_pad($who,$count,$str);
}
//p(arr_tiancong3(10,'aaa',$arr));



//-------------合并与分割--------------

//合并 两个数组为一个数组（数组1，数组2。都是键值对）
function arr_hebing(&$arr1,$arr2,$type=0){
	if($type==0) {
		foreach ($arr2 as $k => $v) $arr1[$k]=$v;			//键名相同则替换（一位数组）
		return $arr1;
	}
	if($type==1) return array_merge_recursive($arr1,$arr2);	//键名相同则将多个相同键名的值递归成一个数组（变二维数组）
}
// $arr1=array('aa'=>'1111','3'=>'bb','ccc');
// $arr2=array('aa'=>'aaaaa');
// p(arr_hebing($arr1,$arr2));

//合并（对索引数组处理）(数组1当键名，数组2当键值)
function arr_hebing2($arr1,$arr2,$type=0){
	if($type==0) return array_combine($arr1,$arr2);	//合并为一维索引数组arr1[0]=arr2[0],arr1[1]=arr2[1],..
	if($type==1) return array_map(null,$arr1,$arr2);//合并为二维索引数组[0][0]为arr1的第一个值，[0][1]为arr2的第一个值
}

//分割（按单元个数分割）（一位数组变二维）
function arr_fenge($arr,$num){ 			//(数组，分割成几个)二维数组
	return array_chunk($arr,$num,1); 	//1时保持关联数组，0时变索引数组
}


//---------
//toString1 多维数组中的值合并成字符串，一层层的循环打印出来
function arr_oneStr(&$arr){
	if(is_array($arr)){
		foreach ($arr as $k => $v) {
			if(is_array($v)){
				arr_oneStr($v);
			}
			$rs.=$v;
		}
		return $arr=$rs;
	}
}
// $html['body'] = array("wang" => 18, "li" => 20, "zhang" => array("name" => "小张", "age" => 25, "xin" => array("name" => "asdf", "age" => 28)),array("name" => "asdf", "age" => 28));
// arr_oneStr($html['body']); 	//1820小张25asdf28asdf28





//-----------数组比较-------------------------

//比较（交集，差集）
function arr_bijiao($arr1,$arr2,$type2=1,$type='chaji'){
	if($type=='chaji'){		//差集数组
		if($type2==0) return array_diff_key($arr1,$arr2);		//比较键名，返回第一个数组中的差集数组
		if($type2==1) return array_diff($arr1,$arr2);			//比较值，返回第一个数组中的差集数组(arr1中返回不同的数据)
		if($type2==2) return array_diff_assoc($arr1,$arr2);		//比较键名和键值，返回第一个数组中的差集数组
	}
	if($type=='jiaoji'){	//交集数组
		if($type2==0) return array_intersect_key($arr1,$arr2);	//比较键名，返回第一个数组中的交集数组
		if($type2==1) return array_intersect($arr1,$arr2);		//比较值，返回第一个数组中的交集数组(arr1中返回不同的数据)
		if($type2==2) return array_intersect_assoc($arr1,$arr2);	//比较键名和键值，返回第一个数组中的交集数组
	}
}

//-----------筛选------------------
//查找包含的某个字符的数组
function arr_chazhao($arr,$zhao,$type='val'){
	if($type=='key'){
		foreach ($arr as $k=>$v) { if(substr_count($k, $zhao)) $rs[$k]=$arr[$k]; }
	}
	if($type=='val'){
		foreach ($arr as $k => $v) { if(substr_count($v, $zhao)) $rs[$k]=$arr[$k]; }
	}
	return $rs;
}
//p(arr_chazhao($_SERVER,'HTTP_','key'));

//获取部分（键或值）
function arr_huoqu($arr,$from_num=null,$count=null,$type='val'){
	if($type=='key') return array_keys($arr);
	if($type=='val') {
		if($from_num and $count) return array_slice($arr,$from_num,$count,1);//输出部分值，对索引的键（1保留键名，0不保留）
		if($count==null) return array_values($arr);		//输出所有值
	}
}

//随机 取出几个,返回键名
function arr_rand(&$arr,$count){
	return $arr=array_rand($arr,$count);
}

//唯一值。过滤掉重复的值
function arr_unique(&$arr){
	return $arr=array_unique($arr);
}


//-------------排序----------------------

function arr_paixu($arr,$type='val',$order='asc',$newnum=0,$ziran=1,$bscap=1){
	if($order=='asc') {			//asc正序排列（从低到高）
		if($type=='val'){
			if($newnum==0){
				if($ziran==1){
					if($bscap==0) natcasesort($arr);	//自然算法,0不区分大小写
					if($bscap==1) natsort($arr);		//自然算法,1区分大小写
				} else asort($arr);					//0时保持索引关系（默认val对值）
			}
			if($newnum==1) {
				if($ziran==0) sort($arr);			//1时不保持索引关系（默认val对值）
			}
		}
		if($type=='key'){
			if($newnum==0) ksort($arr);				//key对键排序
		}
	}
	if($order=='desc') {		//desc反序排列（从高到低）
		if($type=='val'){
			if($newnum==0) arsort($arr);			//0时保持索引关系（默认val对值）
			if($newnum==1) rsort($arr);				//1时不保持索引关系（默认val对值）
		}
		if($type=='key') krsort($arr);				//key对键排序
	}
	return $arr;
}

//$arr=array('1'=>'a1','3'=>'a11','2'=>'A2','7'=>'2bbbb','a'=>'222aa');
//p(arr_paixu($arr,'val','desc',1));


//顺序 打乱
function arr_daluan(&$arr){
	shuffle($arr);
	return $arr;
}
// p(arr_daluan($arr));

//顺序 翻转
function arr_fanzhuan(&$arr){
	return $arr＝array_reverse($arr);
}

//顺序 反转键值对
function arr_kv2vk(&$arr){
	return $arr=array_flip($arr);
}


//--------------etc-----------------------


//编号 (关联数组变索引数组。重新排位) 结果为索引数组0-n
function arr_numkey($arr){
	return array_merge($arr);
}

//统计（个数，出现次数）
function arr_tongji($arr,$type=0){
	if($type==0) return count($arr);				//统计数组总共有几个
	if($type==1) return array_count_values($arr);	//统计每个值所出现的次数
}
	// p(arr_tongji($arr));
	// p(arr_tongji($arr,1));



//布尔值
//is_array();	//判断是不是数组
//in_array();	//判断搜索值在数组中是否存在（值不能是部分）（查的字符串*，这个数组中*，判断类型）
//array_key_exists();	//判断搜索值在数组中是否存在（之不能时部分）（查的字符串*，这个数组中*）
//echo array_search('a11', $arr);//查找到值时返回键名	(只查找一个，不查找所有)


// array_keys($arr,'5',true);//写参数2时 返回键名  //参数3 符合类型的
// array_search('5',$arr,true);//同上


//==============================================================string

//字符串替换，过滤(非法关键字)
function str_tihuan(&$val,$old,$new,$delimiter='|'){
	if(!is_array($old)) $old=explode($delimiter,$old); 
	if(is_array($val)){
		foreach ($val as $k => $v) {
			if(is_array($v)) str_tihuan($v);
			else $val[$k]=str_replace($old,$new,$v);//替换原数据
		}
	}else $val=str_replace($old,$new,$val);//替换原数据
	return $val;
}
	// $str['a']='中文，你好。吗';
	// $str['b']='asdfjoiasdfjo';
	// str_tihuan($str,'a|aa|s','*');
	// print_r($str);
	// echo '<br>';


//字符串截取(字符串，开始字符，结束字符，开始从第几个，结束到第几个，类型)
function strPart($str,$fromStr=null,$toStr=null,$isStart=1,$isEnd=1,$type=0){
	//开始字符串 		//类型:0 默认(不包含)，1 前包含，2 后包含，3 全包含
	if($fromStr){
		$count_fromStr=substr_count($str, $fromStr);
		if($isStart<0) $isStart=$count_fromStr+$isStart+1;
		$str1=$str;
		for ($i=1; $i <= $isStart ; $i++) {
			$a=strpos($str1, $fromStr);
			$str1=substr($str1, $a+strlen($fromStr));
			$start_num=$a+$start_num+strlen($fromStr);
		}
	}
	//结束字符串
	if($toStr){
		$count_endStr=substr_count($str, $toStr);
		if($isEnd<0) $isEnd=$count_endStr+$isEnd+1;
		$str2=$str;
		for ($i=1; $i <= $isEnd ; $i++) {
			$b=strpos($str2, $toStr);
			$str2=substr($str2, $b+strlen($toStr));
			$end_num=$b+$end_num+strlen($toStr);
		}
	}
	$end_num=$end_num-$start_num-strlen($toStr);
	$str3=substr($str, $start_num, $end_num);
	if($type==1 or $type==3) $str3=$fromStr.$str3;
	if($type==2 or $type==3) $str3.=$toStr;	
	return $str3; //反馈
}

	//$str='AAAA||BBBBB||CCC||ddd||eee||ffffff||ggg|hh';
	//echo $str='$AAA[BbBB][CCccccC][ddddddd][eeeee][fff]ggg[hhh][iii]'; echo '<br>';
	//echo strPart($str,'[',']',-5,4);



//字符串截取(字符串，开始字符，结束字符，从第几个开始，到第几个，类型)
/* isEnd:0 => 默认（从前开始取这个字符），isEnd:1 => 从后开始这个字符
 * type:0 => 默认（全不包含），type:1 => 前包含，type:2=> 后包含，type:3=> 全包含 */
// function strPart2($str,$fromStr=null,$toStr=null,$isStart=1,$isEnd=1,$type=0){
// 	if($fromStr==null) return $str; //为空时执行这段并结束
// 		//先截断前面部分,
// 		$str1=$str;
// 		//if($isStart==0) $str1=substr($str1,0);
// 		if($isStart==-1) $str1=substr(strrchr($str1, $fromStr), strlen($fromStr));
// 		if($isStart>=1){
// 			for ($i=1; $i <= $isStart ; $i++) { 
// 				$str1=substr($str1, strpos($str1, $fromStr));
// 				if($isStart!=$i) $str1=substr($str1, strlen($fromStr));
// 				if($type==0 or $type==2) $str1=substr($str1, strlen($fromStr));
// 			}
// 		}

// 	if($toStr==null) return $str1; //为空时执行这段并结束
// 		//然后截断后面部分.
// 		$str2=$str1;
// 		if($isEnd==-1) $str3=substr($str2,0, strlen($str2)-strlen($toStr));
// 		if($isEnd==0) $str3=substr($str2, 0);
// 		if($isEnd>=1) $str3.=substr($str2, 0,strpos($str2, $toStr));
// 		if($isEnd>=2){
// 			for ($i=1; $i < $isEnd ; $i++) { 
// 				$str2=substr($str2, strpos($str2, $toStr)+strlen($toStr));
// 				$str3.=$toStr.substr($str2, 0,strpos($str2, $toStr));
// 			}
// 		}
// 		if($type==1 or $type==3) $str3=$fromStr.$str3;
// 		if($type==2 or $type==3) $str3.=$toStr;	
// 		return $str3; //反馈
// }

	// echo $str='AAA|BBB|CCC|ddd|eee|fff';
	// echo $str='$AAA[BbBB][CCccccC][ddddddd][eeeee][fff]ggg[hhh][iii]';
	// echo '<br>';
	// echo strPart2($str,'[','',2,1);
	// echo $str='<a>aaaa</a><b>bbb</b>';
	// echo '<br>';
	// echo strPart2($str,'<a>','</a>',0,0,0);





//-----------------etc






//============不用不好的函数================

// array_merge($arr1,$arr2);//合并替换数组（注意：索引数组会自动随机编号。关联数组正常）
// array_splice($arr1,$from_num,$count,$arr2);//只对索引数组处理
// $arr=array_flip($arr); //反转方式(内容相同则替换键名。反转了会数据丢失。则不推荐使用)


//-----------计算式用不到

// array_sum($arr);		//所有值的总和
// array_product($arr);	//数组中所有值的乘积

//---------回调函数------------（不好用，不如自己做函数定义来用）

// array_diff_uassoc() 通过用户提供的回调函数做索引检查来计算数组的差集。 5 
// array_diff_ukey() 用回调函数对键名比较计算数组的差集。 
// array_udiff() 用回调函数比较数据来计算数组的差集。 5 
// array_udiff_assoc() 带索引检查计算数组的差集，用回调函数比较数据。 5 
// array_udiff_uassoc() 带索引检查计算数组的差集，用回调函数比较数据和索引。 5 

// array_intersect_uassoc() 带索引检查计算数组的交集，用回调函数比较索引。 5 
// array_intersect_ukey() 用回调函数比较键名来计算数组的交集。 
// array_uintersect() 计算数组的交集，用回调函数比较数据。 5 
// array_uintersect_assoc() 带索引检查计算数组的交集，用回调函数比较数据。 5 
// array_uintersect_uassoc() 带索引检查计算数组的交集，用回调函数比较数据和索引。 


//回调 过滤（删除空白值，保留原始键名）
	// function myfunction($v) {
	// 	if($v) return true;
	// 	else return false;
	// }
	// $a=array(0=>"Dog",1=>"Cat",2=>"Horse");
	// print_r(array_filter($a,"myfunction"));

//回调 过滤
	// function myfunction($v) {
	// 	if ($v==="Horse"){
	// 		return true;
	// 	}
	// 	return false;
	// }
// $a=array(0=>"Dog",1=>"Cat",2=>"Horse");
// print_r(array_filter($a,"myfunction"));

//回调 替换
	// function myfunction($v) 
	// {
	// if ($v==="Dog")
	// 	{
	// 	return "Fido";
	// 	}
	// return $v;
	// }
	// $a=array("Horse","Dog","Cat");
	// print_r(array_map("myfunction",$a));

//回调 替换
	// function myfunction($v1,$v2) 
	// {
	// if ($v1===$v2)
	// 	{
	// 	return "same";
	// 	}
	// return "different";
	// }
	// $a1=array("Horse","Dog","Cat");
	// $a2=array("Cow","Dog","Rat");
	// print_r(array_map("myfunction",$a1,$a2));

//回调 输出为自定义格式的字符串
	// function myfunction($value,$key,$p) 
	// {
	// echo "$key $p $value<br />";
	// }
	// $a=array("a"=>"Cat","b"=>"Dog","c"=>"Horse");
	// array_walk($a,"myfunction","has the value");

//回调 输出为自定义格式的字符串
	// function myfunction($value,$key) 
	// {
	// echo "The key $key has the value $value<br />";
	// }
	// $a1=array("a"=>"Cat","b"=>"Dog");
	// $a2=array($a1,"1"=>"Bird","2"=>"Horse");
	// array_walk_recursive($a2,"myfunction");



//----------------指针定位获取数据，不能改原有数据。
/*
	$arr1=array('aaaa'=>array('1111','2222',array('cc'=>'3333','d'=>'4444')),'eeee'=>'5555','fffff'=>'6666','yyy'=>'888888','zzz'=>'999999');
	p(count($arr1));//获取数组里有几个单元变量
	p(array_keys($arr1));//获取数组的所有键名列表

	reset($arr1);//恢复为第一个  	//指针指向第一个元素
	p(key($arr1));//当前位置的键名
	p($aa=&current($arr1));//当前位置的键值
	$aa['xxds']='cccc';//无法对原arr1中改写。只能读取出数据而已。（不是真正的指针）

	next($arr1);//下一个（反馈下一个位置的键名）//指针移动到下一个元素的位置
	p(key($arr1));				//返回的是当前元素的键名
	p(current($arr1));			//返回的是当前元素的值 别名pos()

	end($arr1);//最后一个			//指针指向最后一个元素
	p(key($arr1));
	p(current($arr1));

	prev($arr1);//上一个  		//指针移动到上一个元素的位置
	p(key($arr1));
	p(current($arr1));
*/


//定位修改，变量位置 (真正的指针定位变量，可读写)------（可行方案备份zun制作）
// function varRW($path,$reset=false,$def='_varRW'){
// 	if($reset) unset($GLOBALS[$def]);
// 	if(!$GLOBALS[$def] && $path) $GLOBALS[$def]=&$GLOBALS;
// 	$p=explode('/', rtrim(ltrim($path)));
// 	foreach ($p as $k => $v) {
// 		$v=trim($v);
// 		if($v) $GLOBALS[$def]=&$GLOBALS[$def][$v];
// 	}
// 	return $GLOBALS[$def];
// }
// $arr1=array('aaaa'=>array('1111','2222',array('cc'=>'3333','d'=>'4444')),'eeee'=>'5555','fffff'=>'6666','yyy'=>'888888','zzz'=>'999999');
// p(varRW('_SERVER/SERVER_NAME',1,'vv'));
// p(varRW('_SERVER/HTTP_USER_AGENT',1,'mm'));
// p(varRW('arr1/aaaa'));
// arr_addstr('=a=','=====',$_varRW);
// arr_addstr('=b=','=====',$_varRW);
// varRW('2');
// arr_addstr('==','=====',$_varRW);
// p($arr1);



//============================================

//输出头（调试用）
// function p($val,$type=0){
// 	if(is_array($val)) {
// 		echo '<pre>';
// 		if($type==0) print_r($val);
// 		if($type==1) var_dump($val);
// 		if($type==2) var_export($val);
// 		echo '</pre>';
// 	}
// 	else echo $val;
// }


// echo '<br><textarea style="width:500px;height:300px;">';
// print_r(date('Y-m-d H:i:s',$_SERVER['REQUEST_TIME']))."\r\n";
// print_r($GLOBALS );	
// echo '</textarea>';


