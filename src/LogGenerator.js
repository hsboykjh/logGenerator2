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
 * > node LogGenerator.js configFile
 * > ex) node LogGenerator.js sdpRestLog.conf
 * 
 * 
 * serviceName and logInterval(ms) are Mandatory
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
 *  #!/bin/bash
 *  NOW=$(date +"%Y%m%d")
 *  FILE="serviceName$NOW.log"
 *  
 * run shell script
 * > node ./src/LogGenerator.js config.conf > /to/dst/path/$FILE
 * 
 * 
 */


/*
 * Module dependencies.
 */
var LogGen = require("./LogGen.js");
var Config = require("./Config.js");
require('date-utils');
var fs = require('fs');

/*
 * Log Generator (sequencial Log Messages) Usage 
 *
 */
function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js configFile");
	console.log("> ex) node LogGenerator.js sdpRestLog.conf\n");
	console.log("ServiceName and logInterval(ms) are Mandatory\n");
	console.log("Available ServiceName : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog");
	console.log("\n\n");
	console.log("Log Generator generate logMessages and print the messages to the stdout");
	console.log("If LogMessages are written on the file system, Unix stdout/pipeline command would be helpful.\n");
	console.log("shell script example : \n");
	console.log(" #!/bin/bash");
	console.log(" NOW=$(date +\"%Y%m%d\")");
	console.log(" FILE=\"serviceName$NOW.log\"\n\n");
	console.log("run shell script");
	console.log("> node ./src/LogGenerator.js config.conf > /to/dst/path/$FILE\n\n");
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
		if(config.getLogOutType() === "file"){
			setInterval( function(){ 
				var fileFullPath = config.getLogPath()+'\\'+ config.getServiceName() + new Date().toFormat('YYYYMMDD'); + '.log';
				//write Logs to local file system
				fs.appendFileSync(fileFullPath, logGen.getLogMessage() + '\n');} , logInterval);
		}else{
			setInterval( function(){ console.log(logGen.getLogMessage());} , logInterval);
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



