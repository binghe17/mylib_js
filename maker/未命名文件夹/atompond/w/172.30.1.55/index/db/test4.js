
//给数组自身字符串修改格式。
function arr2tpl2(who,tpl,save){
	if(typeof who==='string') arr=_Gdata(who);
	if(save!==undefined){ who=save; }
	if(typeof arr==='string') { _Gdata(who, tpl.replace(/\{v\}/g,arr)); }
	else { for (var i in arr) { var a=tpl.replace(/\{k\}/g,i); var b=a.replace(/\{v\}/g,arr[i]); _Gdata(who, b); }  }
}



//UI界面/部分/
_Gdata('UI/item',{//id元素唯一值，html标签，css加样式,js加动画
	'H001':{'tag':'button','css':['btn','btn-default'],'js':[''],'attr':{'type':'submit'},'cont':'按钮'},
	'H002':{'tag':'p','cont':'aasdfsf'},//创建元素item
	'H004':{'tag':'img','attr':{'src':'/atompond/_sys/_lib/img/addButton.png','style':'border:1px solid #ccc;'}},
	'H005':{'tag':'a','attr':{'href':'#'},'cont':300},
	'div1':{'tag':'div','attr':{'style':'background:#ccc;'},'cont':'{H001}aaa{H002}'}//创建布局div

});
_Gdata('UI/_run',{//把什么元素放入哪个元素中
	'run1':[['H001','div1'],['H002','div1']]
});



$('body').append('\
	<div style="width:400px;">\
		<div id="ui_edit" style="background:#ccc;">\
			<div><input type="text" name="who" placeholder="who Name" title="input who name" /></div>\
			<div><input type="text" name="fun" placeholder="fun Name" title="input fun name"/></div>\
			<div><input type="text" name="opt[0]" placeholder="opt[0] Name" title="input opt[0] name"/><input type="checkbox" name="isvar[0]" title="isvar[0]"></div>\
			<div><input type="text" name="opt[1]" placeholder="opt[1] Name" title="input opt[1] name"/><input type="checkbox" name="isvar[1]" title="isvar[1]"></div>\
			<div><input type="text" name="opt[2]" placeholder="opt[2] Name" title="input opt[2] name"/><input type="checkbox" name="isvar[2]" title="isvar[2]"></div>\
			<div><input type="text" name="opt[3]" placeholder="opt[3] Name" title="input opt[3] name"/><input type="checkbox" name="isvar[3]" title="isvar[3]"></div>\
			<div><input type="text" name="opt[4]" placeholder="opt[4] Name" title="input opt[4] name"/><input type="checkbox" name="isvar[4]" title="isvar[4]"></div>\
			<div><input type="text" name="save" placeholder="save Name" title="input save name"/></div>\
			<button id="s1">save1</button><button id="s2">save2</button>\
		</div>\
	</div>\
	<div class="row">\
	  <div class="col-md-4" id="var_list" style="background:#ccc;">\
			<div id="xx">没有找到变量</div>\
			<ol>\
				<li><span>1</span>aaa</li>\
				<li><span>1</span>aaa</li>\
			</ol>\
	  </div>\
	  <div class="col-md-6" id="var_set" style="background:#bbb;">\
			<input type="text" name="var_name" placeholder="var Name" title="input var name" >\
			<button>添加字符串</button>\
	  </div>\
	</div>\
');


	//---------动态层级结构
	_Gdata('ACT/dom1',[
		{"fun":"new_node","opt":['aaa','tag','span']},				// new_node('aaa','tag','span'); 		//alert(temp['aaa'].tagName);		//新建DOM
		{"fun":"new_node","opt":['aaa','text','eeeeeee']},			// new_node('aaa','text','eeeeeee');	//alert(temp['aaa'].innerHTML);		//加文本
		{"fun":"new_node","opt":['aaa','title','aaa']},				// new_node('aaa','title','aaa');		//alert(temp['aaa'].title);			//加属性
		{"fun":"new_node","opt":['aaa','onclick','showLog("aaa")']},// new_node('aaa','onclick','showLog("aaa")');//单击事件 运行函数
		{"fun":"new_node","opt":['aaa','style','color:red;']},		// new_node('aaa','style','color:red;');
		{"fun":"new_node","opt":['aaa','id','game']},				// new_node('aaa','id','game');
		{"fun":"save_node","opt":['aaa','#c']}						// save_node('aaa','#c');//把新建的DOM给谁
	]);
	// run_more('ACT/dom1');
	

	
	_Gdata('ACT/dom2',[
		// {"fun":"_Gdata","opt":['DATA/js1','function(){showLog("this is funX()")}();']},	// _G['DATA']['js1']='funX=function(){showLog("this is funX()")}';
		// {"fun":"add_myfun","opt":'DATA/js1',"isvar":1},										// add_myfun(_G['DATA']['js1']);//js
		{"fun":"add_myfun","opt":['function(){showLog("this is funX()")}','FUN/funX']},
		{"fun":"add_css","opt":'div {border: 1px solid #ccc; padding: 5px;}'},					// add_css('...');//css
		//{"fun":"add_css","opt":'body{ background:green;}'}									// add_css('body{ background:green;}');//css

	]);
	//run_more('ACT/dom2');




	
	
	_Gdata('ACT/dom3',[
		{"fun":"set_node","opt":['#game','text','aaaa']},					//set_node('#game','text','aaaa');
		{"fun":"set_node","opt":['#game','title']},							//set_node('#game','title');
		{"fun":"set_node","opt":['#game','onclick','showLog("bbb")']},		//set_node('#game','onclick','showLog("bbb")');//单击事件 运行函数
		//{"fun":"del_node","opt":'#a span'}									//del_node('#a span');//删除
	]);
	// run_more('ACT/dom3');




	_Gdata('ACT/dom4',[
		{"fun":"move_node","opt":['#b','#a',1]},	//move_node('#b','#a',1);//移动（把B放入A里的上面）
		{"fun":"move_node","opt":['#a','#c']},		//move_node('#a','#c');
		{"fun":"move_node","opt":['#d','#a']}		//move_node('#d','#a');
	]);
	// run_more('ACT/dom4');


	_Gdata('ACT/start',[
		{"fun":"run_more","opt":'ACT/dom1'},
		{"fun":"run_more","opt":'ACT/dom3'},
		{"fun":"run_more","opt":'ACT/dom4'}
	]);
	//run_more('ACT/_start');







