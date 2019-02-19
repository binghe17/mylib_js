


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
$('body').append(obj2html({'id':'myModal2','btn':'开始演示模态框adf','name':'模态框（Modal）标题','content':'<b>asdfasd</b>在这里添加一asdfasdf些文本'},_Gdata('bootstrap/modal')));
$('body').append(obj2html({'id':'myModal1','btn':'按钮2','name':'模态框（Modal）标题2','cont':'22在这里添加一asdfasdf些文本'},_Gdata('bootstrap/modal')));

// 弹出框 popover.js
_Gdata('dd/popover',{'direction':'right','title':'aaaaa','msg':'bbbb','text':'cccc'});
_Gdata('tpl/popover','<button class="btn btn-default" data-container="body" data-toggle="popover" title="{title}" data-placement="{direction}" data-content="{msg}">{text}</button>');
in2action('m/dom/obj2html',['dd/popover','tpl/popover'],[1,1]);
in2action('m/out/show2html',['body','append','thisobj'],[2,0,1]);
$('[data-toggle="popover"]').popover();

