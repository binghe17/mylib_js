<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<script type="text/javascript" src="jslib/jquery/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="jslib/jquery/jquery-ui-1.11.4.min.js"></script>
<script type="text/javascript" src="jslib/zcore.js"></script>
<script type="text/javascript">
	add_inc('jslib/jquery/jquery.json-2.4.js'); //引入各种插件
	add_inc('jslib/bootstrap/js/bootstrap.min.js');
	add_inc('jslib/bootstrap/css/bootstrap.min.css');
	// add_inc('jslib/AdminLTE.css');
</script>
<style type="text/css">

	#a{background: #ccc; padding: 10px;}
	#b{background: #aaa; padding: 10px;}
	#c{background: #3ae; padding: 10px;}
	#d{background: #777; padding: 10px;}
	pre{word-wrap:break-word; padding: 0;margin: 0;}
</style>



</head>
<body>
<div class="container">

<div style="width:400px;">
	<div id="ui_edit" style="background:#ccc;">

		<div><input type="text" name="who" placeholder="who Name" title="input who name" /></div>
		<div><input type="text" name="fun" placeholder="fun Name" title="input fun name"/></div>
		<div><input type="text" name="opt[0]" placeholder="opt[0] Name" title="input opt[0] name"/><input type="checkbox" name="isvar[0]" title="isvar[0]"></div>
		<div><input type="text" name="opt[1]" placeholder="opt[1] Name" title="input opt[1] name"/><input type="checkbox" name="isvar[1]" title="isvar[1]"></div>
		<div><input type="text" name="opt[2]" placeholder="opt[2] Name" title="input opt[2] name"/><input type="checkbox" name="isvar[2]" title="isvar[2]"></div>
		<div><input type="text" name="opt[3]" placeholder="opt[3] Name" title="input opt[3] name"/><input type="checkbox" name="isvar[3]" title="isvar[3]"></div>
		<div><input type="text" name="opt[4]" placeholder="opt[4] Name" title="input opt[4] name"/><input type="checkbox" name="isvar[4]" title="isvar[4]"></div>
		<div><input type="text" name="save" placeholder="save Name" title="input save name"/></div>

		<button id='s1'>save1</button><button id='s2'>save2</button>

	</div>
</div>
<div class="row">
  <div class="col-md-4" id="var_list" style="background:#ccc;">
		<div id="xx">没有找到变量</div>
		<ol>
			<li><span>1</span>aaa</li>
			<li><span>1</span>aaa</li>
		</ol>
  </div>
  <div class="col-md-6" id="var_set" style="background:#bbb;">
		<input type="text" name="var_name" placeholder="var Name" title="input var name" >
		<button>添加字符串</button>
  </div>
</div>






<div id="test"></div>
<script type="text/javascript">



if('undefined'==typeof _G) _G={};
if('undefined'==typeof _G['ACT']) _G['ACT']={};
if('undefined'==typeof _G['DATA']) _G['DATA']={};
if('undefined'==typeof _G['DATA']['m_class']) _G['DATA']['m_class']={};


//样式信息。颜色，边框等
_G['DATA']['m_class']={
	'bg1':'background:green;',//bg1 is class name
	'bg2':'background:#ccc;'
};
//动画信息。事件，动画等



//先从语义有什么开始吧。bootstrap用到的TAG




//机器语言合成UI界面

//逻辑语言合成UI界面









_G['ACT']['ui_edit']=[
	//who val
	// {'fun':'var_dom','opt':['DOM/ui_edit','#ui_edit input[name="who"]']},
	// {'fun':'run_varfun','opt':['DOM/ui_edit','val',,'']},
	// {'fun':'var_dom','opt':['DOM/ui_edit_div','#ui_edit div']},
	// {'fun':'run_varfun','opt':['DOM/ui_edit_div','addClass','glyphicon glyphicon-resize-vertical']},

	// {'fun':'var_dom','opt':['DOM/ui_edit','#ui_edit']},
	// {'fun':'run_varfun','opt':['DOM/ui_edit_div','css',["width","400px"]]},
	// {'fun':'run_varfun','opt':['DOM/ui_edit','sortable']},
	// {'fun':'run_varfun','opt':['DOM/ui_edit','disableSelection']},
	// {'fun':'event_start','opt':['BTN/u_btn','click','ACT/click1']},
	{'fun':'event_start','opt':['#var_box button','click','ACT/click1']}//点击事件
	// {'fun':'event_start','opt':['#s2','click','ACT/click1']}
];

_G['ACT']['click1']=[
	{'fun':'run_varfun','opt':['#var_str','append','']},
	{'fun':'alert','opt':'click ok'}
];

