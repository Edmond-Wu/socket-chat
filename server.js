var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serve public directory
app.use(express.static(__dirname + '/public'));

//send index page
app.get('/', function(req, res) {
	//sendFile for single page, redirect for multi-page (angular routing)
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
	socket.on('log in', function(user) {
		socket.username = user;
		socket.emit("Logged in");
	});
	socket.on('chat message', function(msg) {
		io.emit("message", msg);
	});
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

http.listen(3000, function() {
	console.log('listening on port 3000');
});