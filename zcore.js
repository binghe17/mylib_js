//---------------------------------------------------------------------
runtime(); // p('成功加载zcore.js'); //alert有阻塞，弹窗期间无用的耗CPU资源多
//---------------------------------------------------------------------


//=============================================dom操作相关
// (用DOM实现动态布局)
// getElementById() // getElementsByTagName() // getElementsByClassName()  // getElementsByName() 
// querySelector()  // querySelectorAll() // 把已选择的对象，放入到选择器（变量）当中，再从选择器中取出来操作。


//-------dom 无到有
//新建变量DOM ，给他设置 标签名 属性 内容
function new_node(setDom,type,val){
	if('undefined'==typeof temp) temp={};
	if('tag'==type) temp[setDom]=document.createElement(val);
	else if('text'==type) temp[setDom].appendChild((document.createTextNode(val))); 
	else temp[setDom].setAttribute(type, val);
}
//新建的变量DOM，放入到哪个DOM里
function save_node(getDom, node) {
	document.querySelector(node).appendChild(temp[getDom]);
	temp[getDom]=null;
}
//设置DOM
function set_node(id,type,text){
	dom=document.querySelector(id);//选择器
	if('text'==type) {
		if(text){
			//dom.innerHTML=text;//替换
			dom.textContent=text;//替换
			//alert(dom.childNodes[1].textContent=text);//获取第一个内容
			//dom.appendChild(document.createTextNode(text));//追加
		}else dom.textContent=null;//删除
	}
	//else if('tag'==type){ if(text=='undefined') delNode(id); }
	else{
		dom=document.querySelector(id);//选择器
		if(text) dom.setAttribute(type, text);//替换
		else dom.removeAttribute(type);//删除
	}
}
//删除DOM
function del_node(id){
	var dom=document.querySelector(id);
	dom.parentNode.removeChild(dom);
}
//移动DOM （把什么dom放到哪个dom里）
function move_node(fromId,toId,up){
	var fromDom=document.querySelector(fromId);
	var toDom=document.querySelector(toId);
	if(up) toDom.insertBefore(fromDom,toDom.firstChild);//加入到子节点上面
	else toDom.appendChild(fromDom);					//加入到子节点下面（默认）
}
	// new_node('aaa','tag','span');//alert(temp['aaa'].tagName);
	// new_node('aaa','title','aaa');//alert(temp['aaa'].title);
	// new_node('aaa','text','eeeeeee');//alert(temp['aaa'].innerHTML);
	// save_node('aaa','#c');
	// set_node('#game','text','aaaa');
	// set_node('#game','title','aaaa');
	// del_node('#a span');
	// move_node('#b','#a',1);//移动（把B放入A里的上面）
	// move_node('#a','#c');
	// move_node('#d','#a');




function dom2var(dom,save,type){//选择，保存
	type=type||'jquery';
	if(type==='$'){//获取jqdom, 使用jquery选择器
		if(save===undefined) return $(dom);
		else _Gdata(save, $(dom));		
	}else{//获取jsdom, 使用原生选择器。（IE8+开始支持，但在HTML5文档头上加 <!DOCTYPE html>）
		if(save===undefined) return document.querySelectorAll(dom);
		else _Gdata(save, document.querySelectorAll(dom));
	}
}

//互转jquery和js的dom
function _dom(dom){
	if(dom['val']){ //p('jquery')
		if(dom.length>1){//多个
			var rs = [];
			for(var i=0; i < dom.length; i++){ rs.push(dom[i]); }
			return rs;
		}else return dom[0];//单个		
	}else{ return $(dom); }
}
// $(function(){
// 	$('body').append('asdfasdfsa');
// 	dom2var('body','aaa');
// 	alert(_Gdata('aaa'));
// 	p(_dom($('body')).innerHTML);
// 	p(_dom(document.querySelectorAll('body')).html());
// });






//================= 数据操作（重要）========================
//想从界面中直接创建变量就要把系统书写格式都做成函数格式


//全局变量的增删改和获取（对内存变量的增删改）
function _Gdata(key,val){//注意：数组和对象要用克隆clone()，不然以指针方式传值。会对原数据修改。
	//if(val===undefined) console.warn('_Gdata()',key,val);//_Gdata层面很难查出问题所在。一般都是上层函数输入的值为undefined的错误
	if(key.indexOf('/')<0 && val!==undefined) {
		if('undefined'==typeof _G) _G={};
		if(val==='*DEL*') return _G[key]=undefined;
		else return _G[key]=val;
	}else{
		// try{
			var a=key.split('/');
			n=_count(a);
		// }catch(e){
		// 	console.error(e.name + ": " + e.message);
		// 	return ;
		// }
	}
	if(val===undefined){
		try{
			if(n===1) return _G[a[0]];
			else if(n===2) return _G[a[0]][a[1]];
			else if(n===3) return _G[a[0]][a[1]][a[2]];
			else if(n===4) return _G[a[0]][a[1]][a[2]][a[3]];
			else if(n===5) return _G[a[0]][a[1]][a[2]][a[3]][a[4]];
		}catch(e){ /*throw 'Error: 没有找到此变量！_Gdata(); ';*/ }
	}else {
		if(val==='*DEL*'){
			if(n===5&&'undefined'!=typeof _G[a[0]][a[1]][a[2]][a[3]][a[4]]) return _G[a[0]][a[1]][a[2]][a[3]][a[4]]=undefined;
			if(n===4&&'undefined'!=typeof _G[a[0]][a[1]][a[2]][a[3]]) return _G[a[0]][a[1]][a[2]][a[3]]=undefined;
			if(n===3&&'undefined'!=typeof _G[a[0]][a[1]][a[2]]) return _G[a[0]][a[1]][a[2]]=undefined;
			if(n===2&&'undefined'!=typeof _G[a[0]][a[1]]) return _G[a[0]][a[1]]=undefined;
			if(n===1&&'undefined'!=typeof _G[a[0]]) return _G[a[0]]=undefined;
		}else{
			//(typeof val==='array' || typeof val==='object')? clone(val): val;
			if('undefined'==typeof _G) _G={};
			if(n===1) return _G[a[0]]=val;
			if('undefined'==typeof _G[a[0]]) _G[a[0]]={};
			if(n===2) return _G[a[0]][a[1]]=val;
			if('undefined'==typeof _G[a[0]][a[1]]) _G[a[0]][a[1]]={};	
			if(n===3) return _G[a[0]][a[1]][a[2]]=val;
			if('undefined'==typeof _G[a[0]][a[1]][a[2]]) _G[a[0]][a[1]][a[2]]={};
			if(n===4) return _G[a[0]][a[1]][a[2]][a[3]]=val;
			if('undefined'==typeof _G[a[0]][a[1]][a[2]][a[3]]) _G[a[0]][a[1]][a[2]][a[3]]={};
			if(n===5) return _G[a[0]][a[1]][a[2]][a[3]][a[4]]=val;			
		}
	}
}
	// _Gdata('a','dddd');
	// alert(_Gdata('a/b'));
	// _Gdata('a/b','*DEL*');
	// alert(_Gdata('a/b'));



//克隆 array/object
//完整的对象克隆  http://qianduanblog.com/post/js-learning-30-object-clone-copy.html
function clone(obj){
	// if(typeof(arr)=="object" && arr!=null) 索引数组和关联数组的时候
	// 原始类型对象指的是字符串（String）=ok、数值（Number）=ok、布尔值（Boolean）=ok，
	// 合成类型对象指的是数组（Array）?、对象（Object）?、    函数（Function）=ok
	var o,i,j,k;
	if(typeof(obj)!="object" || obj===null) return obj;
	if(obj instanceof(Array)){
		o=[];  i=0;j=_count(obj);
		for(;i<j;i++){
			if(typeof(obj[i])=="object" && obj[i]!=null) o[i]=arguments.callee(obj[i]); else o[i]=obj[i]; 
		}
	}else{
		o={};
		for(i in obj){
			if(typeof(obj[i])=="object" && obj[i]!=null) o[i]=arguments.callee(obj[i]);else o[i]=obj[i];
		}
	}
	return o;
}
	//o = {'a':1};
	// o=["One","Two","Three"];
	//b = o;//对象地址
	// o='aaa';
	// b=clone(o);//真正克隆array和object
	// b = 2;
	// // b['a'] = 2;
	// console.log(_toString(o));
	// console.log(_toString(b));





//数据转换类型后保存到全局变量
function dd2var(type,k,v){
	if(k){
		var arr={'dom':'$','json':'json_decode','num':'Number','bool':'Boolean','fun':'str2fun','act':'str2act'}
		if(arr[type]) v=window[arr[type]](v);
		return _Gdata(k,v);
	}
}
// dd2var('str','aaa','12.23');//默认字符串类型
// dd2var('json','aaa','[12,223]');//数组
// dd2var('num','aaa','sdaf');//NaN
// dd2var('bool','aaa','');//false
// p(_Gdata('aaa'));
// dd2var('dom','dom1','body'); run_var(_Gdata('dom1'),'append','aaa');
// dd2var('fun','aaa','function(a){alert(a);}'); _Gdata('aaa')('aaaaa');
// dd2var('act','aaa',json_decode('{"fun":"alert","opt":"333"}')); _Gdata('aaa')();

	//-------------给事件赋值函数定义(event用)
	//字符串函数定义。(运营时的程序，都以加密base64存在,破解后eval)
	//关键：用户无法自制加密base64（无法得知加密解密规则base64）.每一次加载页面时的解密规则都不同。
	function str2fun(funstr){ return eval('('+funstr+')'); }
	// f1=str2fun('function(a){alert(a)}'); f1('aaa');
	// str2=str2fun('a=111'); p(a);
	function str2act(act){ return (function(){ run_more(act); }); }//生成动作序列的函数定义。
	// $('body').append('<button id="btn1">aaa</button>');
	// _Gdata('act',{'fun':'alert','opt':'aaaa'});
	// $('#btn1').click(str2act('act'));



