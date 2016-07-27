var express = require('express');

var app = express();

app.use(express.static(__dirname));

//homepage

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
})

app.listen(1337, function(){
	console.log('Example app listening on port 1337!');
})