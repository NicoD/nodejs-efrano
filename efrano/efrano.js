/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
(function() {
	exports.startServer = function(options, port) {
		var routes = options.routes;
				
		require('./lib/logger').log("start node server");
	
		var httpServer = require('./lib/dispatcher').create(routes, options);
		httpServer.listen(port);
	};
	
	exports.responseFactory = require('./lib/responseFactory');
}());