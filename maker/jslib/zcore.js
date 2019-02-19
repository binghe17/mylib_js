// alert('成功加载zcore.js'); //alert有阻塞，弹窗期间无用的耗CPU资源多
//----------------------------------------------------------------
	//运行时间
	function runtime(mode){
		if(mode) return  new Date().getTime() - startTime; 
		else startTime = new Date().getTime(); 
	}
	runtime();

//-------------json互转array

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


//===================================== js , css

//添加外部文件。   .js文件和.css文件
function add_inc(url){
	var hz=url.substring(url.lastIndexOf('.')+1, url.length);
	if(hz==='js') $('head').append('<script type="text/javascript" src="'+url+'"><\/script>'); //异步加载外部JS文件（有延迟）
	if(hz==='css') $('head').append('<link rel="stylesheet" type="text/css" href="'+url+'">'); //异步加载外部CSS文件（有延迟）
}
	// add_inc('jslib/jquery-2.2.0.min.js');
	// add_inc('jslib/test.js');
	// add_inc('jslib/test.css');


//删除外部文件。 .js文件和.css文件
function del_inc(url){ $("head>[src='"+url+"']").remove(); }

	// del_inc('jslib/test.js');
	// del_inc('jslib/test.css');



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
	// 	run_one({'fun':'var_dom','opt':['btn1','button']});
	// 	run_one({'fun':'add_js','opt':['FUN/funX','function(){$(this).hide();}']});
	// 	run_one({'fun':'run_dom','opt':['btn1','click','FUN/funX'],'isvar':[0,0,1]});
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


//====================================RAM数据池


//-------localStorage 本地存储   IE8+在HTTP下可执行

function add_storage(key,val){ return localStorage.setItem(key,val); } //增加 某个值（包括修改）
function del_storage(key){ //删除 某个值
	key=key||0;
	if(key===0) return localStorage.clear(); 		//删除全部(清空)
	else return localStorage.removeItem('name');	//删除某个值
}

function get_storage(key){ return localStorage.getItem(key); }//获取 某个值
function get_storage_nums(){ return var_count(localStorage); }//获取 数据总数
function get_storage_keys(){//获取 所有键名
	var key=[];
	for(var i in arr){ key.push(localStorage.key(i)); }
	return key;
}
	// add_storage('name','my name.');
	// showLog(get_storage('name'));
	// showLog(json_encode(localStorage)); //获取所有键值对数据->Json


//-------cookie 函数要在HTTP下执行成功

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









//========================= 数据操作（重要）===============================
//想从界面中直接创建变量就要把系统书写格式都做成函数格式

