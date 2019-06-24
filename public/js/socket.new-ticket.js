// Set communication
var socket = io();
var label = $("#lblNuevoTicket");

socket.on('connect', function () {
	console.log('connected');
});

socket.on('disconnect', function () {
	console.log('disconnected');
});

socket.on('actualStatus', function (resp) {
	label.text(resp.lastTicket);
})

$('button').on('click', function () {
	socket.emit('nextTicket', null, function (nextTicket) {
		label.text(nextTicket);
	});
});
