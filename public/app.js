/**
 * Created by Edmond Wu on 7/22/2016.
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
    $scope.invalidUser = false;
    $scope.invalidMsg = false;
    $scope.userList = [];
    $scope.chooseColor = false;
    $scope.color = "light-blue";

    /**
     * Sends a message to the server
     */
    $scope.send = function() {
        if ($scope.input !== "" && $scope.input.length <= 500) {
            socket.emit('chat message', $scope.input, $scope.username, $scope.color);
            $scope.input = "";
            $scope.invalidMsg = false;
        }
        else {
            $scope.invalidMsg = true;
        }
    };

    /**
     * Function to log a user in
     */
    $scope.login = function() {
        if ($scope.input !== "" && $scope.input.length <= 20 && $scope.input.length >= 2) {
            $scope.invalidUser = false;
            socket.emit('logged in', $scope.input);
        }
        else {
            $scope.invalidUser = true;
        }
    };

    /**
     * Toggles chooseColor variable which displays the color menu
     */
    $scope.clickColor = function() {
        $scope.chooseColor = !$scope.chooseColor;
    };

    /**
     * Sets the color
     * @param color
     */
    $scope.setColor = function(color) {
        $scope.color = color;
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
