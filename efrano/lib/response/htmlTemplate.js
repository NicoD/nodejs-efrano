/**
 * @author <n.denoual@gmail.com>
 * @date 2011
 */
 
 'use strict';
	
(function () {
	
	var view = require('../view');
		
	/**
	 * html rendering via a template file
	 *
	 * @param String path of the tpl files
	 * @param String template file identifier
	 * @param Object mapping object for templating
	 * @param int http status, default 200
	 */
	var HtmlTemplate = function(path_view, tpl_file, datas, encoding, status) {
		status = status || 200;
		this.run = function(res) {
			res.respond({
							status_code: status,
							content: view.create().fileContent(path_view, tpl_file, datas, encoding)
						});
		};
	};
	
	function create(path_view, tpl_file, datas, encoding, status) {
		return new HtmlTemplate(path_view, tpl_file, datas, encoding, status);
	}

	exports.create = create;

}());