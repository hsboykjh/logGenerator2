var fs = require('fs');

function Config(configFileName){
	
	this.configFileName = configFileName;
	this.configuration = this.getConfiguration(configFileName);
}

Config.prototype.setConfigFile = function(configFileName){
	this.configFileName = configFileName;
	this.configuration = this.getConfiguration(configFileName);
};

Config.prototype.getConfiguration = function(configFileName){
	return JSON.parse(fs.readFileSync(configFileName));
};

Config.prototype.getServiceName = function(){
	return this.configuration.serviceName;
};

Config.prototype.getLogPath = function(){
	return this.configuration.logPath;
};

Config.prototype.getLogInterval = function(){
	return this.configuration.logInterval;
};

Config.prototype.getLogFileType = function(){
	return this.configuration.logFileType;
};

Config.prototype.getLogFormat = function(){
	return this.configuration.logFormat;
};

Config.prototype.getLogExp = function(){
	//console.log(this.configuration.logExp);
	return this.configuration.logExp;
};

module.exports = Config;
