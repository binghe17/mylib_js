
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
run_fun('kv2html',[_Gdata('dd/pinpai'),_Gdata('kvtpl/li')],'aa/pinpai');
run_one({'fun':'kv2html','opt':['dd/pinpai','kvtpl/li'],'isvar':[1,1],'save':'aa/pinpai'});
run_more([{'fun':'kv2html','opt':['dd/pinpai','kvtpl/li'],'isvar':[1,1],'save':'aa/pinpai'}]);

p(_Gdata('aa/pinpai'));

_Gdata('rs/pinpai',kv2html(_Gdata('dd/pinpai'),_Gdata('kvtpl/li')));
$('body').append(kv2html(_Gdata('rs/pinpai'),_Gdata('kvtpl/ul')));

//新建分类。


//界面建原子数据
function mk_ui(dd,tpl){
	if(typeof dd==='string' && _Gdata(dd)) dd=_Gdata(dd);
	if(typeof tpl==='string') tpl=_Gdata('kvtpl/'+tpl);
	return _Gdata('rs/item'+(++uid2), kv2html(dd,tpl));
	// return kv2html(dd,tpl);
}
// p(mk_ui(['按钮'],'button'));

$('body').append(mk_ui(mk_ui('dd/pinpai','option'),'select'));
$('body').append(mk_ui({'img':''},'input_text'));
$('select').click(function(e){

	p(_toString(form2obj('select')));
});
p(form2obj('select'));
p(_Gdata('rs/item1'))



