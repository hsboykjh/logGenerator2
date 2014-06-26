/*
 * 
 * LogGenerator.js
 * 
 * This module is main module to execute LogGenerator
 * 
 * 
 * - Parse Application parameters ( TargetService(Log) name , interval time )
 * - Create LogGen instance based on TargetService.
 * - Set Call-back(Logging) function interval.
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
 * 	3) sdp3DKPOPLog
 * 
 */


/*
 * Module dependencies.
 */
var Sample = require("./SampleFormat.js");
var LogGen = require("./LogGen.js");


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
	console.log("> ex) node LogGenerator.js sdpRestLog 1000\n");
	console.log("logType is Mandatory\n\n");
	console.log("logInterval is optional(DEFAULT : 1000)\n\n");
	console.log("Available logType : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdpMenuLog");
	console.log("	3) sdp3DKPOPLog");
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
 * get Log Interval to generate ( Application's 2nd parameter ) - reference : Usage guide
 *
 * @return logInterval
 * 
 */
function getLogInterval(){
	
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
	
		//create LogGen instance ( param : a predefined Log Sample format List , TokenList)
		switch(serviceName){
			case 'sdpRestLog' :
				var logGen = new LogGen(Sample.getSdpRestLogFormat(), Sample.getSdpRestLogToken());
				break;
			case 'sdp3DKPOPLog' :
				var logGen = new LogGen(Sample.getSdp3DKPOPLogFormat(), Sample.getSdp3DKPOPLogToken());
				break;
			case 'sdpMenuLog' :
				var logGen = new LogGen(Sample.getSdpMenuLogFormat(), Sample.getSdpMenuLogToken());
				break;
			default :
				throw new UserException("Invalid seviceName : " + serviceName);
		}
		
		//set TimeInterval and register callBack-function to write LogMessages to file.
		setInterval( function(){ console.log(logGen.getLogMessage());} , logInterval);
		
	} catch (exception) {
		console.log(exception.name + " : " + exception.message );
		printUsage();
		process.exit();
	}

}


/*
 * Execute LogGenerator app
 */
executeLogGenerator();



