var stream = require('stream');
var fs = require('fs');
var argv = require('yargs').argv;




console.log("start");
console.log(argv);
console.log(argv.f);
console.log(argv.i);
console.log(argv.s);
console.log(argv.e);
console.log(argv._);


//
//#!/bin/sh
//
//SERVICENAME=sdpRestLog
//INTERVAL=1000
//FROMDATE=2014-07-01
//TODATE=2014-07-02
//
//#FROMTIME=$(date +%Y/%m/%d -d $FROMDATE)
//#TOTIME=$(date +%Y%m%d -d $TODATE)
//
//FROMTIME=20140701
//TOTIME=20140702
//DURATION=`expr $TOTIME - $FROMTIME`
//
//echo $TOTIME - $FROMTIME : $DURATION
//
//
//for((i=0 ; i < $DURATION; i++)); do
//	echo jihoon $i
//	CURRENTDATE=`expr $FROMTIME - $i`
//	FILENAME=$SERVICENAME$CURRENTDATE.log
//	echo $FILENAME
//	
//	./test > ./logs/$FILENAME && tar zcf ./logs/$FILENAME.tar.gz ./logs/$FILENAME
//done



var duplexStream = new stream.Duplex;
var stdout = process.stdout;
var writableStream = fs.createWriteStream('C:\\Users\\admin\\logGenerator2\\logGenerator2\\logs\\file.txt' , { 'flags': 'a'} );
var eventCount = 10000;

duplexStream._read = function(size) {
};

duplexStream._write = function(chunk, encoding, cb) {

  this.push(chunk.toString().replace(/\d{2}:\d{2}:\d{2}/, "TIME").replace(/\d{12}/, "YEAR-MONTH-DAY"));
  cb();
};

duplexStream.end = function() {
  console.log('end');
};
process.stdin
  .pipe(duplexStream)
  .pipe(stdout)
  //.pipe(writableStream)


/*
require('date-utils');
var fs = require('fs');

var today = new Date();
var settingDay = new Date(0);
//var todayDate = today.toFormat('YYYYMMDDHHMM');
//var time = today.toFormat('HH:MM:SS');

//settingDay.setDate (today.getDate() - 10);

var t = new Date(1980,1,3);
var t2 = new Date();
t2.setTime(t.getTime());
console.log('kkkk' + t+'  , '+t2);
t.setTime(0);
console.log('kkkk' + t+'  , '+t2);
t2.setTime(t.getTime());
console.log('kkkk' + t+'  , '+t2);


fs.writeFile('C:\\Users\\admin\\logGenerator2\\logGenerator2\\logs\\test.log', 'Hello World', function(err) {
	  if(err) throw err;
	  console.log('File write completed');
	});


function SetTimeTest(newtime){
	   var d, s;                  //Declare variables.
	   d = new Date();            //Create Date object.
	   d.setTime(newtime);        //Set time.
	   s = "Current setting is ";
	   s += d.toUTCString();
	   return(s);                 //Return new setting.
	}


//console.log("today : "+today);
console.log("settingDay : "+settingDay);
//console.log("today : "+today.toFormat('YYYYMMDDHHMM'));
console.log("settingDay : "+settingDay.toFormat('YYYYMMDDHHMMSS'));
//console.log("today : "+today.toFormat('HH:MM:SS'));
console.log("settingDay : "+settingDay.toFormat('HH:MM:SS'));


var t4 = new Date();

for(var count = 0 ; count < 100 ; count++){
	
	t4.addMinutes(2);
	//settingDay.addMilliseconds(10000);
	console.log("t4 : "+t4.toFormat('YYYYMMDDHHMISS'));
	
}

//
//t4.addMilliseconds(2000); // add milliseconds to existing time
//console.log("111t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addSeconds(5); // add seconds to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addMinutes(2); // add minutes to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addHours(1); // add hours to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addDays(2); // add days to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addWeeks(3); // add weeks to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addMonths(4); // add months to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
//t4.addYears(2); // add years to existing time
//console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));

t4.addDays(-2); // add years to existing time
console.log("t4 : "+t4.toFormat('YYYYMMDDHHMMSS'));
console.log("t4 : "+t4.getTime());

var t5 = new Date(02/13/1981);
console.log("t5 : "+t5.toFormat('YYYYMMDDHHMMSS'));
console.log("t5 : "+t5.getTime());

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
//寃곌낵 : "\korea"

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


/*fs = require('fs');

		
target = 'C:\\Users\\admin\\logGenerator2\\logGenerator2\\logs\\test.log';
dest = fs.createWriteStream(target);

buf = new Buffer(100);
var msg = "1st Korea Node.js Conference\\ n";
buf.write( msg, 0 );
dest.write( buf );
dest.end()

*/
/*
var fs = require('fs');
var stream = fs.createWriteStream("C:\\Users\\admin\\logGenerator2\\logGenerator2\\logs\\my_file.txt", {'flags': 'a'});
console.log(stream);
stream.once('open', function(fd) {
  stream.write("888My first row\n");
  stream.write("777My second row\n");
  //stream.end();
});

console.log("END");
*/
/*
var HashMap = require('hashmap').HashMap;
var fs = require('fs');

var map = new HashMap();

var stream = fs.createWriteStream("./test1.txt");
//this.addFileStreamMap(fileFullPath, stream);
map.set("./test1.txt","1234");
map.set("./test1.txt","5678");
console.log(map.get("./test1.txt")); // --> "some value"
*/

/*
//Add key, value pairs into the map with random strings
for (var i = 0; i < 10; i++) {
 var item =generateRandomString();
 var value = generateRandomString();
 map[item] = value;
};

//Output every key, value pair onto the screen
for (var i in map) {
 console.log("Key: " + i + ", Value: " + map[i]);
}

//The function required for generating random strings
function generateRandomString()
{
 var randomString = "";
 var randomStringSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 for( var i=0; i < 5; i++ ){
     randomString += randomStringSource.charAt(Math.floor(Math.random() * randomStringSource.length));
 }

 return randomString;
}*/

