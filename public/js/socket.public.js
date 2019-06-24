// Set communication
var socket = io();

var lblTicket1 = $("#lblTicket1"),
	lblTicket2 = $("#lblTicket2"),
	lblTicket3 = $("#lblTicket3"),
	lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1"),
	lblEscritorio2 = $("#lblEscritorio2"),
	lblEscritorio3 = $("#lblEscritorio3"),
	lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4],
	lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('actualStatus', function (data) {
	updateHTML(data.last4);
});

socket.on('last4', function (data) {
	var audio = new Audio('../audio/new-ticket.mp3');
	audio.play();
	updateHTML(data.last4);
});

function updateHTML(last4) {
	console.log(last4.length);
	for (var i = 0; i < last4.length; i++) {
		lblTickets[i].text('Ticket '+ last4[i].number);
		lblEscritorios[i].text('Desk '+ last4[i].desk);
	}
}