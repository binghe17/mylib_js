<?php
header("Content-type:text/html;charset=utf-8");
runtime(1);	//开启运行时间
//---------------------------------------------
/*
	//合成SQL语句
	$sql = _sql('{
				connect:server1,
				server1:{
					host:localhost,
					id:root,
					pw:root
					dbname:kimsq,
				},
				sql:
					action:select,
					tbname:"rb_s_module as a"
				}');

	//连接数据库
	$rs=mysql('{
		connect:server1,

	}');

*/
//----------------------------------------------



		//创建表时用，格式化表的字段后反馈
		function _tb_field($name,$alt,$num=null,$notnull=null,$unsigned=0){
			$sql= $GLOBALS['mysql']['sql'];	//使用全局变量

			$rs= $name.' '.$alt;
			if($num!=null) $rs.= '('.$num.')';
			if($unsigned==1) $rs.=' unsigned ';

			if($notnull!='_auto_'){//auto_increment
				$rs.=" NOT NULL default '".$notnull."'" ; //非空 + 默认值
			}else $rs.=' NOT NULL auto_increment';//非空 + 自动递增

			return $rs;
		}
			// $mysql['sql']['tb_field'][]=_tb_field('uid','int',8,'_auto_',1);
			// $mysql['sql']['tb_field'][]=_tb_field('uid','int',8);
			// $mysql['sql']['tb_field'][]='uid mediumint(8)';
			//数值类型 http://www.5idev.com/p-php_mysql_data_types.shtml





		//implode增强版，（数组转字符串），之间连接部分添加逗号
		function implode1($arr,$type=1,$glue=','){	//type=1是值，type=0是键
			if($type==1) return implode($glue,$arr);
			$i=0; $countarr=count($arr);
			foreach ($arr as $k => $v) {
				if($i>0 and $i<$countarr) $rs.=$glue; //连接数组元素的字符
				if($type==0) $rs.=$k;				//增加专用 键 key,key2...
				if($type==2) $rs.="'".$v."'";		//增加专用 值 'val','val2'...
				if($type==3) $rs.=$k."='".$v."'";	//更新专用 建和值 key='val',key2='val2'...
				$i++;
			}
			return $rs;
		}
			//分隔函数$arr=explode(',', $str);//使用时给值trim()一下
			//$a=array('a'=>'aaa','b','c');
			//echo implode1($a);

	/*
	CREATE TABLE user (
		uid mediumint(8) unsigned NOT NULL auto_increment,
		username char(15) NOT NULL default '',
		password char(32) NOT NULL default '',
		email varchar(40) NOT NULL default '',
		regdate int(10) unsigned NOT NULL default '0',
		PRIMARY KEY (uid),
		UNIQUE KEY username (username),
		KEY email (email)
	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;



DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) DEFAULT NULL COMMENT '姓名',
  `age` tinyint(4) DEFAULT NULL COMMENT '年龄',
  `mate` tinyint(4) DEFAULT '1' COMMENT '有无配偶(1-有 0-无)',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_age` (`age`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;



SELECT * FROM user WHERE name = ‘starlee’
db.user.find({‘name’ : ‘starlee’})


	//修改表
	alter table t1 ADD height double FIRST;		//新增字段一个字段插入到第一个
	alter table t1 ADD height double B;			//新增字段一个字段插入到第一个
	alter table  t1 MODIFY sex char(3);			//修改类型，只能修改列的类型
	alter table  t1 CHANGE name username varchar(30); //修改类型，列名一起改。
	alter table t1 RENAME as users;	//修改表名
	alter table t1 DROP age; //删除列
	
	DROP TABLE IF EXISTS users; //如果存在 删除表
*/
/*
	select database();//当前使用中的数据库名
	select version();//5.5.9
	select user();	//用户root@localhost
	select inet_aton('192.168.1.1.1');
	select inet_ntoa(3232235777);
	select password('123456');//系统加密41个 *开头   （应用加密有MD5）

	*/

	//创建表 SQL （未完善）
	function _createTB($tbname,$field_alt,$primary_key=null,$unique_key=null,$key=null,$engine='InnoDB',$charset=null,$autoNum='0'){
		$rs = 'CREATE TABLE ';
		$rs.= $tbname.' (';
		$rs.= implode1($field_alt);
		if(isset($primary_key)) $rs.=', PRIMARY KEY ('.$primary_key.')';//主键
		if(isset($unique_key)) $rs.=', UNIQUE KEY '.$unique_key.' ('.$unique_key.')';//唯一性约束
		if(isset($key)) $rs.=',  KEY '.$key.' ('.$key.')';//索引
		$rs.= ' )';
		//_var($engine,'TYPE=INNODB')
		if(isset($engine)) $rs.=' ENGINE='.$engine.' ';
		if(isset($charset)) {
			_var($charset,'utf8');
			if($mysql['sql']['lang']) $charset=$mysql['sql']['lang'];
			$rs.=' DEFAULT CHARSET='.$charset.' ';
		}
		if(isset($autoNum)) $rs.=' AUTO_INCREMENT='.$autoNum;
		if(isset($engine) or isset($charset) or isset($autoNum) ) $rs.=';';
		return $rs;
	}
		 $mysql['sql']['tb_field'][]=_tb_field('uid','int',8);
		 echo _createTB('user1',$mysql['sql']['tb_field'],'asdf','asdf',2);
		// echo '<br>';



