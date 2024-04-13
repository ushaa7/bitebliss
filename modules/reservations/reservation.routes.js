const controllers = require('./reservation.controllers')
const validators  = require('./reservation.validators')


const routes = {
	add : {
		method : 'POST',
		path   : '',
		description : 'Book a reservation', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	list: {
		method : 'GET',
		path   : '',
		description : 'List all reservation', 
	},
	update : {
		method : 'POST',
		path   : '/update',
		description : 'update reservation', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	delete: {
		method : 'DELETE',
		path   : '/{id}',
		description : 'Delete a reservation', 
	},
}

function register(app) {
	app.register({
		name : 'Reservation',
		routes,
		validators,
		controllers
	});
}

module.exports = register