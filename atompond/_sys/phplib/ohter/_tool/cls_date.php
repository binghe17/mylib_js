<?php

echo '<pre>';
date_default_timezone_set('Asia/Shanghai');
echo(date_default_timezone_get());


$nextWeek = time() + (7 * 24 * 60 * 60); // 7 days; 24 hours; 60 mins; 60secs
echo 'Now:       '. date('Y-m-d') ."\n";
echo 'Next Week: '. date('Y-m-d', $nextWeek) ."\n";



echo("Result with date():<br />");
echo(date("l") . "<br />");
echo(date("l dS \of F Y h:i:s A") . "<br />");
echo("Oct 3,1975 was on a ".date("l", mktime(0,0,0,10,3,1975))."<br />");
echo(date(DATE_RFC822) . "<br />");
echo(date(DATE_ATOM,mktime(0,0,0,10,3,1975)) . "<br /><br />");


echo date("M d Y H:i:s", mktime (0,0,0,1,1,2000));


print_r(getdate());
$my_t=getdate(date("U"));
print("$my_t[weekday], $my_t[month] $my_t[mday], $my_t[year]");

echo(gettimeofday(true) . "<br /><br />");
print_r(gettimeofday());
$my_t=gettimeofday();
print("$my_t[sec].$my_t[usec]");
echo(microtime());

$localtime = localtime();
$localtime_assoc = localtime(time(), true);
print_r($localtime);
print_r($localtime_assoc);

echo(date("M-d-Y",mktime(0,0,0,12,36,2001)));
echo(date("M-d-Y",mktime(0,0,0,14,1,2001)));
echo(date("M-d-Y",mktime(0,0,0,1,1,2001)));
echo(date("M-d-Y",mktime(0,0,0,1,1,99)));



echo(strftime("%b %d %Y %X", mktime(20,0,0,12,31,98)));
echo(gmstrftime("%b %d %Y %X", mktime(20,0,0,12,31,98)));
//输出当前日期、时间和时区
echo(gmstrftime("It is %a on %b %d, %Y, %X time zone: %Z",time()));

$format="%d/%m/%Y %H:%M:%S";
$strf=strftime($format);
echo("$strf");
print_r(strptime($strf,$format));

//将任何英文文本的日期或时间描述解析为 Unix 时间戳。
echo(strtotime("now"));
echo(strtotime("3 October 2005"));
echo(strtotime("+5 hours"));
echo(strtotime("+1 week"));
echo(strtotime("+1 week 3 days 7 hours 5 seconds"));
echo(strtotime("next Monday"));
echo(strtotime("last Sunday"));


//---------------------------------
//针对指定的年份和日历，返回一个月中的天数
$d=cal_days_in_month(CAL_GREGORIAN,10,2005);
echo("There was $d days in October 2005");

//返回有关给定日历的信息
$calinfo=cal_info(0);
print_r($calinfo);
//返回日期在周几
$jd=cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
echo(jddayofweek($jd,1));
//返回月的名称
$jd=cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
echo(jdmonthname($jd,1));


echo '</pre>';


//秒+毫秒
function time1(){
	list($msec, $sec) = explode(' ', microtime());
	return bcadd($msec, $sec,6);//加法运算，转为字符串
}
//echo time1();



//-----------------------------------------------
// $date=new dateInit();
// $date->set_date('2012-12-8');
// echo $date->add_day();//日期-增加天数
// echo $date->get_lastday();//日期-获取当月最后一天
// echo $date->is_leapyear(time());//日期-是否是闰年
// echo $date->get_week();//日期-获取星期几
// echo $date->get_date();//日期-获取当前日期
// echo $date->get_birthday();
// echo $date->get_time();

class dateInit {  
	
	private $year, $month, $day;  //定义年 月 日
	
	/**
	 *	日期-设置日期
	 * 	@param string   $date   日期格式2010-10-10
	 *  @return
	 */
	public function set_date($date = '') { 
		if ($date !== '') {
			list($year, $month, $day) = explode('-', $date);
			$this->set_year($year);
			$this->set_month($month);
			$this->set_day($day); 
		} else {
			$this->set_year(date('Y'));
			$this->set_month(date('m'));
			$this->set_day(date('d'));
		}
	} 
	
	/**
	 *	日期-增加天数
	 * 	@param  int  $day_num  多少天
	 *  @return int
	 */
	public function add_day($day_num = 1) {
		$day_num = (int) $day_num;
		$day_num = $day_num * 86400;
		$time = $this->get_time() + $day_num;
		$this->set_year(date('Y', $time));
		$this->set_month(date('m', $time));
		$this->set_day(date('d', $time));
		return $this->get_date();
	}

	/**
	 *	日期-获取当月最后一天
	 *  @return int
	 */
	public function get_lastday() {
		if($this->month==2) {
			$lastday = $this->is_leapyear($this->year) ? 29 : 28;
		} elseif($this->month==4 || $this->month==6 || $this->month==9 || $this->month==11) {
			$lastday = 30;
		} else {
			$lastday = 31;
		}
		return $lastday;
	}
	
	/**
	 *	日期-获取星期几
	 *  @return int
	 */
	public function get_week() {
		return date('w', $this->get_time());
	}
	
	/**
	 *	日期-是否是闰年
	 *  @return int
	 */
	public function is_leapyear($year) {
		return date('L', $year);
	}
	
	/**
	 *	日期-获取当前日期
	 *  @return string 返回：2010-10-10
	 */
	public function get_date() {
		return $this->year.'-'.$this->month.'-'.$this->day;
	}
	
	/**
	 *	日期-获取当前日期-不包含年-一般用户获取生日
	 *  @return string 返回：10-10
	 */
	public function get_birthday() {
		return $this->month.'-'.$this->day;
	}

	/**
	 *	日期-返回时间戳
	 *  @return int
	 */
	public function get_time() {
		return strtotime($this->get_date().' 23:59:59');
	}
	
	/**
	 *	日期-计算2个日期的差值
	 *  @return int
	 */
	public function get_difference($date, $new_date) {
		$date = strtotime($date);
		$new_date = strtotime($new_date);
		return abs(ceil(($date - $new_date)/86400));
	}
	
	/**
	 * 获取星期几
	 * @param int $week 处国人的星期，是一个数值，默认为null则使用当前时间
	 * @return string
	 */
	public static function getChinaWeek($week = null) {
		$week = $week ? $week : (int) date('w', time());
		$weekArr = array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		return $weekArr[$week];
	}
	
	/**
	 *	日期-设置年
	 * 	@param string  $year   年
	 *  @return
	 */
	private function set_year($year) {
		$year = (int) $year;
		$this->year = ($year <= 2100 && $year >= 1970) ? $year : date('Y');
	}
	
	/**
	 *	日期-设置月
	 * 	@param string  month  月
	 *  @return
	 */
	private function set_month($month) {
		$month = ltrim((int) $month, '0');
		$this->month = ($month < 13 && $month > 0) ? $month : date('m');
	}
	
	/**
	 *	日期-设置日
	 * 	@param string  day  天
	 *  @return
	 */
	private function set_day($day) {
		$day = ltrim((int) $day, '0');
		$this->day = ($this->year && $this->month && checkdate($this->month, $day, $this->year)) ? $day : date('d');
	}
	
}
