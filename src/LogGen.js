/*
 * 
 * 
 * 
 * 
 */

/*
 * Module dependencies.
 */
var strftime = require('strftime');


/*
 * LogGen Class construct
 * 
 * @param logFormatList (List)
 * @param logExpList (List)
 * 
 */
function LogGen(logFormatList , logExpList){
	this.logFormatList = logFormatList;
	this.logExpList = logExpList;
}


/*
 * setLogFormatList
 * LogGen prototype
 * 
 * @param logFormatList
 */
LogGen.prototype.setLogFormatList = function(logFormatList){
	this.logFormatList = logFormatList;
};


/*
 * getLogFormatList
 * LogGen prototype
 */
LogGen.prototype.getLogFormatList = function(){
	return this.logFormatList;
};


/*
 * getLogFormat
 * LogGen prototype
 * 
 * @param logFormatList
 * 
 */
LogGen.prototype.getLogFormat = function(logFormatList){
	//console.log("log Length : " + logFormatList.length);
	return logFormatList[this.getRandomIndex(logFormatList.length)];
};



/*
 * getLogExpList
 * LogGen prototype
 * 
 */
LogGen.prototype.getLogExpList = function(){
	return this.logExpList;
};



/*
 * getTimeStamp
 * LogGen prototype
 * 
 */
LogGen.prototype.getTimeStamp = function(){
	return new Date().getTime();
};



/*
 * getRegExp
 * LogGen prototype
 * 
 * @param regExp
 * 
 */
LogGen.prototype.getRegExp = function(regExp){
	return new RegExp(regExp);
};



/*
 * getTime
 * LogGen prototype
 * 
 * @param timePattern
 */
LogGen.prototype.getTime = function(timePattern){
	return strftime(timePattern);
};



/*
 * getLogMessage
 * LogGen prototype
 * 
 */
//make final Log Message to write Local File System
LogGen.prototype.getLogMessage = function(){
	//generate Log Message (param : sample Log List, regular token List)
	return this.generateMessage(this.getLogFormatList(), this.getLogExpList());
};



/*
 * generateMessage
 * LogGen prototype
 * 
 * @param logFormatList
 * @param logExpList
 */
//Generate Final Log Message
LogGen.prototype.generateMessage = function(logFormatList , logExpList){
	
	//choose (random) a sample message from a sample Log List.
	var logMessage = this.getLogFormat(logFormatList);

	//replace sample-Log-time to currentTime (use all regular expression written in config file)
	for(var count = 0 ; count < logExpList.length ; count++){

		if(logExpList[count].type === "timestamp"){
			logMessage = logMessage.replace(this.getRegExp(logExpList[count].token), this.getTime(logExpList[count].replacement));
		}else{
			logMessage = logMessage.replace(this.getRegExp(logExpList[count].token),  logExpList[count].replacement );
		}
	}
	
	//console.log("final logMessage : " + logMessage);	
	return logMessage;
};



/*
 * getRandomIndex
 * LogGen prototype
 * 
 * @param maxIndex 
 * 
 */
LogGen.prototype.getRandomIndex = function(maxIndex){
	return (Math.random() *100000000 ).toFixed(0) % maxIndex;
};



/*
 * export module
 */
module.exports = LogGen;