//========================================运行（机器语言）
//run_var的扩展
function run_dom(who,fun,opt,save){ return run_var($(who),fun,opt,save); }
//例子
// include('_sys/jslib/jquery/jquery-ui-1.12.0/jquery-ui.min.css');
// include('_sys/jslib/jquery/jquery-ui-1.12.0/jquery-ui.min.js');
// include('_sys/jslib/jquery/jquery.ui.touch-punch-0.23.min.js');//手机触摸补丁
// inc_run(function(){

// 	$('body').append('<style type="text/css"></style>');
// 	$('body').append('<div id="drag">drag</div><div id="drop">drop</div>');
// 	$('style').append('.a {background:#ccc; border:1px solid #777; width:100px; height:100px;}');
// 	$('#drag, #drop').addClass('a');
// 	dd2var('act','aaa',json_decode('{"fun":"alert","opt":"333"}'));
// 	run_dom('#drag','click',_Gdata('aaa'));	

// 	_Gdata('act1',[ //同上
// 		{'fun':'run_dom','opt':['body','append','<style type="text/css"></style>']},
// 		{'fun':'run_dom','opt':['style','append','.a {background:#ccc; border:1px solid #777; width:100px; height:100px;}']},
// 		{'fun':'run_dom','opt':['body','append','<div id="drag">drag</div><div id="drop">drop</div>']},
// 		{'fun':'run_dom','opt':['#drag, #drop','addClass','a']},
// 		{'fun':'json_decode','opt':'{"fun":"alert","opt":"333"}','save':'dd1'},
// 		{'fun':'dd2var','opt':['act','aaa','dd1'],'isvar':[0,0,1]},
// 		{'fun':'run_dom','opt':['#drag','click','aaa'],'isvar':[0,0,1]}
// 	]);	run_more('act1');
// });


//变量的函数处理（执行函数）var.fun()   dom.fun()
function run_var(who,fun,opt,save){//对字符串数组进行处理
	// if(typeof who ==='string') var v1=_Gdata(who); else 
	var v1=who;//定位变量
	// if(v1===undefined) return p('error: run_var(who,fun,opt,save);//who is undefined!');//终止程序
	if(fun){
		var rs='';
		if(!opt) rs=v1[fun]();
		else rs=v1[fun](opt);
		if(toString.apply(opt)==='[object Array]'){
			var num=_count(opt);
			switch (num) {
				case 1: rs=v1[fun](opt[0]); break;
				case 2: rs=v1[fun](opt[0],opt[1]);break;
				case 3: rs=v1[fun](opt[0],opt[1],opt[2]);break;
				case 4: rs=v1[fun](opt[0],opt[1],opt[2],opt[3]);break;
				case 5: rs=v1[fun](opt[0],opt[1],opt[2],opt[3],opt[4]);break;
				default: break;
			}			
		}
	}else return;
	save=save||0;
	if(save===0) return rs;
	if(save==='this') return _Gdata(who,rs);
	else return _Gdata(save,rs);
}
	// _Gdata('a/b','ads|f|adfadsf');		// a['b']="ads|f|adfadsf";
	// run_var('a/b','split','|','a/c');	// a['c']=a['b'].split("|");
	// alert(_Gdata('a/c'));				// alert(a['c']);



//运行函数数 fun()
function run_fun(fun,opt,save){
	if(fun){
		var rs=''; //console.warn(fun,opt);//寻找错误时开启
		if(opt){
			if(typeof opt==='string') rs=window[fun](opt);
			else{
				if(Object.keys(opt).length>0){//数组时
					var num=_count(opt);
					switch (num) {
						case 1: rs=window[fun](opt[0]); break;
						case 2: rs=window[fun](opt[0],opt[1]);break;
						case 3: rs=window[fun](opt[0],opt[1],opt[2]);break;
						case 4: rs=window[fun](opt[0],opt[1],opt[2],opt[3]);break;
						case 5: rs=window[fun](opt[0],opt[1],opt[2],opt[3],opt[4]);break;
					}
				}else rs=window[fun](opt);//字符串和数组以外的可能
			}
		}else rs=window[fun]();
		if(save===undefined) return rs;	 else return _Gdata(save,rs);
	}
}
	// run_fun('showLog','eieiieieieiei');//放入函数体内的参数顺序。


//-----------

//执行一次
function run_one(who){
	if(who===undefined) return p('error: '+window.errpath,1); else window.errpath=who;//出错跳过，并在调试器中输出错误
	if(typeof who==='string') var g=clone(_Gdata(who)); else var g=who;
	if(g['msg']&&_Gdata('msgshow')){//提示：做了什么
		var arr=tplvars(g['msg']);//var arr=g['msg'].match(/\{(.*?)\}/g);
		if(arr===undefined) p('[提示]'+g['msg']);
		else{
			var in1=_Gdata('in'); var rs=g['msg'];
			if(in1===undefined) for (var i in g['opt']) { rs=rs.replace(arr[i], g['opt'][i]); }
			else for (var i in g['opt']) { rs=rs.replace(arr[i], in1[i]); }	
			if(g['save']) rs+='，并保存到{'+g['save']+'}里。';
			p('[提示]'+rs);
		}
	}
	if(g['isvar']){//等于php的isset()
		if(toString.apply(g['isvar'])==='[object Array]'){
			for(var i in g['opt']){
				if(g['isvar'][i]===1) {g['opt'][i]=_Gdata(g['opt'][i]);}
				else if(toString.apply(g['isvar'][i])==='[object Array]'){
					if(typeof g['opt'][i]==='string') g['opt'][i]=g['opt'][i].split(',');
					for (var x in g['opt'][i]) {
						if(g['isvar'][i][x]===1) g['opt'][i][x]=_Gdata(g['opt'][i][x]);
					}
				}
			}
		}else {
			if(g['isvar']===1){ rs=_Gdata(g['opt']); g['opt']=undefined; g['opt']=[]; g['opt'][0]=rs; } 
		}
	}
	if(g['save']) {
		if(g['opt']){
			if(g['isvar']) return run_fun(g['fun'],g['opt'],g['save']);
			else return run_fun(g['fun'],g['opt'],g['save']);
		}else return run_fun(g['fun'],undefined,g['save']);
	}else{
		if(g['opt']){
			if(g['opt'].length===undefined) return run_fun(g['fun'],[g['opt']]);//参数为对象时把整个对象当成一个参数来放入
			else return run_fun(g['fun'],g['opt']);
		}else return run_fun(g['fun']);
	}
}
	// _Gdata('in/0','aaaa');//入口变量
	// _Gdata('in/1','bbbb');//入口变量
	// function fun1(a,b){return a+'----'+b;}
	// _Gdata('m/test',{'fun':'fun1','opt':['in/0','in/1'],'isvar':[1,1],'save':'out'});//out为出口变量
	// run_one('m/test');
	// p(_Gdata('out'));
	// run_one({'fun':'_Gdata','opt':['asdf','adsf']});

	//功能模块（动作库）(in为操作区)
	// _Gdata('m/data/add',{'fun':'_Gdata','opt':['in/1','in/0'],'isvar':[1,1],'save':'out','msg':'把{什么值}赋值给{什么}变量'});
	// _Gdata('m/out/show1',{'fun':'p','opt':'out','isvar':1,'msg':'把变量out的结果显示给console中'});
	// run_one('m/data/add');
	// run_one({'fun':'_Gdata','opt':['in/1','in/0'],'isvar':[1,1],'msg':'把{什么值}赋值给{什么}变量'});
	// p(_Gdata('a'));



//-----------

//把数据放入选择区。把选择的对象的给选择区变量in中，等待action执行
function choose2in(dd,isobj){
	if(dd===undefined) return;
	if(typeof dd==='string'){
		if(dd.indexOf(',')<0){
			if(isobj===undefined) return _Gdata('in', [_Gdata(dd)]);
			else return _Gdata('in', _Gdata(dd));
		}else dd=dd.split(','); 
		p(dd)
	}
	if(isobj===undefined){ var rs=[]; for(var i in dd){ rs[i]=_Gdata(dd[i]); } }
	else{
		var rs={};
		for(var i in dd){
			var a=_Gdata(dd[i]);
			if(typeof a === 'string' ||typeof a==='number'||typeof a==='boolean'){
				if($.inArray(a,rs)<0){ var b=[]; b[Object.keys(rs).length]=a; rs=$.extend(rs, b); } 
			}else rs=$.extend(rs, a); 
		}//变量克隆

	}
	_Gdata('in','*DEL*');//清空后再保存
	return _Gdata('in', rs); 
}


//执行选择区里的数据
function in2action(act,in1,out){//直接刷入in变量里
	if(in1){//放入全局变量in中
		if(typeof in1 ==='string') _Gdata('in/0', in1);
		else for (var i in in1) { if(in1[i]) _Gdata('in/'+i, in1[i]); }	
	}
	if(out){
		if(typeof out==='string'){
			_Gdata('tmp2', clone(_Gdata(act)));
			_Gdata('tmp2/save',out);
			act=_Gdata('tmp2');			
		}else if(typeof out==='number'){
			if(typeof in1==='object') {in1=in1[0];}		//刷值，仍然还是局部变量
			if(out===1){ _Gdata('in/0', _Gdata(in1)); }	//in1为全局变量
			else if(out===2){ _Gdata('in/0', $(in1)); }	//in1为jquery对象
		}else{
			for (var i in in1) {
				if(in1[i]){
					if(out[i]===1){ _Gdata('in/'+i, _Gdata(in1[i])); }
					else if(out[i]===2){ _Gdata('in/'+i, $(in1[i])); }		
				}
			}
		}
	}
	run_one(act); // p(json_encode(act));
	if(typeof out==='string') _Gdata('tmp2','*DEL*');
}
// _Gdata('in',['aaaaa','a']);//in为入口变量、把aaaaa的值给a变量中
// in2action('m/data/add','xxxxx',{'opt/0':'x','isvar/0':0}); p(_Gdata('x'));
// in2action('m/data/add',['aaaaa','out']); p(_Gdata('out'));
// in2action('m/data/del','out'); p(_Gdata('out'));
// in2action('m/data/add',['aaaaa','a'],'aaa'); p(_Gdata('aaa'));
// in2action('m/data/show2','aaaaa'); //p(_Gdata('aaa'));


