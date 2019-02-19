console.log('a.js');

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

	//---
	{'fun':'event_start','opt':['#s1','click','ACT/click1']},
	{'fun':'event_start','opt':['#s2','click','ACT/click1']}
];

_G['ACT']['click1']=[
	{'fun':'alert','opt':'click ok'}
];

// run_start('ACT/ui_edit');

//-------------把什么替换为什么。(不能动态修改参数)
// _Gdata('ACT/ui_edit/0/opt/0','#s1');//不能动态修改，总出错。直接从做好的数组池中获取后是没问题的。
// run_start('ACT/ui_edit');
// _Gdata('ACT/ui_edit/0/opt/0','#s2');//不是按顺序执行。好像异步执行。不按顺序执行.(不是jquery的dom的click方法有问题)
// run_start('ACT/ui_edit');//是js本身具有的问题。click事件跟计时器一样有异步延迟。所以先执行其他。不会堵塞等待后继续执行。

// _Gdata('c/c','#s1');//click事件为异步。和上面的计时器一样，它将排在执行队列的最后
// run_start('ACT/ui_edit');
// _Gdata('c/c','#s2');//对原变量修改后运行时出错。
// run_start('ACT/ui_edit');
//----------------------------bug




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






//把什么替换为什么。
function line_edit(who,huan,save){
	_Gdata('_tmp', _Gdata(who));
	for (var i in huan) { _Gdata('_tmp/'+i, huan[i]); }
	var rs= _Gdata('_tmp'); _Gdata('_tmp','*DEL*');
	if(save===undefined) return rs;
	else _Gdata(save,rs);
}

window.onload=function(){
	_Gdata('_mind/m1/0/in','run/start');
	run_more2('_mind/m1');//函数模板。
	_Gdata('_mind/m1/0/in','run/start2');
	run_more2('_mind/m1');//函数模板。	
}









// _Gdata('meta/IEok','<meta http-equiv="X-UA-Compatible" content="IE=Edge">');
// if(1) $('head').append(_Gdata('meta/IEok'));


// _Gdata('DATA/uiedit', {'who':'',"fun":"fun","opt":['ddd','aaa'],"isvar":["ccc"]});
// _Gdata('DATA/skin','<input type="text" class="c{k}" value="{v}" />\n');
// arr2tpl('DATA/uiedit/opt','DATA/skin','DATA/html3');
// // alert(_Gdata('DATA/html3'));
// data2ui('DATA/html3','#test');






//把字符串转数组
function str1(str){
	return str.split(',');
}
// $('button').click(function (){
// 	var dom=$('.c1').val();
// 	alert(num(dom));
// })
function num(dom){
	if( 'NaN'!==Number(dom).toString() ) return (Number(dom));
}



//先从语义有什么开始吧。bootstrap用到的TAG

if('undefined'==typeof _G) _G={};
if('undefined'==typeof _G['UI']) _G['UI']={};
// {'h1':'h1标题','h2':'h2标题','h3':'h3标题','h4':'h4标题','h5':'h5标题','h6':'h6标题','p':'p段落'};



//给数组自身字符串修改格式。
function arr2tpl2(who,tpl,save){
	if(toString.apply(who)==='[object String]') arr=_Gdata(who);
	if(save!==undefined){ who=save; }
	if(toString.apply(arr)==='[object String]') { _Gdata(who, tpl.replace(/\{v\}/g,arr)); }
	else { for (var i in arr) { var a=tpl.replace(/\{k\}/g,i); var b=a.replace(/\{v\}/g,arr[i]); _Gdata(who, b); }  }
}


//皮肤tpl替换方式，{k}  {v}//把数组变成字符串。
function arr2tpl(who,tpl,save){
	var rs='';
	if(toString.apply(who)==='[object String]') arr=_Gdata(who);
	if(tpl!==undefined) tpl=_Gdata(tpl);
	if(toString.apply(arr)==='[object String]') { rs=tpl.replace(/\{v\}/g,arr); }
	else { for (var i in arr) { var a=tpl.replace(/\{k\}/g,i); var b=a.replace(/\{v\}/g,arr[i]); rs+=b; }  }
	save=save||0;
	if(save===0) return rs;
	else _Gdata(save, rs);
}

