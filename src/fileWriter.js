require('date-utils');
var fs = require('fs');

function fileWriter() {

	this.writeLogMessage = function(logType, logPath , date, logMessage) {
		
		//var date = new Date().toFormat('YYYYMMDD');
		var fileFullPath = logPath+'\\'+ logType + date + '.log';
		
		//console.log("fileFullPath :" + fileFullPath);

		fs.exists(fileFullPath, function(exists) {

			if (exists) {
				fs.appendFile(fileFullPath, date + ' ' + logMessage, function(err) {
					if (err){
						throw err;
					}
					console.log(fileFullPath + '(appended) : ' + logMessage );
				});
			} else {
				fs.writeFile(fileFullPath, date + ' ' + logMessage, function(err) {
					if (err){
						return console.log(err);
					}
					console.log(fileFullPath + '(created) : ' + logMessage );
				});
			}
		});
	};
}

module.exports = fileWriter;
