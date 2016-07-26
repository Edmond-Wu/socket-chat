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
    $scope.users = [];

    /**
     * Sends a message to the server
     */
    $scope.send = function() {
        if ($scope.input !== "" && $scope.input.length <= 500) {
            socket.emit('chat message', $scope.input);
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
    
    socket.on('logged in', function() {
        $scope.$apply(function() {
            $scope.loggedIn = true;
            $scope.username = $scope.input;
            $scope.input = "";
        });
    });

    socket.on('user connected', function(data) {
        $scope.$apply(function() {
            $scope.users = data;
        });
    });
});