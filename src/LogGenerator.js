var Sample = require("./SampleFormat.js");
var LogGen = require("./LogGen.js");

function printUsage(){
	console.log("===================================================");
	console.log("Log Generator USAGE");
	console.log("> node LogGenerator.js logType logInterval(ms)");
	console.log("> ex) node LogGenerator.js sdpRestLog 1000");
	console.log("logType is Mandatory\n\n");
	console.log("logInterval is optional(DEFAULT : 1000)\n\n");
	console.log("Available logType : ");
	console.log("	1) sdpRestLog");
	console.log("	2) sdp3DKPOPLog");
	console.log("===================================================");
}

var serviceName = process.argv[2];
var timeInterval = process.argv[3];

if(!serviceName || !serviceName.length || !timeInterval || !timeInterval.length ){
	console.log("ERROR : ");
	printUsage();
	process.exit();
}

//create LogGen instance ( param : a predefined Log Sample format List )
switch(serviceName){
	case 'sdpRestLog' :
		var logGen = new LogGen(Sample.getSdpRestLogFormat(), Sample.getSdpRestLogToken());
		break;
	case 'sdp3DKPOPLog' :
		var logGen = new LogGen(Sample.getSdp3DKPOPLogFormat(), Sample.getSdp3DKPOPLogToken());
		break;
	default :
		printUsage();
		process.exit();
		break;
}

//create Timer with TimeInterval and CallBack-function to write LogMessages to file.
setInterval(
	function(){
		console.log(logGen.getLogMessage());
	} , timeInterval
);

