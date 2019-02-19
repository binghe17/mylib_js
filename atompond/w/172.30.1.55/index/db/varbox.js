


//----------------------用界面给变量增加数据
$(function(){

	_Gdata('aaa',{'b':'bbb','c':{'d':'ddd'},'d':['hjhk']});
	var k=arr_keys();
	$('head').append('<style>.ok{width:100px;min-height:300px;height:100%;background:#ccc;}li:hover{background:yellow;}li:active{background:red;}</style>')
	$('body').append('<div class="ok"><ol id="tt"></ol></div>');
	$('body').append('<div>[varpath]<b id="varpath"></b>: <input id="editvar" type="text" /><span id="varmsg"></span></div>');
	$('body').append('<div></div>');
	$('#tt').append(kv2html(k,'<li>{v}</li>'));
	function click2(){
		var li1=$(this).text();
		var p=$(this).parent();
		if(li1==='..') li1=dirname(p.attr('data'));
		else{
			if(p.attr('data')===undefined) li1;
			else li1=p.attr('data')+'/'+li1;		
		}
		var ks=arr_keys(li1);
		$('#varpath').html(li1);
		if(ks===false){
			var val=_Gdata(li1);
			$('#editvar').val(val);
			if($('#varsave').length===0){//字符串时
				$('#editvar').attr('placeholder','修改变量值');
				$('#addvar').remove();$('#delvar').remove();
				$('#editvar').after('<button id="varsave">save</button>');
				$('#varsave').click(function(){
					_Gdata($('#varpath').html(), json_decode($('#editvar').val()));
					$('#varmsg').html('保存成功！');
				});

				$('#editvar').keyup(function(){
					var num=$('#editvar').val().length;
					$('#varmsg').html('变量修改中('+num+')..');
				})
			} 
		}else{
			if(li1==='') p.removeAttr('data');
			else p.attr('data', li1);
			if($('#addvar').length===0){//数组时
				$('#varsave').remove();
				$('#editvar').after('<button id="addvar">add</button><button id="delvar">del</button>');
				$('#editvar').attr('placeholder','新增的键名');
				$('#addvar').click(function(){
					_Gdata(li1+'/'+$('#editvar').val(), '');
					$('#varmsg').html('保存成功！');
					$('#tt').html(kv2html(arr_keys(li1),'<li>{v}</li>'));
					if(li1!=='') p.prepend('<li>..</li>');
					$('#tt li').click(click2);
				});
				$('#delvar').click(function(){
					_Gdata($('#varpath').html(), '*DEL*');
					$('#varmsg').html('删除成功！');
				});
				$('#addvar').keyup(function(){
					var num=$('#editvar').val().length;
					$('#varmsg').html('变量修改中('+num+')..');
				})
			}

			$('#editvar').val('');
			$('#varmsg').html('');
			p.html(kv2html(ks,'<li>{v}</li>'));
			if(li1!=='') p.prepend('<li>..</li>');
			$('#tt li').click(click2);
		}
	}
	$('#tt li').click(click2);

});
