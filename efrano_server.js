'use strict';

var efrano 	= require("./efrano/efrano");

if(!process.argv[2])  {
	process.stdout.write('[error] missing configuration file\n');
	process.exit(1);
}
	
try { 
	var config = require('./'+process.argv[2]); 
} catch (e) {
	process.stdout.write('[error] unknown configuration file '+process.argv[2]+'\n');
	process.exit(1); 
}

efrano.startServer(
		config, 
		8000);