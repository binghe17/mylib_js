/*
	//==============����jQuery���=====================

	(function($) {
		$.fn.yourName = function(options) {

			//�������������ԡ�����

		}
		var options = $.extend(defaults, options);
		this.each(function() {

			//���������ʵ�ִ���

		});
	};
	})(jQuery);
*/


//------------�ο�����-----------------------------------
/*
 * tableUI 0.1
 * Copyright (c) 2009 JustinYoung http://justinyoung.cnblogs.com/
 * Date: 2010-03-30
 * ʹ��tableUI���Է���ؽ������ʾʹ�����顣���ṩ�Ĺ�������ż����ɫ���棬������ϸ�����ʾ
 */

/*
(function($) {
	$.fn.tableUI = function(options) {
		var defaults = {
			evenRowClass: "evenRow",
			oddRowClass: "oddRow",
			activeRowClass: "activeRow"
		}
		var options = $.extend(defaults, options);
		this.each(function() {
			var thisTable = $(this);
			//�����ż����ɫ
			$(thisTable).find("tr:even").addClass(options.evenRowClass);
			$(thisTable).find("tr:odd").addClass(options.oddRowClass);
			//��ӻ����ɫ
			$(thisTable).find("tr").bind("mouseover", function() {
				$(this).addClass(options.activeRowClass);
			});
			$(thisTable).find("tr").bind("mouseout", function() {
				$(this).removeClass(options.activeRowClass);
			});
		});
	};
})(jQuery);
*/