//把什么替换为什么。(不能动态修改参数)
_Gdata('ACT/ui_edit/0/opt/0','#s1');
// run_start('ACT/ui_edit');
run_start('ACT/ui_edit');
_Gdata('ACT/ui_edit/0/opt/0','#s2');
// run_start('ACT/ui_edit');
run_start('ACT/ui_edit');








//把什么替换为什么。
function line_edit(who,huan,save){
	_Gdata('_tmp', _Gdata(who));
	for (var i in huan) { _Gdata('_tmp/'+i, huan[i]); }
	var rs= _Gdata('_tmp'); _Gdata('_tmp','*DEL*');
	if(save===undefined) return rs;
	else _Gdata(save,rs);
}



_Gdata('_mind/m1/0/in','run/start');
console.error('run_start2-------');
run_start2('_mind/m1');//函数模板。
console.log(_toString(_Gdata('m/data')))

_Gdata('_mind/m1/0/in','run/start2');
console.error('run_start2----------')
run_start2('_mind/m1');//函数模板。
console.log(_toString(_Gdata('m/data')))


var_dom('test','#test');					//_G['DOM']['test']=$('#test');
run_dom('test',"html","<b>Hello</b>"); 	//_G['DOM']['test']['html']("<b>Hello</b>");
alert(_Gdata('test/0/innerHTML')); 	//alert(document.querySelectorAll('#test')[0].innerHTML);

run_one({'fun':'var_dom','opt':['test','#test']});		//定位dom
run_one({'fun':'add_myfun','opt':['fun2','','this.innerHTML = (this.innerHTML)+"===="; ']});	//定位函数
run_one({'fun':'run_dom','opt':['test','click','FUN/fun2'],'isvar':[0,0,1]}); 	//给dom增加事件



//---------(专属JS 扩展思维)------------
//定义 自定义结构
// function funBox(fun,arg1,arg2,arg3){
// 	fun(arg1,arg2,arg3);
// }
// //使用 自定义结构
// funBox(function(a,b,c){
// 	alert(a+b-c);
// },5,6,2);
//----------------------------------------------


_Gdata('meta/IEok','<meta http-equiv="X-UA-Compatible" content="IE=Edge">');
if(1) $('head').append(_Gdata('meta/IEok'));


_Gdata('DATA/uiedit', {'who':'',"fun":"fun","opt":['ddd','aaa'],"isvar":["ccc"]});
_Gdata('DATA/skin','<input type="text" class="c{k}" value="{v}" />\n');
arr2tpl('DATA/uiedit/opt','DATA/skin','DATA/html3');
// alert(_Gdata('DATA/html3'));
data2ui('DATA/html3','#test');



$('button').click(function (){
	var dom=$('.c1').val();
	alert(_toNum(dom));
})






function _toNum(dom){ if( 'NaN'!==Number(dom).toString() ) return Number(dom); }//（从ui中获取的字符串）转为数字类型
function str2arr(str,e){ e=e||',';return str.split(e); } //把字符串转为数组
function arr2str(arr,e){ e=e||','; return arr.join(e); } //把数组转为字符串


function data2ui(html,dom,type){
	type=type||'append';//内部插入: append最后（默认） prepend前面   //外部插入: after后面  before前面
	$(dom)[type](_Gdata(html));//事件
}



function arr2tpl(who,tpl,save,type){
	if(type===undefined){//皮肤tpl替换方式，{k}  {v}//把数组变成字符串。arr2str
		var rs='';
		var who1=_Gdata(who);
		if(who1===undefined ) arr=who;
		else arr=_Gdata(who);
		var t=_Gdata(tpl); if(t===undefined) tpl=t;
		if(typeof arr==='string') { rs=tpl.replace(/\{v\}/g,arr); }
		else { for (var i in arr) { var a=tpl.replace(/\{k\}/g,i); var b=a.replace(/\{v\}/g,arr[i]); rs+=b; }  }
		save=save||0;
		if(save===0) return rs;
		else if(save=='this') _Gdata(who, rs);
		else _Gdata(save, rs);
	}else{//皮肤tpl替换。//批量替换数组里的各自字符串 arr2arr
		if(typeof who==='string') arr=_Gdata(who);
		if(save!==undefined){ who=save; }
		if(typeof arr==='string') { _Gdata(who, tpl.replace(/\{v\}/g,arr)); }
		else { for (var i in arr) { var a=tpl.replace(/\{k\}/g,i); var b=a.replace(/\{v\}/g,arr[i]); _Gdata(who, b); }  }
	}
}


