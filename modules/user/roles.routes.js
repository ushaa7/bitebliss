const controllers = require('./roles.controllers')
const validators  = require('./roles.validators')

const routes = {
	add : {
		method : 'POST',
		path   : '',
		description : 'Add a role', 
		uploadPayload : {
			output : 'stream',
			parse : true,
			multipart : true,
			allow: 'multipart/form-data'
		}
	},
	list : {
		method : 'GET',
		path   : '',
		description : 'List all roles', 
	},
	addPermissions: ['PATCH', '/{id}/permissions', 'Add permissions to a role'],
};

/**
* Register the routes
* @param {object} app Application
*/

function register(app) {
	app.register({
		name : 'roles',
		routes,
		validators,
		controllers
	});
}

module.exports = register