//变量转UI

	_Gdata('DATA/F001',{
		"num":10,
		"string":"asdfasdfad",
		"float":3.3
	});
	_Gdata('ACT/dom5',[
		{"fun":"new_node","opt":['aaa','tag','span']},				// new_node('aaa','tag','span'); 		//alert(temp['aaa'].tagName);		//新建DOM
		{"fun":"new_node","opt":['aaa','text','eeeeeee']},			// new_node('aaa','text','eeeeeee');	//alert(temp['aaa'].innerHTML);		//加文本
		{"fun":"new_node","opt":['aaa','title','aaa']},				// new_node('aaa','title','aaa');		//alert(temp['aaa'].title);			//加属性
		{"fun":"new_node","opt":['aaa','onclick','showLog("aaa")']},// new_node('aaa','onclick','showLog("aaa")');//单击事件 运行函数
		{"fun":"new_node","opt":['aaa','style','color:red;']},		// new_node('aaa','style','color:red;');
		{"fun":"new_node","opt":['aaa','id','game']},				// new_node('aaa','id','game');
		{"fun":"save_node","opt":['aaa','#c']}						// save_node('aaa','#c');//把新建的DOM给谁
	]);
	// run_more('ACT/dom1');
	// run_more('ACT/dom5');



//==========================================================================================


//=================================================================规范


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



	_Gdata('tpl/css/bg1','background:#ccc;');//css模板 定义样式
	_Gdata('tpl/css/bg2','background:#c8c;');
	_Gdata('tpl/css/b1','background:yellow; width:300px;');//border:1px solid #ccc;
	_Gdata('l/style',{'li':'bg1','li':'bg2'});//css使用（给什么DOM 加什么样式）

	$('#devlist').css({'list-style-type':'none','padding':0});
	$('li').css(css2arr(_Gdata('tpl/css/b1')));
	$('li').css(css2arr(_Gdata('tpl/css/bg2')));




