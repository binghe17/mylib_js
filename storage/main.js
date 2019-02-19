// 显示，往document 写入文字
function w (text, title) {
	var tag=document.body.appendChild(document.createElement('pre'));
	tag.title=title||'-';
	tag.className='w';
	var date=new Date();
	tag.innerText='['+(/T(.+)Z/.exec(date.toISOString())[1])+'] '+text;
	// tag.innerText='['+/T(.+)Z/.exec(date)date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.'+date.getMilliseconds()+'] '+text;
	window.scrollTo(0,document.body.getBoundingClientRect().height);
}


function myClearLog() {
	Array.prototype.map.call(document.getElementsByTagName('pre'), function(e) {
		setTimeout(function(){e.remove();});
		// e.remove();
	});
}
