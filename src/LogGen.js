var strftime = require('strftime');

function LogGen(logFormatList , logExpList){
	this.logFormatList = logFormatList;
	this.logExpList = logExpList;
}

LogGen.prototype.setLogFormatList = function(logFormatList){
	this.logFormatList = logFormatList;
};

LogGen.prototype.getLogFormatList = function(){
	return this.logFormatList;
};

LogGen.prototype.getLogFormat = function(logFormatList){
	//console.log("log Length : " + logFormatList.length);
	return logFormatList[this.getRandomIndex(logFormatList.length)]+'\n';
};

LogGen.prototype.getLogExpList = function(){
	return this.logExpList;
};

LogGen.prototype.getTimeStamp = function(){
	return new Date().getTime();
};

LogGen.prototype.getRegExp = function(regExp){
	return new RegExp(regExp);
};

LogGen.prototype.getTime = function(timePattern){
	//console.log(timePattern);
	//console.log(strftime(timePattern));
	return strftime(timePattern);
};

//make final Log Message to write Local File System
LogGen.prototype.getLogMessage = function(){
	//generate Log Message (param : sample Log List, regular token List)
	return this.generateMessage(this.getLogFormatList(), this.getLogExpList());
};

//Generate Final Log Message
LogGen.prototype.generateMessage = function(logFormatList , logExpList){
	
	//choose (random) a sample message from a sample Log List.
	var finalLogMessage = this.getLogFormat(logFormatList);

	//replace sample-Log-time to currentTime (use all regular expression written in config file)
	for(var count = 0 ; count < logExpList.length ; count++){
		console.log(logExpList[count].token);
		console.log(logExpList[count].replacement);
		finalLogMessage = finalLogMessage.replace(this.getRegExp(logExpList[count].token), this.getTime(logExpList[count].replacement));
	}
	
	//console.log("final logMessage : " + finalLogMessage);	
	return finalLogMessage;
};

LogGen.prototype.getRandomIndex = function(maxIndex){
	return (Math.random() *100000000 ).toFixed(0) % maxIndex;
};

module.exports = LogGen;


