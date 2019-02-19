<?php





//========================skin 皮肤相关函数

//----------------------html标签格式规则
//tag1 单标签(img,)
function tag1($arr){
	$rs='<{$tag}{$attr} />';
	$rs=str_replace('{$tag}', $arr['tag'], $rs );
	unset($arr['tag']);
	foreach ($arr as $k => $v) {
		$attr.=" $k=\"$v\""; //$attr.=' '.$k.'="'.$v.'"';
	}
	return str_replace('{$attr}', $attr, $rs );
}
//tag2 双标签(a,pl,li,)
function tag2($arr){
	$rs= '<{$tag}{$attr}>{$cont}</{$tag}>';
	$rs=str_replace('{$tag}', $arr['tag'], $rs );
	unset($arr['tag']);
	if(!$arr['cont']) unset($arr['cont']);
	else $rs=str_replace('{$cont}', $arr['cont'], $rs );
	unset($arr['cont']); 
	foreach ($arr as $k => $v) {
		$attr.=" $k=\"$v\""; //$attr.=' '.$k.'="'.$v.'"';
	}
	return str_replace('{$attr}', $attr, $rs );
}
// $_atom[0]=array('tag'=>'img', 'src'=>'/atompond/_sys/_lib/img/addButton.png','style'=>'border:1px solid #ccc;');
// $_atom[1]=array('tag'=>'a', 'href'=>'#','cont'=>'300');
// echo $_skin[0]=tag1($_atom[0]);
// echo $_skin[1]=tag2($_atom[1]);

//----------------------css格式规则
function css1($arr){
	$select=implode(', ', $arr['select']);
	foreach ($arr['item'] as $k => $v){ $item.=$k.': '.$v.'; '; }
	$rs='{$select} { {$item} }';
	$rs=str_replace('{$select}', $select, $rs);
	$rs=str_replace('{$item}', $item, $rs);
	return $rs;
}
//h1, h2, h3, h4, h5, h6 { font-style: normal; font-weight: normal; font-size: 100%;}
// $css1=array('select'=>array('h1','h2','h3','h4','h5','h6'),'item'=>array('font-size'=>'normal','font-weight'=>'normal','font-size'=>'100%'));
// echo css1($css1);





//----------------------js规则





//----------------------Apache规则
//httpd-vhosts.conf 配置虚拟主机
//httpd.conf 配置伪静态路径

//-------文件规则
//set.txt规则，json转码后保存的关联数组







//--------------------------------
// //做模板变量（字符串）
// $_atom['v'][2]=array('tag'=>'select', 'name'=>'name1');
// $_atom['v'][3]=array('tag'=>'option', 'value'=>'[:name]_[:num]', 'cont'=>'[:name][:num]');//生成模板

// //把什么放入哪里（模板放入模板中，变量放入模板中）
// p(get_listSkinVar($_atom['v'][2]));
// echo $_skin['v'][2]=tag2($_atom['v'][2]);//atom是从外部文件中获取到的数据。（如数据库，文件，cookie，get,post）
// echo $_skin['v'][3]=tag2($_atom['v'][3]);

// $_skin['v'][4]='<li>[:name]</li>';//手写模板
// $_skin['d'][4]=array('aaaa','bbbb','cccc');

// $_skin['l']=array('act'=>'link_d2v','v'=>'4','d'=>'4');

//把数组d中的所有数据按模板格式变成。
function link_d2v($d,$v,$w='[:name]'){
	varRW("_skin/d/$d");
	foreach ($_varRW as $val) {
		$v=str_replace($w, $val, $v);
	}
}
//link_d2v('4','4');

// <select name="cars">
// <option value="volvo">Volvo</option>
// <option value="saab">Saab</option>
// <option value="fiat">Fiat</option>
// <option value="audi">Audi</option>
// </select>













//===========================不重要=================================



