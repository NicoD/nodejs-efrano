(function() {
	
	var Action = function(options, req, res, sessionHandler) {
		
		var rf = require('responseFactory');
		
		this.a1 = function() {
			var user = sessionHandler.retrieve('user');
			if(!user) {
				rf.create(rf.RESPONSE_REDIRECT, '/login/').run(res);	
				return;
			}
			rf.create(rf.RESPONSE_HTML_TPL, options.path_view, 'action-a1', {}, options.encoding).run(res);
		}
	}
	
	exports.create = function(options, req, res, sessionHandler) {
		return new Action(options, req, res, sessionHandler);
	}
}())