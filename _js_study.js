
/* 
JavaScript 参考手册
http://w3school.com.cn/js/js_reference.asp
*/

//--------输出，弹窗-----------------------

document.write("Sleepy Sunday");//打印，输出到页面

alert("文本");//警告框
alert("再次向您问好！在这里，我们向您演示" + '\n' + "如何向警告框添加折行。");//带有折行的警告框
confirm("文本");//确认框
prompt("文本","默认值");//提示框


//------var 变量----------------------------

var firstname;//声明了一个变量，
firstname="George";//为其赋值，
document.write(firstname);//显示该值，
document.write("<br />");
firstname="John";//改变该值，
document.write(firstname);//然后再显示该值


//----------Array()------------------

var a = new Array('aaa','bbbb','ccc');
//document.write(a[0]);
a[0]="Opel";


//----------
var x
var mycars = new Array()
mycars[0] = "Saab"
mycars[1] = "Volvo"
mycars[2] = "BMW"

for (x in mycars)
{
document.write(mycars[x] + "<br />")
}


//-----------Boolean()-----------------
//全false
var myBoolean=new Boolean();
var myBoolean=new Boolean(0);
var myBoolean=new Boolean(null);
var myBoolean=new Boolean("");
var myBoolean=new Boolean(false);
var myBoolean=new Boolean(NaN);

//全true
var myBoolean=new Boolean(1);
var myBoolean=new Boolean(true);
var myBoolean=new Boolean("true");
var myBoolean=new Boolean("false");
var myBoolean=new Boolean("Bill Gates");


//----------Object()--------------------
myFather=new person("John","Doe",50,"blue")
//
personObj=new Object()
personObj.firstname="John"
personObj.lastname="Adams"
personObj.age=35
personObj.eyecolor="black"

document.write(personObj.firstname + " 的年龄是 " + personObj.age + " 岁。")

//------
function person(firstname,lastname,age,eyecolor)
{
	this.firstname=firstname
	this.lastname=lastname
	this.age=age
	this.eyecolor=eyecolor
}

myFather=new person("John","Adams",35,"black")
document.write(myFather.firstname + " 的年龄是 " + myFather.age + " 岁。")


//----特殊字符--------------------

/*
\' 单引号 
\" 双引号 
\& 和号 
\\ 反斜杠 
\n 换行符 
\r 回车符 
\t 制表符 
\b 退格符 
\f 换页符 
*/

//------------------------------
txt.length;//长度
str.toUpperCase();//大写
var t=setTimeout("alert('5 seconds!')",5000);//未来的某时执行代码
clearTimeout(t);//取消setTimeout()
personObj.sleep();

document.write(Math.round(4.7));	//5
document.write(Math.random());		//0.9370844220218102	//返回 0 到 1 之间的随机数。
document.write(Math.floor(Math.random()*11)); 	//3



/*/----------------------------------

<script type="text/javascript">
// <![CDATA[
    jQuery(function($){
        //
    });
// ]]>
</script>

//-----------------------------------

<script type="text/javascript">
	document.write('<script type="text/javascript" src="b.js"><\/script>');
	//document.writeln("aa");
	var Hello = function() {
		alert("Hello");
	}
	Hello();
	//aa(); //报错	
	document.scripts[0].src=" b.js"//运行了这个JS，但没有引入过来里面的方法

</script>

//b.js
var aa = function() {
		alert("aa");
	}
aa();

//-------------------------------*/

//全局变量和局部变量的理解.     局部变量一定要以var申明，否则是全局变量。
// a = "Hello";//全局变量a
// function test(){//一但函数体内有var来定义就是局部变量。不加var的变量可能是局部变量也可能是全局变量
// 	alert(window.a);//全局变量a
// 	alert(a);//局部变量a
// 	var a = "World";//局部变量前一定要加var 不然改写全局变量
// 	alert(a);//局部变量a
// }
// test();
// alert(a);//全局变量a

//---------------
// for(var i in arr){ run_one(actlist+'/'+i); }//关联数组和索引数组都可以。（for in方式的循环）
// for(var i=0; i<arr.length; i++) { run_one(actlist+'/'+i); }//只能用在索引数组 [object Array] 



	/* -------- [typeof]-----------------------------------
	var a = "i am string.";//string
	var b = 222;//number
	var c= [1,2,3];//object
	var d = new Date();//object
	var e = function(){alert(111);};//function
	var f = function(){this.name="22";};//function
	--------------------------------------------------------*/

// String.prototype.trim=function(f){
// 	if(f==this.charAt(0)) str.substring(1,this.length);
// 	if(f==this.charAt(this.length));
// 	//return this.replace(/^\/(\s*)|(\s*)\/$/g, '');
// }
// String.prototype.ltrim=function(f){return this.replace(/^\/(\s*)/g ,''); }
// String.prototype.rtrim=function(f){ return this.replace(/(\s*)\/$/g ,''); }
// xx='aaa/'.trim('/');
// alert(xx);