$(function(){


	// _Gdata('msgshow',1);			//显示 动作序列提示

	//-------方式1
	// //制作操作模块（动作库）(in为操作区)
	// _Gdata('m/str/set',{'fun':'_Gdata','opt':['in/1','in/0'],'isvar':[1,1],'save':'out','msg':'把{什么值}赋值给{什么}变量'});
	// _Gdata('m/str/del',{'fun':'_Gdata','opt':['in/0','*DEL*'],'isvar':[1,0],'msg':'删除{什么}变量'});
	// // _Gdata('m/str/replace',{'fun':'run_var','opt':['in/0','replace',['in/1','in/2']],'isvar':[1,0,[1,1]],'save':'out'});//不能批量替换，可以定制系统函数
	// _Gdata('m/str/replace',{'fun':'str_replace','opt':['in/0','in/1','in/2'],'isvar':[1,1,1],'save':'out','msg':'在{什么}字符串中，把{什么}替换为{什么}'});
	// _Gdata('m/str/2arr',{'fun':'run_var','opt':['in/0','split','in/1'],'isvar':[1,0,1],'save':'out','msg':'把字符串{什么}用{什么}来分割为数组'});
	// _Gdata('m/arr/2str',{'fun':'run_var','opt':['in/0','join','in/1'],'isvar':[1,0,1],'save':'out','msg':'把数组{什么}用{什么}来合并为字符串'});
	// _Gdata('m/out/show1',{'fun':'p','opt':'out','isvar':1,'msg':'把变量out的结果显示给console中'});
	// _Gdata('m/out/show2',{'fun':'alert','opt':'out','isvar':1,'msg':'把变量out的结果显示给alert中'});

	//例子1
	// _Gdata('data/k','aaa');		//数据池
	// _Gdata('data/v','aaaaaaa');	//数据池
	// choose2in('data/v,data/k');	//选择对象
	// in2action('m/str/set');		//操作对象
	//例子2
	// _Gdata('cc','asdfasdfasdfasd');					//字符串对象
	// choose2in('cc');								//选择对象
	// in2action('m/str/replace',['','f','*'],'in/0');	//操作对象1
	// in2action('m/str/replace',['','s','-']);		//操作对象2
	// in2action('m/out/show1');						//操作对象3
	//例子3
	// _Gdata('arr',['aaa','bbb','ccc']);
	// choose2in('arr');
	// in2action('m/arr/2str',['','==']);//数组转字符串
	// in2action('m/out/show2');
	// choose2in('out');
	// in2action('m/str/2arr',['','==']);//字符串转数组
	// in2action('m/out/show2');


	//-------方式2
	//动作库
	_Gdata('m/arr/2str2',{'fun':'run_var','opt':['thisobj','join','in/0'],'isvar':[1,0,1],'save':'thisobj','msg':'把数组{什么}用{什么}来合并为字符串'});
	_Gdata('m/str/2arr2',{'fun':'run_var','opt':['thisobj','split','in/0'],'isvar':[1,0,1],'save':'thisobj','msg':'把字符串{什么}用{什么}来分割为数组'});
	_Gdata('m/out/show4',{'fun':'alert','opt':'thisobj','isvar':1,'msg':'把变量thisobj的结果显示给alert提示框中'});
	_Gdata('m/out/show2html',{'fun':'run_var','opt':['in/0','in/1','in/2'],'isvar':[1,1,1],'msg':'把变量thisobj的结果显示在浏览器中'});
	_Gdata('m/run/more',{'fun':'run_more','opt':'in/0','isvar':1,'msg':'执行动作链条集合'});
	_Gdata('m/run/one',{'fun':'run_one','opt':'in/0','isvar':1,'msg':'执行一条动作链条'});
	_Gdata('m/run/range',{'fun':'range_run','opt':['in/0','in/1'],'isvar':[1,1],'msg':'指定的动作序号来执行动作链条的部分'})
	_Gdata('m/run/delay',{'fun':'delay_run','opt':['in/0','in/1','in/2','in/3'],'isvar':[1,1,1,1],'msg':'定时器来执行动作链条'})
	_Gdata('m/run/event',{'fun':'event_run','opt':['in/0','in/1','in/2'],'isvar':[1,1,1],'msg':'触发某个事件时执行'});
	_Gdata('m/run/try',{'fun':'try_run','opt':'in/0','isvar':1,'msg':'尝试执行，测试动作序列有错误时在控制台中显示错误信息'});
	_Gdata('m/run/for',{'fun':'for_run','opt':['in/0','in/1'],'isvar':[1,1],'msg':'循环执行几次动作序列'});
	_Gdata('m/run/switch',{'fun':'switch_run','opt':['in/0','in/1'],'isvar':[1,1],'msg':'循环执行几次动作序列'});
	_Gdata('m/run/if',{'fun':'if_run','opt':['in/0','in/1','in/2'],'isvar':[1,1,1],'msg':'循环执行几次动作序列'});
	_Gdata('m/dom/tag',{'fun':'_tag','opt':'in/0','isvar':1,'save':'thisobj','msg':'把选择的元件原子转换为html格式的字符串'})
	_Gdata('m/dom/kv2html',{'fun':'kv2html','opt':['in/0','in/1'],'isvar':[1,1],'save':'thisobj','msg':'把原件数据填充到元件kv皮肤中'})
	_Gdata('m/dom/obj2html',{'fun':'obj2html','opt':['in/0','in/1'],'isvar':[1,1],'save':'thisobj','msg':'把原件数据填充到元件自定义皮肤中'})



	//例子4
	// _Gdata('thisobj',['aaa','bbb','ccc']);	//选择对象
	// in2action('m/arr/2str2','==');			//操作对象，数组转字符串
	// in2action('m/out/show4');				//显示
	// in2action('m/out/show2html',['body','append'],2);
	//例子5
	// _Gdata('act/_start',[
	// 	{"fun":"_Gdata","opt":['a/b','ads|f|adfadsf']},
	// 	{"fun":"run_var",'opt':['a/b','split','|'],'isvar':[1],'save':'a/c'},
	// 	{"fun":"alert","opt":'a/c','isvar':1},
	// 	// {"fun":"_Gdata","opt":['ooo','<b>22223222</b>']}, 	//关联数组
	// 	// {"fun":"alert","opt":'ooo','isvar':1},
	// ]);
	// in2action('m/run/more');
	// in2action('m/run/one','act/_start/1');
	// run_more();

	//例子6
	// _Gdata('test/img1',{'tag':'img','src':'http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg','class':'img'});
	// _Gdata('test/a1',{'tag':'a','href':'#','cont':300});
	// choose2in('test/img1'); in2action('m/dom/tag');//---
	// in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);
	// in2action('m/dom/tag','test/a1',1);//---
	// in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);



});




//-----------

//批量执行
function run_more(act){
	act=act||'act/_start';//（程序起始点，不写参数时默认执行act/_start的加载动作）	
	var rs;
	if(typeof act==='string'){//从_Gdata中获取动作序列之后执行
		var arr=_Gdata(act);
		if(arr.length===undefined) rs=run_one(act);			//执行一条动作
		else { for(var i in arr){ rs=run_one(act+'/'+i); } }	//执行多条动作
	}else{//直接放入动作序列
		if(act.length===undefined) rs=run_one(act);			//执行一条动作
		else { for(var i in act){ rs=run_one(act[i]); } }	//执行多条动作
	}
	return rs;
}
// $(function(){
// 	_Gdata('act/showLog',[ //动作链，相当于函数体
// 		{"fun":"_Gdata","opt":['_TMP/a','JS执行时间：']},
// 		{"fun":"_Gdata","opt":['_TMP/c','ms']},
// 		{"fun":"run_fun","opt":['runtime','1','_TMP/b']},//为了加动态时间，要使用这么多行代码来实现这个功能 showLog('JS执行时间：' + runtime(1) +'ms');
// 		{"fun":"dd_hebing","opt":['_TMP/a,_TMP/b,_TMP/c','_TMP/d']},
// 		{'fun':'run_one','opt':[{'fun':'showLog','opt':'_TMP/d','isvar':1}]},
// 		{'fun':'_Gdata','opt':['_TMP','*DEL*']}
// 	]);
// 	// run_more('act/showLog'); //showLog('JS执行时间：' + runtime(1) +'ms');//等同于这个
// 	in2action('m/run/more','act/showLog');
// });



//执行所有，执行部分
function range_run(act,range){
	if(range){
		act=act||'act/_start'; var rs; var arr=range.split(',');
		for(var i in arr){ rs=try_run( act+'/'+arr[i]); }
	}else var rs=try_run(act);
	return rs;
}
// $(function(){
// 	_Gdata('act2',[
// 		{"fun":"p","opt":'aaaa'},
// 		{"fun":"p","opt":'bbbb'},
// 		{"fun":"p","opt":'cccc'},
// 		{"fun":"p","opt":'dddd'},
// 		{"fun":"p","opt":'eeee'}
// 	]);
// 	// range_run('act2','0,2,4');
// 	in2action('m/run/range',['act2','0,2,4']);
// });




function delay_run(type,who,num,act){ 
	//延迟执行队列 (按时间间隔执行动作序列一次)
	if(type==='start1'){ //开启，延迟执行1次
		if('undefined'==typeof timerOnce) timerOnce=[];
		return timerOnce[who]=setTimeout(function(){ run_more(act); },num);		
	}else if(type==='stop1'){ return clearTimeout(timerOnce[who]); } //停止定时器A
	//按间隔执行动作队列（按时间间隔执行动作序列，停止为止）
	if(type==='start2'){ //开启，延迟执行n次
		if('undefined'==typeof timerSome) timerSome=[];
		return timerSome[who]=setInterval(function(){ run_more(act); },num);
	}else if(type==='stop2'){ return clearInterval(timerSome[who]); }//停止定时器B
}
// $(function(){
// 	_Gdata('delay1',0);
// 	_Gdata('act1',[
// 		{'fun':'_zizeng','opt':'delay1','isvar':1,'save':'delay1'},
// 		{'fun':'p','opt':'delay1','isvar':1},
// 		{'fun':'if_dengyu','opt':['delay1',5],'isvar':[1,0],'save':'if1'},
// 		{'fun':'if_run','opt':['if1','act2']}
// 	]);
// 	_Gdata('act2',[{'fun':'delay_run','opt':['stop2','timerB']}])
// 	// delay_run('start1','timerA',200,'act1');//执行1次
// 	// delay_run('stop1','timerA');
// 	// delay_run('start2','timerB',1000,'act1');//执行n次
// 	// delay_run('stop2','timerB');
// 	in2action('m/run/delay',['start2','timerB',1000,'act1']);
// });



