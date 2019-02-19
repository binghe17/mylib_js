$(function(){

// include('_sys/jslib/jquery/jQuery-2.2.0.min.js');						// <!-- jQuery 2.2.0 -->
// include('_sys/jslib/bootstrap/js/bootstrap.min.js');
// include('_sys/jslib/bootstrap/css/bootstrap.min.css');
// include('_sys/jslib/jquery/jquery.json-2.4.js'); //引入各种插件


include('_sys/jslib/other/plugins/Font-Awesome/css/font-awesome.min.css');	// <!-- Font Awesome -->
include('_sys/jslib/other/plugins/ionicons-2.0.1/css/ionicons.min.css');			// <!-- Ionicons -->
include('_sys/jslib/other/plugins/daterangepicker/daterangepicker-bs3.css');					// <!-- daterange picker -->
include('_sys/jslib/other/plugins/datepicker/datepicker3.css');									// <!-- bootstrap datepicker -->
include('_sys/jslib/other/plugins/colorpicker/bootstrap-colorpicker.min.css');					// <!-- Bootstrap Color Picker -->
include('_sys/jslib/other/plugins/timepicker/bootstrap-timepicker.min.css');					// <!-- Bootstrap time Picker -->
include('_sys/jslib/other/plugins/select2/select2.min.css');									// <!-- Select2 -->

include('_sys/jslib/AdminLTE/css/AdminLTE.min.css');												// <!-- Theme style -->
include('_sys/jslib/AdminLTE/css/skins/_all-skins.min.css');										// <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->


include('_sys/jslib/other/plugins/select2/select2.full.min.js');					// <!-- Select2 -->
include('_sys/jslib/other/plugins/input-mask/jquery.inputmask.js');					// <!-- InputMask -->
include('_sys/jslib/other/plugins/input-mask/jquery.inputmask.date.extensions.js');	// <!-- InputMask -->
include('_sys/jslib/other/plugins/input-mask/jquery.inputmask.extensions.js');		// <!-- InputMask -->
include('_sys/jslib/other/plugins/momentjs/moment.2.14.1.js');	// <!-- date-range-picker -->
include('_sys/jslib/other/plugins/daterangepicker/daterangepicker.js');				// <!-- date-range-picker -->
include('_sys/jslib/other/plugins/datepicker/bootstrap-datepicker.js');				// <!-- bootstrap datepicker -->
include('_sys/jslib/other/plugins/colorpicker/bootstrap-colorpicker.min.js');		// <!-- bootstrap color picker -->
include('_sys/jslib/other/plugins/timepicker/bootstrap-timepicker.min.js');			// <!-- bootstrap time picker -->
include('_sys/jslib/other/plugins/slimScroll/jquery.slimscroll.min.js');			// <!-- SlimScroll 1.3.0 -->
include('_sys/jslib/other/plugins/fastclick/fastclick.js');							// <!-- FastClick -->

include('_sys/jslib/AdminLTE/js/app.min.js');										// <!-- AdminLTE App -->
include('_sys/jslib/AdminLTE/js/demo.js');										// <!-- AdminLTE for demo purposes -->


// setTimeout(fun2,0);//开控制台后有明显的白屏时间。
incjs_run(fun2);//上面的所有加载完成后，执行什么函数（有卡顿现象，但没有白屏）






function fun2(){
		//Initialize Select2 Elements
	$(".select2").select2();

	//Datemask dd/mm/yyyy
	$("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
	//Datemask2 mm/dd/yyyy
	$("#datemask2").inputmask("mm/dd/yyyy", {"placeholder": "mm/dd/yyyy"});
	//Money Euro
	$("[data-mask]").inputmask();

	//Date range picker
	$('#reservation').daterangepicker();
	//Date range picker with time picker
	$('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
	//Date range as a button
	$('#daterange-btn').daterangepicker(
			{
				ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				},
				startDate: moment().subtract(29, 'days'),
				endDate: moment()
			},
			function (start, end) {
				$('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			}
	);

	//Date picker
	$('#datepicker').datepicker({
		autoclose: true
	});

	//Colorpicker
	$(".my-colorpicker1").colorpicker();
	//color picker with addon
	$(".my-colorpicker2").colorpicker();

	//Timepicker
	$(".timepicker").timepicker({
		showInputs: false
	});



	// <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	// <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	// <!--[if lt IE 9]>
	// include('https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js');
	// include('https://oss.maxcdn.com/respond/1.4.2/respond.min.js');
	// <![endif]-->

	//javascript:document.body.contentEditable='true'; document.designMode='on'; void 0


}



//---------------




});
