/*
 * 
 * LogGenerator.js
 * 
 * This module is main module to execute LogGenerator
 * 
 * 
 * - Parse application parameters ( TargetService(Log) name , interval time )
 * - Create LogGen instance based on TargetService.
 * - Set Call-back(Logging - Stdout) function interval.
 *
 * 
 *
 * Log Generator USAGE :
 * 
 * > node LogGenerator.js logType logInterval(ms)
 * > ex) node LogGenerator.js sdpRestLog 1000
 * 
 * 
 * logType is Mandatory
 * logInterval is optional(DEFAULT : 1000)
 * Available logType :
 * 	1) sdpRestLog
 * 	2) sdpMenuLog
 *
 * 
 * Log Generator generate logMessages and print the messages to the stdout
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
var LogGen = require("./LogGen.js");
var Config = require("./Config.js");

/*
 * Define const
 */
var DEFAULT_LOG_INTERVAL = "1000";


/*
 * Log Generator (sequencial Log Message) Usage 
 *
 */
function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js logType logInterval(ms)");
	console.log("> ex) node LogGenerator.js sdpRestLog.conf\n");
	console.log("ServiceName and logInterval(ms) are Mandatory\n");
	console.log("Available ServiceName : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog");
	console.log("\n\n");
	console.log("Log Generator generate logMessages and print the messages to the stdout");
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
		
		//set TimeInterval and register callBack-function to write LogMessages to file.
		setInterval( function(){ console.log(logGen.getLogMessage());} , logInterval);
		
	} catch (exception) {
		console.log(exception.name + " : " + exception.message );
		printUsage();
	}
}


/*
 * Execute LogGenerator app
 */
executeLogGenerator();



