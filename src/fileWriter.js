var fs = require('fs');

function fileWriter() {
		
	this.writeLogMessage = function(logType, logPath, date,logMessage) {

		var fileFullPath = logPath + '\\' + logType + date.toFormat('YYYYMMDD') + '.log';
		console.log("fileFullPath :" + fileFullPath);
		
		
		var exists = fs.existsSync(fileFullPath);

		if (exists) {
			fs.appendFileSync(fileFullPath, logMessage + '\n' );
				
		} else {
			fs.writeFileSync(fileFullPath, logMessage + '\n');
		}		
	}		
}
module.exports = fileWriter;