//$mysql['sql']['action']='select'; 		//必写，查询select，增加insert，修改update，删除delete
//$mysql['sql']['action']='createTB';		//新建数据库createDB, 新建表createTB
//$mysql['sql']['action']='dropTB';			//删除数据库dropDB, 删除表dropTB
//$mysql['sql']['action']='alterTB_add';	//增加字段alterTB_add，修改字段alterTB_change，删除字段alterTB_drop

	//$mysql['sql']['action']='showTBs';	//（待修改）（显示备注）
$mysql['sql']['dbname']	='kimsq';					//必写，数据库名
$mysql['sql']['tbname']	='rb_s_module as a';		//必写，表名 （原名 AS 别名）//设置别名后不能用原名指定，别名一般用在关联表上

//增加
// $mysql['sql']['action']='insert'; 	//新增insert，表中哪个字段
// $mysql['sql']['values']['name1']='val1';
// $mysql['sql']['values']['name2']='val2';
// $mysql['sql']['values']['key3']='value3';

//更新
// $mysql['sql']['action']='update'; //修改update，表中哪个字段
// $mysql['sql']['values']['name1']='val1';
// $mysql['sql']['values']['name2']='val2';
// $mysql['sql']['values']['key3']='value3';


// $mysql['sql2']['dbname']	='kimsq';					//必写，数据库名
// $mysql['sql2']['tbname']	='rb_s_module as b';		//必写，表名 （原名 AS 别名）//设置别名后不能用原名指定，别名一般用在关联表上
// $mysql['sql2']['action']='update'; //修改update，表中哪个字段
// $mysql['sql2']['values']['name1']='val1';
// $mysql['sql2']['values']['name2']='val2';





// $mysql['sql']['values']="email = 'xiaoming@163.com'";//更多用逗号分隔
// $mysql['sql']['where']="username = '小明'";

//删除
//$mysql['sql']['action']='delete'; //删除delete，表内规则行
//$mysql['sql']['where']="username = '小明'";

//查询
$mysql['sql']['action']='select'; //查询select
//$mysql['sql']['distinct']=1;						//去掉重复记录,(字段只写1个)
//$mysql['sql']['field']='name,id as adsf,tblnum,d_regis';	//显示字段 （原名 AS 别名）（表原名或别名.字段原名）

//$mysql['sql']['where']="id";						//条件  (可附加and or)

