var express = require('express')
var app = express();

app.use("/deps/",express.static('node_modules'));
app.use("/",express.static('client'));

app.listen(9090);