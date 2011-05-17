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
	var fs = require('fs');
	
	var View = function() {
	
		this.fileContent = function(path_view, tplView, datas, encoding) {
			datas = datas | {};
			encoding = encoding | 'utf-8';
		
			var file = path_view+'/'+tplView+'.html';
			
			var template = require("./normal-template").compile(String(fs.readFileSync(file, encoding)));
			return template(datas);
		};
	}
	
	
	exports.create = function create() {
		return new View();
	};

}());