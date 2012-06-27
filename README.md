Efrano (Easy FRamework for NOdejs)
=================================

**Efrano** is a simple and easy to use [node.js](http://nodejs.org) MVC framework 

###Features###

 * url routing easy configuration
 * controller classes with actions as method (as in RoR)
 * HTML response with templating engine: normal-template (https://github.com/gmosx/normal-template)
 * JSON response
 * easy to build specific responses
 * HTTP redirections
 * sessions / cookies
 * application configuration on server start
 * maximize the use of async (i.e. no Inversion of Control when async components used)
 * http calls log

---

Efrano is initially build on Nerve project (https://github.com/gjritter/nerve) but had a lot of modifications, specially regarding the mvc structure. 

It requires the following module to install using npm:

- underscore
- node-syslog (https://github.com/schamane/node-syslog) not compatible with windows



###Launch Argument###


You must specify the configuration module while launching the server

---

node efrano.js <your-configuration-module>
example:
	node efrano.js ../apps/myApp/config.js
	

###Configuration file###

The configuration file contains the configuration for the server as for the application.

	(function() {
		//duration of the session
		exports.session_duration = 10000;
	
		//root of the server
		exports.document_root = '/var/www/';
	
		//root of the application
		exports.app_root = exports.document_root+'apps/example/';
		
		//route module
		exports.routes = require(exports.app_root+'route').routes;
	
		
		//root of efrano
		exports.efrano_root = exports.document_root+'efrano/';
		
		//path of the controllers
		exports.path_controller = exports.app_root+'controller';
		
		//path of the views
		exports.path_view = exports.app_root+'view';
		
		//http log file
		exports.http_log = '/var/log/node/http';
	
		//out encoding
		exports.encoding = 'utf8';
		
		//special views
		exports.errorDocument = {404: 'e404',
								 501: 'e501'};
	}())

###Route file###
Routes are defined as an array of several case that must match a given context (url and method)
Routes array must be defined in the configuration 'routes' parameter (see example below)

**march**: regexp that must match the url
**method**: force the route force the specific method (GET/POST)
**type**: if STATIC, informs the server to treat the content as static
**controller**: force the use of the given controller as request controller
**action**: force the use of the given action as request  action

by default, the controller is the first part of the url, and action the second part.
example: http://www.example.com/myController/myAction/

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


###Example###

You can found in the repository simple working examples / tutorial (in apps/example)