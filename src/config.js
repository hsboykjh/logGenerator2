var fs = require('fs');

function config(configFileName){
	
	this.configFileName = configFileName;
	this.configuration = this.getConfiguration(configFileName);
}

config.prototype.setConfigFile = function(configFileName){
	this.configFileName = configFileName;
	this.configuration = this.getConfiguration(configFileName);
};

config.prototype.getConfiguration = function(configFileName){
	return JSON.parse(fs.readFileSync(configFileName));
};

config.prototype.getLogType = function(){
	return this.configuration.logType;
};

config.prototype.getLogPath = function(){
	return this.configuration.logPath;
};

config.prototype.getLogInterval = function(){
	return this.configuration.logInterval;
};

config.prototype.getLogFileType = function(){
	return this.configuration.logFileType;
};

config.prototype.getLogFormat = function(){
	return this.configuration.logFormat;
};

config.prototype.getLogExp = function(){
	//console.log(this.configuration.logExp);
	return this.configuration.logExp;
};

module.exports = config;
