(function() {
	//duration of the session
	exports.session_duration = 10000;
	
	//root of the server
	exports.document_root = '/cygdrive/e/Node/';
	
	//root of the application
	exports.app_root = exports.document_root+'apps/example/';
	
	//route module
	exports.routes = require(exports.app_root+'route').routes;

	
	//root of efrano
	exports.efrano_root = exports.document_root+'efrano/';

	//libs of efrano
	exports.efrano_libs = exports.efrano_root+'lib/';

	
	//path of the controllers
	exports.path_controller = exports.app_root+'controller';
	
	//path of the views
	exports.path_view = exports.app_root+'view';
	
	//http log file
	exports.http_log = '/var/log/node/http';

	//out encoding
	exports.encoding = 'utf8';
	
	//special views
	exports.errorDocument = {404: 'e404',
							 501: 'e501'};
}());