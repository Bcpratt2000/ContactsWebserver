var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res){
	console.log("New Request" + req.url);
	if(req.method == 'GET'){

		//figure out what file is requested
		var path = url.parse(req.url, true).pathname;
		if(path == '/'){
			path = "index.html";
		}
		
		//read requested file
		try{
			data = fs.readFileSync('html/' + path, 'utf8');
		} catch(error){
			try{
				data = fs.readFileSync('html/404.html', 'utf8');
			} catch(error){
				data = '<p>404 Error</p>';
			}

		res.writeHead(200, {'Content-Type': 'text/html'});

		res.write(data);
		
		res.end();
	}
}).listen(80);

console.log("server started");
