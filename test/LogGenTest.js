/*
 * Unit Test (nodeunit module)
 * 
 * This test module is unit test module based on the nodeunit module(npm).
 * 
 */



/*
 * Module dependencies.
 */
var testCase  = require('nodeunit').testCase;
var Logen  = require('../src/LogGen');

module.exports = testCase({
    "1. MessageReplaceTest": function(test) {
    	
    	var testLogFormat = [ "1234567890abcdefghijklmnopqrstuvwxyz" ];

    	var testToken = [ {
    		"type" : "string",
    		"token" : "90abc",
    		"replacement" : "-REPLACERESULT-"
    	} ];

    	var testLogGen = new Logen(testLogFormat,testToken);
    	var result = testLogGen.generateMessage(testLogGen.getLogFormatList() , testLogGen.getLogExpList());
    	
    	test.equal(result , "12345678-REPLACERESULT-defghijklmnopqrstuvwxyz");
        test.done();
    },
    "2. getRandomIndexTest": function(test) {
    	
    	var testLogGen = new Logen();
    	var result = testLogGen.getRandomIndex(7);
    	
    	test.ok(result , 0 <= result && result < 7 );
        test.done();
    }
});