//用户操作时执行
function event_run(dom,event,act){
	var rs;
	if(act==='*DEL*') return $(dom)[event]=null;
	$(dom)[event](function(){ rs=run_more(act); });
	return rs;
}
// $(function(){
// 	_Gdata('act/_start',[
// 		{"fun":"_Gdata","opt":['thisobj','<b>[xxxxxx]</b>']}, 	//关联数组
// 		{"fun":"in2action","opt":['m/out/show2html',['body','append'],2]},
// 	]);
// 	// event_run('html','click','act/_start');
// 	in2action('m/run/event',['html','click','act/_start']);
// 	// event_run('html','ready');//必须要先有act/_start的动作序列，这样会自动执行 
// });



//try调试器
function try_run(act){	//报错不终止，跳出此函数继续执行
	try{ run_more(act); }
	catch(err) {
		var show='[errpath]: '+window.errpath+'\n[errmsg] : '+err.message; //(前面带var时变局部变量)
		if(_G['err_msg']===undefined) _Gdata('err_msg', [show]);
		else _Gdata('err_msg/'+_G['err_msg'].length, show);	//保存报错日志到变量中，以后发给服务器进行修改。
		p(_G['err_msg'][_G['err_msg'].length-1],1);			//在控制台输出错误信息
	}
}
// $(function(){
// 	_Gdata('act1',[
// 		{"fun":"_Gdata","opt":['ooo','<b>22223222</b>']},
// 		{"fun":"event_run","opt":["body","append","ooo"],"isvar":[0,0,1]}//错误位置。没有定义body变量会报错
// 	]);
// 	_Gdata('act2',{"fun":"fun2","opt":['_TMP/a']});//错误位置。没有fun2这个函数会报错
// 	run_more('act2');//普通方式，出错时终止程序不往下执行。
// 	// try_run('act1');
// 	// try_run('act2');//捕捉错误位置，并跳过函数。
// 	// in2action('m/run/try','act1');
// 	// in2action('m/run/try','act2');
// });




//执行动作 循环几次
function for_run(act,num){
	var rs;
	for(var i=0; i<num; i++){ rs=run_more(act); }
	return rs;
}
// $(function(){
// 	_Gdata('act/for1',[
// 		{'fun':'_zizeng','opt':'i','isvar':1,'save':'i'},
// 		{"fun":"p","opt":'i','isvar':1}
// 	]);
// 	_Gdata('i',0);
// 	// for_run('act/for1',4);
// 	in2action('m/run/for',['act/for1',2]);
// });



//对值进行比对后 执行
function switch_run(varname,ifact){
	var vn=_Gdata(varname);
	if(ifact[vn]) return run_more(ifact[vn]);
	// else p('[提示]没有'+varname+'='+vn+'的条件，所有switch_run函数没有被执行。',1);
}
	// $(function(){
	// 	_Gdata('act/if1',{"fun":"alert","opt":'真'});
	// 	_Gdata('act/if2',{"fun":"alert","opt":'假'});
	// 	_Gdata('abc',1);//值为1时执行动作序列1，只为3没有时不执行。
	// 	// switch_run('abc', {'1':'act/if1','2':'act/if2'});	
	// 	in2action('m/run/switch',['abc', {'1':'act/if1','2':'act/if2'}])
	// })




//条件判断后 执行
function if_run(ifvar,act,act2){
	var d1=_Gdata(ifvar); var rs;
	if(typeof d1==='object') if1=run_more(ifvar);
	else if1=d1;
	if(undefined===act2){ if(if1) rs=run_more(act); }//只有一个判断
	else{ if(if1) rs=run_more(act); else rs=run_more(act2); }//判断+否则，执行各自的动作序列
}
	// $(function(){
	// 	_Gdata('act/if1',{"fun":"alert","opt":'真'});
	// 	_Gdata('act/if2',{"fun":"alert","opt":'假'});
	// 	_Gdata('a1','aaa'); _Gdata('ifvar1',bisuan(_Gdata('a1'),'==','aaa'));
	// // 	_Gdata('ifvar1',0);//静态变量
	// // 	_Gdata('ifvar2',{'fun':'_Gdata','opt':'ifvar1'});//动态变量
	// 	if_run('ifvar1','act/if1','act/if2');
	// // 	in2action('m/run/if',['ifvar2','act/if1','act/if2']);
	// });


	//---------------
	//判断数据类型为什么时 执行 (if_run扩展)
	// function type_run(varname,type,act,act2){
	// 	if(typeof _Gdata(varname)===type) return run_more(act);
	// 	if(act2) return run_more(act2);
	// }
	// _Gdata('act',{'fun':'alert','opt':'aaaa'});
	// type_run('act','object','act');



//比算（比较,运算）
function bisuan(a,he,b){
	var f1={
		'&&':'if_and','||':'if_or','!':'if_not','and':'if_and','or':'if_or','not':'if_not',
		'==':'if_dengyu','===':'if_quandeng','!=':'if_budengyu','!==':'if_quanbudeng',
		'>':'if_dayu', '<':'if_xiaoyu', '>=':'if_dayudengyu', '<=':'if_xiaoyudengyu',
		'+':'num_jia', '-':'num_jian', '*':'num_cheng', '/':'num_chu', '%':'num_yu', '.':'str_lianjie'
	}
	if(f1[he]) return window[f1[he]](a,b);
}
	//------------------逻辑，比较（条件用）
	function if_and(a,b){ return a && b; }		//&& and
	function if_or(a,b){ return a || b; }		//|| or
	function if_not(a,b){ return !(a == b); }	//!  not

	function if_dengyu(a,b){ return a==b; } 	//==
	function if_quandeng(a,b){ return a===b; } 	//===
	function if_budengyu(a,b){ return a!=b; }	//!=
	function if_quanbudeng(a,b){ return a!==b; }//!==
	function if_dayu(a,b){ return a > b; }		//>
	function if_xiaoyu(a,b){ return a < b; }	//<
	function if_dayudengyu(a,b){ return a>=b; }	//>=
	function if_xiaoyudengyu(a,b){ return a<=b;}//<=

function get_type(v){ return typeof v;}//判断类型类型object,array,string,number,function..

	//----------计算（数字运算）
	function str_lianjie(a,b){return String(a) + String(b);}
	function num_jia(a,b){ return Number(a) + Number(b);}//+（加号在JS中可以是字符串连接符，所以保证两个值都是数字）
	function num_jian(a,b){ return a-b; }	//-
	function num_cheng(a,b){ return a*b; }	//*
	function num_chu(a,b){ return a/b; }	///
	function num_yu(a,b){ return a%b; }		//%

function _zizeng(a){ return ++a; }		//i+1
function _zijian(a){ return --a; }		//i-1






//========================================模板变量相关


//获取原件的信息 dom生成数组（item中获取）获取模板数据（获取部分数据）
function html2obj(dom,key,val){
	key=key||'num'; val=val||'cont';
	if(key==='num'){
		var rs=[];
		$(dom).each(function(e){
			if(val==='cont') rs.push($(this).html());
			else{
				if($(this).attr(val)!==undefined) rs.push($(this).attr(val));
			}
		});
	}else{
		var rs={};
		$(dom).each(function(e){
			if(val==='cont') rs[$(this).attr(key)]= $(this).html();
			else{
				if(key==='cont') rs[$(this).text()]=$(this).attr(val);
				else rs[$(this).attr(key)]=$(this).attr(val);
			}
		});	
	}
	if(Object.keys(rs).length>0) return rs;
}
// $('body').append('<select name="xxx"><option value="hello">你好</option><option value="world">世界</option></select>');
// p(json_encode(html2obj('[name=xxx] *')));
// p(json_encode(html2obj('[name=xxx] *','','value'))); //["hello","world"]
// p(json_encode(html2obj('[name=xxx] *','value','cont'))); //{"hello":"你好","world":"世界"}



//---------

//键值对方式，把数据给模板（多行）（制作item）模板套用
function kv2html(dd,tpl,toArr){//数据可以是关联数组也可以是索引数组。{k} {v}
	if(typeof dd==='string'){
		var rs= tpl.replace(/\{v\}/g,dd);
		// if(rs.indexOf('{uid}')>-1) rs=rs.replace('{uid}',uid());//替换唯一值
		return rs;
	}else {
		if(toArr){//自身数组替换
			if(toArr===1){//全部替换
				for (var i in dd) { var a=tpl.replace(/\{k\}/g,i); dd[i]=a.replace(/\{v\}/g,dd[i]); }
			}else{//只替换指定的
				for (var i in toArr) {
					if(toArr[i]==1){ var a=tpl.replace(/\{k\}/g,i); dd[i]=a.replace(/\{v\}/g,dd[i]); } 
				}
			}
			return dd;
		}else{//变成字符串
			var rs=''; 
			for (var i in dd) {
				var a=tpl.replace(/\{k\}/g,i); rs+=a.replace(/\{v\}/g,dd[i]);
				// if(rs.indexOf('{uid}')>-1) rs=rs.replace('{uid}',uid());//替换唯一值
			}
			return rs;
		}
	}
}
// p(kv2html(["hello","world"],'<option>{v}</option>\n'));//<option>hello</option><option>world</option>
// p(kv2html({"hello":"你好","world":"世界"},'<option value="{k}">{v}</option>\n'))//字符串//<option value="hello">你好</option><option value="world">世界</option>
// p(kv2html({"hello":"你好","world":"世界"},'<option value="{k}">{v}</option>',1));//数组


