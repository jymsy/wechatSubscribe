var express = require('express');
var bodyParser = require('body-parser');
var apiRouterV1 = require('./api_router_v1');
var define = require('./config/define');
let mongo = require('./components/mongo');
var app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/', apiRouterV1);

app.use(function (err, req, res, next) {
    console.error('server 500 error:', err);
    return res.status(500).json({"error_message":err});
});

var http = require("http");
http.createServer(app).listen(define.port, define.host);

console.log("Server has started.");
mongo.init();