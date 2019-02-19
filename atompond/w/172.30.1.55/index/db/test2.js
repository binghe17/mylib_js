

//------------

$('body').append(_tag({'tag':'img','src':'http://img2.imgtn.bdimg.com/it/u=1579155435,752760959&fm=21&gp=0.jpg','class':'img'}));
$('body').append(_tag({'tag':'a','href':'#','cont':300}));


//元素。增加类型，元素编号。

_Gdata('dd/a1',["hello","world"]);
_Gdata('dd/t1','<option>{v}</option>\n');
// _Gdata('dd/a1',{"hello":"你好","world":"世界"});
// _Gdata('dd/t1','<option value="{k}">{v}</option>\n');
_Gdata('dd/t2','<select>{v}</select>');
in2action('m/dom/kv2html',['dd/a1','dd/t1'],[1,1]);
in2action('m/dom/kv2html',['thisobj','dd/t2'],[1,1]);
in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);


_Gdata('dd/a3',{'tag':'b','class':'aaa','cont':'内容'});
_Gdata('dd/t3','<{tag} class="{class}">{cont}</{tag}>');
in2action('m/dom/obj2html',['dd/a3','dd/t3'],[1,1]);
in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);



//在界面上动态增减动作序列。并保存动作序列。增加快速增加动作的模块。m
in2action('m/out/show2html',['body','append','<div id="actbox">actbox</div>'],[2,0,0]);//append（内后） prepend(内前)   after(外后)  before(外前)

