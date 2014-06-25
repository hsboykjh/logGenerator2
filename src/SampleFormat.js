var sdpRestLogFormat = 
	[	
		"00:00:00[200] 201212312359,P000000004,HE_DTV_GP3B_AFAAABAA,GP3B,EU,RO,rum,/rest/sdp/v2.0/c1.2/log/channel.xml,POST,3C:BD:D8:AC:83:62",
		"00:14:04[049] 201301010013,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,AT,ger,/rest/sdp/v3.0/c2.2/country.xml,GET,C0:41:F6:57:BC:01",
		"00:14:04[059] 201301010013,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,CZ,cze,/rest/advs/v2.1/c1.0/secure/target/baseInfo.xml,GET,C0:41:F6:94:04:8B",
		"17:24:00[650] 201301011723,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,SE,swe,/rest/appstore/v2.2/device/hardwarefeature.xml,POST,C0:41:F6:19:71:24",
		"17:24:00[653] 201301011723,P000000004,HE_DTV_GP3B_AFAAABAA,GP3B,EU,ES,spa,/rest/appstore/v1.2/app/update.xml,GET,3C:BD:D8:AD:6C:E5",
		"17:24:00[654] 201301011723,P000000004,HE_DTV_GP3B_AFAAABAA,GP3B,IL,IL,eng,/rest/sdp/v2.0/c1.0/home.xml,GET,E8:5B:5B:3E:71:73",
		"17:24:00[655] 201301011723,P000000004,HE_DTV_GP3B_AFAAABAA,GP3B,EU,RU,rus,/rest/appstore/v1.1/netcastapps/netcastapps.xml,GET,E8:5B:5B:18:3F:BD",
		"17:24:00[656] 201301011723,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,RU,rus,/rest/sdp/v3.0/c2.1/authentication.xml,GET,C0:41:F6:36:EA:41",
		"17:24:00[658] 201301011723,P000000006,HE_DTV_GP4I_AFAAABAA,GP4I,EU,PL,pol,/rest/sdp/v3.0/c2.2/myApps.xml,GET,C0:41:F6:7F:EB:FE",
		"17:24:00[659] 201301011723,P000000004,HE_DTV_GP3B_AFAAABAA,GP3B,EU,PL,pol,/rest/sdp/v2.0/c1.3/contentStore/packageList.xml,GET,E8:5B:5B:43:7A:4E"
	];

var sdpRestLogToken =
	[
	 	{
	 		"token": "\\d{2}:\\d{2}:\\d{2}",
	 		"replacement" : "%H:%M:%S"
	 	},
	 	{  			
  			"token" : "\\d{12}",
  			"replacement" : "%Y%m%d%H%M"	  			
  		}
	];

var sdp3DKPOPLogFormat =
	[	
		"3DZONEPS00000001371362182354109|S|94:44:44:94:EA:73|CZ|20130301235947|B|42LM660S-ZA|B|PS0000000137|Glimpse|Documentary|196|29|1991169||"
	];

var sdp3DKPOPLogToken =
	[
	 	{  			
  			"token" : "201\\d{11}",
  			"replacement" : "%Y%m%d%H%M%S"	  			
  		}
	];

exports.getSdpRestLogFormat = function () {
	return sdpRestLogFormat;
};

exports.getSdpRestLogToken = function () {
	return sdpRestLogToken;
};

exports.getSdp3DKPOPLogFormat = function () {
	return sdp3DKPOPLogFormat;
};

exports.getSdp3DKPOPLogToken = function () {
	return sdp3DKPOPLogToken;
};