//自定义方式，把数据给模板（单行）（制作item）模板套用
function obj2html(dd,tpl,tt){
	if(tt){
		for (var k in tt) {
			if(tt[k]==1) dd[k]=k+'="'+dd[k]+'"';
			else{
				if(dd[k]==='string'){var a=tt[k].replace(/\{k\}/g,k); dd[k]=a.replace(/\{v\}/g,dd[k]);} 
				else dd[k]=kv2html(dd[k],tt[k]);
			} 
		}
	}
	// 	var ttk=tpl.match(/\{(.*?)\}/g); // alert(RegExp.$1);//ddk=Object.keys(dd);// p(ttk);p(ddk);
	var rs=tpl; for (var i in dd) {
		while(rs.indexOf('\{'+i+'\}')>-1){ rs=rs.replace('\{'+i+'\}',dd[i]);}//批量替换用while
	}
	// if(rs.indexOf('{uid}')>-1) rs=rs.replace('{uid}',uid());//替换唯一值		
	return rs;
}
// p(obj2html(['b','aaa','内容'],'<{0} class="{1}">{2}</{0}>',{2:"[{v}]"})); //<b class="aaa">[内容]</b>
// p(obj2html(['b','aaa','内容'],'<{0} class="{1}">{2}</{0}>')); //<b class="aaa">内容</b>
// p(obj2html({'tag':'b','class':'aaa','cont':'内容'},'<{tag} class="{class}">{cont}</{tag}>')); //<b class="aaa">内容</b>
// p(obj2html({'tag':'a','attr':"javascript:void(0);",'cont':'aaaa'},'<{tag}{attr}>{cont}</{tag}>',{'attr':' href="{v}"'}));//<a href="javascript:void(0);">aaaa</a>
// p(obj2html({'text':"aaa"},'<a{href}>{text}</a>', {'href':''}));//<a>aaa</a>
// p(obj2html({'text':"aaa","href":"javascript:void(0);"},'<a {href}>{text}</a>', {'href':1}));//<a href="javascript:void(0);">aaa</a>
// p(obj2html({'text':"aaa","href":"javascript:void(0);"},'<a {href}>{text}</a>', {'href':1,'text':'[{v}]'}));//<a href="javascript:void(0);">[aaa]</a>

//获取变量，修改变量，赋值给模板
// _Gdata('aa',{'text':"aaa"});
// run_one({'fun':'uid','save':'aa/uid'});//1
// run_one({'fun':'uid','save':'aa/uid'});//2
// p(obj2html(_Gdata('aa'),'<a {uid}{href}>{text}</a>', {'uid':1,'href':''}));//<a>aaa</a>

	// <select name="name1">
	// <option value="a">aaa</option>
	// <option value="b">bbb</option>
	// </select>
// p(obj2html(
// 	{'name':"name1","cont":{'a':'aaa','b':'bbb'}},
// 	'<select name="{name}">\n{cont}</select>\n',
// 	{'cont':'<option value="{k}">{v}</option>\n'}
// ));


//----------
//把xml转为数组(获取所有数据)。 获取模板数据
function xml2obj(dom,w){
	//if(typeof dom==='object') dom=dom[0];
	var rs={}; var attr=dom.attributes;
	if(w){
		if(w==='tag') return dom.nodeName.toLowerCase();
		else if(w==='cont') return dom.innerHTML;
		else if(w==='attr'){
			if(dom.attributes!==undefined){
				for (var i=0; i<attr.length; i++) { rs[attr[i].nodeName]=attr[i].nodeValue; }
				return rs;
			}else return ;
		}
	}else{
		rs['tag']=dom.nodeName.toLowerCase();
		rs['cont']=dom.innerHTML;
		if(dom.attributes!==undefined){
			for (var i=0; i<attr.length; i++) { rs[attr[i].nodeName]=attr[i].nodeValue; }
			if(rs['class']) rs['class']=rs['class'].split(' ');
			if(rs['style']){
				var s=rs['style'].split(';'); rs['style']={};
				for (var i = 0; i < s.length; i++) {
					if(s[i]){
						var j=s[i].split(':');
						rs['style'][trim(j[0])]=trim(j[1]);				
					}
				}
			}
		}
		return rs;		
	}
}
// <div id='abc' class="a b c" style="background-color: #ccc; color: #222;" title="aaaa">bbbbb<b>aa</b></div>
// <div>bbbbb<b>aa</b></div>
// attr=xml2obj(_dom($('#abc')));
// attr['tag']='p';
// p(json_encode(attr));
// p(_tag(attr));
// $('body').append(_tag(attr));

//单标签双标签。 模板套用
function _tag(arr){
	if(arr==='undefined') return;
	var t={'img':1,'input':1,'param':1,'meta':1,'link':1,'br':1,'hr':1}//所有单标签
	if(t[arr['tag']]===1){ //tag1 单标签(img,)
		var rs='<{tag}{attr} />';var attr='';
		rs=rs.replace(/{tag}/g, arr['tag']);
		delete arr['tag']; delete arr['cont'];//单标签不用cont
	}else{//tag2 双标签(a,pl,li,)
		var rs= '<{tag}{attr}>{cont}</{tag}>';var attr='';
		rs=rs.replace(/{tag}/g, arr['tag']);
		delete arr['tag'];
		if(!arr['cont']) delete arr['cont'];
		else rs=rs.replace('{cont}', arr['cont']);
		delete arr['cont'];
	}//tag,cont以外剩下的都是属性
	for(var i in arr) {
		p(i)
		if(typeof arr[i]!=='string'){
			if(i==='style'){
				var tmp=arr[i]; arr[i]='';
				for (var k in tmp) { arr[i]+=k+':'+tmp[k]+';'; }
			}else if(i==='class') arr[i]=arr[i].join(' ');
		}
		attr+=' '+i+'="'+arr[i]+'"';
	}
	return rs.replace('{attr}', attr);
}

// $(function(){
// 	$('body').append(_tag({'tag':'img','src':'http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg','class':'img'}));
// 	$('body').append(_tag({'tag':'a','href':'#','cont':300}));
// });




//获取模板中的所有变量名。正则获取 占位替换用
function tplvars(str){
	if(str.lastIndexOf('\{')>-1){//{xxx}
		var arr = str.match(/\{(.+?)\}/g);
		for (var i in arr) { arr[i]=arr[i].substr(1,arr[i].length-2); }		
		return arr;
	}
	if(str.lastIndexOf('\{\$')>-1){//优先级 {$xxx}
		var arr = str.match(/\{\$(.+?)\}/g);
		for (var i in arr) { arr[i]=arr[i].substr(2,arr[i].length-3); }		
		return arr;
	}
	if(str.lastIndexOf('\[')>-1){//[xxx]
		var arr = str.match(/\[(.+?)\]/g);
		for (var i in arr) { arr[i]=arr[i].substr(1,arr[i].length-2); }
		return arr;
	}
}
// var str="123{$你的}456{我的}78{sdfgsdfg}9";
// alert(tplvars(str));






//=====================================图片处理相关
//（base64 ->blob ->file upload）
//------文字base64
(function(window){
	var base64 = {};
	base64.map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	base64.decode = function(s){
		s += '';
		var len = s.length;
		if((len === 0) || (len % 4 !== 0)) return s;
		var pads = 0;
		if(s.charAt(len - 1) === base64.map[64]){
			pads++;
			if(s.charAt(len - 2) === base64.map[64]) pads++;
			len -= 4;
		}
		var i, b, map = base64.map, x = [];  
		for(i = 0; i < len; i += 4){  
			b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i + 1)) << 12) | (map.indexOf(s.charAt(i + 2)) << 6) | map.indexOf(s.charAt(i + 3));
			x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff, b & 0xff));
		}
		switch(pads){
			case 1:
				b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12) | (map.indexOf(s.charAt(i)) << 6);
				x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff));
				break;
			case 2:
				b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12);
				x.push(String.fromCharCode(b >> 16));
				break;
		}
		return unescape(x.join(''));
	};
	base64.encode = function(s){  
		if(!s) return;
		s += '';          
		if(s.length === 0) return s;  
		s = escape(s);
		var i, b, x = [], map = base64.map, padchar = map[64];
		var len = s.length - s.length % 3;
		for(i = 0; i < len; i += 3){
			b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i+1) << 8) | s.charCodeAt(i+2);
			x.push(map.charAt(b >> 18));
			x.push(map.charAt((b >> 12) & 0x3f));
			x.push(map.charAt((b >> 6) & 0x3f));
			x.push(map.charAt(b & 0x3f));
		}
		switch(s.length - len){  
			case 1:
				b = s.charCodeAt(i) << 16;
				x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
				break;
			case 2:
				b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
				x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
				break;
		}
		return x.join('');
	};
	window.base64 = base64;
})(window);

// str='asdfasdfasdfas';
// en1=base64_encode(str);
// alert(en1);
// alert(base64_decode(en1));



//直接把外部域名中的图片转为base64（图片base64）
function imageURL2base64(url) {
	var img = new Image();
	img.crossOrigin = '';
	img.src = url;
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
	var dataURL = canvas.toDataURL("image/"+ext);
	return dataURL;
}
// window.onload = function(){//此方法在onload时才生效
// 	var src = "https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg";
// 	//var src = "http://127.0.0.1/base64/1.jpg";
// 	var base64 = imageURL2base64(src);
// 	console.log(base64);
// }


//将dataURL的地址数据 转换为Blob
function dataURL2blob(dataurl) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
	var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);//去掉url的头，并转换为byte
	while(n--){ u8arr[n] = bstr.charCodeAt(n); }//处理异常,将ascii码小于0的转换为大于0
	return new Blob([u8arr], {type:mime});
}
// var blob = dataURL2blob('data:text/plain;base64,YWFhYWFhYQ==');


//Blob对象转换为dataURL, File对象转换为dataURL（File对象也是一个Blob对象，二者的处理相同。）
function blob2dataURL(blob, callback) {
	var a = new FileReader();
	a.onload = function(e) {callback(e.target.result);};
	a.readAsDataURL(blob);
}
// blob2dataURL(blob, function (dataurl){ console.log(dataurl); });
// blob2dataURL(file, function (dataurl){ console.log(dataurl); });






