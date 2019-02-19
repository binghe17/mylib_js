


	//================================跟服务器通信 2016.7.16 (服务器处的数据要重新做)

	//保存文件，读取文件（ajax请求）
	function _post(act,fun,url){ //1'act':'save_file或get_file',   2'filename', 3'codebox'
		//alert(basename(location.pathname))
		url=url||'main.php/post'; //注意：改文件地址～～～
		if(act===undefined) return false; if(typeof act==='string') act=_Gdata(act);
		if(fun===undefined) return $.post(url, act);
		else return $.post(url, act, fun);
	}


	// $('body').append(_string(function(){
	// <style type="text/css">
	// 	*{padding: 0;margin: 0;}
	// 	#filelist, #savebox { height: 300px; background: #ccc; text-align:center; border: 3px solid #888;padding: 5px;}
	// 	#filelist ul{background: #aaa; width: 100%;height: 100%;}
	// 	#filelist li{background: #eee; border: 1px solid #ccc;}
	// 	#filelist li:hover{background: yellow; border: 1px solid red;}
	// 	#savebox textarea {background:#aaa;width:100%;height: 90%;}
	// 	#savebox input{width: 200px;}
	// 	#savebox button{width: 40px;}
	// </style>
	// <div class="container-fluid row">
	// 	<div id="filelist" class="col-md-4"><ul></ul></div>
	// 	<div id="savebox" class="col-md-8">
	// 		<textarea id="codebox" placeholder="codebox" title="保存值"></textarea><br>
	// 		<button>list</button>
	// 		<input id="filename" type="text" placeholder="/db" title="/db" />
	// 		<button>save</button> <button>read</button> <button>del</button>
	// 		<button>a</button><button>b</button>
	// 	</div>
	// </div>
	// }));


	//保存文件（新建、修改）
	function savebox_save(){
		var send1=escape2Html($('#codebox').html());
		_Gdata('ajax_save',{'act':'save_file','filename':$('#filename').val(), 'savedata': send1 });
		_post('ajax_save', function(data){
			if(data==='ok') alert('保存成功');else alert('保存失败');
		}); //_post('ajax_save');
	}
	//删除文件
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


	//读取文件
	function savebox_read(){
		_post({'act':'get_file','filename':$('#filename').val()},function(data){
			$('#codebox').html(html2Escape(data));
			hljs.highlightBlock($('#codebox').get(0));
			$('#codebox').get(0).contentEditable='true'; 
			// document.designMode='on';

			// $('body').append('<textarea style="width:90%;height:500px;">\n'+data+'\n</textarea>\n');
			// if('undefined'==typeof _G) _G={};
			// _G=json_decode(data);
			// run_start('ACT/_start');
		});
	}
	//读取文件列表
	function savebox_list(){
		_post({'act':'get_filelist','filename':$('#filename').val()},function(data){
			// p(data);
			if(data){
				$('#codebox').html('');

				$('#filelist ul').html(kv2html(json_decode(data),'<li>{v}</li>'));
				$('#filelist li').click(function(e) {
					$('#filename').val($(this).text());
					savebox_list();

				});	
				if($('#filename').val()!==''){
					$('#filelist ul').prepend('<li id="back" style="background:#ddd;">../back</li>');
					$('#back').click(function(){
						$('#filename').val(dirname($('#filename').val()));
						savebox_list();
					});							
				}
		
			}else savebox_read();

		});
	}



//----------------codebox



include('_sys/jslib/other/highlight/styles/default.css');
include('_sys/jslib/other/highlight/highlight.pack.js');

incjs_run(function(){


	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/default.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/solarized-dark.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/solarized-light.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/github.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/railscasts.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/monokai-sublime.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/mono-blue.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/tomorrow.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/color-brewer.css">\
	// <link class="codestyle" rel="stylesheet" href="_sys/jslib/other/highlight/styles/zenburn.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/agate.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/androidstudio.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/dracula.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/rainbow.css">\
	// <link class="codestyle" rel="prefetch alternate stylesheet" href="_sys/jslib/other/highlight/styles/vs.css">\

	$('body').append('<link class="codestyle" rel="stylesheet" href="_sys/jslib/other/highlight/styles/zenburn.css">');
	// hljs.initHighlightingOnLoad();
	// $(document).ready(function() {
	// 	// hljs.highlightBlock($('code').get(0));
	//   $('code').each(function(i, block) {
	//     hljs.highlightBlock(block);
	//   });
	// });


	savebox_list();//php处把w/{xxxx}/文件列表给js

	$('#savebox button:contains("list")').click(savebox_list);
	$('#savebox button:contains("save")').click(savebox_save);
	$('#savebox button:contains("del")').click(savebox_del);



	// function saveDB(key){
	// 	localStorage.setItem(key,editor.getValue());
	// }
	// function getDB(key){
	// 	editor.getDoc().setValue(localStorage.getItem(key));//IE报错: localStorage函数在HTTP服务器路径下访问正常
	// 	editor.refresh();
	// }



});





