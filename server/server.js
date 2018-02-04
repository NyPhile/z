"use strict";

const http = require('http');
const fs   = require('fs');
const url  = require('url');
const path = require('path');

const CONFIG = {
	"dir": "d:/frontend"
}

let currentPath = "";

let showPath = (pathname, response) => {
	response.writeHead(200, {
		'Content-Type': 'text/html'
	})
	var _temp = [];

	fs.readdir(pathname, (err, files) => {
		files.forEach((file) => {
			var _path = currentPath == "/" ? "" : currentPath + '/';
			_temp.push('<a href="' + _path + file + '">' + file + '</a><br>');
			// _temp.push(file + '<br>');
		})

		response.end(_temp.join(''));
	})
}

let handle = {
	showPath: showPath
}

let route = (handle, pathname, response, postData) => {
	console.log("route a request for" + pathname);

	pathname = pathname.indexOf('/') < 1 ? CONFIG.dir + pathname : pathname;

	fs.stat(pathname, (err, stats) => {

		stats.isDirectory() && handle.showPath(pathname, response);

		stats.isFile() && handle.showFile(pathname, response);
	})

	// if(typeof handle[pathname] == 'function'){
	// 	handle[pathname](response, postData);
	// }else{
	// 	console.log("No request handler fonud for " + pathname);
	// 	response.writeHead(404, {"Content-Type": "text/plain"});
	// 	response.write('404');
	// 	response.end;
	// }
}

let onRequest = (request, response) => {
	let data = "";
	currentPath = url.parse(request.url).pathname;
	let pathname = request.url == '/' ? CONFIG.dir : url.parse(request.url).pathname;
	switch (request.method) {
		case 'GET':
			data += url.parse(request.url).query;
			request.setEncoding("utf8");
			route(handle, pathname, response, data);
			break;
		case 'POST':
			request.addListener('data', (postData) => {
				data += postData;
			})

			request.addListener('end', () => {
				route(handle, pathname, response, postData)
			})

			break;
	}
}

http.createServer(onRequest).listen(8888);

// http.createServer(function(req, res) {
// 	//
// 	res.writeHead(200, {
// 		'Content-Type': 'text/plain'
// 	});

// 	var _temp = [];
// 	fs.readdir(CONFIG.dir, function(err, files){
// 		files.forEach(function(file){
// 			_temp.push(file)
// 		})

// 		res.end(_temp.join(''))
// 		console.log(_temp)

// 	})

// 	res.end();
// }).listen(8800);

console.log('running')