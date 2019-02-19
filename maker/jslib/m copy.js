
//加载结构后初始化运行一次
$(function(){


//===============================我的HTML自定义标签逻辑语言来做 (自动转为系统HTML格式) 



				// <atom>
				// 	<box uid="1"></box>
				// 	<box uid="2" pid="1"></box>
				// 	<box uid="3" pid="2"></box>
				// 	<box uid="4" pid="2"></box>

				// 	<item pid="4" dd="imgs/img_1"></item>
				// 	<item pid="4" dd="text/p_1"></item>
				// </atom>


	//----------------标签代表什么 2016.7.12

	//把有pid属性的元素放入到指定的uid元素里面（属性uid和pid的关系）
	function m_box(){//b_uid_pid
		$('[pid]').each(function(){
			var pid=$(this).attr('pid');
			$(this).appendTo('[uid='+pid+']');
			$(this).removeAttr('pid');
		});
	}
	// _Gdata('div/box1','<div class="row"></div>'); 
	// _Gdata('div/box2','<div class="col-xs-6 col-sm-3"></div>'); 
	// m_box();//pid的元素放入uid的元素中（所有双标签都适用）m_box


	//把item标签元素替换成dd值指向的数据池中的html内容（item标签的dd属性的关系）
	function m_item(){
		$('item[dd]').each(function(){
			var dd=$(this).attr('dd');
			 $(this).replaceWith(_Gdata(dd));

		});
	}
	//tag模块-----在dom里标签命名（声明语义这是什么），然后自动把逻辑语言tag替换成html机器语言tag
	// $('body').append('<where></where>');//单标签的追加认为是嵌套，所以自定义标签系统认为是双标签(跟内联标签span相同)
	// $('where').replaceWith("<b>Paragraph. </b>");//有tag就运行什么。//替换自己
	// _Gdata('imgs/img_1','<img src="http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg" />');
	// _Gdata('text/p_1','<p>adsgasdfasdfads</p>');
	// m_item();






	//-------------数据填充到模板中，显示5个 2016.7.12

			// <div>
			// 	<ol tplset="0,6" dd="uitest/dd"><li title="{k}">{v}</li></ol>
			// </div>


	//模板数据模块（从第几条数据开始，循环输出几个）dd="{_Gdata()}" opt="0,5" 
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
				for (var i = n[0]; i < m; i++) { rs+=tpl_obj(dd[i],tpl); }
			}
			dom.html(rs);
			dom.removeAttr('dd');
			dom.removeAttr('tplset');
		}
	}
	_Gdata('uitest/dd',[{'k':'111','v':'aaa'},{'k':'2222','v':'bbb'},{'k':'333','v':'ccc'},{'k':'4444','v':'ddd'},{'k':'555','v':'eee'}]);
	_Gdata('uitest/dd2',['aaa','bbb']);
	m_dd2tpl();



	//--------循环结构 2016.7.15
				// <a href="#aa/aa">不刷新当前页的锚标记</a>
				// <div re="20"><br></div>
				// <a name="aa/aa"></a>

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
		var dom=$('[re]');//不能用loop属性。好像被别的什么程序占用过了loop属性。
		if(dom.length==0) return ;
		dom.each(function(){
			var n=$(this).attr('re');
			var tpl=dom.html(); var rs='';
			for (var i = 0; i < n; i++){ rs+=tpl; }
			dom.html(rs);
		});
	}
	m_loop();



	//------------------图片模块（地址和其他属性）2016.7.11

	//默认断链图片。
	function img_err(errimg){
		errimg=errimg||'img/err/src';
		$('img').each(function(){//对所有图片进行判断，图片断链了就显示出错图片。
			if($(this).attr('src')!==undefined){
				this.onerror=function(){this.onerror=null; return this.src=_Gdata(errimg);}
			}
		});
	}
	_Gdata('img/err/src','http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg');
	img_err();//断链图片进行提示图片。



					// <div id="imgs">
					// 	<img item="img/1" />
					// 	<img item="img/2" />
					// </div>
					// <button>js1</button>


	//图片原件
	function m_reimg() {//block_img_item
		$('img[item]').each(function(){//图片模块 <img item="Gdata的图片路径" />
			var img=_Gdata($(this).attr('item'));
			for (var i in img) { $(this).attr(i,img[i]); } //强制刷入，
			$(this).removeAttr('item');
		});	
	}
	// _Gdata('img/1/src','http://img1.imgtn.bdimg.com/it/u=87592153,3152635440&fm=21&gp=0.jpg');
	// _Gdata('img/1/title','蜡笔小新1');
	// _Gdata('img/2/src','http://img0.imgtn.bdimg.com/it/u=3853020567,200874429&fm=21&gp=0.jpg');
	// _Gdata('img/2/title','蜡笔小新2');
	// if($('img[item]').length > 0) m_reimg();//刷新图片模块

	// $('button').click(function(){
	// 	$('#imgs').append('<img item="img/err" />'); m_reimg();//动态添加后刷新来模拟事件委派
	// })






	//----------------------------- 2016.7.13

					// <div act="inc/jquery_ui"></div>
					// <div act="inc/bootstrap"></div>
					// <div act="showLog"></div>
					// <div act="showCode"></div>

	//运行链条
	function m_act(){
		$('[act]').each(function(){
			var act=$(this).attr('act');
			run_start('act/'+act); 
			$(this).remove();
		});
	}

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
	// _Gdata('act/inc',{
	// 	'jquery_ui':{'fun':'add_inc','opt':'jslib/jquery/jquery-ui-1.11.4.min.js'},
	// 	'jquery_json':{'fun':'add_inc','opt':'jslib/jquery/jquery.json-2.4.js'},
	// 	'bootstrap':[
	// 		{'fun':'add_inc','opt':'jslib/bootstrap/js/bootstrap.min.js'},
	// 		{'fun':'add_inc','opt':'jslib/bootstrap/css/bootstrap.min.css'}
	// 	],
	// 	'AdminLTE':{'fun':'add_inc','opt':'jslib/AdminLTE.css'}
	// });
	// m_act();	//run_start('act/showCode'); 






