/*
 * 
 * LogDumpGenerator.js
 * 
 * This module is main module to execute LogDumpGenerator
 * 
 * 
 * - Parse application parameters ( TargetService(Log) name , interval time )
 * - Create LogGen instance based on TargetService.
 * - Set Call-back(Logging - Stdout) function interval.
 *
 * 
 *
 * Log Dump Generator USAGE :
 * 
 * > node LogDumpGenerator.js logType configFile
 * > ex) node LogGenerator.js sdpRestDumpLog logDump.conf
 * 
 * 
 * logType / configFile are Mandatory.
 * 
 * Available logType :
 * 	1) sdpRestDumpLog
 * 	2) sdpMenuDumpLog
 *
 * 
 * 
 * If LogMessage are written on the filesystem, Unix stdout/pipeline command would be helpful. 
 * 
 * shell script example : 
 * 
 *  #!/bin/bash
 *  NOW=$(date +"%Y%m%d")
 *  FILE="serviceName$NOW.log"
 *  
 * run shell script
 * > node ./src/LogGenerator.js serviceName logInterval > /to/dst/path/$FILE
 * 
 * 
 */


/*
 * Module dependencies.
 */
var Sample = require("./SampleFormat.js");
var LogGen = require("./LogGen.js");
var fs = require('fs');
require('date-utils');

/*
 * Define const
 */
var DEFAULT_LOG_INTERVAL = "1000";
var DEFAULT_LOG_DUMP_PERIOD_DAY = "30";

/*
 * Log Generator (sequencial Log Message) Usage 
 *
 */
function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js logType logPath logInterval(ms) ");
	console.log("> ex) node LogGenerator.js sdpRestLog 1000\n");
	console.log("logType and logPath are Mandatory\n");
	console.log("logInterval is optional(DEFAULT : 1000)\n");
	console.log("Available logType : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog\n\n");
	console.log("If LogMessage are written on the filesystem, Unix stdout/pipeline command would be helpful.\n");
	console.log("shell script example : \n");
	console.log(" #!/bin/bash");
	console.log(" NOW=$(date +\"%Y%m%d\")");
	console.log(" FILE=\"serviceName$NOW.log\"\n\n");
	console.log("run shell script");
	console.log("> node ./src/LogGenerator.js serviceName logInterval > /to/dst/path/$FILE\n\n");
	console.log("===================================================");
}



/*
 * Default Exception
 * 
 * @param message
 * 
 */
function UserException(message) {
	this.message = message;
	this.name = "UserException";
}



/*
 * get Service Name ( Application's 1st parameter ) - reference : Usage guide
 *
 * @return serviceName
 * 
 */
function getServiceNamge(){
	var serviceName = process.argv[2];
	
	//console.log(typeof(serviceName));
	if(!serviceName || !serviceName.length ){		
		throw new UserException("Invalid Param");
	}
	return serviceName;
}


/*
 * get Log Interval to generate ( Application's 3rd parameter ) - reference : Usage guide
 *
 * @return logInterval
 * 
 */
function getLogInterval(){
	
	var logInterval = process.argv[4];
	
	if(!logInterval || !logInterval.length ){
		throw new UserException("Invalid Param");
		return DEFAULT_LOG_INTERVAL;
	}
	return logInterval;
}


/*
 * get Log Interval to generate ( Application's 2nd parameter ) - reference : Usage guide
 *
 * @return logInterval
 * 
 */
function getLogPath(){
	
	var logPath = process.argv[3];
	
	if(!logPath || !logPath.length ){
		throw new UserException("Invalid Param");
	}
	return logPath;
}



/*
 * get Log Interval to generate ( Application's 2nd parameter ) - reference : Usage guide
 *
 * @return logInterval
 * 
 */
function getDate(){
	
	var logInterval = process.argv[3];
	
	if(!logInterval || !logInterval.length ){
		return DEFAULT_LOG_INTERVAL;
	}
	return logInterval;
}

/*
 * Main function to execute Log Generator
 * 
 */
function executeLogGenerator(){

	try{
		var serviceName = getServiceNamge();
		var logInterval = getLogInterval();
		var logPath = getLogPath();
	
		//create LogGen instance ( param : a predefined Log Sample format List , TokenList)
		switch(serviceName){
			case 'sdpRestLog' :
				var logGen = new LogGen(Sample.getSdpRestLogFormat(), Sample.getSdpRestLogToken());
				break;
			case 'sdpMenuLog' :
				var logGen = new LogGen(Sample.getSdpMenuLogFormat(), Sample.getSdpMenuLogToken());
				break;
			default :
				throw new UserException("Invalid seviceName : " + serviceName);
		}
		
		//set TimeInterval and register callBack-function to write LogMessages to file.
		//setInterval( function(){ console.log(logGen.getLogMessage());} , logInterval);
		var startTime = new Date().addDays(-Number(DEFAULT_LOG_DUMP_PERIOD_DAY)).getTime();;
		var endTime = new Date().getTime();
		
		//startDate.addDays(-Number(DEFAULT_LOG_DUMP_PERIOD_DAY));
		//var startTime = startDate.getTime();
		//var endTime = endDate.getTime()
		
		while(startTime < endTime){
			startTime += Number(logInterval);
			var fileFullPath = logPath + '\\' + serviceName +  new Date(startTime).toFormat('YYYYMMDD') + '.log';
			var logMessage = logGen.getLogFormat(logGen.getLogFormatList()) + '\n';
			fs.appendFileSync(fileFullPath, logMessage);
		}
		
		console.log("Log Dump Generator completed");
		//FileWriter.writeLogMessage( Config.getLogType() , Config.getLogPath() , LogGen.getLogMessage());
		
	} catch (exception) {
		console.log(exception.name + " : " + exception.message );
		printUsage();
	}
}


/*
 * Execute LogGenerator app
 */
executeLogGenerator();



