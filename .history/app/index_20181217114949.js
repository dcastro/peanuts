var express = require('express')
var app = express();


app.use("/peanuts/",express.static('peanuts'));
app.use("/deps/",express.static('node_modules'));
app.use("/",express.static('app'));

app.listen(9090);