//----------------------显示_Gdata的变量。2016.7.14




	function GdataList(dom){
		if(dom){
			var dd=Object.keys(_G);
			if(var_count(dd)===0) var tpl='<li>空</li>\n';
			else var tpl='<li>{v}</li>\n';
			var rs=tpl_kv(dd,tpl);
			$(dom).html(rs)
		}
	}
	// _Gdata('tpl/css/bg1','background:#ccc;');//css模板 定义样式
	// _Gdata('tpl/css/bg2','background:#c8c;');
	// _Gdata('tpl/css/b1','background:yellow; width:300px;');//border:1px solid #ccc;
	// _Gdata('l/style',{'li':'bg1','li':'bg2'});//css使用（给什么DOM 加什么样式）
	// GdataList('#devlist');

	// $('#devlist').css({'list-style-type':'none','padding':0});
	// $('li').css(css2arr(_Gdata('tpl/css/b1')));
	// $('li').css(css2arr(_Gdata('tpl/css/bg2')));




//-----------------div坐标 和 div选择器 2016.7.15 （待修正。测试版，真是项目中用，创建和选择语义标签的方式定位选择器）
	//获取DIV的X，Y坐标
	function div_xy(elementId){ 
		var ua = navigator.userAgent.toLowerCase(); 
		var isOpera = (ua.indexOf('opera') != -1); 
		var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof 
		var el = document.querySelector(elementId); 
		if (el.parentNode === null || el.style.display == 'none') return false;
		var parent = null; 
		var pos = []; 
		var box; 
		if (el.getBoundingClientRect){ //IE 
			box = el.getBoundingClientRect(); 
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop); 
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
			return { x: box.left + scrollLeft,  y: box.top + scrollTop }; 
		}else if(document.getBoxObjectFor) { // gecko 
			box = document.getBoxObjectFor(el); 
			var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0; 
			var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0; 
			pos = [box.x - borderLeft, box.y - borderTop]; 
		}else{ // safari & opera 
			pos = [el.offsetLeft, el.offsetTop]; 
			parent = el.offsetParent; 
			if (parent != el) { 
				while (parent) { 
					pos[0] += parent.offsetLeft; 
					pos[1] += parent.offsetTop; 
					parent = parent.offsetParent; 
				} 
			}
			if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')){ 
				pos[0] -= document.body.offsetLeft; 
				pos[1] -= document.body.offsetTop; 
			} 
		} 
		if (el.parentNode) parent = el.parentNode;
		else parent = null; 
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors 
			pos[0] -= parent.scrollLeft; 
			pos[1] -= parent.scrollTop; 
			if (parent.parentNode) parent = parent.parentNode;
			else parent = null; 
		} 
		return { x: pos[0], y: pos[1] }; 
	} 
	// var dp = div_xy("#devlist");
	// alert(dp.x +'x'+ dp.y);

	//鼠标单击DOM时现实坐标和显示选择器路径
	function div_path(type){//---------待修复
		$('body *').click(function(e){
			// var class1=$(this).attr('class');
			// if(class1===undefined) var rs=this.tagName; else var rs='.'+class1;//好几个时怎么选择
			var id1=$(this).attr('id');
			if(id1===undefined) var rs=this.tagName; else var rs='#'+id1; 

			if(_Gdata('divpath')===undefined){
				if(type===undefined){
					alert($(this).siblings().length)// 
					// alert($(this).children().length)
					// alert($(this).index());
				} 				
				_Gdata('divpath','');
			}
			_Gdata('divpath',rs+' '+_Gdata('divpath'));
			// p(e)
			if(id1!==undefined ||this.parentNode.tagName==='BODY' ){
			// if(this.parentNode.tagName==='BODY' ) { 
				e.stopPropagation();				//不冒泡
				var rs=_Gdata('divpath');			//div path
				var dp = div_xy(_Gdata('divpath'));	//div x,y
				console.log(rs,dp.x,dp.y);
				_Gdata('divpath','*DEL*');
				return rs;
			}
		});		
	}
	// div_path();

	//鼠标移动到DOM时显示dom信息
	function div_mouseMove(){
		$('body *').mouseenter(function(e){
			var dom=$(this);
			var s=dom.css("background");
			dom.css("background","yellow");
			// $('#tagpath').text($(this).html());
			$('#tagpath').text('this.tagName: '+this.tagName+", mouse X: " + e.offsetX + ", mouse Y: " + e.offsetY);
			$('#tagpath').css({'left':e.offsetX+'px','top':e.offsetY+'px'}).css('display','');
			// p(e); //p(this.parentNode.tagName);
			$('#tagpath').insertAfter(this);
			e.stopPropagation();//不冒泡

			$(this).mouseleave(function(e){
				$(this).css("background",s);
				$('#tagpath').css('display','none');
				e.stopPropagation();//不冒泡
			});	
		});
	}
	// $('body').append('<div id="tagpath" style="display:none;padding:0px;position: relative; top:10px; left:300px;width:300px;height:50px;background:#ccc;"></div><div id="tagpath2"></div>');
	// div_mouseMove();





	// a:link		{color:blue;}		/*未被访问的链接,所有a标签默认样式*/
	// *:hover		{color:red;}		/*鼠标悬空时*/
	// *:active		{color:yellow;}		/*鼠标点击之后*/
	// *:visited	{color:#ff7f24;}	/*已访问过的链接,(点击过的)*/






	//--------------------------系统层 2016.7.14

	//action 模块
	//选择动作库（定义）在客户端中运行的动作集合。（从共用动作集中调用。和私用动作集中调用。都是调用。私用动作集保存在站点路径下）
	_Gdata('jslib/m',{//m 机器语言库(jslib客户端机器语言方法库，phplib服务端机器语言方法库)
		'str':{},//str类型数据操作。增删改
		'arr':{},//arr类型数据操作。增删改
		'dom':{},//dom类型数据操作。移动层级关系，加事件
		'act':{},//对操作动作链条的函数。当什么触发什么事件时运行。当条件为真时，计时延后执行（几秒后执行），（几秒后）循环执行。立即执行
		'url':{},//地址数据
		'inc':{},//外部数据
	});

	//使用动作库 操作器（选择操作对象，操作什么）
	//选择： str类型（arr类型，dir类型，url类型，dom类型,inc外部数据,act动作链）/立即执行，几秒后执行，几秒循环执行/增删改
	//机器语言动作库，分类规则：在哪里运行（在客户端js运行，在服务器php运行）/操作对象类型/操作名（增删改）


	//1.页面加载的时候预定义的动作
	//每个选择对象的格式： dom/event/action    对什么标签，点击时，做什么

	//2.用户操作时时执行的动作。



	//使用级别=============================(w/*和 g/*一样。区别在于，一个只限当前网页，g为共享数据)

	//全局设置setting==== 放到哪里。setting文件
	_Gdata('w/setting',{		//全局设置。整站设置。
		'file_suffix':'.txt', 	//文件后缀名 .txt
		'pw_type':'md5_1',		//加密方式。默认方式。md5_1
		'lang':'zh-cn',			//是否开启语言包
		'lang_use':0			//0不使用，1使用

	});

	//翻译language======== 放到哪里。lang文件夹，zh-cn语言包文件，变量位置。
	_Gdata('w/lang',{			//多国语言化 （获取当前网站相关的私用语言包）（可以引用公用语言包）（私用》公用》原有）
		'zh-cn':{
			'a/b/c':'11111' 	//变量翻译
		}
	});




	//---------网页布局数据（引入ui界面池）w 当前页面要用到的所有数据 （UI界面，输入输出事件定义，用户数据）
	_Gdata('w/ui',{//当前页面所用到的所有资源
		'div':{},//布局原件（排版，样式）
		'item':{},//显示与输入原件
	});
	//动作库（act动作链条）可以成为函数定义，也可以成为函数使用
	_Gdata('w/act2',{//逻辑语言 act类型的使用
		//'mind1':[{'in':'','act':'','out'}] //run_start2 执行一组动作
	});
	_Gdata('w/act',{//机器语言
		//'actname1':[{'fun':'','opt':''}] //run_start 执行一组动作
	});
	_Gdata('w/userdata',{//用户产生的数据。以前保存过的数据获取。（用户输入信息，上传图片信息等）

	});

	//--------运行
	_Gdata('run',{
		'start':['act/a1'], //程序从这里开始
		'thispage':[]
	});

	//------url
	_Gdata('url/thispage',{

	});




	//------php的流水线，在到 js的流水线
	//访问网站的地址。单页中连接其他页的地址池，图片池。引入JS模块等文件池
	//当前页所用到的。图片。文字。布局。影音。固定结构与可变数据的分离。






	//-------外部文件中获取数据
	//js中运行的数据都放在JS目录下，php... //要用到哪个功能时从指定的哪个文件夹的那个文件中获取所需的数据。
	//[文件夹]，[文件]，[变量第一位，第二位]，(格式自定，格式固定) 定义变量名和输入框模板选择。保存。异步获取。
	//文件夹LIST规则



	//================================跟服务器通信 2016.7.16

	//保存文件，读取文件
	function act_file(act,fun,url){ //1'act':'save_file或get_file',   2'filename', 3'savedata'
		//alert(basename(location.pathname))
		url=url||'js_zcore3.php/post';
		if(act===undefined) return false;
		if(typeof act==='string') act=_Gdata(act);
		if(fun===undefined) return $.post(url, act);
		else return $.post(url, act, fun);
	}
	// $("body").append('<div id="loadtest"></div>');
	// $('#loadtest').load("js_zcore3.php/post",{'act':'loadfile'});

	$('#savebox button:contains("save")').click(function(){
		_Gdata('ajax_save',{'act':'save_file','filename':$('#filename').val(), 'savedata': $('#savedata').val() });
		act_file('ajax_save', function(data){
			if(data==='ok') alert('保存成功');else alert('保存失败');
		}); //act_file('ajax_save');
	});
	$('#savebox button:contains("read")').click(function(){
		_Gdata('ajax_get',{'act':'get_file','filename':$('#filename').val()});
		act_file('ajax_get',function(data){
			$('#savedata').val(data);
			// $('body').append('<textarea style="width:90%;height:500px;">\n'+data+'\n</textarea>\n');
			// if('undefined'==typeof _G) _G={};
			// _G=json_decode(data);
			// run_start('ACT/_start');
		});
	});

	$('#savebox button:contains("list")').click(function(){
		_Gdata('ajax_get',{'act':'get_filelist','filename':$('#filename').val()});
		act_file('ajax_get',function(data){
			$('#savedata').val(data);
			//alert(tpl_kv(json_decode(data),'<li>{v}</li>'));
			$('#filelist ul').html(tpl_kv(json_decode(data),'<li>{v}</li>'));
			$('#filelist li').click(function(e) {
				$('#filename').val($(this).text());
			})
			// $('body').append('<textarea style="width:90%;height:500px;">\n'+data+'\n</textarea>\n');
			// if('undefined'==typeof _G) _G={};
			// _G=json_decode(data);
			// run_start('ACT/_start');
		});
	});

 
	//------------------html 2016.7.13

	//做什么的类别中都放在一起 (html标签结构的)（css结构的放在一起）
	_Gdata('html/style/tpl','<style type="text/css">{css}</style>');//head标签里放入的style标签模板
	_Gdata('html/style_p/tpl','<style type="text/css" media="print">{css}</style>');
	_Gdata('html/style_m',{
		'tpl':'<style type="text/css" media="{m}">{css}</style>',
		'opt':[ //m参数 			//<style type="text/css" media="screen,projection"> 
			'screen',			//计算机屏幕（默认值）。screen普通样式
			'print',			//打印预览模式 / 打印页。print
			// 'tty',			//电传打字机以及使用等宽字符网格的类似媒介。
			// 'tv',			//电视类型设备（低分辨率、有限的屏幕翻滚能力）。
			// 'projection',	//放映机。
			// 'handheld',		//手持设备（小屏幕、有限的带宽）。
			// 'braille',		//盲人用点字法反馈设备。
			// 'aural',			//语音合成器。
			// 'all'			//适合所有设备。
		]
	});

	_Gdata('css/tpl_r','{k}:{v};');//样式的右端格式。替换合成多个样式属性
	_Gdata('css/tpl_l','{xuanzeqi} \{ {cssyangshi} \}');//样式的右端格式。替换选择器和具体样式属性占位符






//------------------------
// showLog(get_G('_G'));
// p();//调试器。查看全局变量

});
