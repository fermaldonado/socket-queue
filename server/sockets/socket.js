const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.nextTicket();

        callback(next);
    });

    client.emit('actualStatus', {
    	lastTicket: ticketControl.getLastTicket(),
    	last4: ticketControl.getLast4Ticket()
    });

    client.on('attendTicket', (data, callback) => {
    	if ( !data.desk ) {
    		return callback({
    			err: true,
    			message: 'Desk is required'
    		})
    	}

    	let attendTicket = ticketControl.attendTicket(data.desk);

    	callback(attendTicket);

    	//Update public screen
    	client.broadcast.emit('last4', {
    		last4: ticketControl.getLast4Ticket()
    	});
    });

});