/**
 * Created by anneback on 01/07/15.
 */
var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

/*Create HTTP server*/
var server = http.createServer(function(request, response) {
    var filePath = false;

    if (request.url == '/') {
        filePath = "public/index.html";
    } else {
        filePath = "public" + request.url;
    }

    var absPath = "./" + filePath;
    serverWorking(response, absPath);
});

// PORT NR
var port_number = server.listen(process.env.PORT || 3000);

/*returns plain text when server can't find page*/
function send404(response) {
    response.writeHead(404, {"Content-type" : "text/plain"});
    response.write("Error 404: resource not found");
    response.end();
}

/* first writes the header and then sends the contents of the file*/
function sendPage(response, filePath, fileContents) {
    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

/* This function will return the content of the requested file or the 404 error otherwise*/
function serverWorking(response, absPath) {
    fs.exists(absPath, function(exists) {
        if (exists) {
            fs.readFile(absPath, function(err, data) {
                if (err) {
                    send404(response);
                } else {
                    sendPage(response, absPath, data);
                }
            });
        } else {
            send404(response);
        }
    });
}