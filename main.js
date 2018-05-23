var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res){
	console.log("New Request " + req.method  + " " + req.url);
	switch(req.method){
		case 'GET':
			//figure out what file is requested
			var data = getHtmlFile(url.parse(req.url, true).pathname);
			//respond
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
			break;

		case 'POST':
    	var body = '';
    	req.on('data', chunk => {
        	body += chunk.toString(); // convert Buffer to string
    	});
    	req.on('end', () => {
        	console.log(body);
					res.writeHead(204, {'Content-Type': 'text/html'});
        	res.end();
    	});
			}
}).listen(80);



console.log("server started");



function getHtmlFile(path){
	if(path == '/'){
		path = "index.html";
	}
	//read requested file, implement 404 errors
	var data
	try{
		data = fs.readFileSync('html/' + path, 'utf8');
	} catch(error){
		try{
			data = fs.readFileSync('html/404.html', 'utf8');
		} catch(error){
			data = '<html><p>404 Error</p></html>';
		}
	}
	return data;
}