_Gdata('DATA/data1', {"tiaojian":"1","zhixing":"2","cc":"3"});
_Gdata('DATA/data1', ['c','ddd','aaaa']);
_Gdata('DATA/data1', {'h1':'h1标题','h2':'h2标题','h3':'h3标题','h4':'h4标题','h5':'h5标题','h6':'h6标题','p':'p段落'});
_Gdata('DATA/tpl/a', '<option value="{k}">{v}</option>\n');
_Gdata('DATA/tpl/b', '<select>\n{v}</select>\n');
_Gdata('DATA/data3', {"tiaojian":"1","zhixing":"2","button":"+"});
_Gdata('DATA/tpl/c', '<option><button id="click1">{v}</button></option>\n');
_Gdata('DATA/html3',arr2str(['DATA/html1','DATA/html3']));


arr2tpl('DATA/data1','DATA/tpl/a','DATA/html1');
arr2tpl('DATA/html1','DATA/tpl/b','DATA/html2');
data2ui('DATA/html2','#test'); // alert(_Gdata('DATA/html2'));
arr2tpl('DATA/data3/button','DATA/tpl/c','DATA/html3');
arr2tpl('DATA/html3','DATA/tpl/b','DATA/html3');
data2ui('DATA/html3','#test');



_Gdata('data/1/fun',"_Gdata");
_Gdata('data/1/opt',['ooo','<b>Helloadsfasdf</b>']);
_Gdata('data/1/opt/0','ooo');
_Gdata('data/1/opt/1','<b>Helloadsfasdf</b>');



