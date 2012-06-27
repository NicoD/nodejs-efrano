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
// (c) 2010 Nicolas Denoual <n.denoual@gmail.com>

'use strict';

(function () {
	
	var SessionHandler = function(req, res, options) {
		
		this.store = function(key, value) {
			var session = getSession();
			session[key] = value;
		};
		
		this.retrieve = function(key) {
			return getSession()[key];
		};		
		
		
		var getSession = function() {
			var so = {};
			if(options.session_duration)
				so.duration = options.session_duration;
				
			return req.get_or_create_session(req, res, so);
		};
	};
	
	exports.create = function(req, res, options) {
		return new SessionHandler(req, res, options);
	};

}());