//$mysql['sql']['binary']= 1;						//区分大小写,二进制比较（like或notlike 一起使用）
//$mysql['sql']['notlike']= 'm%';					//搜索-不包含规则 % _ [ ] [^ ] [! ] 
//$mysql['sql']['like']= 'm%';						//搜索-包含规则  (可附加and or)（where一起使用）

//$mysql['sql']['between']= "'A' AND 'K'";			//范围内（where一起使用）
//$mysql['sql']['notbetween']= "'A' AND 'K'";		//不在范围内（where一起使用）
//$mysql['sql']['in']="'bbs','admin'";				//指定参数（where一起使用）
//$mysql['sql']['groupby']='tblnum,d_regis';		//对某个或某些字段查询分组，并返回重复记录的第一条。
//$mysql['sql']['orderby']='id DESC'; 				//字段正序asc, 倒序desc
//$mysql['sql']['limit']='all';						//输出几个(从第第三开始取五个2,5)，输出所有all

//关联表（横向连接）
//$mysql['sql']['joinTB_name']='rb_s_page as b';	//连接表名
//$mysql['sql']['joinTB_natural']=1;				//自然连接
//$mysql['sql']['joinTB_alt']='right'; 				//连接设置，左连接left, 右连接right，（默认，内连接不写时inner）(多表查询时指定表载入的顺序,从左往右的规则straight)
//$mysql['sql']['joinTB_field']='a.gid=b.uid';		//连接字段
//$mysql['sql']['field']='a.name,a.id,a.tblnum,a.d_regis,b.uid,b.category';	//显示字段 （原名 AS 别名）（表原名或别名.字段原名）
//$mysql['sql']['where']="a.id='admin'";			//条件  (可附加and or)


	//SQL组合函数
	function _sql(&$sql){
		if(!isset($sql)) return false;//没有SQL定义，跳出来。

		//查询
		if($sql['action']=='select'){
			
			_var($sql['field'],'*');	//设置字段默认值
			_var($sql['limit'],'10');	//设置输出默认值

			//开始合成
			$rs='SELECT ';
			if($sql['distinct']==1) $rs.=' DISTINCT ( ';
				$rs.=$sql['field'];
			if($sql['distinct']==1) $rs.=' ) ';
				$rs.=' FROM ' .$sql['tbname'];


			//横向连接 JOIN (单表连接)
			if( isset($sql['joinTB_name']) and isset($sql['joinTB_field'])){
				if($sql['joinTB_alt']!='straight' and $sql['joinTB_natural']==1 ) $rs.=' NATURAL '; //自然连接

				if($sql['joinTB_alt']=='left') $rs.=' LEFT JOIN ' .$sql['joinTB_name']; //左连接
				elseif($sql['joinTB_alt']=='right') $rs.=' RIGHT JOIN ' .$sql['joinTB_name']; //右连接
				elseif($sql['joinTB_alt']=='straight') $rs.=' STRAIGHT_JOIN ' .$sql['joinTB_name']; //连接规则
				else $rs.=' JOIN ' .$sql['joinTB_name']; //内连接
				//写连接的表名1个  默认，内连接（INNER JOIN 与 CROSS JOIN 可以省略 INNER 或 CROSS 关键字）
				if($sql['joinTB_natural']!=1 or $sql['joinTB_alt']=='straight'){
					$rs.=' ON '.$sql['joinTB_field'];
				} 
			}

			//附加特性
			if(isset($sql['where'])) $rs.=' WHERE ' .$sql['where'];			//判断

			if($sql['binary']==1 and ( isset($sql['notlike']) or isset($sql['like']) )) $binary=' BINARY ';//区分大小写
			if(isset($sql['notlike'])) $rs.=' NOT LIKE '.$binary ."'".$sql['notlike']."'";	//搜索-不包含规则
			elseif(isset($sql['like'])) $rs.=' LIKE '.$binary ."'".$sql['like']."'";		//搜索-包含规则 

			if(isset($sql['between'])) $rs.=' BETWEEN ' .$sql['between'];	//获取范围
			elseif(isset($sql['notbetween'])) $rs.=' NOT BETWEEN ' .$sql['notbetween'];	//获取范围
			if(isset($sql['in'])) $rs.=' IN (' .$sql['in'].' )';			//指定参数

			if(isset($sql['groupby'])) $rs.=' GROUP BY ' .$sql['groupby'];	//字段分组
			if(isset($sql['orderby'])) $rs.=' ORDER BY ' .$sql['orderby'];	//字段排序

			if(isset($sql['limit'])) {
				if($sql['limit']!='all') $rs.=' LIMIT ' .$sql['limit'];		//输出规则
			}
		}


		//增加
		if($sql['action']=='insert' and isset($sql['tbname']) and isset($sql['values'])){

			$rs='INSERT INTO '.$sql['tbname'];
			$rs.=' ( '.implode1($sql['values'],0).' )';
			$rs.=' VALUES ('.implode1($sql['values'],2).')';
		}
		//更新
		if($sql['action']=='update' and isset($sql['tbname']) and isset($sql['values'])){
			$rs='UPDATE '.$sql['tbname'].' SET ';
			$rs.=implode1($sql['values'],3);
			if($sql['where']) $rs.=' WHERE ' .$sql['where'];//有判断
		}
		//删除
		if($sql['action']=='delete' and isset($sql['tbname']) and isset($sql['where']) ){
			$rs='DELETE FROM '.$sql['tbname'].' WHERE ' .$sql['where'];//有判断
		}


		//创建
		if($sql['action']=='createDB' and isset($sql['dbname']) ){
			$rs='CREATE DATABASE '.$sql['dbname'];//创建库
		}
		if($sql['action']=='createTB' and isset($sql['tbname']) and isset($sql['tb_field']) ){
			$rs=_createTB($sql['tbname'],$sql['tb_field']);//创建表
		}
		//删除
		if($sql['action']=='dropDB' and isset($sql['dbname']) ){
			$rs='DROP DATABASE '.$sql['dbname'];//删除库
		}
		if($sql['action']=='dropTB' and isset($sql['tbname']) ){
			$rs='DROP TABLE '.$sql['tbname'];//删除表
		}
		//修改
		if($sql['action']=='alterTB_change' and isset($sql['field']) and isset($sql['tbname']) ){
			$rs='ALTER TABLE '.$sql['tbname'].' CHANGE '.$sql['field'].' '.$sql['tb_field'][0];//修改表，修改字段（1个）
		}
		if($sql['action']=='alterTB_add' and isset($sql['tbname']) ){
			$rs='ALTER TABLE ' .$sql['tbname']. ' ADD ' .$sql['tb_field'][0];//修改表，增加字段（1个）
			if(isset($sql['field'])) $rs.=' AFTER '.$sql['field'];//后面添加
		}
		if($sql['action']=='alterTB_drop' and isset($sql['field']) and isset($sql['tbname']) ){
			$rs='ALTER TABLE '.$sql['tbname'].' DROP '.$sql['field'];//修改表，删除字段（1个）
		}
		if($sql['action']=='alterTB_addindex' and isset($sql['index']) and isset($sql['tbname']) ){
			$rs='ALTER TABLE '.$sql['tbname'].' ADD INDEX ('.$sql['index'].')';//增加索引（1个）
		}
		if($sql['action']=='alterTB_change_index' and isset($sql['index']) and isset($sql['tbname']) and isset($sql['field']) ){
			isset($sql['index2']) ? $sql['index2'] : $sql['index2']=$sql['index'];
			$rs='ALTER TABLE '.$sql['tbname'].' DROP INDEX_TYPE '.$sql['index'].', ADD INDEX_TYPE '.$sql['index2'].'('.$sql['field'].')';//修改索引名及索引属性
		}
		if($sql['action']=='alterTB_rename' and isset($sql['tbname']) and isset($sql['tbname2']) ){
			$rs='RENAME TABLE '.$sql['tbname'].' TO '.$sql['tbname2'];// 重命名表（1个）
		}


		if($sql['action']=='showDB') $rs='SHOW DATABASES';	//显示共有多少个数据库show_dbs
		if($sql['action']=='showTB') $rs='SHOW TABLES';		//来查看有多少张表
		if($sql['action']=='showTB_num' and isset($sql['tbname'])) $rs=mysql_num_rows($sql['tbname']); //结果条数 mysql_num_rows();
		if($sql['action']=='showTB_num' and isset($sql['tbname'])) $rs=mysql_num_fields($sql['tbname']); //取字段总数  mysql_num_fields();



		//SELECT DATABASE();//查看当前所选择的数据库
		//DESCIRBE tableusers;//显示表的结构
		//SHOW TABLE STAT US \G;//检查这个表的信息
		//OPTIMIZE TABLE grade;//优化一张表

		//备注
		if($sql['action']=='showTB_bz' and isset($sql['tbname']) ) $rs='SHOW TABLE '.$sql['tbname'];//选中数据库中表的备注信息 //最后一列：Comment 就是表注释
		if($sql['action']=='showTB_bzs' and isset($sql['tbname']) ) $rs='SHOW FULL FIELDS FROM '.$sql['tbname'];//表中字段备注信息 //最后一列：Comment 就是字段注释

		return $rs;//sql组合输出
	}



