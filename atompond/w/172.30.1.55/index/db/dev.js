

// $('html').ready(function(){});
$(function(){

	include('_sys/jslib/bootstrap/js/bootstrap.min.js');
	include('_sys/jslib/bootstrap/css/bootstrap.min.css');
	// include('_sys/jslib/jquery/jquery.json-2.4.js'); //引入各种插件
	// include('_sys/jslib/other/AdminLTE.css');

	//javascript:document.body.contentEditable='true'; document.designMode='on'; void 0
	//===============================================================
	//-------模拟插件
	// include('w/'+location.host+'/index/db/filebox.tpl');
	// include('w/'+location.host+'/index/db/filebox.js');
	//注意这里有独立的post请求。所以要在run.post.txt下加入一条动作序列[{"fun":"postphp","opt":"filebox"}]（多个时同上）
	//-------模拟插件
	// include('w/'+location.host+'/index/db/form1.tpl');
	// include('w/'+location.host+'/index/db/form1.js');
	//-------模拟插件
	// include('w/'+location.host+'/index/db/codebox.tpl');
	// include('w/'+location.host+'/index/db/varbox.js');
	// include('w/'+location.host+'/index/db/divxy.js');
	//-------模拟插件
	// include('w/'+location.host+'/index/db/test.js');
	// include('w/'+location.host+'/index/db/test2.js');
	// include('w/'+location.host+'/index/db/testcss.js');
	// include('w/'+location.host+'/index/db/huazhuang.js');
	// include('w/'+location.host+'/index/db/modal.js');
	// include('w/'+location.host+'/index/db/test4.js');//x
	// include('w/'+location.host+'/index/db/divpath.js');//x
	// include('w/'+location.host+'/index/db/test/m.js');
	//===============================================================






//================================================//标签模板，从界面执行动作序列
//自定义的含义标签(逻辑语言)自动转为系统默认HTML格式


	//----------------标签代表什么 2016.7.12
	// [tag模块]在dom里标签命名（声明语义这是什么），然后自动把逻辑语言tag替换成html机器语言tag
	// $('body').append('<where></where>');//单标签的追加认为是嵌套，所以自定义标签系统认为是双标签(跟内联标签span相同)
	// $('where').replaceWith("<b>Paragraph. </b>");//有tag就运行什么。//替换自己
	

	//把这个标签元件放入到那个标签元件中。（放入后删除pid属性）
	function m_box(){//把有pid属性的元素放入到指定的uid元素里面（属性uid和pid的关系）
		$('[pid]').each(function(){
			var pid=$(this).attr('pid');
			$(this).appendTo('#'+pid);
			$(this).removeAttr('pid');
		});
	}
	// $('body').append('\
	// 	<style type="text/css">\
	// 		#a{background: #ccc; padding: 10px;}\
	// 		#b{background: #aaa; padding: 10px;}\
	// 		#c{background: #3ae; padding: 10px;}\
	// 		#d{background: #777; padding: 10px;}\
	// 	</style>\
	// 	<div id="box">\
	// 		<div id="a"></div>\
	// 		<div id="b" pid="a"></div>\
	// 		<div id="c" pid="b"></div>\
	// 		<div id="d" pid="b"></div>\
	// 	</div>\
	// ');
	// m_box();//pid的元素放入uid的元素中（所有双标签都适用）m_box


	//逻辑占位标签替换为机器html标签(替换自身)
	function m_item(){//把item标签元素替换成dd值指向的数据池中的html内容（item标签的dd属性的关系）
		$('item[dd]').each(function(){
			var dd=$(this).attr('dd');
			$(this).replaceWith(_Gdata(dd));

		});
	}
	// $('body').append('\
	// 	<item pid="d" dd="imgs/img_1"></item>\
	// 	<item pid="d" dd="text/p_1"></item>\
	// ');
	// _Gdata('imgs/img_1','<img src="http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg" />');
	// _Gdata('text/p_1','<p>adsgasdfasdfads</p>');
	// m_box();m_item();




	//-------------数据填充到模板中，显示5个 2016.7.12

	//把数据填充到标签模板中（从第几条数据开始，循环输出几个）dd="{_Gdata()}" opt="0,5" 
	function m_dd2tpl(){//block_dd_opt
		var dom=$('[tplset]');//定位
		if(dom.length>0){
			var tpl=dom.html(); var rs='';
			var dd=_Gdata(dom.attr('dd'));//获取属性值
			var n=dom.attr('tplset').split(',');//获取属性值
			n[0]=Number(n[0])||Number(0);//从0条开始
			n[1]=Number(n[1])||Number(5);//显示2数(初始显示个数为5)
			if(n[0]<=dd.length){
				if((dd.length-n[0])<n[1]) n[1]=dd.length-n[0];
				var m=n[1]+n[0];
				for (var i = n[0]; i < m; i++) { 
					if(dd[i].length===undefined) rs+=obj2html(dd[i],tpl);
					else rs+=kv2html(dd[i],tpl);
				}
			}
			dom.html(rs);
			dom.removeAttr('dd');
			dom.removeAttr('tplset');
		}
	}
	// $('body').append('\
	// 	<div>\
	// 		<ol tplset="0,5" dd="uitest/dd"><li title="{k}">{v}</li></ol>\
	// 	</div>\
	// ');
	// _Gdata('uitest/dd',[{'k':'111','v':'aaa'},{'k':'2222','v':'bbb'},{'k':'333','v':'ccc'},{'k':'4444','v':'ddd'},{'k':'555','v':'eee'},{'k':'66','v':'fff'}]);
	// _Gdata('uitest/dd2',['aaa','bbb']);
	// m_dd2tpl();




	//--------循环结构 2016.7.15


				// hash: "#asdfasd/adsf"
				// host: "localhost"
				// hostname: "localhost"
				// href: "http://localhost/0906/_help/_js_study/maker/js_zcore3.php/asdfade/asdfa?asdf=afd#asdfasd/adsf"
				// origin: "http://localhost"
				// pathname: "/0906/_help/_js_study/maker/js_zcore3.php/asdfade/asdfa"
				// port: ""
				// protocol: "http:"
				// search: "?asdf=afd"

				//p(location.hash); //----------------用pathinfo时必加<base>标签
				//用pathinfo是要用基准位置标签,不然外部js文件等引入不了。<base href="/0906/_help/_js_study/maker/" />



	//只循环结构，不填充数据
	function m_loop(){
		var dom=$('[re]');//不能用loop属性。好像被别的什么程序占用过了loop属性。所以使用re
		if(dom.length==0) return ;
		dom.each(function(){
			var n=$(this).attr('re');
			var tpl=dom.html(); var rs='';
			for (var i = 0; i < n; i++){ rs+=tpl; }
			dom.html(rs);
		});
	}
	// $('body').append('<a href="'+location.pathname+'#aa/aa">锚标记</a>');
	// $('body').append('<div re="30"><br></div><a name="aa/aa"></a>');
	// m_loop();



	//------------------图片模块（地址和其他属性）2016.7.11



	//图片原件
	function m_reimg() {//block_img_item
		$('img[item]').each(function(){//图片模块 <img item="Gdata的图片路径" />
			var img=_Gdata($(this).attr('item'));
			for (var i in img) { $(this).attr(i,img[i]); } //强制刷入，
			$(this).removeAttr('item');
		});	
	}
	// $('body').append('\
	// 	<div id="imgs">\
	// 		<img item="img/1" />\
	// 		<img item="img/2" />\
	// 	</div>\
	// 	<button>js1</button>\
	// ');
	// _Gdata('img/1/src','http://img1.imgtn.bdimg.com/it/u=87592153,3152635440&fm=21&gp=0.jpg');
	// _Gdata('img/1/title','蜡笔小新1');
	// _Gdata('img/2/src','http://img0.imgtn.bdimg.com/it/u=3853020567,200874429&fm=21&gp=0.jpg');
	// _Gdata('img/2/title','蜡笔小新2');
	// if($('img[item]').length > 0) m_reimg();//刷新图片模块
	// $('button').click(function(){  //同样适用于：给后添加的标签元素增加事件
	// 	$('#imgs').append('<img item="img/err" />'); m_reimg();//动态添加后刷新来模拟事件委派
	// });


	//默认断链图片。
	function img_err(errimg){
		errimg=errimg||'img/err/src';
		$('img').each(function(){//对所有图片进行判断，图片断链了就显示出错图片。
			if($(this).attr('src')!==undefined){
				this.onerror=function(){this.onerror=null; return this.src=_Gdata(errimg);}
			}
		});
	}
	// _Gdata('img/err/src','http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg');
	// img_err();//断链图片进行提示图片。




	//----------------------------- 2016.7.13

	//用标签执行动作序列（当成使用函数）
	function m_act(){
		$('[act]').each(function(){
			var act=$(this).attr('act');
			$(this).remove();
			if(_Gdata('act/'+act)!==undefined) try_run('act/'+act); 
		});
	}
	// $('body').append('\
	// 	<div act="include/jquery_ui"></div>\
	// 	<div act="include/bootstrap"></div>\
	// 	<div act="showLog"></div>\
	// 	<div act="showCode"></div>\
	// ');
	// //动作链（相当于函数体）
	// _Gdata('act/showLog',[ //性能测试runtime
	// 	{"fun":"_Gdata","opt":['_TMP/a','JS执行时间：']},
	// 	{"fun":"_Gdata","opt":['_TMP/c','ms']},
	// 	{"fun":"run_fun","opt":['runtime','1','_TMP/b']},//为了加动态时间，要使用这么多行代码来实现这个功能 showLog('JS执行时间：' + runtime(1) +'ms');
	// 	{"fun":"dd_hebing","opt":['_TMP/a,_TMP/b,_TMP/c','_TMP/d']},
	// 	{'fun':'run_one','opt':{'fun':'showLog','opt':'_TMP/d','isvar':1}},
	// 	{'fun':'_Gdata','opt':['_TMP','*DEL*']}
	// ]);//showLog('JS执行时间：' + runtime(1) +'ms');//等同于这个
	// _Gdata('act/showCode',{'fun':'show_code'}); //show_code(); //显示源代码 
	// _Gdata('act/include',{
	// 	'jquery_ui':{'fun':'include','opt':'_sys/jslib/jquery/jquery-ui-1.11.4.min.js'},
	// 	'jquery_json':{'fun':'include','opt':'_sys/jslib/jquery/jquery.json-2.4.js'},
	// 	'bootstrap':[
	// 		{'fun':'include','opt':'_sys/jslib/bootstrap/js/bootstrap.min.js'},
	// 		{'fun':'include','opt':'_sys/jslib/bootstrap/css/bootstrap.min.css'}
	// 	],
	// 	'AdminLTE':{'fun':'include','opt':'_sys/jslib/AdminLTE.css'}
	// });
	// m_act();	//range_run('act/showCode'); 





//----------------------
	// p('show');
	// showLog('JS执行时间：' + runtime(1) +'ms');
});

