/*
 * 
 * LogGenerator.js
 * 
 * This module is main module to execute LogGenerator
 * 
 * 
 * - Parse application parameters ( config file name )
 * - Create LogGen instance based on TargetService.
 * - Set Call-back(Logging - Stdout) function interval.
 *
 * 
 *
 * Log Generator USAGE :
 * 
 * > node LogGenerator.js serviceName -f sample.json -i Interval -s FromDate -e ToDate
 * > ex) node LogGenerator.js sdpRestLog -f sample.json -i 1000 -s 2014-01-01 -e 2014-01-02
 *  
 * 
 * serviceName ,-i logInterval(ms), -f sample are Mandatory
 * Duration ( -s FromDate , -e ToDate ) parameters are optional
 * 
 * If Duration is not set, it would work persistence Mode ( Log Generator would continuously generate logMessage from currentTime ) 
 * If Duration is set correctly, it would work non-persistence Mode ( Log Generator would generate logMessage for duration the user set )
 *  
 * 
 * Available serviceName :
 * 	1) sdpRestLog
 * 	2) sdpMenuLog
 *
 * 
 * Log Generator generate logMessages and print the messages to the stdout
 * If LogMessages are written on the file system, Unix stdout/pipeline command would be helpful. 
 * 
 * shell script example : 
 * 
 *  #!/bin/sh
 *  SERVICENAME=sdpRestLog
 *  INTERVAL=1000
 *  FROMDATE=2014-07-01
 *  TODATE=2014-07-02
 *  SAMPLE=sample.json
 *  DESTPATH=.
 *  
 *  FROMTIME=$(date +%Y%m%d -d $FROMDATE)
 *  TOTIME=$(date +%Y%m%d -d $TODATE)
 *  DURATION=`expr $TOTIME - $FROMTIME`
 *  
 *  for((i=0 ; i < $DURATION; i++)); do
 *  	echo jihoon $i
 *      CURRENTDATE=`expr $FROMTIME - $i`
 *      FILENAME=$SERVICENAME$CURRENTDATE.log
 *      echo $FILENAME
 *      ./node LogGenerator.js $SERVICENAME -f SAMPLE -i $INTERVAL -s $FROMDATE -e $TODATE  > $DESTPATH/$FILENAME && tar zcf $DESTPATH/$FILENAME.tar.gz $DESTPATH/$FILENAME
 *  done
 * 
 * 
 */


/*
 * Module dependencies.
 */
var LogGen = require("./LogGen.js");
var argv = require('yargs').argv;
require('date-utils');
var fs = require('fs');

/*
 * Log Generator Usage 
 *
 */
function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js configFile");
	console.log("> ex) node LogGenerator.js sdpRestLog.conf\n");
	console.log("serviceName ,-i logInterval(ms), -f sample are Mandatory");
	console.log("Duration ( -s FromDate , -e ToDate ) paremeters are optional");
	console.log("");
	console.log("If Duration is not set, it would work persistence Mode ( Log Generator would continuously generate logMessage from currentTime ) ");
	console.log("If Duration is set correctly, it would work non-persistence Mode ( Log Generator would generate logMessage for duration the user set )\n\n");
	console.log("Available serviceName :");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog\n");
	console.log("Log Generator generate logMessages and print the messages to the stdout");
	console.log("If LogMessages are written on the file system, Unix stdout/pipeline command would be helpful.\n");
	console.log("shell script example : \n");
	console.log("");
	console.log(" #!/bin/sh");
	console.log(" SERVICENAME=sdpRestLog");
	console.log(" INTERVAL=1000");
	console.log(" FROMDATE=2014-07-01");
	console.log(" TODATE=2014-07-02");
	console.log(" SAMPLE=sample.json");
	console.log(" DESTPATH=.");
	console.log("");
	console.log(" FROMTIME=$(date +%Y%m%d -d $FROMDATE)");
	console.log(" TOTIME=$(date +%Y%m%d -d $TODATE)");
	console.log(" DURATION=`expr $TOTIME - $FROMTIME`");
	console.log("");
	console.log(" for((i=0 ; i < $DURATION; i++)); do");
	console.log(" 	echo jihoon $i");
	console.log("     CURRENTDATE=`expr $FROMTIME - $i`");
	console.log("     FILENAME=$SERVICENAME$CURRENTDATE.log");
	console.log("     echo $FILENAME");
	console.log("     ./node LogGenerator.js $SERVICENAME -f SAMPLE -i $INTERVAL -s $FROMDATE -e $TODATE  > $DESTPATH/$FILENAME && tar zcf $DESTPATH/$FILENAME.tar.gz $DESTPATH/$FILENAME");
	console.log(" done");
	console.log("");
	console.log("===================================================");
}



/*
 * Default Exception
 * 
 * @param message
 * 
 */
function exception(message) {
	this.message = message;
	this.name = "exception";
}


function getServiceNamge(){
	var serviceName = argv._[0];
	
	//console.log(typeof(serviceName));
	if(!serviceName || !serviceName.length ){
		throw new exception("Invalid Param : " + serviceName);
	}
	return serviceName;
}

function getLogInterval(){
	
	var logInterval = argv.i;
	
	if(!logInterval){
		throw new exception("Invalid Param : " + logInterval);
	}
	return logInterval;
}

function getFromDate(){	
	return argv.s;
}

function getToDate(){
	return argv.e;
}

function getSampleFile(){
	var sampleFile = argv.f;
	
	if(!sampleFile){
		throw new exception("Invalid Param : " + sampleFile);
	}
	
	return sampleFile;
}

function isPersistenceMode(){
	if(!getFromDate() || !getToDate()){
		console.log("Persistence Mode");
		return true;
	}else{
		console.log("NO Persistence Mode");
		return false;
	}
}

/*
 * Main function to execute Log Generator
 * 
 */
function executeLogGenerator(){

	try{
		var serviceName = getServiceNamge();
		var logInterval = getLogInterval();		
		var sampleFile = getSampleFile();		
		var Sample = JSON.parse(fs.readFileSync(sampleFile));
		
		//create LogGen instance ( param : a predefined Log Sample format List , TokenList)
		switch(serviceName){
			case 'sdpRestLog' :
			case 'sdpMenuLog' :				
				var logGen = new LogGen(Sample.logFormat, Sample.logToken);
				break;
			default :
				throw new exception("Invalid seviceName : " + serviceName);
		}
		
	
		
		if(isPersistenceMode()){
			setInterval( function(){ 
				logGen.setTimeStamp(new Date().getTime());
				console.log(logGen.getLogMessage());
			} , logInterval);
		}else{
			
			var fromDate = new Date(getFromDate()).addHours(-9).getTime();
			var toDate = new Date(getToDate()).addHours(-9).addDays(1).getTime();			
			var intervalCount = (toDate - fromDate) /  logInterval;
			var currentTime = fromDate;
		
			while(intervalCount > 0){
				currentTime = currentTime + Number(logInterval);
				logGen.setTimeStamp(currentTime);
				console.log(logGen.getLogMessage());
				intervalCount--;				
			}
		}	
	} catch (exception) {
		console.log(exception.name + " : " + exception.message );
		printUsage();
	}
}


/*
 * Execute LogGenerator app
 */
executeLogGenerator();



