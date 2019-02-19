

$('html').ready(function(){
	include('_sys/jslib/bootstrap/js/bootstrap.min.js');
	include('_sys/jslib/bootstrap/css/bootstrap.min.css');
	// include('_sys/jslib/jquery/jquery.json-2.4.js'); //引入各种插件
	// include('_sys/jslib/other/AdminLTE.css');
	//---------------
	//javascript:document.body.contentEditable='true'; document.designMode='on'; void 0

});

$(function(){

// $('body').append('\
// 	<style>\
// 		#devbox{background:#ccc; border:1px solid #777;width:500px;height:300px;}\
// 		#devbox b{background:#bbb;}\
// 		#devbox textarea{ width:400px; height:200px; }\
// 	</style>\
// 	<div id="devbox">\
// 		<label>文件位置:<b id="devpath"></b></label><br>\
// 		<label>动作序列:<textarea></textarea></label><br>\
// 		<button id="devbtn1">保存</button>\
// 	</div>\
// ');
// //当点击什么的时候发起什么请求，获取文件中的数据。
// $('#devbtn1').click(function(){
// 	$.post('main.php/post', { 'act':'get_file','filename':'' }, function(data){
// 		if(data){
// 			try{ var json=json_decode(data); try_run(json); }
// 			catch(err){ p('错误：'+err.message+'\n获取到的数据为：'+data);}
// 		}
// 	});
// 	$('#devpath').text('aaa');
// });

	//================================跟服务器通信 2016.7.16 (服务器处的数据要重新做)


	//保存文件，读取文件（ajax请求）
	function _post(act,fun,url){ //1'act':'save_file或get_file',   2'filename', 3'savedata'
		//alert(basename(location.pathname))
		url=url||'main.php/post'; //注意：改文件地址～～～
		if(act===undefined) return false; if(typeof act==='string') act=_Gdata(act);
		if(fun===undefined) return $.post(url, act);
		else return $.post(url, act, fun);
	}

	function savebox_del(){
		if(confirm('确认要删除[ '+$('#filename').val()+" ]文件吗?（误删文件,后果严重!）")){
			if(confirm('真的要删除[ '+$('#filename').val()+" ]文件吗?（我确认,后果自负!）")){
				_Gdata('ajax_del',{'act':'del_file','filename':$('#filename').val() });
				_post('ajax_del', function(data){
					if(data==='ok') alert('删除成功');else alert('删除失败');
				});
			}
		}
	}


	function savebox_save(){
		_Gdata('ajax_save',{'act':'save_file','filename':$('#filename').val(), 'savedata': $('#savedata').val() });
		_post('ajax_save', function(data){
			if(data==='ok') alert('保存成功');else alert('保存失败');
		}); //_post('ajax_save');
	}
	function savebox_read(){
		_Gdata('ajax_get',{'act':'get_file','filename':$('#filename').val()});
		_post('ajax_get',function(data){
			$('#savedata').val(data);
			// $('body').append('<textarea style="width:90%;height:500px;">\n'+data+'\n</textarea>\n');
			// if('undefined'==typeof _G) _G={};
			// _G=json_decode(data);
			// run_start('ACT/_start');
		});
	}
	function savebox_list(){
		_Gdata('ajax_get',{'act':'get_filelist','filename':$('#filename').val()});
		_post('ajax_get',function(data){
			//p(data);
			if(data){
				$('#savedata').val('');
				$('#filelist ul').html(kv2html(json_decode(data),'<li>{v}</li>'));
				$('#filelist li').click(function(e) {
					$('#filename').val($(this).text());
					savebox_list();
				});				
			}else savebox_read();


		});
	}

$('body').append(_string(function(){/*
<style type="text/css">
	*{padding: 0;margin: 0;}
	#filelist, #savebox { height: 300px; background: #ccc; text-align:center; border: 3px solid #888;padding: 5px;}
	#filelist ul{background: #aaa; width: 100%;height: 100%;}
	#filelist li{background: #eee; border: 1px solid #ccc;}
	#filelist li:hover{background: yellow; border: 1px solid red;}
	#savebox textarea {background:#aaa;width:100%;height: 90%;}
	#savebox input{width: 200px;}
	#savebox button{width: 40px;}
</style>
<div class="container-fluid row">
	<div id="filelist" class="col-md-4"><ul></ul></div>
	<div id="savebox" class="col-md-8">
		<textarea id="savedata" placeholder="savedata" title="保存值"></textarea><br>
		<button>list</button>
		<input id="filename" type="text" placeholder="/db" title="/db" />
		<button>save</button> <button>read</button> <button>del</button>
		<button>a</button><button>b</button>
	</div>
</div>
*/}));




	//php处把w/文件列表给js

	savebox_list();
	$('#savebox button:contains("save")').click(savebox_save);
	$('#savebox button:contains("read")').click(savebox_read);
	$('#savebox button:contains("list")').click(savebox_list);
	$('#savebox button:contains("del")').click(savebox_del);

 
	// $("body").append('<div id="loadtest"></div>');
	// $('#loadtest').load("js_zcore3.php/post",{'act':'loadfile'});



//=============================================================================






















	//--------------------------
	//把什么数据放入前台中进行编辑数据

	//编辑数据+前台编辑样式+结果放在标签属性的rs属性中
	//然后用前台的拖拽的，增删改来对box区域内的数据进行增删改。最后形成的数据保存在临时结果变量中等候保存。
	// function ui_editbox(dd){
	// 	//data-placement: top bottom left right

	// 	_Gdata('dev/editbox','\
	// 		<style>\
	// 			#editbox{background:#ccc; border:1px solid #777;width:500px;height:300px;}\
	// 			.div1{ width:200px; height:200px;}\
	// 			.div2{ height:150px;}\
	// 			.div3{  position:relative; z-index:1;float:right;top:0px;right:0px}\
	// 			\
	// 		</style>\
	// 		<div id="editbox"><div class="div1">aaa</div></div>\
	// 	');
	// 	in2action('m/out/show2html',['body','append','dev/editbox'],[2,0,1]);
	// 		$('body div').mouseover(function(e){
	// 			var dom=$(this);
	// 			var s=dom.css("border");
	// 			dom.css("border","1px dotted blue");
	// 			dom.append('<div class="tt" style="position:relative; z-index:1;float:right;top:0px;right:0px"><button>修改</button><button>删除</button></div>');
	// 			p(this.parentNode.tagName);
	// 			e.stopPropagation();//不冒泡

	// 			$(this).mouseout(function(e){
					
	// 				$(this).css("border",s);
	// 				$('#tagpath').css('display','none');
	// 				$('.tt').remove();

	// 				e.stopPropagation();//不冒泡
	// 			});	
	// 		});

	// }
	// ui_editbox({'a':'aaa','b':'bbbb','c':'cccc'})






//===========================================在UI中获取DOM tree


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
		$('head').mouseenter(function(e){
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







//------------

// $('body').append(_tag({'tag':'img','src':'http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg','class':'img'}));
// $('body').append(_tag({'tag':'a','href':'#','cont':300}));


//元素。增加类型，元素编号。

// _Gdata('dd/a1',["hello","world"]);
// _Gdata('dd/t1','<option>{v}</option>\n');
// // _Gdata('dd/a1',{"hello":"你好","world":"世界"});
// // _Gdata('dd/t1','<option value="{k}">{v}</option>\n');
// _Gdata('dd/t2','<select>{v}</select>');
// in2action('m/dom/kv2html',['dd/a1','dd/t1'],[1,1]);
// in2action('m/dom/kv2html',['thisobj','dd/t2'],[1,1]);
// in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);


// _Gdata('dd/a3',{'tag':'b','class':'aaa','cont':'内容'});
// _Gdata('dd/t3','<{tag} class="{class}">{cont}</{tag}>');
// in2action('m/dom/obj2html',['dd/a3','dd/t3'],[1,1]);
// in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);



//在界面上动态增减动作序列。并保存动作序列。增加快速增加动作的模块。m
// in2action('m/out/show2html',['body','append','<div id="actbox">actbox</div>'],[2,0,0]);


//=====================================================

//新建变量
// $('body').append('页面加载成功');

// function var2showui(dom,fun,htmlstr){ $(dom)[fun](htmlstr); }//append（内后） prepend(内前)   after(外后)  before(外前)
// var2showui('body','append','<div id="test">dfa</div>');


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



//==========================================================================================




// $('body').append('\
// 	<div style="width:400px;">\
// 		<div id="ui_edit" style="background:#ccc;">\
// 			<div><input type="text" name="who" placeholder="who Name" title="input who name" /></div>\
// 			<div><input type="text" name="fun" placeholder="fun Name" title="input fun name"/></div>\
// 			<div><input type="text" name="opt[0]" placeholder="opt[0] Name" title="input opt[0] name"/><input type="checkbox" name="isvar[0]" title="isvar[0]"></div>\
// 			<div><input type="text" name="opt[1]" placeholder="opt[1] Name" title="input opt[1] name"/><input type="checkbox" name="isvar[1]" title="isvar[1]"></div>\
// 			<div><input type="text" name="opt[2]" placeholder="opt[2] Name" title="input opt[2] name"/><input type="checkbox" name="isvar[2]" title="isvar[2]"></div>\
// 			<div><input type="text" name="opt[3]" placeholder="opt[3] Name" title="input opt[3] name"/><input type="checkbox" name="isvar[3]" title="isvar[3]"></div>\
// 			<div><input type="text" name="opt[4]" placeholder="opt[4] Name" title="input opt[4] name"/><input type="checkbox" name="isvar[4]" title="isvar[4]"></div>\
// 			<div><input type="text" name="save" placeholder="save Name" title="input save name"/></div>\
// 			<button id="s1">save1</button><button id="s2">save2</button>\
// 		</div>\
// 	</div>\
// 	<div class="row">\
// 	  <div class="col-md-4" id="var_list" style="background:#ccc;">\
// 			<div id="xx">没有找到变量</div>\
// 			<ol>\
// 				<li><span>1</span>aaa</li>\
// 				<li><span>1</span>aaa</li>\
// 			</ol>\
// 	  </div>\
// 	  <div class="col-md-6" id="var_set" style="background:#bbb;">\
// 			<input type="text" name="var_name" placeholder="var Name" title="input var name" >\
// 			<button>添加字符串</button>\
// 	  </div>\
// 	</div>\
// ');




//----------------------2016.7.17

// function addCssText(){
// 	var css=$('#CSStext').val();
// 	var dom1=$('style[uid='+crc32(css)+']');
// 	if(dom1.length>0) dom1.remove();
// 	else $('head').append('<style type="text/css" uid="'+crc32(css)+'">'+css+'</style>');
// }

// _Gdata('css1','<textarea id="CSStext" rows="10" cols="50"> body{ background-color:blue; }</textarea><button>add_style</button> ');
// $('body').append(_Gdata('css1'));
// $('button:contains("add_style")').click(addCssText);

//-----------------------
// function addEvent(target, type, func) { target[type] =func;} //给事件条件一种函数---建议使用他
// function delEvent(target, type) { target[type] = null; }		//给事件删除指定函数



//----------------------用界面给变量增加数据
// $(function(){

// 	_Gdata('aaa',{'b':'bbb','c':{'d':'ddd'},'d':['hjhk']});
// 	var k=arr_keys();
// 	$('head').append('<style>.ok{width:100px;min-height:300px;height:100%;background:#ccc;}li:hover{background:yellow;}li:active{background:red;}</style>')
// 	$('body').append('<div class="ok"><ol id="tt"></ol></div>');
// 	$('body').append('<div>[varpath]<b id="varpath"></b>: <input id="editvar" type="text" /><span id="varmsg"></span></div>');
// 	$('body').append('<div></div>');
// 	$('#tt').append(kv2html(k,'<li>{v}</li>'));
// 	function click2(){
// 		var li1=$(this).text();
// 		var p=$(this).parent();
// 		if(li1==='..') li1=dirname(p.attr('data'));
// 		else{
// 			if(p.attr('data')===undefined) li1;
// 			else li1=p.attr('data')+'/'+li1;		
// 		}
// 		var ks=arr_keys(li1);
// 		$('#varpath').html(li1);
// 		if(ks===false){
// 			var val=_Gdata(li1);
// 			$('#editvar').val(val);
// 			if($('#varsave').length===0){//字符串时
// 				$('#editvar').attr('placeholder','修改变量值');
// 				$('#addvar').remove();$('#delvar').remove();
// 				$('#editvar').after('<button id="varsave">save</button>');
// 				$('#varsave').click(function(){
// 					_Gdata($('#varpath').html(), json_decode($('#editvar').val()));
// 					$('#varmsg').html('保存成功！');
// 				});

// 				$('#editvar').keyup(function(){
// 					var num=$('#editvar').val().length;
// 					$('#varmsg').html('变量修改中('+num+')..');
// 				})
// 			} 
// 		}else{
// 			if(li1==='') p.removeAttr('data');
// 			else p.attr('data', li1);
// 			if($('#addvar').length===0){//数组时
// 				$('#varsave').remove();
// 				$('#editvar').after('<button id="addvar">add</button><button id="delvar">del</button>');
// 				$('#editvar').attr('placeholder','新增的键名');
// 				$('#addvar').click(function(){
// 					_Gdata(li1+'/'+$('#editvar').val(), '');
// 					$('#varmsg').html('保存成功！');
// 					$('#tt').html(kv2html(arr_keys(li1),'<li>{v}</li>'));
// 					if(li1!=='') p.prepend('<li>..</li>');
// 					$('#tt li').click(click2);
// 				});
// 				$('#delvar').click(function(){
// 					_Gdata($('#varpath').html(), '*DEL*');
// 					$('#varmsg').html('删除成功！');
// 				});
// 				$('#addvar').keyup(function(){
// 					var num=$('#editvar').val().length;
// 					$('#varmsg').html('变量修改中('+num+')..');
// 				})
// 			}

// 			$('#editvar').val('');
// 			$('#varmsg').html('');
// 			p.html(kv2html(ks,'<li>{v}</li>'));
// 			if(li1!=='') p.prepend('<li>..</li>');
// 			$('#tt li').click(click2);
// 		}
// 	}
// 	$('#tt li').click(click2);

// });




//-----------------------------------------------------------------

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



//创建模板(原件)tpl
_Gdata('kvtpl',{
	'div':'<div uid="item-{uid}">{v}</div>\n',
	'span':'<span uid="item-{uid}">{v}</span>\n',
	'h1':'<h1>{v}</h1>\n',
	'h2':'<h2>{v}</h2>\n',
	'h3':'<h3>{v}</h3>\n',
	'h4':'<h4>{v}</h4>\n',
	'h5':'<h5>{v}</h5>\n',
	'h6':'<h6>{v}</h6>\n',
	'p':'<p>{v}</p>\n',
	'li':'<li>{v}</li>\n',
	'ol':'<ol>\n{v}</ol>\n',
	'ul':'<ul>\n{v}</ul>\n',
	'pl':'<pl>\n{v}</pl>\n',
	'button':'<button uid="item-{uid}">{v}</button>\n',
	'option':'<option>{v}</option>\n',
	'select':'<select name="item-{uid}">\n{v}</select>\n',
	'textarea':'<textarea name="{k}">\n{v}</textarea>\n',					//多行文本框
	'input_text':'<input type="text" name="{k}" value="{v}" />\n',			//文本框
	'input_password':'<input type="password" name="{k}" value="{v}" />\n',	//密码框
	'input_radio':'<input type="radio" name="{k}" value="{v}" />\n',		//单选框
	'input_checkbox':'<input type="checkbox" name="{k}" value="{v}" />\n',	//多选框
	'input_file':'<input type="file" name="{k}" value="{v}" />\n',			//文件
	'input_hidden':'<input type="hidden" name="{k}" value="{v}" />\n',		//隐藏文本
	'input_button':'<input type="button" name="{k}" value="{v}" />\n',		//按钮
	'input_image':'<input type="image" src="{v}" alt="{k}" />\n',			//图片按钮
	'input_reset':'<input type="reset" name="{k}" value="{v}" />\n',		//重置
	'input_submit':'<input type="submit" name="{k}" value="{v}" />\n',		//发布
	'input_range':'<input type="range" name="{k}" value="{v}" />\n',		//滑块控件
	'input_search':'<input type="search" name="{k}" value="{v}" />\n',		//搜索框
	'input_number':'<input type="number" name="{k}" value="{v}" />\n',		//数字框
	'input_color':'<input type="color" name="{k}" value="{v}" />\n',		//颜色
	'input_url':'<input type="url" name="{k}" value="{v}" />\n',			//网址
	'input_email':'<input type="email" name="{k}" value="{v}" />\n',		//邮件
	'input_time':'<input type="time" name="{k}" value="{v}" />\n',			//时间
	'input_date':'<input type="date" name="{k}" value="{v}" />\n'			//日期

});

_Gdata('tpl/css_style','<style type="text/css">{css}</style>');
_Gdata('tpl/css_text','{k} \{ {v} \}');
_Gdata('css/dd',{'*':'padding: 5;margin: 0;'});
// // _Gdata('tpl/css_r','{k}:{v}; ');
// // _Gdata('css/dd3',{'padding':5,'margin':0});




/*
制作
	化妆品网站
		品牌分类
			后，雪花秀，iope，兰芝，innisfree
		功效分类
			美白，补水保湿，平衡油脂，抗衰老，抗皱
			功效: 营养，淡化疤痕，美白肌肤，淡化斑痕，祛斑
		顺序分类
			清洗类，主妆类，补妆类，卸装类
		皮肤分类
			干性
				班，脱皮
			油性
				逗，T油，	V油
			中性（混合型）
		客户群分
			使用范围+年龄段
				男性，女性，孕妇，老人，小孩
				几岁到几岁，15～60岁
				适合老人
					特点：皱纹，黑眼圈，眼袋
					买贵的好的： 환유고, 환유진액, 환유동안고
	产品列表
	单品细说
		品名
		名称
		图片
		价格（韩元，人民币，美元）
			分销价，几个开始
		个数。毫升（ml）=> 大概可以用多长时间
			6매, 45캡슐, 50정, 30병, 0.23g x 28ea, 120ml, 70ml x 30포, 70mg, 30회분, 1개월분, 8주분
		出市时间
			2016年度最新商品
		产品官方网站地址
		产品说明
			多国语言包（大家一起来翻译）
			知名度：化妆品排行，形象代言人是谁等
		使用说明
			图文，一天几次使用时段
		购买
			预定单，微信号
			状态：未付款，待发货，未收获，未评价，售后
	新增功能
		购物车，预定对比（加收藏喜欢）
		邮费
			包邮, 几天到货
			EMS包通关，几KG开始
		支付方式
			汇款账号
			微信账号
		会员等级
			普通会员
				促销板块
					（多种促销规则自定）
					积分赠送
					会员优惠
					订单满额免运费
					订单加价换购
					订单满额减价
					买1送面膜等
			加入代理商
				累计几次、单次买几个开始，几折给
			分佣
				购买抽佣
				以流量
				转介绍
	美容常识（知识库）
		先给肌肤做减法
			深层清洁，去角质，去除氧化油脂
		再给肌肤做加法
			在补水保湿的基础上做美白，抗衰老，平衡油脂等保养
*/



//创建数据dd
_Gdata('dd/pinpai',['后','雪花秀','ipoe','兰芝','innisfree']);//品牌分类
_Gdata('dd/fenlei',['祛痘','美白','保湿','去油指','抗衰老','抗皱纹']);
_Gdata('dd/a',['单品','名称','图片','说明',]);

//创建连接 //dd-tpl的连接
//run_fun('kv2html',[_Gdata('dd/pinpai'),_Gdata('kvtpl/li')],'aa/pinpai');
// run_one({'fun':'kv2html','opt':['dd/pinpai','kvtpl/li'],'isvar':[1,1],'save':'aa/pinpai'});
// run_more([{'fun':'kv2html','opt':['dd/pinpai','kvtpl/li'],'isvar':[1,1],'save':'aa/pinpai'}]);

// p(_Gdata('aa/pinpai'));

// _Gdata('rs/pinpai',kv2html(_Gdata('dd/pinpai'),_Gdata('kvtpl/li')));
// $('body').append(kv2html(_Gdata('rs/pinpai'),_Gdata('kvtpl/ul')));

//新建分类。


//界面建原子数据
// function mk_ui(dd,tpl){
// 	if(typeof dd==='string' && _Gdata(dd)) dd=_Gdata(dd);
// 	if(typeof tpl==='string') tpl=_Gdata('kvtpl/'+tpl);
// 	return _Gdata('rs/item'+(++uid2), kv2html(dd,tpl));
// 	// return kv2html(dd,tpl);
// }
// // p(mk_ui(['按钮'],'button'));

// $('body').append(mk_ui(mk_ui('dd/pinpai','option'),'select'));
// $('body').append(mk_ui({'img':''},'input_text'));
// $('select').click(function(e){

// 	p(_toString(form2obj('select')));
// });
// p(form2obj('select'));
// p(_Gdata('rs/item1'))




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


//用界面来生成动作序列
//动作序列名(定位)
//动作序列内容(索引数组，待执行)
//执行哪个动作序列



// $('body').append(_string(function(){




// <div id="actbox">
// 	<input type="text" placeholder="动作序列名(定位)">
// 	<pl><li>空</li></pl>
// 	<button>保存</button>
// </div>
// <style>
// 	#actbox {background:#ccc; width:300px; height:200px;}
// 	pl li{background:#ddd;}
// 	li:hover		{color:#777;}
// </style>
// }));








// //把数据生成html格式 (专题结构数据)
// //菜单制作的，把数据生成为菜单格式。菜单格式的数据结构(专属数据结构生成专属菜单。)
// //菜单是由div来组合的。分开的div放在一起就是一个菜单。当鼠标放在谁的身上时把什么显示到哪里。
// //数据全都是零碎的在不同数据位置上。不打包为同类型的放在一起。
// _Gdata('txt/menu1',["ddd","asdfa",'eeeee']);//单页数据。开始没有私用数据，都是整站都可以一起用的公用数据。
// _Gdata('act/menu1',[//动态生成html结构
// 	{'fun':'kv2html','opt':['css/dd3','tpl/css_r'],'isvar':[1,1],'save':'static/menu4'},
// 	{'fun':'kv2html','opt':['css/dd','tpl/css_text'],'isvar':[1,1],'save':'static/menu3'},
// 	{'fun':'kv2html','opt':['txt/menu1','tpl/option'],'isvar':[1,1],'save':'static/menu1'},
// 	{'fun':'kv2html','opt':['static/menu1','tpl/select'],'isvar':[1,1],'save':'static/menu2'}
// ]);//等待程序执行代码片段
// run_start('act/menu1');//执行代码片段
// alert(_Gdata('static/menu4'))


// var_dom('dom/body','body');
// run_dom('dom/body','append','asdfa'); // $('body').append('asdfasdf');//添加html代码




//-----------------------------------------------------------------

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





//------------bootstrap 模板

//模态框 Modal
_Gdata('bootstrap/modal',_string(function(){/*
<!-- 按钮触发模态框 -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#{id}">{btn}</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="{id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
               {name}
            </h4>
         </div>
         <div class="modal-body">
           {cont}
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">提交更改</button>
         </div>
      </div>
	</div>
</div>
*/}));
// $('body').append(obj2html({'id':'myModal2','btn':'开始演示模态框adf','name':'模态框（Modal）标题','content':'<b>asdfasd</b>在这里添加一asdfasdf些文本'},_Gdata('bootstrap/modal')));
// $('body').append(obj2html({'id':'myModal1','btn':'按钮2','name':'模态框（Modal）标题2','cont':'22在这里添加一asdfasdf些文本'},_Gdata('bootstrap/modal')));

//弹出框 popover.js
// _Gdata('dd/popover',{'direction':'right','title':'aaaaa','msg':'bbbb','text':'cccc'});
// _Gdata('tpl/popover','<button class="btn btn-default" data-container="body" data-toggle="popover" title="{title}" data-placement="{direction}" data-content="{msg}">{text}</button>');
// in2action('m/dom/obj2html',['dd/popover','tpl/popover'],[1,1]);
// in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);
// $('[data-toggle="popover"]').popover();



//----------------------
	// p('show');
	// showLog('JS执行时间：' + runtime(1) +'ms');
});