//================================数据上传到服务器

//获取表单数据（被选择的表单数组）
function form2obj(dom) {//获取所有表单数据（checked的所有数据，包括selected的数据）
	var rs={}; dom=dom||'';
	$(dom+' :checked').each(function(){//select,input都可以
		var name;
		if($(this).is('option')) name=$(this).parent().attr('name');
		else name=$(this).attr('name');
		if(rs[name]===undefined) rs[name]=$(this).val();
		else {
			if(typeof rs[name]==='string'){
				var tmp=rs[name];rs[name]=[]; rs[name].push(tmp);
			}
			rs[name].push($(this).val());
		}
	});
	$(dom+' textarea').each(function () {//获取textarea的数据
		if($(this).val()!=='') rs[$(this).attr('name')]=$(this).val();
	});
	// $(dom+' [type="file"]').each(function(){//获取选择的文件名
	// 	if($(this).val()!=='') rs[$(this).attr('name')]=$(this).val();
	// });
	return rs;
}
// $('body').append('<form name="ddd"><textarea name="comment"></textarea><select name="eee"><option>First</option><option>Second</option></select> <input type="radio" name="a" value="1"><input type="radio" name="a" value="2"><input type="checkbox" name="bbb" checked="checked" value="Daily" /> <input type="checkbox" name="bbb" value="Weekly" /></form>');
// $('body').append('<form name="xxx"><select name="aaa" multiple><option>First</option><option>Second</option></select> <input type="radio" name="a" value="1"><input type="radio" name="a" value="2"><input type="checkbox" name="bbb" checked="checked" value="Daily" /> <input type="checkbox" name="bbb" value="Weekly" /></form>');
// tt1=1;
// timer111=setInterval(function(){
// 	showLog(_toString(form2obj('[name=xxx]')));
// 	++tt1;
// 	if(tt1>5)clearInterval(timer111);
// },1300);


//文件上传到服务器(支持批量上传图片)
function file_upload(formdom,postdata,successfun){
	// <form id="file_form" enctype="multipart/form-data" method="post"></form>
	// <input type="file" accept="image/*" name="file_upload" multiple  maxlength="10" />
	// 另外还有multiple属性，意思就是可以选择多个文件。添加了这个属性之后，再配合FormData对象，可以实现批量上传。
	if(typeof formdom==='string'){//dom定位到form
		if(formdom==='*POST*'){//无表单的发送,post数据（只发送数据不发送文件）
			var fd= new FormData();
		}else{
			if(toString.apply($(formdom)[0])!=='[object HTMLFormElement]') return false;//不是表单类型时跳出
			var fd = new FormData();
			var file1=$(formdom+' :file');//对所有file类型重新进行更名处理来实现批量上传。
			for (var x = 0; x < file1.length; x++) {
				var files =file1[x].files;
				for (var i = 0; i < files.length; i++) {
					fd.append(file1[x].name+'[]', files[i]);//input type="file" name="{file1[x].name}"
				}
			}
		}
	}else {//直接放入fd类型，如canvas的base64格式
		if(toString.apply(formdom) !=='[object Blob]') return false;//不是blob类型时跳出
		var fd= new FormData();//formdom为blob文件。如画图canvas生成的图片数据
		fd.append('file_upload', formdom, "canvasblob.png");//结合post在服务器中命名（这里写死的名字不重要）
	}
	if(postdata!=='') for(var i in postdata) { fd.append(i,postdata[i]); }//添加post数据
	var option={//上传文件（发送数据。post数据也增加进去的话会一起发送）
		url: "main.php/post", type: "POST", data: fd,
		processData: false,  // 告诉jQuery不要去处理发送的数据
		contentType: false   // 告诉jQuery不要去设置Content-Type请求头
	};
	successfun=successfun||function(msg){
		$('body').append('<pre>'+json_format(msg));
		// var json=json_decode(msg);
		// for(var i=0; i<json.length; i++){ $('body').append('上传成功：<img src="'+json[i]['src']+'" />'); }
	}
	add1={
		// xhr:function(){            //在jquery函数中直接使用ajax的XMLHttpRequest对象
		// 	var xhr = new XMLHttpRequest();
		// 	xhr.upload.addEventListener("progress", function(evt){
		// 		if (evt.lengthComputable) {
		// 			var percentComplete = Math.round(evt.loaded * 100 / evt.total);  
		// 			console.log("正在提交."+percentComplete.toString() + '%');        //在控制台打印上传进度
		// 		}
		// 	}, false);
		// 	return xhr;
		// },
		success: successfun
	};
	$.extend(option, add1);
	$.ajax(option);
}
// $(function(){
	// 例子3 批量上传文件
	// $('body').append('<form id="file_form" enctype="multipart/form-data" method="post"><input type="file" accept="image/*" name="file_upload" multiple  maxlength="10" /><input type="file" accept="image/*" name="file_22" multiple  maxlength="10" /><input type="submit" value="submit" /></form>');
	// f1='#file_form';
	// $(f1).submit(function (e) {
	// 	e.preventDefault();//表单发送后，不刷新页面
	// 	file_upload(f1);//
	// });
	//例子1 canvas图片保存到服务器
	// $('body').append('<input id="btn1" type="button" value="上传" />');
	// $( "#btn1" ).click(function(){
	// 	$('body').append('<canvas id="myCanvas" width="200" height="100"></canvas>');
	// 	var canvas=document.getElementById("myCanvas");//选择操作的绘图板
	// 	var cxt=canvas.getContext("2d");//绘图
	// 	cxt.fillStyle="green";//绘图
	// 	cxt.fillRect(0,0,150,75);//绘图
	// 	var dataurl = canvas.toDataURL('image/png');//把canvas图像转为base64的image/png格式
	// 	//var dataurl = canvas.toDataURL('image/jpeg', 0.8);//canvas转换为dataURL (从canvas获取dataURL)
	// 	// console.log(dataurl);//base64的图片字符串
	// 	var blob = dataURL2blob(dataurl);
	// 	file_upload(blob);//上传绘图数据
	// 	// file_upload(blob,{'filename':'canvasimg1.jpg'});//上传绘图数据+post数据
	// 	// file_upload(blob,{'filename':'canvasimg1.jpg'},function(msg){alert(msg);});//上传绘图数据+post数据+反馈后执行语句
	// });
	//例子2 单文件上传
	// $('body').append('<form id="fileinfo">上传文件：<input type="file" name="file_upload"/><input id="btn1" type="button" value="上传" /> </form>  ');
	// $( "#btn1" ).click(function(){
	// 	// file_upload('fileinfo');//表单名
	// 	// file_upload('fileinfo',{"aa":"111",'bb':'222'});//表单名+post数据
	// 	file_upload('#fileinfo',{"adsf":"asdf"},function(msg){ alert(msg); });//表单名+post数据+反馈后执行语句
	// });
// });





//====================================保存数据


//本地存储 ---localStorage (IE8+ 在http下执行)
function _LS(k,v){
	if(v){
		if(v==='*DEL*') return localStorage.removeItem(k); 		//删除
		else if(v==='*ALLDEL*') return localStorage.clear();	//全部删除
		if(v) return localStorage.setItem(k, v);				//设置值		
	}else if(k){
		if(k==='*NUM*') return localStorage.length;				//统计个数
		return localStorage.getItem(k);							//获取值
	}else{//获取所有键名
		var rs=[];var n=localStorage.length;
		for (var i = 0; i < n; i++) { rs.push(localStorage.key(i)); }
		if(rs.length>0) return rs;
	}
}
// _LS('name1','aaaa');
// _LS('name2','bbbb');
// p(_LS('name1'));
// p(_LS('name2'));
// // p(_LS('name1','*DEL*'));
// p(_LS());



//本地数据 ---cookie (在http下执行)
//添加cookie
function add_cookie(name,value,expiresHours,path,domain){ 
	var cookieString=name+'='+escape(value); 
	if(expiresHours>0){ 	//判断是否设置过期时间 
		var date=new Date(); 
		date.setTime(date.getTime+expiresHours*3600*1000); 
		cookieString=cookieString+'; expires='+date.toGMTString(); 
	} 
	if(typeof path =='string') cookieString=cookieString+'; path='+path;
	//if(typeof domain=='string') cookieString=cookieString+'; domain='+domain;
	document.cookie=cookieString; 
} 
//删除cookie (不能删除其他路径中生成的cookie值)
function del_cookie(name){ 
	var date=new Date(); 
	date.setTime(date.getTime()-10000); 
	document.cookie=name+"=v; expires="+date.toGMTString(); 
} 
//获取cookie
function get_cookie(name){ 
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]==name)return arr[1]; 
	}
} 
//add_cookie('a','aaaaaa',1,0,'a.localhost');
//add_cookie('b','bbbbb',1);
//del_cookie('a');
//alert(get_cookie('a'));






//======================================数据处理

//变量的复制与移动
function copy_var(who,save){ _Gdata(save,_Gdata(who)); }
function move_var(who,save){ _Gdata(save,_Gdata(who)); _Gdata(who,'*DEL*'); }

//数据追加
function str_rplus(who,val,save){
	if(who===undefined || val===undefined || val==='') return;
	else var rs=_Gdata(who)+val;//给字符串向后追加数据
	if(save===undefined) return rs; else _Gdata(who, rs);
}
function str_lplus(who,val,save){
	if(who===undefined || val===undefined || val==='') return;
	else var rs=val+_Gdata(who);//给字符串向前追加数据
	if(save===undefined) return rs; else _Gdata(who, rs);
}
// _Gdata('a/a','aaaa');
// str_rplus('a/a','bbbb','a/a');
// alert(_Gdata('a/a'));