_Gdata('data/1',{"fun":"_Gdata","opt":['ooo','<b>Helloadsfasdf</b>']});
run_one('data/1');
run_one({"fun":"var_dom","opt":["test","#test"]});						// var_dom('test','#test');					//_G['DOM']['test']=$('#test');
// alert(_Gdata('test/0/innerHTML')); 									// alert(document.querySelectorAll('#test')[0].innerHTML);
run_one({"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]});	// run_dom('test',"html","<b>Hello</b>"); 	//_G['DOM']['test']['html']("<b>Hello</b>");
run_one({"fun":"run_fun","opt":["showLog","eieiieieieiei"]});			// run_fun('showLog','eieiieieieiei');

run_one({"fun":"_Gdata","opt":['a/b','ads|f|adfadsf']});	// _Gdata('a/b','ads|f|adfadsf');		// a['b']="ads|f|adfadsf";
run_one({"fun":"run_var","opt":['a/b','split','|','a/c']});	// run_var('a/b','split','|','a/c');	// a['c']=a['b'].split("|");
run_one({"fun":"alert","opt":'a/c','isvar':1}); 			// alert(_Gdata('a/c'));				// alert(a['c']);








//----------------------html标签格式规则   用变量来生成HTML结构。（不用），以数据和模板替换占位符来实现。


function ui_line(id){
	var line1=_Gdata('UI/line/'+id);
	if(line1.length===0) return false;
	for (var i in line1) {
		var a=_Gdata('UI/doms/'+line1[i][0]);
		var b=_Gdata('UI/doms/'+line1[i][1]);
		b=b.replace('{cont}',a);
	}
}
//UI界面/部分/     --写太多。不易UI上生成结构。（快速编辑，多加模板的方式来选择其中之一）
_Gdata('UI/_tags', {//id元素唯一值，html标签，css加样式,js加动画
	'H001':{'tag':'button','css':['btn','btn-default'],'js':[''],'attr':{'type':'submit'},'cont':'按钮'},
	'H002':{'tag':'p','cont':'aasdfsf'},//创建元素item
	'H004':{'tag':'img','attr':{'src':'/atompond/_sys/_lib/img/addButton.png','style':'border:1px solid #ccc;'}},
	'H005':{'tag':'a','attr':{'href':'#'},'cont':300}
});
_Gdata('UI/_divs', {//div1是id元素唯一值，html标签，css加样式,js加动画
	'div1':{'tag':'div','attr':{'style':'background:#ccc;'},'cont':'{H001}aaa{H002}'}//创建布局div
});
_Gdata('UI/_run', {//把什么元素放入哪个元素中
	'run1':[['H001','div1'],['H002','div1']]
});

// ui_line('run1');
// alert(_Gdata('UI/doms/'))
// document.querySelector('#test').appendChild(_G['UI']['doms']['H003']);



function ui_tag1(id,save){//生成字符串
	var id1=_Gdata('UI/_tags/'+id);
	if(undefined===id1['tag']) return false;
	var t='<'+id1['tag'];//生成button
	if(id1['css']||id1['js']){
		t+=' class="';
		if(id1['css']){
			if(typeof id1['css']==='string') t+=id1['css']; else t+=id1['css'].join(' ');
		}
		if(id1['js']){
			if(typeof id1['js']==='string') t+=id1['js']; else t+=id1['js'].join(' ');
		}
		t+='"';	
	}
	if(undefined!==id1['attr']) for (var i in id1['attr']) { t+=' '+i+'="'+id1['attr'][i]+'"'; }
	if(undefined!==id1['cont']){
		// if(id1['cont'].indexOf('\{')>-1 && id1['cont'].lastIndexOf('\}')>-1){
		// 	var a=id1['cont'].match(/{(\S)+?}/g);
		// 	for (var i in a) {
		// 		alert(a[i].substr(1,a[i].length-2));
		// 		//id1['cont']=id1['cont'].replace(a[i],_Gdata('UI/doms/'+a[i].substr(1,a[i].length-2)));
		// 	}
		// }
		t+='>'+id1['cont']+'</'+id1['tag']+'>'; 
	} 
	else t+='>'; 
	save=save||0;
	if(save===0){ _Gdata('UI/doms/'+id,t); }
	else{ _Gdata(save,t); return t; } 
}
// ui_tag1('H003');





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











// <div class="box-body">
// <div class="row">
// <div class="col-md-6">
// <div class="form-group">
// data-placeholder="Select a State" 

// select  <select class="form-control select2">
// 	multiple="multiple"
// option
// 	selected="selected"
// 	disabled="disabled"
</script>



<input id="in1" type="text" value="1 plus 2 equal 3" />
<input id="in2" type="text" value="/\d/g" />
<button onclick="btn1()">测试</button>
<div id="a" class="aaa"><span>aaa</span>111</div>
<div id="b">bbb</div>
<div id="c">ccc</div>
<div id="d">ddd</div>
<button onclick="add_css(_G['DAT']['css1'])">add_css()</button>
<button onclick="run_start('ACT/dom2');">run_start('ACT/dom2');</button>
<button onclick="run_fun('funX')">funX()</button>

<div>
	<div id="menu"><button>增加</button></div>
	<div id="box1"></div>
	<div id='test' data='11'>test</div>
</div>
<div id="ajax">aaaaa</div>

<pre>-----------------------------------------</pre>
<div id="showLog"></div>



<script type="text/javascript">

function btn1(){
	var str=document.querySelector('#in1').value;
	var reg=document.querySelector('#in2').value; //程序中的写法要写正斜杠 var reg='/\d/g';
	showLog(reg_match(str,reg));
}


	_Gdata('DAT/js1','function(){showLog("this is funX()")}');
	_Gdata('DAT/css1','body{ background:green;}');




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
	// run_start('ACT/dom1');
	

	
	_Gdata('ACT/dom2',[
		// {"fun":"_Gdata","opt":['DATA/js1','function(){showLog("this is funX()")}();']},	// _G['DATA']['js1']='funX=function(){showLog("this is funX()")}';
		// {"fun":"add_myfun","opt":'DATA/js1',"isvar":1},										// add_myfun(_G['DATA']['js1']);//js
		{"fun":"add_myfun","opt":['function(){showLog("this is funX()")}','FUN/funX']},
		{"fun":"add_css","opt":'div {border: 1px solid #ccc; padding: 5px;}'},					// add_css('...');//css
		//{"fun":"add_css","opt":'body{ background:green;}'}									// add_css('body{ background:green;}');//css

	]);
	//run_start('ACT/dom2');




	
	
	_Gdata('ACT/dom3',[
		{"fun":"set_node","opt":['#game','text','aaaa']},					//set_node('#game','text','aaaa');
		{"fun":"set_node","opt":['#game','title']},							//set_node('#game','title');
		{"fun":"set_node","opt":['#game','onclick','showLog("bbb")']},		//set_node('#game','onclick','showLog("bbb")');//单击事件 运行函数
		//{"fun":"del_node","opt":'#a span'}									//del_node('#a span');//删除
	]);
	// run_start('ACT/dom3');




	_Gdata('ACT/dom4',[
		{"fun":"move_node","opt":['#b','#a',1]},	//move_node('#b','#a',1);//移动（把B放入A里的上面）
		{"fun":"move_node","opt":['#a','#c']},		//move_node('#a','#c');
		{"fun":"move_node","opt":['#d','#a']}		//move_node('#d','#a');
	]);
	// run_start('ACT/dom4');


	_Gdata('ACT/start',[
		{"fun":"run_start","opt":'ACT/dom1'},
		{"fun":"run_start","opt":'ACT/dom3'},
		{"fun":"run_start","opt":'ACT/dom4'}
	]);
	//run_start('ACT/_start');







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
	];
	// run_start('ACT/dom1');
	run_start('ACT/dom5');




// show_code();//查看源代码
//----------------------------------------
showLog('JS执行时间：' + runtime(1) +'ms');
//-----------------//<script defer="defer">
</script>
</div>
</body>
</html>