
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=0.5 maximum-scale=0.5, user-scalable=no" /> 



<div class="panel-body">
<link rel="stylesheet" type="text/css" href="misc/core.css" />
<style type="text/css">

	/* Content Wrapper */
	#content-wrapper{
		width: 100%;
		height: 100%;
		padding: 0px;
		padding-top: 18px;
		padding-bottom: 88px;
		margin-bottom: -85px;
		text-align: left;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	</style>
<div id="content-wrapper" style="height:600px">
<div id="jsonformatter"></div>
<div id="splitter"></div>
<div id="jsoneditor"></div>
<div class="clear"></div>
</div>
<div class="clear"></div>
<link rel="stylesheet" type="text/css" href="misc/app.css">
<link rel="stylesheet" type="text/css" href="misc/jsoneditor.css">
<script type="text/javascript" src="misc/jsoneditor.js"></script>
<script type="text/javascript" src="misc/notify.js"></script>
<script type="text/javascript" src="misc/splitter.js"></script>
<script type="text/javascript" src="misc/app.js"></script>
<script type="text/javascript" src="misc/jsonlint.js"></script>
<link rel="stylesheet" type="text/css" href="misc/jquery.reject.css" />
<script type="text/javascript" src="misc/jquery.js"></script>
<script type="text/javascript" src="misc/jquery.reject.js"></script>
<script type="text/javascript" src="misc/jquery.reject.360.js"></script>
<script type="text/javascript">
try{
	app.load();
	app.resize();
}
catch(e){
}
function save2server(){
	$.post("save.php", {"save_name":$("input[name=save_name]").val(),"save_data":JSON.stringify(editor.get())});
}

</script>

</div>
</div>
<div>
save_name:<input type="text" name="save_name" value="a">
<input type="button" value="button" onclick="save2server()">
</div>