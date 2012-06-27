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
	var _ = require('underscore');
	

	exports.NO_RESPONSE = 'null';

	exports.RESPONSE_HTML_TPL = 'htmlTemplate';
	exports.RESPONSE_HTML_RAW = 'htmlRaw';
	exports.RESPONSE_JSON = 'json';
	exports.RESPONSE_REDIRECT = 'redirect';

	
	exports.create = function() {
		var args = _.toArray(arguments);
		return require('./response/'+args.shift()).create.apply(null, args);
	};

}());