//竖向关联表 UNION (多表连接，字段个数和类型要相同)
// $mysql['union']='sql,sql2';			//竖向连接，项目（竖向关联表的action必须是select）
// $mysql['union_alt']='all';			//竖向连接，全局all
// $mysql['union_plus']='LIMIT 3';		//竖向连接，全局设置项

// $mysql['sql2']['action']='select'; //查询
// $mysql['sql2']['dbname']='kimsq';					//必写，数据库名
// $mysql['sql2']['tbname']='rb_s_module as b';		//必写，表名 （原名 AS 别名）//设置别名后不能用原名指定，别名一般用在关联表上
// $mysql['sql2']['limit']='5';

// $mysql['sql3']['action']='select'; //查询
// $mysql['sql3']['dbname']='kimsq';					//必写，数据库名
// $mysql['sql3']['tbname']='rb_s_module as b';		//必写，表名 （原名 AS 别名）//设置别名后不能用原名指定，别名一般用在关联表上




	/*
	(SELECT aid,title FROM article) UNION ALL (SELECT bid,title FROM blog) ORDER BY aid DESC
	SELECT * FROM article WHERE uid IN(SELECT uid FROM user WHERE status=1)
	*/

	//竖向连接(连接并删除相同行)
	function _select_union($str){
		$n=explode(',', $str);
		for ($i=0; $i <count($n) ; $i++) { 
			if($i==0) $rs.='( ';
			$rs.= _sql($GLOBALS['mysql'][trim($n[$i])]).' ) ';
			if($i>=0 and $i<(count($n)-1)) {
				$rs.=' UNION ';
				if($GLOBALS['mysql']['union_alt']=='all') $rs.=' ALL ';
				$rs.='(';
			}
		}
		if($GLOBALS['mysql']['union_plus']) $rs.=$GLOBALS['mysql']['union_plus'];
		return $rs;
	}
		//if(isset($mysql['union'])) echo _select_union($mysql['union']);


