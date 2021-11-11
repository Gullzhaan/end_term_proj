var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) { 
    //function to make code more applicable, beautiful because we should use it in case of http.createServer(function(req, res) 
    if (!responseCode) { responseCode =  200; }
    fs.readFile(__dirname + path, function(err, data) { 
    //to access file system and get html doc
    //dirname provide path to desktop and plus rest of the path
        if (err) {
            //If the resource exists, but unavailable for some reason, then you must give an error "500 - Internal error with a response code 500
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("500 - Internal Error");
        }
        else {
            res.writeHead(responseCode, {'Content-Type' : contentType});
            res.end(data);
        }
    })
}
http.createServer(function(req, res) {
        //this handle the request and sends again to the static file
        //reg expr
        var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
        switch(path) {
            //localhost:3000 (index.html)
            case '':
            serveStaticFile(res, '/index.html', 'text/html');
            break;
            //localhost:3000/about (about.html)
            case '/about':
            serveStaticFile(res, '/about.html', 'text/html');
            break;

            //access to photos
            case '/img/about.jpg':
                serveStaticFile(res, '/img/about.jpg', 'image/jpeg');    
                break;

            case '/img/welcome.jpg':
            serveStaticFile(res, '/img/welcome.jpg', 'image/jpeg');    
            break;

            case '/img/cry.jpg':
            serveStaticFile(res, '/img/cry.jpg', 'image/jpeg');    
            break;

            //css
            case '/style.css':
            serveStaticFile(res, '/style.css', 'text/css');    
            break;

            //js
            case '/script.js':
            serveStaticFile(res, '/script.js', 'text/javascript');    
            break;
      
            //localhost:3000/img/gallery/{picture name} (NOTE: you have 2 pictures there, 
            //make routes to both of the images. Don't make routes to the images that are used in the HTML documents)
            case '/img/gallery/graduation':
            serveStaticFile(res, '/img/gallery/graduation.jpg', 'image/jpeg');
            break;
            case '/img/gallery/study':
            serveStaticFile(res, '/img/gallery/study.jpg', 'image/jpeg');
            break;
            // localhost:3000/video/{video name}
            case '/video/memes':
            serveStaticFile(res, '/video/students/memes.mp4', 'video/mp4');
            break;
            default:
            //If the resource doesn't exist 
            //and a user tries to access it then you must give the "error.html" document with a response code 404
            serveStaticFile(res, '/error.html', 'text/html', 404);
                break;
        }
}).listen(3000);

console.log("Server started on localhost:3000; press Ctrl+C to terminate");