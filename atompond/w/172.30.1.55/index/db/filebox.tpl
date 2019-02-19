<style type="text/css">
	*{padding: 0;margin: 0;}
	.container-fluid{padding: 0;margin: 0;height: 100%;}
	#filelist, #savebox { min-height: 300px; background: #ccc; border: 3px solid #888;padding: 5px;}
	#filelist ul{background: #aaa; width: 100%;height: 100%;list-style-type:none;overflow:auto;}
	#filelist li{background: #eee; border: 1px solid #ccc;padding: 5px ;}
	#filelist li:hover{background: yellow; border: 1px solid red;}
	pre{min-height: 90%;margin: 2px;}
	#codebox {width:100%;height: 100%;font-size: 10px;}
	#savebox input{width: 200px;}
	#savebox button{width: 40px;}

</style>
<div class="container-fluid">
	<div id="filelist" class="col-md-2"><ul></ul></div>
	<div id="savebox" class="col-md-10">
		<pre><code id="codebox" placeholder="codebox" title="保存值"></code></pre>
		<button>list</button>
		<input id="filename" type="text" placeholder="/db" title="/db" value="/db" />
		<button>save</button><button>del</button>

	</div>
</div>