//insert相关私有函数
function _insert_innodb_trans( $sql ) {
	$judge = 1;
	mysql_query('begin');
	foreach ($sql as $v) {
		if ( !mysql_query($v) ) $judge = 0;
	}
	if ($judge == 0) {
		mysql_query('rollback');
		return false;
	}
	elseif ($judge == 1) {
		mysql_query('commit');
		return true;
	}
}






//--------------------------------------------------------------------------------

/*
	$_dbhost='192.168.1.174';	//MySQL域名或IP地址
	$_dbuser='a0219131727';		//MySQL账号
	$_dbpass='5MvVAnSw95VzeR';	//MySQL密码
	$_dbname='a0219131727';		//MySQL表单
*/

//服务器配置
$mysql['connect']			='server1';		//连接的服务器名
$mysql['server1']['host']	='localhost';	//server1的主机名或IP
$mysql['server1']['id']		='root';		//server1的账号
$mysql['server1']['pw']		='root';		//server1的密码
//$mysql['server1']['lang']	='utf8';		//字符集，默认utf8,(中文gbk)
//$mysql['server1']['close']	='yes';			//使用完后关闭数据库yes

//数据库操作函数
function mysql1($sqlname=null,$srvname=null){
	$mysql=$GLOBALS['mysql'];						//获取全局变量
	if($srvname==null) $srvname=$mysql['connect'];	//服务器名
	$db = $mysql[$srvname];  						//使用服务器

	//选择几个SQL语句
	_var($sqlname,'sql');	//默认值
	//$sqlname='sql ,sql2';
	if(strpos($sqlname, ',')){
		$n=explode(',', $sqlname);
		for ($i=0; $i <count($n) ; $i++) { 
			$sqls[]= trim($n[$i]);
		}
	}else{ $sqls[]=trim($sqlname); }
	pre($sqls);

	//成型的SQL语句数组
	if(isset($mysql['union'])) $sqlok= _select_union($mysql['union']);//竖向合并表专用 查询用
	else {
		for ($i=0; $i <count($sqls) ; $i++) { 
			$sqlok[]= _sql($mysql[$sqls[$i]]);
		}
	}
	pre($sqlok);


//-------------------------------------------------------------------
/*
	//默认方式使用数据库
	//连接mysql
	$conn = @mysql_connect( $db['host'], $db['id'], $db['pw'] );
	if (!$conn)  die('连接数据库失败：'.mysql_error());

	mysql_select_db($mysql[$sqls[0]]['dbname'], $conn);						//使用数据库
	_var($mysql[$srvname]['lang'],'utf8'); mysql_query("SET NAMES '".$mysql[$srvname]['lang']."'");	//设置字符集(utf8,gkb)
	
	//执行SQL(获取数据结果)
	for ($i=0; $i <count($sqlok) ; $i++) { 
		$result[] = mysql_query($sqlok[$i]);
	}
	//pre($result);

	//查询时反馈数组
	if($mysql[$sqls[0]]['action']=='select'){
		$fetch_cfg=MYSQL_ASSOC;//1.默认两种MYSQL_BOTH   2.关联数组MYSQL_ASSOC    3.索引数组MYSQL_NUM
		for ($i=0; $i <count($result) ; $i++) { 
			while($row = mysql_fetch_array($result[$i],$fetch_cfg)){ $rs[$i][]=$row; }		//取出所有数组
		}
	}

	return $rs;	//反馈结果
	if($mysql[$srvname]['close']=='yes')  mysql_close($conn); //关闭数据库
*/
//-------------------------------------------------------------------

	//默认mysqli方式连接使用数据库 http://cn2.php.net/manual/zh/book.mysqli.php
	$conn = @mysqli_connect( $db['host'], $db['id'], $db['pw'], $mysql[$sqls[0]]['dbname'] );
	if (!$conn)  die('连接数据库失败：'.mysqli_connect_error());

	
	_var($mysql[$srvname]['lang'],'utf8'); mysqli_query($conn,"SET NAMES '".$mysql[$srvname]['lang']."'");	//设置字符集(utf8,gkb)
	
	//执行SQL(获取数据结果)
	for ($i=0; $i <count($sqlok) ; $i++) { 
		$result[] = mysqli_query($conn, $sqlok[$i]);
	}
	//pre($result);

	//查询时反馈数组
	if($mysql[$sqls[0]]['action']=='select'){
		$fetch_cfg=MYSQL_ASSOC;//1.默认两种MYSQL_BOTH   2.关联数组MYSQL_ASSOC    3.索引数组MYSQL_NUM
		for ($i=0; $i <count($result) ; $i++) { 
			while($row = mysqli_fetch_array($result[$i],$fetch_cfg)){ $rs[$i][]=$row; }		//取出所有数组
		}
	}

	return $rs;	//反馈结果


	if($mysql[$srvname]['free']=='yes')   mysqli_free_result($result);   //结束查询释放内存
	if($mysql[$srvname]['close']=='yes')  mysqli_close($conn); //关闭数据库

}


