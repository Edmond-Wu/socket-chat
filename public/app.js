/**
 * Created by ewu on 7/22/2016.
 */

var app = angular.module('chat', []);

app.controller('chatCtrl', function($scope, $timeout) {
    var socket = io(); //use socket

    //App fields
    $scope.chatMessage = "";
    $scope.messages = [];

    $scope.send = function() {
        if ($scope.chatMessage !== "" && $scope.chatMessage.length <= 500) {
            socket.emit('chat message', $scope.chatMessage);
            $scope.chatMessage = "";
        }
    };
    
    socket.on('message', function(msg) {
        $scope.$apply(function() {
            $scope.messages.push(msg);
        });
    });
});


/*
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
*/