//正则匹配 （解决eval注入问题）
function reg_match(str,reg){
	var if1=true; 
	n=[reg.substr(0,reg.indexOf('/')), 
	reg.substr(reg.indexOf('/')+1,reg.lastIndexOf('/')-1),  
	reg.substr(reg.lastIndexOf('/')+1,reg.length)];
	if(reg.length >30) if1=false;
	else if(n[0].indexOf(';')>-1) if1=false;//注入格式 aaa=111;/\d/g
	else if(n[2].indexOf(';')>-1) if1=false;//注入格式 /\d/g;aaa=111
	else if(n[1].indexOf(';')>0) if1=false;//注入格式 /;aaa=111;/
	if(if1) return str.match(eval(reg));//转成正则http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
	else return '正则中不能包含非法关键词';
}
// $('body').append('<input id="in1" type="text" value="1 plus 2 equal 3" /><input id="in2" type="text" value="/\\d/g" /><button id="btn1">测试</button>');
// $('#btn1').click(function (){ showLog(reg_match($('#in1').val(),$('#in2').val())); });//程序中的写法要写正斜杠 var reg='/\d/g';
//var re = new RegExp("a","gi");

//批量替换字符串
function str_replace(str,a,b){ var re = new RegExp(a,'g'); return str.replace(re,b); }

//-------------字符串处理

	//把数据池中的多个字符串合并成一个。
	function dd_hebing(dds,save){ //函数定义不能放在$(function(){ 结构体中 });
		var arr=dds.split(','); var rs='';
		for (var i in arr) { rs+=_Gdata(arr[i]); }
		if(save===undefined) return rs;
		else _Gdata(save,rs);
	}
	//删除左右两端空格
	function trim(str){ return str.replace(/(^\s*)|(\s*$)/g, ''); }
	// alert(trim('   asdfa   '));

function str2arr(str,fu){ fu=fu||','; return str.split(fu); }	//字符串转数组
function arr2str(arr,fu){ fu=fu||','; return arr.join(fu); }	//数组转字符串
function _toNum(dom){ if( 'NaN'!==Number(dom).toString() ) return (Number(dom)); } //转化为数字


//----------------- 统计 个数
//判断类型
function is_arr(arr){
	if(typeof arr==='object'){
		if(arr.length===undefined) return 'object';//关联数组时
		else return 'array';//索引数组时
	}else return typeof arr;//其他类型按它自身的
}
// alert(is_arr(['aa','bb']));
// alert(is_arr({'aa':'bb'}));

//统计
function _count(arr){
	if(typeof arr==='object'){
		if(arr.length===undefined) return Object.getOwnPropertyNames(arr).length;//对象计数。但数组时这个函数中有length,所以计数也会多一个的错误。
		else return arr.length;//数组计数。Object.keys不能对关联数组判断个数。只能用在索引数组上。但索引数组可以直接用.length来获取个数。
	}else if(typeof arr==='string') return arr.length;
	else return 1;
}
// alert(_count({'aa':"bbb"}))
// alert(_count(['aa',"bbb"]))




	//获取数组的所有键名  (用于界面变量列表中进行修改操作)
	function arr_keys(p){//必要吗?????
		// return Object.keys(p);
		var rs=[];
		if(p===undefined || p==='') var arr=_G;
		else {
			if(_Gdata(p)===undefined) return false;
			else var arr=_Gdata(p);
		}
		if(typeof arr==='object' || typeof arr==='array'){
			for(var i in arr){ rs.push(i); }
			return rs;
		}else return false;
	}




//======================加密编码（输入值）唯一值


//唯一标识（字符串转crc32码）//来自http://create.stephan-brumme.com/crc32/
function crc32(text){
	var Polynomial = 0xEDB88320; // CRC32b polynomial
	var crc = 0xFFFFFFFF;// start value
	for (var i = 0; i < text.length; i++){
	    crc ^= text.charCodeAt(i); // XOR next byte into state
		for (var bit = 0; bit < 8; bit++){// process 8 bits
			if ((crc & 1) != 0) crc = (crc >>> 1) ^ Polynomial; // look at lowest bit
			else crc =  crc >>> 1;
		}
	}
	function hex(what){
		if (what < 0) what = 0xFFFFFFFF + what + 1; // adjust negative numbers
		var result = what.toString(16); // convert to hexadecimal string
		return ('0000000' + result).slice(-8); // add leading zeros
	}
	return hex(~crc); // return hex string
}
// p(crc32("WERQWERQWERQWERQWRQWERQWERQWERQWE"));  //32dd92cc


//生成唯一uid编号 (利用了js的闭包性质) 
var uid = (( function(){ var value = 0; return function(){ return ++value; };  })());
var uid2=0;
// alert(uid());//1
// alert(uid());//2


//生成唯一guid值 (生成随机值)
// function guid(){
// 	var s4=function(){ return (((1+Math.random())*0x10000|0).toString(16).substring(1)); }
// 	return (s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4());
// }
// alert(guid());





//====================================json互转array

//JSON编码
function json_encode(arr,type){
	if('function' == typeof($.toJSON)) var rs= $.toJSON(arr);			//要引入jquery.json.js插件
	else var rs= JSON.stringify(arr);									//系统自带。IE8+内置支持（推荐）
	if(type===1)return json_format(rs);
	else return rs;
}
//JSON解析
function json_decode(json){
	if('function' == typeof($.parseJSON)) return $.parseJSON(json);		//要引入jquery.min.js
	else return $.evalJSON(json);										//系统自带。
}
//JSON格式化
function json_format(txt,compress/*是否为压缩模式*/){						/* 格式化JSON源码(对象转换为JSON文本) */  
	var indentChar = '	';
	if(/^\s*$/.test(txt)){
		//alert('数据为空,无法格式化! '); return;
		return '数据为空,无法格式化! ';
	}
	try{ var data=eval('('+txt+')'); } catch(e){
		return '数据源语法错误,格式化失败! 错误信息: '+e.description;
		// alert('数据源语法错误,格式化失败! 错误信息: '+e.description,'err'); return;   
	};   
	var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;
	var notify=function(name,value,isLast,indent/*缩进*/,formObj){
		nodeCount++;													/*节点计数*/
		for (var i=0,tab='';i<indent;i++ )tab+=indentChar;				/* 缩进HTML */
		tab=compress?'':tab;											/*压缩模式忽略缩进*/
		maxDepth=++indent;												/*缩进递增并记录*/
		if(value&&value.constructor==Array){							/*处理数组*/
			draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);		/*缩进'[' 然后换行*/
			for (var i=0;i<value.length;i++)
				notify(i,value[i],i==value.length-1,indent,false);
			draw.push(tab+']'+(isLast?line:(','+line)));				/*缩进']'换行,若非尾元素则添加逗号*/
		}else   if(value&&typeof value=='object'){						/*处理对象*/
				draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);	/*缩进'{' 然后换行*/
				var len=0,i=0;
				for(var key in value)len++;
				for(var key in value)notify(key,value[key],++i==len,indent,true);
				draw.push(tab+'}'+(isLast?line:(','+line)));			/*缩进'}'换行,若非尾元素则添加逗号*/
			}else{
					if(typeof value=='string')value='"'+value+'"';
					draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);
			};
	};
	var isLast=true,indent=0;   
	notify('',data,isLast,indent,false);   
	return draw.join('');   
} 


//===============================js, css相关

//顺序加载外部资源。（为了引入完成后执行，不用异步加载。）
function include(url,dom){ //导入外部文件。(支持css,tpl,js文件)
	if(typeof inc_list==='undefined') inc_list=[];
	if(typeof suo==='undefined') suo=0;
	if(typeof url==='string') inc_list.push(url);
	//每一次引入都放入列表中，第一个执行完了，判断引入列表中有没有有，有则继续执行并删除列表中执行过的，直到没有为止
	if(inc_list.length!==0 && suo===0){
		suo=1;
		var hz=inc_list[0].substring(inc_list[0].lastIndexOf('.')+1, inc_list[0].length);  
		if(hz==='css'){
			$('head').append('<link rel="stylesheet" type="text/css" href="'+inc_list[0]+'">\n'); //异步加载外部CSS文件（有延迟）
			inc_run();
		}else if(hz==='js'){
			$.getScript(inc_list[0],function(){ inc_run(); });
			//$('head').append('<script type="text/javascript" src="'+inc_list[0]+'"><\/script>\n'); //异步加载外部JS文件（有延迟）
		}else if(hz==='tpl'){ //----以后需要缓存到本地
			dom=dom||'body';
			$.post('main.php/post', { cmd:'readtpl','url':inc_list[0] }, function(data){
				if(data){ $(dom).append(data); }
				inc_run();
			});
		} // else if(hz==='tpl'){dom=dom||'body'; $(dom).load(url); }//无法确定加载完毕
	}
} function del_inc(url){ $("head>[src='"+url+"']").remove(); } //删除外部文件.js文件.css文件 

	// include('jslib/jquery-2.2.0.min.js');
	// include('jslib/test.js');
	// include('jslib/test.css');
	// del_inc('jslib/test.js');
	// del_inc('jslib/test.css');



//引入完成后执行
function inc_run(fun){
	if(typeof fun=='undefined'){
		// p('include '+inc_list[0]);
		suo=0; inc_list.shift();//删除第一个
		if(inc_list.length!==0 && suo===0) include();
		else if(typeof incfun!=='undefined') incfun();
	}else incfun=fun;
}


//加载js,css完成后，要执行的代码写在里面。（可用于插件程序）
// function worker(fun){
// 	// worker还是没用。http://www.cnblogs.com/feng_013/archive/2011/09/20/2175007.html
// 	if(fun===undefined) return false;
// 	var blobJS = new Blob(['onmessage=function(e){postMessage(e.data);}'], {type:'text/javascript'}); 
// 	var wk = new Worker(URL.createObjectURL(blobJS));//异步，worker多线程。
// 	wk.postMessage(1);
// 	if(typeof fun==='function'){ wk.onmessage=fun; return true;}//执行函数
// 	else wk.onmessage=function(){ return run_more(act); }//动作链条
// }
// include('w/172.30.1.35/index/db/form1.tpl');
// include('w/172.30.1.35/index/db/form1.js');//引入外部js,css文件后的下面一行写
// setTimeout(fun2,0);//开控制台后有明显的白屏时间。
// inc_run(fun2);//上面的所有加载完成后，执行什么函数（有卡顿现象，但没有白屏）


//-----------

