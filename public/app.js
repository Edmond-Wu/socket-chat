/**
 * Created by ewu on 7/22/2016.
 */
var socket = io();
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});