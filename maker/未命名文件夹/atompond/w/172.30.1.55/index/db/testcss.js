

//----------------------2016.7.17

function addCssText(){
	var css=$('#CSStext').val();
	var dom1=$('style[uid='+crc32(css)+']');
	if(dom1.length>0) dom1.remove();
	else $('head').append('<style type="text/css" uid="'+crc32(css)+'">'+css+'</style>');
}

_Gdata('css1','<textarea id="CSStext" rows="10" cols="50"> body{ background-color:blue; }</textarea><button>add_style</button> ');
$('body').append(_Gdata('css1'));
$('button:contains("add_style")').click(addCssText);

//-----------------------
function addEvent(target, type, func) { target[type] =func;} //给事件条件一种函数---建议使用他
function delEvent(target, type) { target[type] = null; }		//给事件删除指定函数

