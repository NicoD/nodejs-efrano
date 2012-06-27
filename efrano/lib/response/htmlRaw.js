/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
 'use strict';
	
(function () {
	
	/**
	 * raw html rendering
	 *
	 * @param String html data
	 * @param Boolean add the content into the body tag
	 * @param int http status, default 200
	 */
	var HtmlRaw = function(html, hasBody, status) {
		hasBody = hasBody | true;
		status = status | 200;
		
		this.run = function(res) {
			var buff = hasBody ? html : '<html><head></head><body>'+html+'</body></html>';
			res.respond({
							status_code: status,
							content: buff
						});			
		};
	};

	exports.create = function(html, hasBody) {
		return new HtmlRaw(html, hasBody);
	};

}());