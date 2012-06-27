'use strict';

var efrano 	= require("./efrano/efrano");

if(!process.argv[2])  {
	process.stderr.write('[error] missing configuration file\n');
	process.exit(1);
}
	
try { 
	var config = require(process.argv[2]); 
} catch (e) {
	process.stderr.write('[error] error while processing configuration file ' + process.argv[2] + ':\n ' + e  + '\n');
	process.exit(1); 
}

efrano.startServer(
		config, 
		8000);