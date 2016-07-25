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
        if ($scope.input !== "" && $scope.input.length <= 20) {
            $scope.username = $scope.input;
            $scope.users.push($scope.username);
            $scope.loggedIn = true;
            $scope.input = "";
            socket.emit('log in', $scope.username);
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
});