//code 添加JS事件 
function add_js(key,val){ //函数名，传参名，函数体内代码
	if(key.indexOf('/')<0 && val!==0) { if('undefined'==typeof _G) _G={}; return eval('_G["'+key+'"]='+val); }
	var a=key.split('/');
	n=a.length;
	if(val!==0){
		if('undefined'==typeof _G) _G={};
		if(n===1) return  eval('_G["'+a[0]+'"]='+val);
		if('undefined'==typeof _G[a[0]]) _G[a[0]]={};
		if(n===2) return eval('_G["'+a[0]+'"]["'+a[1]+'"]='+val);
		if('undefined'==typeof _G[a[0]][a[1]]) _G[a[0]][a[1]]={};	
		if(n===3) return eval('_G["'+a[0]+'"]["'+a[1]+'"]["'+a[2]+'"]='+val);
		if('undefined'==typeof _G[a[0]][a[1]][a[2]]) _G[a[0]][a[1]][a[2]]={};
		if(n===4) return eval('_G["'+a[0]+'"]["'+a[1]+'"]["'+a[2]+'"]["'+a[3]+'"]='+val);
		if('undefined'==typeof _G[a[0]][a[1]][a[2]][a[3]]) _G[a[0]][a[1]][a[2]][a[3]]={};
		if(n===5) return eval('_G["'+a[0]+'"]["'+a[1]+'"]["'+a[2]+'"]["'+a[3]+'"]["'+a[4]+'"]='+val);
	}
}
// $(function(){
// 	$('body').append('<button>btn</button>');
// 	_Gdata('act1',{'fun':'add_js','opt':['FUN/funX','function(){$(this).hide();}']});
// 	in2action('m/run/one','act1',1);
// 	in2action('m/out/show2html',['button','click','FUN/funX'],[2,0,1]);
// });



//code 运行CSS样式（覆盖css）
function add_css(key,val,type){
	if(type===undefined) $(key).attr('style',val);
	else $(key).attr('style', _Gdata(val));//清零覆盖。style方式css不追加
}
	// $(function(){
	// 	add_css('div','background:#c0c;width:400px;'); //方式1
	// 	_Gdata('css/bg3','background:blue;'); add_css('div','css/bg3',1); //方式2
	// });



//用于动态生成<style>（追加css）
function arr2css(arr){
	var rs='';
	for (var i in arr) { rs+= i+':'+arr[i]+'; '; }
	return rs;
}
// alert(arr2css(cssarr));

function css2arr(css){
	var obj={};
	var arr=css.split(';');
	for (var one in arr) {
		var kv=arr[one].split(':');
		if(kv[0]) obj[trim(kv[0])]=trim(kv[1]);//alert(trim(kv[0]))
	}
	return obj;//alert(json_encode(obj));
}
// var cssarr=css2arr('border:1px solid #ccc; width:300px');
// // alert(json_encode( cssarr))
// $('div').css(cssarr);//追加CSS


function dom_css(dom,css,save){
	var c=_Gdata(css);
	if(c===undefined) c=css;
	save=save||0;
	var rs=dom+' { '+c+' }\n';
	if(save===0) return rs; else _Gdata(save,rs);
}
// alert(dom_css('*[css]','background:#ccc;'));









//===================================== other


//禁用文本选取
function notcopy(type){
	type=type||0;
	if(type===0) document.onselectstart=function() {return false;}  //防复制
	else document.onselectstart=function() {return true;}  			//取消
}
// notcopy();
// notcopy(1);

function basename(str){ return str.substring(str.lastIndexOf('/')+1,str.length); }
function dirname(str){ return str.substring(0,str.lastIndexOf('/')); }
//showLog(dirname(location.pathname));
//showLog(basename(location.pathname));




//=========================调试器（显示日志）


//显示调试器窗口
function showLog(text){
	var tm =setInterval(function(){
		if('complete'==document.readyState) {//页面加载完毕之后
			w(text);
			clearInterval(tm);
		}
	},5);
}
	// showLog('JS执行时间：' + runtime(1) +'ms');

	function w(text,node) {//插入DOM里
		var tag=document.createElement('pre');
		var date=new Date().getTime();
		tag.innerText='['+date+'] '+text;
		if(typeof node=='undefined') var node='#showLog';
		if(document.querySelector(node)) document.querySelector(node).appendChild(tag);
		else document.body.appendChild(tag);//默认放在body体的内
	}

//显示 console
function p(val,t){
	if(val==='show'){//调试：浏览器对象，全局变量
		// console.log('浏览器对象: ', window, document, navigator, screen, history, location);
		// showLog(get_G('window'));
		// showLog(get_G('document'));
		// showLog(get_G('navigator'));
		// showLog(get_G('screen'));
		// showLog(get_G('history'));
		// showLog(get_G('location'));
		if(_G!==undefined) {
			//console.log('全局变量 _G:', _G);	//_G未定义之前会报错
			$('body').append('<pre><textarea style="width:500px;height:300px;">_G: '+html2Escape(json_encode(_G,1))+'</textarea></pre>'); 	//显示变量
		}
		return ;
	}else if(val==='*DEL*') console.clear();
	if(t===undefined) console.log(val);
	else if(t===1) console.warn(val);
	else if(t===2) console.error(val);
}


//显示 变量或函数定义
function _toString(str_ObjName){
	try{
		if(typeof(obj=eval(str_ObjName)) ) {//eval不安全,（客户端不可信所以没事）
			if(typeof(obj) == 'function') return obj.toString();
			else if(obj=='[object Object]') return json_encode(obj,1);
			else return json_encode(Object.keys(obj),1);
		}
	}catch(err){ showLog('出错：' + err.message) }
}
	// showLog(_toString('_Gdata')); //显示函数定义
	// showLog(_toString({"a":"aaaa"})); //显示变量


//普通字符转换成转意符
function html2Escape(sHtml){
	return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}
//转意符换成普通字符
function escape2Html(str){
	var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}
//去掉html标签
function removeHtmlTab(tab){ return tab.replace(/<[^<>]+?>/g,''); }//删除所有HTML标签
// &nbsp;转成空格
function nbsp2Space(str) {
	var arrEntities = {'nbsp' : ' '};
	return str.replace(/&(nbsp);/ig, function(all, t){return arrEntities[t]})
}
//回车转为br标签
function return2Br(str) { return str.replace(/\r?\n/g,"<br />"); }
//去除开头结尾换行,并将连续3次以上换行转换成2次换行
function trimBr(str) {
	str=str.replace(/((\s|&nbsp;)*\r?\n){3,}/g,"\r\n\r\n");//限制最多2次换行
	str=str.replace(/^((\s|&nbsp;)*\r?\n)+/g,'');//清除开头换行
	str=str.replace(/((\s|&nbsp;)*\r?\n)+$/g,'');//清除结尾换行
	return str;
}
// 将多个连续空格合并成一个空格
function mergeSpace(str) { str=str.replace(/(\s|&nbsp;)+/g,' '); return str; }



//写法：多行字符串(js写静态html结构)
function _string(fn) {
	//优点:
		// 模板字符串内不必写多余的任何字符，干净，简单（真正意义上的多行字符串, 有\n哦）
	//缺点:
		// 不可以在单个字符串中添加js逻辑
		// 容易被压缩器压缩掉，yui compressor可以通过/ *!来避免被压缩掉，uglifyjs和gcc也
		// 可以通过选项配置不删除特定的注释，这个不是大问题
	//写法:
		// var tmpl = _string(function(){/*
		// 多行字符串(html结构数据)（直接复制粘贴html源代码）
		// */});
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n';
}
// $(function(){
// $('body').append(_string(function(){/*
// <div id="actbox">
// 	<button>保存</button>
// </div>
// <style>
// 	#actbox {background:#ccc; width:300px;height:200px;}
// </style>
// */}));	
// });




function get_G(key){//_toString的扩展功能
	if(key===undefined) return 'window: '+_toString(window);
	if(key.indexOf('/')<0) return key+': '+_toString(window[key]);
	else{
		var a=key.split('/');
		n=_count(a);
	}
	if(val===undefined){
		try{
			if(n===1) return key+': '+_toString(window[a[0]]);
			else if(n===2) return key+': '+_toString(window[a[0]][a[1]]);
			else if(n===3) return key+': '+_toString(window[a[0]][a[1]][a[2]]);
			else if(n===4) return key+': '+_toString(window[a[0]][a[1]][a[2]][a[3]]);
			else if(n===5) return key+': '+_toString(window[a[0]][a[1]][a[2]][a[3]][a[4]]);
			else if(n===6) return key+': '+_toString(window[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]]);
			else if(n===7) return key+': '+_toString(window[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]]);
			else if(n===8) return key+': '+_toString(window[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]]);
		}catch(e){ /*throw 'Error: 没有找到此变量！_Gdata(); ';*/ }
	}
}
// showLog(get_G());


//运行时间
function runtime(mode){
	if(mode) return  new Date().getTime() - startTime; 
	else startTime = new Date().getTime(); 
}

//显示 源代码
function show_code(select){
	select=select || 'html';//默认为html根
	$('html').css({ "height": "100%", "margin": 0 });// 注意：html,body,..所有层级都加height:100%才生效
	$('body').css({ "height": "100%", "margin": 0 })
		.append('<pre style="width:90%;height:70%;">查看源代码：<br><textarea style="width:100%;height:100%;">'
		+ ($(select).html()) + '<\/textarea></pre>');//注意：斜杠注意转义符
}
//show_code();


//================================================

//加载当前页之后，让客户端预处理一些事情。服务器中有让客户端做的预处理项的时候。
function js_loaded(){
	$.post('main.php/post', { cmd:'js_loaded' }, function(data){
		if(data){
			data=obj2html({'host':host1}, data);//{host}替换
			try{ var json=json_decode(data); try_run(json); }
			catch(err){ p('错误：'+err.message+'\n获取到的数据为：'+data);}
		}
	});
} //host1='192.168.1.20'; js_loaded();
function ap_init(){//只执行一次初始化定义
	if(typeof host1==='undefined'){
		$.post('main.php/post', { cmd:'host' }, function(data){
			host1=data; return js_loaded();//默认自动请求后执行
		});
	}else return host1;
}
ap_init();
