/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
(function() {
	exports.startServer = function(options, port) {
		var routes = options.routes;
		var Syslog = require('node-syslog').Syslog;

		require.paths.push(options.efrano_libs);
		
		Syslog.init("node-syslog", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_INFO);
		Syslog.log(Syslog.LOG_INFO, "start node server" + new Date());
	
		var httpServer = require('./lib/dispatcher').create(routes, options);
		httpServer.listen(port);
		
		require("elf-logger").createLogger(httpServer, {
			dir: options.http_log,
			template: "{cs(host)}/{date}.log",
			fields: ['date','time','c-ip','cs-method','cs-uri','sc-status','cs(user-agent)']
		});
	};
	
}())