var http = require('http');
var fs = require('fs');
var path = require('path');
const { type } = require('os');

http.createServer(function(request, response){
console.log('request', request.url);

var filePath = '.' + request.url;
if (filePath =='./') {
    filePath = './PGaleriaR.html';
}
var extname = String(path.extname(filePath)).toLowerCase();
var contentType = ('text/html');
var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'images/png',
    '.jpg': 'images/jpg',
    'webp': 'images/webp',
    '.gif': 'images/gif',
};
contentType = mimeTypes[extname] || 'application/octet-stream';
//Codigo para manejo de errores con filePath
fs.readFile(filePath, function(error, content){
    if (error){
        if(error.code == 'ENOENT'){
            fs.readFile('./404.html', function(error, content){
                response.writeHead(200, { 'Content-Type': contentType});
                response.end(content, 'utf-8');
            });
        }
        else{
            response.writeHead(500);
            response.end('HIJOLE YO CREO QUE NO SE VA A PODER JOVEN, estamos revisando el error: '+error.code+' ..\n');
            response.end();
        }
    }
    else{
        response.writeHead(200, {'content-type': contentType});
        response.end(content, 'utf-8');
    }
});

}).listen(3000);
console.log('Server running at http://192.168.1.62:3000/');