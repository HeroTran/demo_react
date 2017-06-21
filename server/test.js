var express = require('express');
var app = express();

var server = require('./server');

server(app);

app.listen(3000);