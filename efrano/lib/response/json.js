/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
 'use strict';
	
(function () {
	
	/**
	 * json rendering
	 *
	 * @param mixed datas to jsonify
	 * @param int http status, default 200
	 */
	var Json = function(datas, status) {
		status = status || 200;
		this.run = function(res) {
			res.respond({
							status_code: status,
							content: JSON.stringify(datas),
							'Content-Type': 'application/json',							
						});
		};
	};
	
	exports.create = function(datas, status) {
		return new Json(datas, status);
	};

}());