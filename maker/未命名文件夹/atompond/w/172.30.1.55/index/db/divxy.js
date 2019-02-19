

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

	//--------------------------
	//把什么数据放入前台中进行编辑数据

	//编辑数据+前台编辑样式+结果放在标签属性的rs属性中
	//然后用前台的拖拽的，增删改来对box区域内的数据进行增删改。最后形成的数据保存在临时结果变量中等候保存。
	function ui_editbox(dd){
		//data-placement: top bottom left right

		_Gdata('dev/editbox','\
			<style>\
				#editbox{background:#ccc; border:1px solid #777;width:500px;height:300px;}\
				.div1{ width:200px; height:200px;}\
				.div2{ height:150px;}\
				.div3{  position:relative; z-index:1;float:right;top:0px;right:0px}\
				\
			</style>\
			<div id="editbox"><div class="div1">aaa</div></div>\
		');
		in2action('m/out/show2html',['body','append','dev/editbox'],[2,0,1]);
			$('body div').mouseover(function(e){
				var dom=$(this);
				var s=dom.css("border");
				dom.css("border","1px dotted blue");
				dom.append('<div class="tt" style="position:relative; z-index:1;float:right;top:0px;right:0px"><button>修改</button><button>删除</button></div>');
				$('.tt').append('<br>'+this.tagName+" mouse.xy: " + e.offsetX + "x" + e.offsetY);
				p(this.parentNode.tagName);
				e.stopPropagation();//不冒泡

				$(this).mouseout(function(e){
					
					$(this).css("border",s);
					$('#tagpath').css('display','none');
					$('.tt').remove();

					e.stopPropagation();//不冒泡
				});	
			});

	}
	ui_editbox({'a':'aaa','b':'bbbb','c':'cccc'})

