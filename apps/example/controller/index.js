(function() {

	var mongo = require('mongodb');
	var db = new mongo.Db('db', new mongo.Server('localhost', 271017, {}), {});
		
	var Index = function(options, req, res, sessionHandler) {
		
		var rf = require('responseFactory');
		
		this.defaultAction = function() {
			rf.create(rf.RESPONSE_REDIRECT, '/login/', 200).run(res);
		};
		
		this.loginPost = function() {
			db.open(function() {
				var datas = {};
				datas.login = req.getPost('login');
				datas.foo = req.getGet('foo');
				
				sessionHandler.store('user', datas.login);
				rf.create(rf.RESPONSE_HTML_RAW, 'auth ok').run(res);
			});			
		};
		
		this.login = function() {
			rf.create(rf.RESPONSE_HTML_TPL, options.path_view, 'login', {}, options.encoding).run(res);
		};
		
		
		this.foo = function() {
			rf.create(rf.RESPONSE_HTML_TPL, options.path_view, 'bar', {foobar: 'barfoo'}, options.encoding).run(res);
		};
	};
	
	exports.create = function(options, req, res, sessionHandler) {
		return new Index(options, req, res, sessionHandler);
	};
}());