// _Gdata('DATA/data1', {"tiaojian":"1","zhixing":"2","cc":"3"});
// _Gdata('DATA/data1', ['c','ddd','aaaa']);
// _Gdata('DATA/data1', {'h1':'h1标题','h2':'h2标题','h3':'h3标题','h4':'h4标题','h5':'h5标题','h6':'h6标题','p':'p段落'});
// _Gdata('DATA/tpl/a', '<option value="{k}">{v}</option>\n');
// _Gdata('DATA/tpl/b', '<select>\n{v}</select>\n');
// _Gdata('DATA/data3', {"tiaojian":"1","zhixing":"2","button":"+"});
// _Gdata('DATA/tpl/c', '<option><button id="click1">{v}</button></option>\n');
// _Gdata('DATA/html3',arr2str(['DATA/html1','DATA/html3']));


// arr2tpl('DATA/data1','DATA/tpl/a','DATA/html1');
// arr2tpl('DATA/html1','DATA/tpl/b','DATA/html2');
// data2ui('DATA/html2','#test'); // alert(_Gdata('DATA/html2'));
// arr2tpl('DATA/data3/button','DATA/tpl/c','DATA/html3');
// arr2tpl('DATA/html3','DATA/tpl/b','DATA/html3');
// data2ui('DATA/html3','#test');



function data2ui(html,ui,type){
	type=type||'append';//内部插入: append最后（默认） prepend前面   //外部插入: after后面  before前面
	$(ui)[type](_Gdata(html));//事件
}

function arr2str(arr){
	var rs='';
	for (var i in arr) {
		rs+=_Gdata(arr[i]);
	}
	return rs;
}







// _Gdata('data/1/fun',"_Gdata");
// _Gdata('data/1/opt',['ooo','<b>Helloadsfasdf</b>']);
// _Gdata('data/1/opt/0','ooo');
// _Gdata('data/1/opt/1','<b>Helloadsfasdf</b>');



		// _Gdata('data/1',{"fun":"_Gdata","opt":['ooo','<b>Helloadsfasdf</b>']});
		// run_one('data/1');
		// run_one({"fun":"var_dom","opt":["test","#test"]});					// var_dom('test','#test');					//_G['DOM']['test']=$('#test');
		// run_one({"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]});	// run_dom('test',"html","<b>Hello</b>"); 	//_G['DOM']['test']['html']("<b>Hello</b>");
		// alert(_Gdata('DOM/test/0/innerHTML')); 							//alert(document.querySelectorAll('#test')[0].innerHTML);
		// run_one({"fun":"run_fun","opt":["showLog","eieiieieieiei"]});		//run_fun('showLog','eieiieieieiei');

		// run_one({"fun":"_Gdata","opt":['a/b','ads|f|adfadsf']});	// _Gdata('a/b','ads|f|adfadsf');		// a['b']="ads|f|adfadsf";
		// run_one({"fun":"run_var","opt":['a/b','split','|','a/c']});	// run_var('a/b','split','|','a/c');	// a['c']=a['b'].split("|");
		// run_one({"fun":"alert","opt":'a/c','isvar':1}); 			//alert(_Gdata('a/c'));					// alert(a['c']);





//UI界面/部分/
_G['UI']['_tags']={//id元素唯一值，html标签，css加样式,js加动画
	'H001':{'tag':'button','css':['btn','btn-default'],'js':[''],'attr':{'type':'submit'},'cont':'按钮'},
	'H002':{'tag':'p','cont':'aasdfsf'},//创建元素item
	'H004':{'tag':'img','attr':{'src':'/atompond/_sys/_lib/img/addButton.png','style':'border:1px solid #ccc;'}},
	'H005':{'tag':'a','attr':{'href':'#'},'cont':300}
};
_G['UI']['_divs']={//div1是id元素唯一值，html标签，css加样式,js加动画
	'div1':{'tag':'div','attr':{'style':'background:#ccc;'},'cont':'{H001}aaa{H002}'}//创建布局div
};
_G['UI']['_run']={//把什么元素放入哪个元素中
	'run1':[['H001','div1'],['H002','div1']]
};



//----------------------html标签格式规则




function ui_line(id){
	var line1=_Gdata('UI/line/'+id);
	if(line1.length===0) return false;
	for (var i in line1) {
		var a=_Gdata('UI/doms/'+line1[i][0]);
		var b=_Gdata('UI/doms/'+line1[i][1]);
		b=b.replace('{cont}',a);
	}
}
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
			if(toString.apply(id1['css'])==='[object String]') t+=id1['css']; else t+=id1['css'].join(' ');
		}
		if(id1['js']){
			if(toString.apply(id1['js'])==='[object String]') t+=id1['js']; else t+=id1['js'].join(' ');
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