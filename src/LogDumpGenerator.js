/*
 * 
 * LogDumpGenerator.js
 * 
 * This module is main module to execute LogDumpGenerator
 * 
 * 
 * - Parse application parameter ( configFile name )
 * - Create the LogGen instance based on the targetService.
 * - Calculate millisecond start/end logging
 * - Write logMessages on the local file system 
 *
 * 
 *
 * Log Dump Generator USAGE :
 * 
 * > node LogDumpGenerator.js configFile
 * > ex) node LogGenerator.js sdpRestLog.conf
 * 
 * 
 * ServiceName,logPath and logInterval are Mandatory.
 * 
 * Available service :
 * 	1) sdpRestLog
 * 	2) sdpMenuLog
 *
 * 
 * 
 */


/*
 * Module dependencies.
 */
var LogGen = require("./LogGen.js");
var fs = require('fs');
var Config = require("./Config.js");
require('date-utils');

/*
 * Define const
 */
var DEFAULT_LOG_INTERVAL = "1000";
var DEFAULT_LOG_DUMP_PERIOD_DAY = "30";

/*
 * Log Dump Generator (Log Message) Usage 
 *
 */
function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js configFile ");
	console.log("> ex) node LogGenerator.js sdpRestLog.conf\n");
	console.log("ServiceName,logPath and logInterval are Mandatory\n");
	console.log("Available ServiceName : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog\n\n");
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



/*
 * Main function to execute Log Generator
 * 
 */
function executeLogGenerator(){

	try{
		//create configuration (parameter config-file name (ex: SDPLog.conf, WebOSLog.conf)) 
		var config = new Config(process.argv[2]);
		
		var serviceName = config.getServiceName();
		var logInterval = config.getLogInterval();
		var logPath = config.getLogPath();
		
	
		//create LogGen instance ( param : a predefined Log Sample format List , TokenList)
		switch(serviceName){
			case 'sdpRestLog' :
				var logGen = new LogGen(config.getLogFormat(), config.getLogToken());
				break;
			case 'sdpMenuLog' :
				var logGen = new LogGen(config.getLogFormat(), config.getLogToken());
				break;
			default :
				throw new exception("Invalid seviceName : " + serviceName);
		}
		
		
		//transform Date to millisecond-Time 
		var startTime = new Date().addDays(-Number(DEFAULT_LOG_DUMP_PERIOD_DAY)).getTime();;
		var endTime = new Date().getTime();
		
		
		//Loop 
		while(startTime < endTime){
			//increase time interval 
			startTime += Number(logInterval);
			
			//set full absolute file path : LogPath(config) + fileName(each file name includes date information)
			var fileFullPath = logPath + '/' + serviceName +  new Date(startTime).toFormat('YYYYMMDD') + '.log';
			
			//write Logs to local file system
			fs.appendFileSync(fileFullPath, logGen.getLogMessage() + '\n');
		}
		
		console.log("Log Dump Generator completed");
		
	} catch (exception) {
		console.log(exception.name + " : " + exception.message );
		printUsage();
	}
}


/*
 * Execute LogGenerator app
 */
executeLogGenerator();