//------------------------
//获取皮肤中的替换列表（皮肤名称）
function get_listSkinVar($skinName){
	preg_match_all('/\{\$(.*)\}/U',$skinName,$tplname);//{$bbb} -> tplname[0]=bbb
	preg_match_all('/\[:(.*)\]/U',$skinName,$varname);//[:aa] -> varname[0]=aa
	if($tplname[1]) $rs['tplname']=$tplname[1];
	if($varname[1]) $rs['varname']=$varname[1];
	return $rs;
}
// $_skin['str']='ajsdf{$a}xaa}kj{asd{$bbb}lkagasdj[:aa]fkl{$ccc}ajsdkfasdljfl';
// p(get_listSkinVar($_skin['str']));




//-----skin皮肤
/* *
 * SKIN方式1：从外层到内层，替换变量部分的方式做。
 * SKIN方式2：从内层到外层，包裹的方式做。
 */

//SKIN1: 把skin1放入到skin2皮肤中的那个区域?) AtoB
function read_skin_file($skin1, $skin2,$div){
	$skinA=file_get_contents('skin/'.$skin1.'.txt');
	if(!$GLOBALS['skinOK']) $GLOBALS['skinOK']=file_get_contents('skin/'.$skin2.'.txt');
	$GLOBALS['skinOK']= str_replace('{$'.$div.'}', $skinA, $GLOBALS['skinOK']);
}
// read_skin_file('head','html5','skin_a');
// read_skin_file('body','html5','skin_b');


//给全局SKIN替换变量
function val2skinOK($var,$rep){
	$GLOBALS['skinOK']= str_replace('{$'.$var.'}', $rep, $GLOBALS['skinOK']);
}
//val2skinOK('time',date('Y-m-d H:m:s',time()));




//------------------action 读写动作集

//从文件中获取数据（文件路径，文件类型）
function get_filedata($fileName,$type='json'){
	if($type=='json') json_decode(file_get_contents($fileName));
	return file_get_contents($fileName);
}
//从数据库中获取数据（）


//-----var变量
//读--把获取变量集合到哪个变量池里
function get_jsonFile($fileName, $type='json'){
	if(!$GLOBALS[$fileName]) $GLOBALS[$fileName]=file_get_contents('val/'.$fileName.'.txt');
	if($type=='json') $GLOBALS[$fileName]=json_decode($GLOBALS[$fileName]);

}
//get_jsonFile('arr');

//保存--把什么数组存到指定数据目录中。
function put_jsonFile($valName,$fileName){
	if(!$fileName) $fileName=$valName;
	file_put_contents('val/'.$fileName.'.txt',json_encode($GLOBALS[$valName]));
}
//put_jsonFile('arr');


//循环---数据填充到皮肤上。把全局变量中的指定数组，按顺序替换到指定皮肤的某个变量
function for1($arr, $skin,$div){
	if(!$GLOBALS['SkinTemp']) $GLOBALS['SkinTemp']=file_get_contents('skin/'.$skin.'.txt');
	foreach ($GLOBALS[$arr] as $v) {
		$GLOBALS['SkinOK'].= str_replace('{$'.$div.'}', $v, $GLOBALS['SkinTemp']);
	}	
}
// $arr=array('a','b','c');
// for1('arr','body','time');
// echo $GLOBALS['SkinOK'];


//数据填充到皮肤上。把全局变量中的指定数组，按名称依次填充到指定皮肤的变量。
function var2skin($datasName, $skinName){
	if(!$GLOBALS[$skinName]) $GLOBALS[$skinName]=file_get_contents('skin/'.$skinName.'.txt');
	foreach ($GLOBALS[$datasName] as $k => $v) {
		$GLOBALS[$skinName]= str_replace('{$'.$k.'}', $v, $GLOBALS[$skinName]);
	}	
}
//$arr2=array('time'=>'a','time2'=>'b','time3'=>'c');
//put_jsonFile('arr2');
// get_jsonFile('arr2');
// var2skin('arr2','body');
//echo $GLOBALS['SkinOK'];


//---------------

// //把数组转为字符串，模板格式
// function tpl_kv2($arr,$tpl){
// 	foreach ($arr as $k => $v) {
// 		$rs.=str_replace('{v}', $v, str_replace('{k}', $k, $tpl));
// 	}
// 	return $rs;
// }
// // echo tpl_kv2(array('k'=>'aaaa','v'=>'vvvv'),'[{k}---{v}]');








