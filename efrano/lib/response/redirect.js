/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
 'use strict';
	
(function () {

	/**
	 * Redirect response
	 * can perform 3XX or 200 redirections
	 * 200 redirections use the refresh header to 0
	 * 3xx redirections use the location header
	 *
	 * @param String uri, should be as possible absolute uri for client compatibility
	 * @param int http status, default 302
	 */
	var Redirect = function(uri, status) {
		status = status | 302;
		
		this.run = function(res) {
			var headers = {};
			if(status < 300 && status >= 400) {
				headers = {Location: uri};
			} else {
				headers = {Refresh: "0; url="+uri};
			}
			res.respond({
							status_code: status, 
							headers: headers
						});
		}
	}

	exports.create = function(file) {
		return new Redirect(file);
	};

}());