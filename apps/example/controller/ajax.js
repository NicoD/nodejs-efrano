(function() {
	var Ajax = function(options, req, res, sessionHandler) {
		
		var rf = require('responseFactory');
				
		this.storeFramesetDatas	= function() {
			var user = sessionHandler.retrieve('user');
			if(!user) {
				rf.create(rf.RESPONSE_JSON, {error: 403}, 403).run(res);
				return;
							
			}
			rf.create(rf.RESPONSE_JSON, {}).run(res);
		};
	};
	
	exports.create = function(options, req, res, sessionHandler) {
		return new Ajax(options, req, res, sessionHandler);
	};
}());