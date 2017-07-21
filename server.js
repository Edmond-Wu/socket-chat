var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;

//serve public directory
app.use(express.static(__dirname + '/public'));

//send index page
app.get('/', function(req, res) {
	//sendFile for single page, redirect for multi-page (angular routing)
	res.sendFile(__dirname + '/public/index.html');
});

var users = [];

io.on('connection', function(socket) {
	//user attempts to log in
	socket.on('logged in', function(user, clr) {
		var userTaken = false;
		for (var i = 0; i < users.length; i++) {
			if (user === users[i]) {
				userTaken = true;
			}
		}
		if (userTaken) {
			socket.emit("username taken");
		}
		else {
			socket.username = user;
			users.push(user);
			io.emit("update userlist", users); //io emit sends to everyone
			socket.emit("logged in"); //socket emit sends to specific socket
		}
	});

	//when a user sends a chat message
	socket.on('chat message', function(msg, usr, clr) {
		var msgObj = {text: msg, user: usr, color: clr};
		io.emit("message", msgObj);
	});
	//when a user disconnects
	socket.on('disconnect', function() {
		for (var i = 0; i < users.length; i++) {
			if (socket.username === users[i]) {
				users.splice(i, 1);
			}
		}
		io.emit("update userlist", users);
	});
});

server.listen(port, function() {
	console.log('listening on port %d', port);
});