$rs=mysql1();//从数据库中获取数据





//------模版与输出--------------------------------------------------
function print_table($tb=0){
$rs=$GLOBALS['rs'];
print <<<css
<style>
	table { border-top:1px solid #ccc; border-left:1px solid #ccc;  }
	tr { border-right:1px solid #ccc; border-bottom:1px solid #ccc; padding:0 10px 0 10px; }
	td { border-right:1px solid #ccc; border-bottom:1px solid #ccc; }
</style>
<script type="text/javascript" src="../_class/jquery/jquery-1.8.2.min.js"></script>  
<script>
	//$(function(){

	//});
</script>
css;
	echo '<table border="0" cellspacing="0" cellpadding="0">';
	if($rs[$tb][0]) echo "\n<tr>". _foreach($rs[$tb][0],'<td>{k}</td>') ."</tr>\n";
	for ($i=0; $i <count($rs[$tb]) ; $i++) { 
		echo "\n<tr>". _foreach($rs[$tb][$i],'<td>{v}</td>') ."</tr>\n";
	}
	echo '</table>';
}

print_table(0);
print_table(1);

//-----------------------------------


pre($mysql);
pre($rs);




//pre($GLOBALS);
//-----------------------------------
echo runtime(2); //输出运行时间






//--------------------
//input use filter（待制作）
function htmtocode($content,$type) {
   $content = str_replace("\n", "<br>", str_replace(" ", "&nbsp;", $content));
   //htmlspecialchars(所要格式化对象,定义单双引号,编码)
   return $content;
}
//取得上一步 INSERT 操作产生的 ID,只对表有AUTO_INCREMENT ID的操作有效
function insert_id(){
	return ($id = mysql_insert_id($this->dblink)) >= 0 ? $id : $this->result($this->query("SELECT last_insert_id()"), 0);
}
// 获取数据库版本
function get_info(){
	echo mysql_get_server_info();
}
// 释放内存
function free_result(){
	if (@mysql_free_result($this->query_id))
		unset($this->result);
	$this->query_id = 0;
}
//分页 ($Page- 1) * $PageSize, $PageSize     //（当前页数 - 1 ）X 每页条数 ， 每页条数
/*
mysql_fetch_lengths ()： 取得结果集中每个输出的长度
mysql_field_name()： 取得结果中指定字段的字段名

mysql_num_rows()： 取得结果集中行的数目
mysql_num_fields()：取得结果集中字段的数目


parse_url() 是讲URL解析成有固定键值的数组的函数
$ua=parse_url("http://username:password@hostname/path?arg=value#anchor");
print_r($ua);
结果：

Array
(
	[scheme] => http
	[host] => hostname
	[user] => username
	[pass] => password
	[path] => /path
	[query] => arg=value
	[fragment] => anchor
)
*/


//-------------------------
/*
  function num_fields($query_id=-1){
		if ( $query_id!=-1 ) $this->query_id=$query_id;
		if ( !$this->query_id ) $this->showmsg("Invalid query id");

		return mysql_num_fields($this->query_id);
	}

	function list_tables($dbname=""){
    $dbname=$this->replace_prefix($dbname);
		$this->query_id = mysql_list_tables($dbname);
		return $this->query_id;
	}

  function list_fields($tbname=""){
    $tbname=$this->replace_prefix($tbname);
    return mysql_list_fields($this->dbname,$tbname);
  }
*/


