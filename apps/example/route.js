(function() {

	exports.routes = [
		{
			'match': /^\/media\/(.*?).(jpe?g|gif|png)$/,
			'type': 'STATIC',
			'method': 'GET'
		},
		
		{
			'match': /favicon\.ico$/, 
			'type': 'STATIC',
			'method': 'GET'
		},


		{
			'match': /login\/$/,
			'controller': 'index',
			'action': 'loginPost',
			'method': 'POST'
		},
		
		{
			'match': /^(\w+)$/,
			'controller': 'index'
		},
		
		{
			'match': /^\/$/,
			'controller': 'index',
			'action': 'default'
		},
		
		{'match': /(.*)$/},

	];

}())