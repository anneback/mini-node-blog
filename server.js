var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("It's alive!");
    response.end();
}).listen(3000);/**
 * Created by anneback on 01/07/15.
 */
