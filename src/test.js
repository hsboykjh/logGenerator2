require('date-utils');

var today = new Date();
var settingDay = new Date();
//var todayDate = today.toFormat('YYYYMMDDHHMM');
//var time = today.toFormat('HH:MM:SS');

settingDay.setDate (today.getDate() - 10);

console.log("today : "+today);
console.log("settingDay : "+settingDay);
console.log("today : "+today.toFormat('YYYYMMDDHHMM'));
console.log("settingDay : "+settingDay.toFormat('YYYYMMDDHHMM'));
console.log("today : "+today.toFormat('HH:MM:SS'));
console.log("settingDay : "+settingDay.toFormat('HH:MM:SS'));

for(var count = 0 ; count < 100 ; count++){
	if(today > settingDay){
		console.log("today : " + count);
	}else{
		console.log("settingDay : " + count);
	}
	
	settingDay.setDate (settingDay.getDate() + 1);
		
}
/*
require('date-utils');
var config = require("./config.js");


var strftime = require('strftime');
console.log(strftime('%H:%M:%S')); // => April 28, 2011 18:21:08
console.log(strftime('%F %T', new Date(1307472705067))); // => 2011-06-07 18:51:45
*/

/*
var aaa = "korea.html";


var Config = new config("sdplog.conf");

var listLogExp = Config.getLogExp();
console.log(listLogExp.length);

for(var count = 0 ; count < listLogExp.length ; count++){
	var listItem = listLogExp[count];
	console.log(listItem);
	console.log(listItem.expression);
	console.log(listItem.replace);
}


console.log(aaa.replace(/(.+)\.html/,"\\$1"));
//결과 : "\korea"

//var timestamp = this.getTimeStamp();
var todayDate = new Date().toFormat('YYYYMMDDHHMM');
var time = new Date().toFormat('HH:MM:SS');

var test = "\d{2}:\d{2}:\d{2}";
console.log(test);
console.log(test.replace(/\\/, "bbb"));

var log = "00:14:04[049] 201301010013,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,AT,ger,/rest/sdp/v3.0/c2.2/country.xml,GET,C0:41:F6:57:BC:01";

var myRe = new RegExp("\\d{2}:\\d{2}:\\d{2}");


console.log(log.replace(myRe, time));
var myArray = log.replace(myRe, time);//myRe.exec(log);
console.log("myArray : "+ myArray);

console.log(log.replace(/\d{2}:\d{2}:\d{2}/, time));

*/

/*
console.log("test" + count++);
console.log("test" + count++);
console.log("test" + count++);
console.log("test" + count++);
console.log("test" + count++);


function logGen(){
	console.log("test" + count++);
}

setInterval( logGen(), 1000);




function UserException(message) {
   this.message = message;
   this.name = "UserException";
}
function getMonthName(mo) {
   mo = mo-1; // Adjust month number for array index (1=Jan, 12=Dec)
   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec"];
   if (months[mo] !== undefined) {
      return months[mo];
   } else {
      throw new UserException("InvalidMonthNo");
   }
}

try {
   // statements to try
   var myMonth = 15; // 15 is out of bound to raise the exception
   monthName = getMonthName(myMonth);
} catch (e) {
   monthName = "unknown";
   console.log(e.message + e.name); // pass exception object to err handler
}

*/



