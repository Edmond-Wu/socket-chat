/**
 * Created by ewu on 7/22/2016.
 */

var app = angular.module('chat', []);

app.controller('chatCtrl', function($scope, $timeout) {
    var socket = io(); //use socket

    //App fields
    $scope.input = "";
    $scope.messages = [];
    $scope.loggedIn = false;
    $scope.username = "";
    $scope.userTaken = false;
    $scope.userList = [];

    /**
     * Sends a message to the server
     */
    $scope.send = function() {
        if ($scope.input !== "" && $scope.input.length <= 500) {
            socket.emit('chat message', $scope.input, $scope.username);
            $scope.input = "";
        }
        else {
            alert("Message must be 1-500 characters");
        }
    };

    /**
     * Function to log a user in
     */
    $scope.login = function() {
        if ($scope.input !== "" && $scope.input.length <= 20 && $scope.input.length >= 3) {
            socket.emit('logged in', $scope.input);
        }
        else {
            alert("Username must be 1-20 characters");
        }
    };
    
    /**
     * Applies the messages array to the scope
     */
    socket.on('message', function(msg) {
        $scope.$apply(function() {
            $scope.messages.push(msg);
        });
    });

    /**
     * Sets the username taken variable to true
     */
    socket.on('username taken', function() {
        $scope.$apply(function() {
            $scope.userTaken = true;
        });
    });

    /**
     * Logs user into server
     */
    socket.on('logged in', function() {
        $scope.$apply(function() {
            $scope.loggedIn = true;
            $scope.username = $scope.input;
            $scope.userTaken = false;
            $scope.input = "";
        });
    });

    /**
     * Updates client-side list of users
     */
    socket.on('update userlist', function(data) {
        $scope.$apply(function() {
            $scope.userList = data;
        });
    });
});