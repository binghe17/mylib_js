
$('body').append('\
	<style>\
		#devbox{background:#ccc; border:1px solid #777;width:500px;height:300px;}\
		#devbox b{background:#bbb;}\
		#devbox textarea{ width:400px; height:200px; }\
	</style>\
	<div id="devbox">\
		<label>文件位置:<b id="devpath"></b></label><br>\
		<label>动作序列:<textarea></textarea></label><br>\
		<button id="devbtn1">保存</button>\
	</div>\
');
//当点击什么的时候发起什么请求，获取文件中的数据。
$('#devbtn1').click(function(){
	$.post('main.php/post', { 'act':'get_file','filename':'' }, function(data){
		if(data){
			try{ var json=json_decode(data); try_run(json); }
			catch(err){ p('错误：'+err.message+'\n获取到的数据为：'+data);}
		}
	});
	$('#devpath').text('aaa');
});