//全局变量的增删改和获取（对内存变量的增删改）
function _Gdata(key,val){//注意：数组和对象要用克隆clone()，不然以指针方式传值。会对原数据修改。
	// console.warn('_Gdata',key,val);//排查问题要用注视和console功能来添加并排查问题。
	if(key.indexOf('/')<0 && val!==undefined) {
		if('undefined'==typeof _G) _G={};
		if(val==='*DEL*') return _G[key]=undefined;
		else return _G[key]=val;
	}else{
		// try{
			var a=key.split('/');
			n=var_count(a);
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


//变量的复制与移动
function copy_var(who,save){ _Gdata(save,_Gdata(who)); }
function move_var(who,save){ _Gdata(save,_Gdata(who)); _Gdata(who,'*DEL*'); }


//---------
//dom选择器保存到变量里 dom to var
function var_dom(who,select){
	if(select==='*DEL*') return _Gdata(who,'*DEL*');//删除DOM变量
	if(undefined === $) _Gdata(who, document.querySelectorAll(select));//没有jquery选择器时，使用默认的选择器。（IE8+开始支持，但在HTML5文档头上加 <!DOCTYPE html>）
	else _Gdata(who, $(select));//使用jquery选择器
}



//========================================运行（机器语言）


//变量的函数处理（执行函数）var.fun()   dom.fun()
function run_dom(who,fun,opt,save){//对字符串数组进行处理
	if(_Gdata(who)===undefined) var tmp=$(who);
	else var tmp=_Gdata(who);
	if(fun){
		var rs='';
		if(!opt) rs=tmp[fun]();
		else rs=tmp[fun](opt);
		if(toString.apply(opt)==='[object Array]'){
			var num=var_count(opt);
			switch (num) {
				case 1: rs=tmp[fun](opt[0]); break;
				case 2: rs=tmp[fun](opt[0],opt[1]);break;
				case 3: rs=tmp[fun](opt[0],opt[1],opt[2]);break;
				case 4: rs=tmp[fun](opt[0],opt[1],opt[2],opt[3]);break;
				case 5: rs=tmp[fun](opt[0],opt[1],opt[2],opt[3],opt[4]);break;
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
	// run_dom('a/b','split','|','a/c');	// a['c']=a['b'].split("|");
	// alert(_Gdata('a/c'));				// alert(a['c']);



//运行函数数 fun()
function run_fun(fun,opt,save){
	if(fun){
		var rs=''; //console.warn(fun,opt);//寻找错误时开启
		if(opt){
			if(opt.length!==undefined){//只有数组和字符串类型时才有.length属性
				if(typeof opt==='string') rs=window[fun](opt);//字符串时
				else{//数组时
					var num=var_count(opt);
					switch (num) {
						case 1: rs=window[fun](opt[0]); break;
						case 2: rs=window[fun](opt[0],opt[1]);break;
						case 3: rs=window[fun](opt[0],opt[1],opt[2]);break;
						case 4: rs=window[fun](opt[0],opt[1],opt[2],opt[3]);break;
						case 5: rs=window[fun](opt[0],opt[1],opt[2],opt[3],opt[4]);break;
						default: break;
					}					
				}
			}else rs=window[fun](opt);//数组以外的
		}else rs=window[fun]();
		if(save===undefined) return rs;	 else return _Gdata(save,rs);
	}
}
	// run_fun('showLog','eieiieieieiei');//放入函数体内的参数顺序。


//-----------

//放入顺序。
function run_one(who){
	//console.log( who)
	if(typeof who==='string') var g=clone(_Gdata(who)); else var g=who;
	if(g['isvar']){
		if(toString.apply(g['isvar'])==='[object Array]'){
			for(var i in g['opt']){ if(g['isvar'][i]===1) {g['opt'][i]=_Gdata(g['opt'][i]);} }
		}else {
			if(g['isvar']===1) rs=_Gdata(g['opt']);
			g['opt']=undefined; g['opt']=[]; g['opt'][0]=rs;
		}
	}
	if(g['save']) {
		if(g['opt']){
			if(g['isvar']) return run_fun(g['fun'],g['opt'],g['save']);
			else return run_fun(g['fun'],g['opt'],g['save']);
		}else return run_fun(g['fun'],undefined,g['save']);
	}else{
		if(g['opt']){
			if(g['isvar']) return run_fun(g['fun'],g['opt'],undefined);
			else return run_fun(g['fun'],g['opt']);
		}else return run_fun(g['fun']);
	}
}
	// function fun1(a,b){return a+'----'+b;}
	// _Gdata('a/a',{"fun":"fun1","opt":["aaa","bbb"],'save':'a/e'});
	// run_one('a/a');//run_one({"fun":"fun1","opt":["aaa","bbb"],'save':'a/e'}); 
	// run_one({'fun':'alert','opt':'a/e','isvar':1});
	//alert(_Gdata('a/e'));




//程序自动运行起始点（程序默认开始变量为ACT/_start）
function run_start(start){
	start=start||'ACT/_start';
	var arr=_Gdata(start);
	if(arr.length===undefined) run_one(start);
	else { for(var i in arr){ run_one(start+'/'+i); } }
}
	// _Gdata('ACT/_start',[
	// 	{"fun":"_Gdata","opt":['ooo','<b>22223222</b>']}, 	//关联数组
	// 	{"fun":"var_dom","opt":["test","#test"]},			// var_dom('test','#test');		//_G['DOM']['test']=$('#test');
	// 	{"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]}
	// ]);
	// run_start();


	//动作链，相当于函数体
	// _Gdata('ACT/showLog',[
	// 	{"fun":"_Gdata","opt":['_TMP/a','JS执行时间：']},
	// 	{"fun":"_Gdata","opt":['_TMP/c','ms']},
	// 	{"fun":"run_fun","opt":['runtime','1','_TMP/b']},//为了加动态时间，要使用这么多行代码来实现这个功能 showLog('JS执行时间：' + runtime(1) +'ms');
	// 	{"fun":"dd_hebing","opt":['_TMP/a,_TMP/b,_TMP/c','_TMP/d']},
	// 	{'fun':'run_one','opt':{'fun':'showLog','opt':'_TMP/d','isvar':1}},
	// 	{'fun':'_Gdata','opt':['_TMP','*DEL*']}
	// ]);
	// run_start('ACT/showLog'); //showLog('JS执行时间：' + runtime(1) +'ms');//等同于这个


// $(function(){

	// _Gdata('act/0',{"fun":"_Gdata","opt":['ooo','<b>Helloadsfasdf</b>']});//关联数组
	// _Gdata('act/1',{"fun":"var_dom","opt":["test","#test"]});					// var_dom('test','#test');					//_G['DOM']['test']=$('#test');
	// _Gdata('act/2',{"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]});
	// _G={}; _G['act']=[];//索引数组
	// _G['act'][0]={"fun":"_Gdata","opt":['ooo','<b>Helloadsfasdf</b>']};
	// _G['act'][1]={"fun":"var_dom","opt":["test","#test"]};					// var_dom('test','#test');					//_G['DOM']['test']=$('#test');
	// _G['act'][2]={"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]};
	// run_one({"fun":"run_start","opt":"act"});// run_start('act');//排序后执行动作链条（数组名 数字优先，然后是字母）


	// 	run_one({"fun":"_Gdata","opt":['ooo','<b>Helloadsfasdf</b>']});
	// 	run_one({"fun":"var_dom","opt":["test","#test"]});					// var_dom('test','#test');					//_G['DOM']['test']=$('#test');
	// 	run_one({"fun":"run_dom","opt":["test","html","ooo"],"isvar":[0,0,1]});	// run_dom('test',"html","<b>Hello</b>"); 	//_G['DOM']['test']['html']("<b>Hello</b>");
	// 	// // alert(_Gdata('DOM/test/0/innerHTML')); 							//alert(document.querySelectorAll('#test')[0].innerHTML);
	// 	// run_one({"fun":"run_fun","opt":["showLog","eieiieieieiei"]});		//run_fun('showLog','eieiieieieiei');

	// 	// run_one({"fun":"_Gdata","opt":['a/b','ads|f|adfadsf']});	// _Gdata('a/b','ads|f|adfadsf');		// a['b']="ads|f|adfadsf";
	// 	// run_one({"fun":"run_dom","opt":['a/b','split','|','a/c']});	// run_dom('a/b','split','|','a/c');	// a['c']=a['b'].split("|");
	// 	// run_one({"fun":"alert","opt":'a/c','isvar':1}); 			//alert(_Gdata('a/c'));					// alert(a['c']);


// });



//当触发event时执行
function event_start(dom,event,act,type){
	if(undefined === type){
		if(act==='*DEL*') return $(dom)[event]=null;
		$(dom)[event](function(){ run_start(act); });
	}else{
		if(act==='*DEL*') return $(clone(_Gdata(dom)))[event]=null;
		$(clone(_Gdata(dom)))[event](function(){ run_start(act); });
	} 
}


//条件判断后执行什么流程
function if_start(ifvar,act,act2){
	if1=_Gdata(ifvar); 
	if('undefined'===typeof act2) { if(if1) run_start(act); }
	else{ if(if1) run_start(act);else run_start(act2); }
}
//对动作进行几次循环
function for_start(act,num){
	for (var i = 0; i < num; i++) { run_start(act); }
}



//------------逻辑语言

//逻辑语言转机器语言run_one（一行命令）
function run_one2(who){
	var tt=_Gdata(who);//console.log('run_one2 '+(who));//放入的所有参数名args
	if(tt['action'] && tt['in']){
		var c= clone(_Gdata('m/'+tt['action'])); //注意要克隆，不然指定的对象或数组以指针方式获取，会修改原对象。
		if('string'===typeof c['opt']) { if(c['opt']==='*IN*') c['opt']=tt['in']; if(c['opt']==='*OUT*') c['opt']=tt['out'];}
		else{
			var num=var_count(c['opt']);
			for (var i = 0; i < num; i++) { if(c['opt'][i]==='*IN*') c['opt'][i]=tt['in']; }
		}
		if(c['save']==='*OUT*') c['save']=tt['out'];
		else if(c['save']==='*IN*') c['save']=tt['in'];
		return run_one(c);	
	}
}


	// //数据池（变量路径选择时，可以选择数组或字符串）
	// _Gdata('run/start','aaaasddddss');
	// _Gdata('run/start2','sssssss');
	// //程序定义（单行）-----增加对字符串的增删改查。对数组的。对cookie的等等

	// if('undefined'==typeof _G['m']) _G['m']={};
	// if('undefined'==typeof _G['m']['data']) _G['m']['data']={};
	// // _G['m']['data']['add']={'fun':'_Gdata','opt':['*IN*'],'save':'*OUT*'};

	// _Gdata('m/data/add',{'fun':'_Gdata','opt':['*IN*'],'save':'*OUT*'});//变量赋值
	// _Gdata('m/data/show1',{'fun':'console1','opt':'*IN*','isvar':1});		//提示框
	// _Gdata('m/data/show2',{'fun':'alert','opt':'*IN*','isvar':1});		//提示框
	// _Gdata('m/dom/who',{'fun':''})

	// //程序使用--line，对谁干什么   (单行_mind/m1/0) (多行_mind/m1)
	// _Gdata('_mind/m1/0',{'in':'run/start','action':'data/add','out':'d/b'});//把js机器语言统一为逻辑语言
	// _Gdata('_mind/m1/1',{'in':'d/b','action':'data/show1'});//把js机器语言统一为逻辑语言

	//运行
	// _Gdata('_mind/m1/0/in','run/start2');
	// run_one2('_mind/m1/0');
	// run_one2('_mind/m1/1');
	// run_start2('_mind/m1');//函数模板。

	// //------历史变量区 (对接)
	// _Gdata('_tmp/in/0','');//模拟输出参数
	// _Gdata('_tmp/out','');//模拟return 



function run_start2(start){ //run_more2改名为这个
	start=start||'ACT/_start';
	var arr=_Gdata(start);
	if(arr.length===undefined) run_one2(start);
	else { for(var i in arr){ run_one2(start+'/'+i); } }
}
	// run_start2('_mind/m1');

//当触发event时执行
function event_start2(dom,event,act,type){
	if(undefined === type){
		if(act==='*DEL*') return $(dom)[event]=null;
		$(dom)[event](function(){ run_start2(act); });
	}else{
		if(act==='*DEL*') return $(clone(_Gdata(dom)))[event]=null;
		$(clone(_Gdata(dom)))[event](function(){ run_start2(act); });
	} 
}
//条件判断后执行什么流程
function if_start2(ifvar,act,act2){
	if1=_Gdata(ifvar); 
	if('undefined'===typeof act2) { if(if1) run_start2(act); }
	else{ if(if1) run_start(act);else run_start2(act2); }
}
//对动作进行几次循环
function for_start2(act,num){
	for (var i = 0; i < num; i++) { run_start2(act); }
}


//-------计时器，按时间间隔运行函数-------

function add_timer_A(who,num,actNext){									//添加 定时器A （推迟执行函数一次）
	if('undefined'==typeof timerOnce) timerOnce=[];
	timerOnce[who]=setTimeout(function(){ run_start2(actNext); },num);	//（执行队列）
}
function del_timer_A(who){ clearTimeout(timerOnce[who]); }				//删除 定时器A  //停止延迟执行

	// add_timer_A('timerA',200,'fun1');//1次
	// del_timer_A('timerA');



function add_timer_B(who,num,actNext){									//添加 定时器B  （按间隔执行函数无限次）
	if('undefined'==typeof timerSome) timerSome=[];
	timerSome[who]=setInterval(function(){ run_start2(actNext); },num);	//(执行队列)
}
function del_timer_B(who){ clearInterval(timerSome[who]); }				//删除 定时器B

	// add_timer_B('timerB',1500,'fun2');//无线次
	// del_timer_B('timerB');






//======================================数据格式转换


//自定义数组方式，在一个模板中替换所有数据（单行）
function tpl_obj(dd,tpl,save){
	if(typeof dd==='string'){ dd=_Gdata(dd); var x=1;}//数据池中获取kv数组
	var t1=_Gdata(tpl); if(t1!==undefined ) tpl=t1;//数据池中获取tpl模板
	var rs=tpl; for (var i in dd) { rs=rs.replace('\{'+i+'\}',dd[i]); }		
	save=save||0;
	if(save==='this' && x===1) return _Gdata(dd,rs);
	if(save===0) return rs;
	else return _Gdata(save,rs);
}
// var dd={'aaa':'111','ccc':'22222'};
// var tpl = "---{aaa}--{bbb}---{ccc}==";//输出1个
// alert(tpl_obj(dd,tpl));
// var dd=['ccc','ddd'];
// var tpl='---{0}----{1}----';
// alert(tpl_obj(dd,tpl));

//kv数组方式，按模板格式合并成多个数组。（循环）
function tpl_kv(dd,tpl,save){//数据可以是关联数组也可以是索引数组。{k} {v}
	if(typeof dd==='string'){ dd=_Gdata(dd); var x=1;}//数据池中获取kv数组
	var t1=_Gdata(tpl); if(t1!==undefined ) tpl=t1;//数据池中获取tpl模板
	var rs=''; for (var i in dd) { var a=tpl.replace(/\{k\}/g,i); rs+=a.replace(/\{v\}/g,dd[i]); }
	save=save||0;
	if(save==='this' && x===1) return _Gdata(dd,rs);
	if(save===0) return rs;
	else return _Gdata(save,rs);
}
// var tpl='---{k}----{v}----';
// var dd={'aaa':'111','ccc':'22222'};//输出n个
// alert(tpl_kv(dd,tpl));
// var dd=['ccc','ddd'];
// alert(tpl_kv(dd,tpl));

// _Gdata('uitest/dd',{'aaa':'111','ccc':'22222'});
// _Gdata('uitest/dd2',['aaa','bbb']);
// // _Gdata('uitest/tpl','<input type="text" class="c{k}" value="{v}" />\n');
// // tpl_kv('uitest/dd2','uitest/tpl','save1');
// _Gdata('uitest/tpl','<input type="text" class="{aaa}" value="{ccc}" />\n');
// _Gdata('uitest/tpl2','<input type="text" class="{0}" value="{1}" />\n');
// tpl_obj('uitest/dd2','uitest/tpl2','save1');
// run_dom('#test','append',_Gdata('save1'));//输出dom 






//========================================算法

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
//var re = new RegExp("a","gi");


function reg_var(str){
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
// alert(reg_var(str));


//===============================================运算符
function m_yunsuan(a,fu,b){
	if(fu==='+') return Number(a) + Number(b);
	if(fu==='-') return a-b;
	if(fu==='*') return a*b;
	if(fu==='/') return a/b;
	if(fu==='%') return a%b;
}
// alert(m_yunsuan(5,'+','5'));

function m_zizeng(a){ return ++a; }
function m_zijian(a){ return --a; }
// b=10;
// b=m_zizeng(b);
// b=m_zizeng(b);
// b=m_zijian(b);
// console.log(b);

function m_bijiao(a,fu,b){
	if(fu==='==') return a==b;
	if(fu==='===') return a===b;
	if(fu==='!=') return a!=b;
	if(fu==='!==') return a!==b;
	if(fu==='>') return a>b;
	if(fu==='<') return a<b;
	if(fu==='>=') return a>=b;
	if(fu==='<=') return a<=b;
}
//console.log(m_bijiao(1,'==','1'));

function m_luoji(a,fu,b){
	if(fu==='&&'){ return a && b;} //and
	if(fu==='||'){ return a || b;} //or
	if(fu==='!'){ return !(a == b);}//not
}
// console.log(m_luoji(1,'!','1'));







//----------------------------

// [Forms]
// Button,ListBox,CheckBoxList,RadioList,Calendar,TextBox,Password,
// TextArea,ComboBox,DatePicker,Spinner,TreeSelect,FileUpload

// function html2json(){

// }

// function json2html(){

// }


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

//------------------ 数据类型 和 统计数据个数

function var_type(arr){
	if(typeof arr==='object'){
		if(arr.length===undefined) return 'object';//关联数组时
		else return 'array';//索引数组时
	}else return typeof arr;//其他类型按它自身的
}
// alert(var_type(['aa','bb']));
// alert(var_type({'aa':'bb'}));


function var_count(arr){
	if(typeof arr==='object'){
		if(arr.length===undefined) return Object.getOwnPropertyNames(arr).length;//对象计数。但数组时这个函数中有length,所以计数也会多一个的错误。
		else return arr.length;//数组计数。Object.keys不能对关联数组判断个数。只能用在索引数组上。但索引数组可以直接用.length来获取个数。
	}else if(typeof arr==='string') return arr.length;
	else return 1;
}
// alert(var_count({'aa':"bbb"}))
// alert(var_count(['aa',"bbb"]))




//获取数组的所有键名  (用于界面变量列表中进行修改操作)
function arr_keys(p){
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



//========================== 克隆 array 和 object

//完整的对象克隆  http://qianduanblog.com/post/js-learning-30-object-clone-copy.html
function clone(obj){
	// 原始类型对象指的是字符串（String）=ok、数值（Number）=ok、布尔值（Boolean）=ok，
	// 合成类型对象指的是数组（Array）?、对象（Object）?、    函数（Function）=ok
	var o,i,j,k;
	if(typeof(obj)!="object" || obj===null) return obj;
	if(obj instanceof(Array)){
		o=[];  i=0;j=var_count(obj);
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


	// //-----------------对象克隆
	// //例子：
	//o = {'a':1};
	// o=["One","Two","Three"];
	//b = o;//对象地址
	// o='aaa';
	// b=clone(o);//真正克隆array和object
	// b = 2;
	// // b['a'] = 2;
	// console.log(_toString(o));
	// console.log(_toString(b));
	// //--------------------------




//=============================================dom动态布局

//----------------------------dom选择器----------------------------
// getElementById() , getElementsByName() , getElementsByTagName() 
// getElementsByClassName() , querySelector() , querySelectorAll()
//----------------------------------------------------------------

//把已选择的对象，放入到选择器（变量）当中，再从选择器中取出来操作。



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

	// new_node('aaa','tag','span');
	// //alert(temp['aaa'].tagName);
	// new_node('aaa','title','aaa');
	// //alert(temp['aaa'].title);
	// new_node('aaa','text','eeeeeee');
	// //alert(temp['aaa'].innerHTML);
	// save_node('aaa','#c')


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
	var dom=document.querySelector(id)
	dom.parentNode.removeChild(dom);
}

	// set_node('#game','text','aaaa');
	// set_node('#game','title','aaaa');
	// del_node('#a span')			



//移动DOM--------把哪个DOM放到哪个DOM里面
function move_node(fromId,toId,up){
	var fromDom=document.querySelector(fromId);
	var toDom=document.querySelector(toId);
	if(up) toDom.insertBefore(fromDom,toDom.firstChild);//加入到子节点上面
	else toDom.appendChild(fromDom);					//加入到子节点下面（默认）
}

	// move_node('#b','#a',1);//移动（把B放入A里的上面）
	// move_node('#a','#c');
	// move_node('#d','#a');




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


//-------------调试器（显示日志）

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
	if(val===undefined){//调试：浏览器对象，全局变量
		// console.log('浏览器对象: ', window, document, navigator, screen, history, location);
		// showLog(get_G('window'));
		// showLog(get_G('document'));
		// showLog(get_G('navigator'));
		// showLog(get_G('screen'));
		// showLog(get_G('history'));
		// showLog(get_G('location'));
		if(_G!==undefined) {
			//console.log('全局变量 _G:', _G);	//_G未定义之前会报错
			showLog('_G: '+json_encode(_G,1)); 	//显示变量
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



function get_G(key){
	if(key===undefined) return 'window: '+_toString(window);
	if(key.indexOf('/')<0) return key+': '+_toString(window[key]);
	else{
		var a=key.split('/');
		n=var_count(a);
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



//显示 源代码
function show_code(select){
	select=select || 'html';//默认为html根
	$('html').css({ "height": "100%", "margin": 0 });// 注意：html,body,..所有层级都加height:100%才生效
	$('body').css({ "height": "100%", "margin": 0 })
		.append('<pre style="width:90%;height:70%;">查看源代码：<br><textarea style="width:100%;height:100%;">'
		+ ($(select).html()) + '<\/textarea></pre>');//注意：斜杠注意转义符
}
//show_code();


//try调试器---//报错不终止，跳出此函数继续执行
function try_run(act){
	try{ run_start(act);}
	catch(err){	//错误日志。
		if("undefined" == typeof _G) _G={};
		if("undefined" == typeof _G['err_msg']) _G['err_msg']=[]; //没有定义全局变量时自动定义(前面带var时变局部变量)
		_G['err_msg'].push(err.message);
		console.log(err.message);//在控制台输出错误信息
	}
}
	// try_run();


//------------jquery 互转 JS原生DOM

function jsdom(jqdom){
	if(jqdom.length>1){ //多个
		var rs = []; for(var i=0; i < jqdom.length; i++){ rs.push(jqdom[i]); } return rs;
	}else return jqdom[0];//单个
}
// alert(jsdom($('#file_form')).innerHTML);
// alert(jsdom($('#file_form input'))[0].type);


function jqdom(jsdom){ return $(jsdom); }
// alert(jqdom(document.querySelectorAll('#file_form')).length);
// jqdom(document.querySelectorAll('#file_form input')).each(function(e){ alert($(this).attr('type')); });



//==========================================base64 ->blob ->file upload

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




//--------图片base64


//获取域名中的图片转为base64
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





//======================加密编码（输入值）唯一值

// //////////////////////////////////////////////////////////
// crc32.js
// Copyright (c) 2014 Stephan Brumme. All rights reserved.
// see http://create.stephan-brumme.com/crc32/
// 
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



//-----------------唯一值 unique（随机数）

//生成唯一值(利用了js的闭包性质)
// var uniqueNumber = (( function(){ var value = 0; return function(){ return ++value; };  })());
// alert(uniqueNumber());//1
// alert(uniqueNumber());//2

//生成唯一guid值
// function guid(){
// 	var s4=function(){ return (((1+Math.random())*0x10000|0).toString(16).substring(1)); }
// 	return (s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4());
// }
// alert(guid());


