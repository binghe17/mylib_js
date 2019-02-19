
<link rel="stylesheet" href="_sys/jslib/other/codemirror/theme/myTheme.css">
<link rel="stylesheet" href="_sys/jslib/other/codemirror/lib/codemirror.css">
<script src="_sys/jslib/other/codemirror/lib/codemirror.js"></script>

<script src="_sys/jslib/other/codemirror/mode/htmlmixed/htmlmixed.js"></script>
<script src="_sys/jslib/other/codemirror/mode/xml/xml.js"></script>
<script src="_sys/jslib/other/codemirror/mode/javascript/javascript.js"></script>
<script src="_sys/jslib/other/codemirror/mode/css/css.js"></script>
<script src="_sys/jslib/other/codemirror/mode/php/php.js"></script>
<script src="_sys/jslib/other/codemirror/mode/clike/clike.js"></script>

<link rel="stylesheet" href="_sys/jslib/other/codemirror/addon/hint/show-hint.css">
<script src="_sys/jslib/other/codemirror/addon/hint/show-hint.js"></script>
<script src="_sys/jslib/other/codemirror/addon/hint/javascript-hint.js"></script>
<script src="_sys/jslib/other/codemirror/addon/selection/active-line.js"></script>
<script src="_sys/jslib/other/codemirror/addon/edit/matchbrackets.js"></script>



<article>

<textarea id="code">
//---------code
<div>
<span id="aaaaaa">adsfasdf</span>
<script>
function findSequence(goal) {
	function find(start, history) {
		if (start == goal)
			return history;
		else if (start > goal)
			return null;
		else
			return find(start + 5, "(" + history + " + 5)") ||
					 find(start * 3, "(" + history + " * 3)");
	}
	return find(1, "1");
}
</script>
</div>
<?php echo "aaaaa"; ?>
//-----------code
</textarea>


<style>
.CodeMirror { border: 2px solid #ccc;  width: 100%; height: auto; font-family: tahoma; font-size: 12px; }
/*.CodeMirror-scroll { overflow: auto; max-height: 300px; }*/
</style>

<script>
function codemirrorJS(textareaId){
	// var mixedMode = {
	// 	name: "htmlmixed",
	// 	scriptTypes: [
	// 		{matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
	// 		{matches: /(text|application)\/(x-)?vb(a|script)/i, mode: "vbscript"}
	// 	]
	// };

	editor = CodeMirror.fromTextArea(document.getElementById(textareaId), {
		mode: "application/x-httpd-php",
		// mode: mixedMode,
		// mode: "text/html",
		// mode: {name: "javascript", globalVars: true},
		extraKeys: {"Ctrl-Alt": "autocomplete"},

		lineNumbers: true,
		matchBrackets: true,
		styleActiveLine: true,

		theme: "myTheme"

		//readOnly: true,
		//dragDrop: false,

		// continueComments: "Enter",
		// extraKeys: {"Ctrl-Q": "toggleComment"},

	});
	//editor.setOption("theme", "myTheme");
}

codemirrorJS('code');

function ok(){
	alert(editor.getValue()); //这样获取（不能从原来的textarea中获取修改之后的数据）
}


</script>


<button onclick="ok()">alert</button>
</article>