//数据池（变量路径选择时，可以选择数组或字符串）
_Gdata('run/start','aaaasddddss');
_Gdata('run/start2','sssssss');
//程序定义（单行）-----增加对字符串的增删改查。对数组的。对cookie的等等
_Gdata('m/data/add',{'fun':'_Gdata','opt':['*IN*'],'save':'*OUT*'});//变量赋值
_Gdata('m/data/show1',{'fun':'alert','opt':'*IN*','isvar':1});		//提示框

//程序使用--line，对谁干什么   (单行_mind/m1/0) (多行_mind/m1)
_Gdata('_mind/m1/0',{'in':'run/start','action':'data/add','out':'d/b'});//把js机器语言统一为逻辑语言
_Gdata('_mind/m1/1',{'in':'d/b','action':'data/show1'});//把js机器语言统一为逻辑语言

//运行
// run_one2('_mind/m1/0');
// run_more2('_mind/m1');//函数模板。

// //------历史变量区
// _Gdata('_tmp/in/0','');//模拟输出参数
// _Gdata('_tmp/out','');//模拟return 


	//--------------------------系统层 2016.7.14

	//action 模块
	//选择动作库（定义）在客户端中运行的动作集合。（从共用动作集中调用。和私用动作集中调用。都是调用。私用动作集保存在站点路径下）
	_Gdata('m',{//m 机器语言库(jslib客户端机器语言方法库，phplib服务端机器语言方法库)
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
	_Gdata('w/act',{//动作库（act动作链条）可以成为函数定义，也可以成为函数使用//机器语言 //逻辑语言 act类型的使用
		//'actname1':[{'fun':'','opt':''}] //run_start 执行一组动作
	});
	_Gdata('w/userdata',{//用户产生的数据。以前保存过的数据获取。（用户输入信息，上传图片信息等）
		'udata':{'aa':'aaa','bb':'bbb'}
	});
	//--------运行
	_Gdata('run',{
		'start':['act/a1'], //程序从这里开始
		'thispage':[]
	});

	//------php的流水线，在到 js的流水线
	//访问网站的地址。单页中连接其他页的地址池，图片池。引入JS模块等文件池
	//当前页所用到的。图片。文字。布局。影音。固定结构与可变数据的分离。

	//-------外部文件中获取数据
	//js中运行的数据都放在JS目录下，php... //要用到哪个功能时从指定的哪个文件夹的那个文件中获取所需的数据。
	//[文件夹]，[文件]，[变量第一位，第二位]，(格式自定，格式固定) 定义变量名和输入框模板选择。保存。异步获取。
	//文件夹LIST规则


// //样式信息。颜色，边框等
// _Gdata('DATA/m_class',{
// 	'bg1':'background:green;',//bg1 is class name
// 	'bg2':'background:#ccc;'
// });
// //动画信息。事件，动画等



//先从语义有什么开始吧。bootstrap用到的TAG




//机器语言合成UI界面

//逻辑语言合成UI界面


//用界面来生成动作序列
//动作序列名(定位)
//动作序列内容(索引数组，待执行)
//执行哪个动作序列


//把数据生成html格式 (专题结构数据)
//菜单制作的，把数据生成为菜单格式。菜单格式的数据结构(专属数据结构生成专属菜单。)
//菜单是由div来组合的。分开的div放在一起就是一个菜单。当鼠标放在谁的身上时把什么显示到哪里。
//数据全都是零碎的在不同数据位置上。不打包为同类型的放在一起。

//把图片上传到 图片资源/项目名/年月/md5名.jpg

//区域为一个文件
//制作item显示元素(把数据，皮肤)
//从界面新建原件样式
//从界面新建原件数据与使用样式

//(增加分类，显示分类)（图片上传，图片显示）(增加文字，显示文字)界面上传

//显示列表页
//商品大图介绍页
//新建商品页（上传图片，标题。内容）
//商品修改页（同上）




//用界面把某个文件中的变量进行增删改
//===========================================可删除


	// a:link		{color:blue;}		/*未被访问的链接,所有a标签默认样式*/
	// *:hover		{color:red;}		/*鼠标悬空时*/
	// *:active		{color:yellow;}		/*鼠标点击之后*/
	// *:visited	{color:#ff7f24;}	/*已访问过的链接,(点击过的)*/


	// text
	// 	placeholder="Select a State" 
	// select
	// 	multiple="multiple"
	// option
	// 	selected="selected"
	// 	disabled="disabled"


// show_code();//查看源代码
// showLog(get_G('_G'));
// p();//调试器。查看全局变量
//----------------------------------------
// showLog('JS执行时间：' + runtime(1) +'ms');
//-----------------//<script defer="defer">




//worker多线程（异步后台计算）----没用
//worker是一个新的域，不支持window, document异步中不能对前台界面进行操作，值用于运算耗时长的运算
// function worker(act,code){
// 	code=code||'this.onmessage=function(e){\
// 		var rs=e.data;\
// 		for(var i=0; i<10; i++){ rs+=1; }\
// 		postMessage(rs);\
// 	}';
// 	var blobJS = new Blob([code], {type:'text/javascript'}); 
// 	var url = URL.createObjectURL(blobJS); 
// 	var wk = new Worker(url);  //"_sys/devpage/static/worker.js"
// 	wk.postMessage(1);//发送消息让worker工作。发送信息为：1
// 	wk.onmessage=function(e){ 
// 		p('次进程中处理之后的结果为：'+e.data);
// 	};
// }
// worker('act1')
	//---------worker.js
	// function f1(n) {
	// 	for (var i = 0; i < 100; i++) {n=n+1;}
	//     return n;
	// };
	// onmessage =function(e) {
	//    postMessage("在进程中完成"+f1(e.data)+"动作序列");
	// };
	//---------end worker.js




//-----------------------------------------删除



// function ui_tags(id,save){
// 	var id1=_Gdata('UI/tags/'+id);
// 	if(undefined===typeof id1['tag']) return false;
// 	var t=document.createElement(id1['tag']);//生成button
// 	if(id1['css']){
// 		if(toString.apply(id1['css'])==='[object String]') {t.setAttribute('class', id1['css']);}
// 		else {for (var i in id1['css']) { t.setAttribute('class', id1['css'][i]); }}
// 	} 
// 	if(id1['js']){
// 		if(toString.apply(id1['js'])==='[object String]') {t.setAttribute('class', id1['js']);}
// 		else {for (var i in id1['js']) { t.setAttribute('class', id1['js'][i]); }}
// 	} 
// 	if(id1['attr']) for (var i in id1['attr']) { t.setAttribute(i, id1['attr'][i]); }
// 	if(id1['cont']) t.appendChild((document.createTextNode(id1['cont']))); 
// 	save=save||0;
// 	if(save===0){ _Gdata('UI/doms/'+id,t); }
// 	else{ _Gdata(save,t); return t; } 
// }
// ui_tags('H001');
// // document.querySelector('#test').appendChild(_G['UI']['doms']['H001']);
// ui_tags('H002');
// // document.querySelector('#test').appendChild(_G['UI']['doms']['H002']);





//------------------不用


//自定义数组方式，在一个模板中替换所有数据（单行）
// function tpl_obj(dd,tpl,save){
// 	if(typeof dd==='string'){ dd=_Gdata(dd); var x=1;}//数据池中获取kv数组
// 	var t1=_Gdata(tpl); if(t1!==undefined ) tpl=t1;//数据池中获取tpl模板
// 	var rs=tpl; for (var i in dd) { rs=rs.replace('\{'+i+'\}',dd[i]); }		
// 	save=save||0;
// 	if(save==='this' && x===1) return _Gdata(dd,rs);
// 	if(save===0) return rs;
// 	else return _Gdata(save,rs);
// }
// var dd={'aaa':'111','ccc':'22222'};
// var tpl = "---{aaa}--{bbb}---{ccc}==";//输出1个
// alert(tpl_obj(dd,tpl));
// var dd=['ccc','ddd'];
// var tpl='---{0}----{1}----';
// alert(tpl_obj(dd,tpl));

// //kv数组方式，按模板格式合并成多个数组。（循环）
// function tpl_kv(dd,tpl,save){//数据可以是关联数组也可以是索引数组。{k} {v}
// 	if(typeof dd==='string'){ dd=_Gdata(dd); var x=1;}//数据池中获取kv数组
// 	var t1=_Gdata(tpl); if(t1!==undefined ) tpl=t1;//数据池中获取tpl模板
// 	var rs=''; for (var i in dd) { var a=tpl.replace(/\{k\}/g,i); rs+=a.replace(/\{v\}/g,dd[i]); }
// 	save=save||0;
// 	if(save==='this' && x===1) return _Gdata(dd,rs);
// 	if(save===0) return rs;
// 	else return _Gdata(save,rs);
// }
// // var tpl='---{k}----{v}----';
// // var dd={'aaa':'111','ccc':'22222'};//输出n个
// // alert(tpl_kv(dd,tpl));
// // var dd=['ccc','ddd'];
// // alert(tpl_kv(dd,tpl));

// // _Gdata('uitest/dd',{'aaa':'111','ccc':'22222'});
// // _Gdata('uitest/dd2',['aaa','bbb']);
// // // _Gdata('uitest/tpl','<input type="text" class="c{k}" value="{v}" />\n');
// // // tpl_kv('uitest/dd2','uitest/tpl','save1');
// // _Gdata('uitest/tpl','<input type="text" class="{aaa}" value="{ccc}" />\n');
// // _Gdata('uitest/tpl2','<input type="text" class="{0}" value="{1}" />\n');
// // tpl_obj('uitest/dd2','uitest/tpl2','save1');
// // run_dom('#test','append',_Gdata('save1'));//输出dom 


//------------------------


//------------逻辑语言----------------------(多余)

// //逻辑语言转机器语言run_one（一行命令）
// function run_one2(who){
// 	if(typeof who==='string') var tt=clone(_Gdata(who));
// 	else var tt=who;//console.log('run_one2 '+(who));//放入的所有参数名args
// 	if(tt['action'] && tt['in']){
// 		var c= clone(_Gdata('m/'+tt['action'])); //注意要克隆，不然指定的对象或数组以指针方式获取，会修改原对象。
// 		if('string'===typeof c['opt']) { if(c['opt']==='*IN*') c['opt']=tt['in']; if(c['opt']==='*OUT*') c['opt']=tt['out'];}
// 		else{
// 			var num=var_count(c['opt']);
// 			for (var i = 0; i < num; i++) { if(c['opt'][i]==='*IN*') c['opt'][i]=tt['in']; }
// 		}
// 		if(c['save']==='*OUT*') c['save']=tt['out'];
// 		else if(c['save']==='*IN*') c['save']=tt['in'];
// 		return run_one(c);	
// 	}
// }


// 	//数据池（变量路径选择时，可以选择数组或字符串）
// 	//程序定义（单行）-----增加对字符串的增删改查。对数组的。对cookie的等等
// 	// _Gdata('m/data/add',{'fun':'_Gdata','opt':['*IN*'],'save':'*OUT*'});//变量赋值
// 	// _Gdata('m/data/show1',{'fun':'p','opt':'*IN*','isvar':1});			//console提示框
// 	// _Gdata('m/data/show2',{'fun':'alert','opt':'*IN*','isvar':1});		//alert提示框


// 	// //程序使用--line，对谁干什么   (单行_mind/m1/0) (多行_mind/m1)
// 	// _Gdata('_mind/m1/0',{'in':'run/start','action':'data/add','out':'d/b'});//把js机器语言统一为逻辑语言
// 	// _Gdata('_mind/m1/1',{'in':'d/b','action':'data/show1'});//把js机器语言统一为逻辑语言

// 	//运行
// 	// _Gdata('_mind/m1/0/in','run/start2');
// 	// run_one2('_mind/m1/0');
// 	// run_one2('_mind/m1/1');
// 	// run_more2('_mind/m1');//函数模板。

// 	// //------历史变量区 (对接)
// 	// _Gdata('_tmp/in/0','');//模拟输出参数
// 	// _Gdata('_tmp/out','');//模拟return 


// function run_one3(obj,save){
// 	if(typeof obj==='string') obj=_Gdata(obj);
// 	//把什么数据加在哪里？
// 	for (var i in obj) {
// 		obj[i]=obj[i].split('|');
// 		if(obj[i][2]=='1')_Gdata('tmp2/'+obj[i][0], _Gdata(obj[i][1]));//var中取值
// 		// else if(obj[i][2]=='2') _Gdata('tmp2/'+obj[i][0], $(obj[i][1]).val());//dom中取值
// 		// else if(obj[i][2]=='3') _Gdata('tmp2/'+obj[i][0], $(obj[i][1]).html());//dom中取值
// 		else _Gdata('tmp2/'+obj[i][0], obj[i][1]);//把输入的值直接赋值给它
// 	}
// 	var rs= _Gdata('tmp2');
// 	_Gdata('tmp2','*DEL*');//删除临时变量
// 	return run_one(rs);//执行
// }
// // _Gdata('in/0','aaaaa');//入口变量
// // _Gdata('in/1','bbbb');//入口变量
// // function fun1(a,b){return a+'==='+b;}
// // _Gdata('m/test',['fun|fun1','opt/0|in/0|1','opt/1|in/1|1','save|out']);
// // run_one3('m/test');//变量出口为out
// // p(_Gdata('out'))
// // _Gdata('m/data/add',['fun|_Gdata','opt/0|in/0|1','opt/1|in/1|1','save|out']);
// // _Gdata('m/data/show1',['fun|p','opt/0|in/0|1','save|out']);
// // _Gdata('m/data/show2',['fun|alert','opt/0|in/0|1','save|out']);
// // run_one3(['fun|alert','opt/1|in/1|1','save|out']);
// // run_one3(['fun|p','opt/0|aaaaaa','save|out']);




// function run_more2(act){ //run_more2改名为这个
// 	act=act||'ACT/_start';//（程序起始点，不写参数时默认执行ACT/_start的加载动作）
// 	if(typeof act==='string'){
// 		var arr=_Gdata(act);
// 		if(arr.length===undefined) run_one2(act);
// 		else { for(var i in arr){ run_one2(act+'/'+i); } }
// 	}else{
// 		for (var i in act) { run_one2(act[i]); }
// 	}
// }
// 	// run_more2('_mind/m1');

// //当触发event时执行
// function event_start2(dom,event,act,type){
// 	if(undefined === type){
// 		if(act==='*DEL*') return $(dom)[event]=null;
// 		$(dom)[event](function(){ run_more2(act); });
// 	}else{
// 		if(act==='*DEL*') return $(clone(_Gdata(dom)))[event]=null;
// 		$(clone(_Gdata(dom)))[event](function(){ run_more2(act); });
// 	} 
// }
// //条件判断后执行什么流程
// function if_start2(ifvar,act,act2){
// 	if(typeof ifvar==='string'){ if1=_Gdata(ifvar); } //判断静态布尔值
// 	else{ run_more(ifvar); if1=_Gdata('tmp/ifvar'); } //判断动态执行后的值
// 	if(undefined===act2){ if(if1) run_more2(act); }
// 	else{ if(if1) run_more(act); else run_more2(act2); }

// }
// //对动作进行几次循环
// function for_start2(act,num){
// 	for (var i = 0; i < num; i++) { run_more2(act); }
// }

//========================================正则获取 (不用)

// //正则匹配 （解决eval注入问题）----替代方案：把模板中的所有变量获取之后的数组给一个变量中，然后用获取一一替换
// function reg_match(str,reg){
// 	var if1=true; 
// 	n=[reg.substr(0,reg.indexOf('/')), 
// 	reg.substr(reg.indexOf('/')+1,reg.lastIndexOf('/')-1),  
// 	reg.substr(reg.lastIndexOf('/')+1,reg.length)];
// 	if(reg.length >30) if1=false;
// 	else if(n[0].indexOf(';')>-1) if1=false;//注入格式 aaa=111;/\d/g
// 	else if(n[2].indexOf(';')>-1) if1=false;//注入格式 /\d/g;aaa=111
// 	else if(n[1].indexOf(';')>0) if1=false;//注入格式 /;aaa=111;/
// 	if(if1) return str.match(eval(reg));//转成正则http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
// 	else return '正则中不能包含非法关键词';
// }
// //var re = new RegExp("a","gi");