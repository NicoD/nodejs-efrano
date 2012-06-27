// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//
// this class is mainly based on nerve.js file from Nerve Project (https://github.com/gjritter/nerve) which not seems to be maintained anymore
//
// (c) 2010 Nicolas Denoual <n.denoual@gmail.com>

/*global require, process, exports */
'use strict';

(function () {
    var http = require('./http_state'),
        url = require('url'),
        path = require('path'),
        fs = require('fs'),
        mime = require('./mime'),
		qs = require('querystring'),
        _ = require('underscore');
	
	var controllerFactory = require('./controllerFactory');
	var sessionHandler = require('./sessionHandler');

    http.ServerResponse.prototype.respond = function respond(response_data) {
	
		if(!response_data.content) {
			var tmp = typeof(response_data) === 'string' ? {} : response_data;
			tmp.content = typeof(response_data) === 'string' ? response_data.content : '';
			response_data = tmp;
		}
		
        var headers = {
            'Content-Type': response_data.content_type || 'text/html',
            'Content-Length': response_data.content.length || 0
        };

        if (this.cookies) {
            headers['Set-Cookie'] = this.cookies.join(', ');
        }

        _.extend(headers, response_data.headers);
		
		this.writeHead(response_data.status_code || 200, headers);
        this.write(String(response_data.content), 'binary');
        this.end();
    };


    function match_request(matcher, pathname) {
        if (_.isString(matcher)) {
            return (matcher === pathname);
        } else if (_.isRegExp(matcher)) {
            return pathname.match(matcher);
        }
    }

	
	var error_response = function(res, status_code, options) {
		var rf = require('./responseFactory');
		rf.create(rf.RESPONSE_HTML_TPL, options.path_view, options.errorDocument[status_code], {}, options.encoding, status_code).run(res, options);
	};


    var serve_static_file = function(pathname, res, options) {
        path.exists(pathname, function (exists) {
            if (exists) {
                fs.stat(pathname, function (err, stats) {
                    if (err) {
                        error_response(res, 501, options);
                    } else {
                        if (stats.isFile()) {
                            fs.readFile(pathname, 'binary', function (err, data) {
                                if (err) {			
                                    error_response(res, 501, options);
                                } else {
                                    res.respond({
                                        content: data,
                                        headers: {
                                            'Content-Type': mime.mime_type(pathname)
                                        }
                                    });
                                }
                            });
                        } else {
                            error_response(res, 501, options);
                        }
                    }
                });

            } else {
                error_response(res, 404, options);
            }
        });
    };



    var create = function(app, options) {
        options = options || {};
		
        function request_handler(req, res) {

            var handler;
			var url_parse = url.parse(req.url, true);
			this.method = req.method;
			
			req.getPost = function(data) {
				return (req.post && req.post[data]) || null;
			};
			req.getGet = function(data) {
				return (req.get && req.get[data]) || null;
			};
			
            handler = _(app).chain()
                .map(function(entry) { 
										return { 
											typeHandler: (entry['type'] === 'STATIC') ? request_static : request_dynamic,
											controller: entry['controller'],
											action: entry['action'],
											callback: entry['callback'],
											m: entry['match'],
											match: (!entry['method'] || entry['method'] === req.method) && match_request(entry['match'], url_parse.pathname) 
										}; })
                .detect(function(handler) { return !!(handler.match); })
                .value();

						
			if (handler && handler.match) {
				req.get = url_parse.query;	
				
				if(req.method === 'POST') {
					var body = '';
					req.on('data', function(data) {
						body += data;
					});
					req.on('end', function() {
						req.post = qs.parse(body);
						handler.typeHandler(handler, req, res);
					});
				} else {
					handler.typeHandler(handler, req, res);
				}

			} else {
				error_response(res, 404, options);
			}
        }
		

		function request_dynamic(handler, req, res) {

			try {
				var tmp = "";
				if(!handler.controller || !handler.action) {
					tmp = url.parse(req.url).pathname.split('/');
				} 
				handler.controller = handler.controller || tmp.slice(0, tmp.length-2).join("/");
				handler.action = handler.action || tmp[tmp.length-2];
				
				if(!handler.controller && !handler.action) {
					error_response(res, 404, options);
					return;
				}
				controllerFactory.create(options, handler.controller, handler.action, req, res, sessionHandler.create(req, res, options))();
					

				request_callback(handler, [req, res]);
			} catch (e) {
				require("./logger").log(e);
				error_response(res, 501, options);
			}		
		}
		
		function request_callback(handler, handler_args) {
			if(handler.callback) {
				if (_.isFunction(handler.match.slice)) {
					handler_args = handler_args.concat(handler.match.slice(1));
				}
				handler.callback.apply(null, handler_args);
			}		
		}
		
		function request_static(handler, req, res) {
			if (options.document_root) {
				var pathname = options.app_root + unescape(url.parse(req.url).pathname).replace(/\.{2,}\//g, './');
				serve_static_file(pathname, res, options);
				request_callback(handler, [req, res]);
			} else {
				error_response(404, options);
			}	
		}
		
        return http.createServer(request_handler);
    };

    exports.create = create;

}());
