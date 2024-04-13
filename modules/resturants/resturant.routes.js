const controllers = require('./resturant.controllers')
const validators  = require('./resturant.validators')

const routes = {
	add : {
		method : 'POST',
		path   : '',
		description : 'Add a resturant', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	update : {
		method : 'POST',
		path   : '/update',
		description : 'update resturant', 
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
		description : 'List all resturants', 
	},
	delete: {
		method : 'DELETE',
		path   : '/{id}',
		description : 'Delete a resturant', 
	},
	getById: {
		method : 'GET',
		path   : '/{id}',
		description : 'get information resturant', 
	},
}

function register(app) {
	app.register({
		name : 'Resturant',
		routes,
		validators,
		controllers
	});
}

module.exports = register