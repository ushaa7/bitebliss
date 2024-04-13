const controllers = require('./user.controllers')
const validators  = require('./user.validators')

const routes = {
	add : {
		method : 'POST',
		path   : '',
		description : 'Add a user', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	login : {
		method : 'POST',
		path   : '/login',
		description : 'Login user', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	verify : {
		method : 'GET',
		path   : '/verify/{token}',
		description : 'Verify user', 
	},
	list: {
		method : 'GET',
		path   : '',
		description : 'List all users', 
	},
	validate: {
		method : 'POST',
		path   : '/validate/{id}',
		description : 'validate a user', 
	},
	changePassword: {
		method : 'POST',
		path   : '/changePassword',
		description : 'change password', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	forgotPassword: {
		method : 'POST',
		path   : '/forgotPassword',
		description : 'forgot password', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
};

/**
* Register the routes
* @param {object} app Application
*/

function register(app) {
	app.register({
		name : 'User',
		routes,
		validators,
		controllers
	});
}

module.exports = register