const controllers = require('./reviews.controllers')
const validators  = require('./reviews.validators')


const routes = {
	add : {
		method : 'POST',
		path   : '',
		description : 'post a review', 
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
		description : 'List all reviews', 
	},
	getByRestId: {
		method : 'GET',
		path   : '/getbyRestId/{id}',
		description : 'Get all reviews of resturant', 
	},
	delete: {
		method : 'DELETE',
		path   : '/{id}',
		description : 'Delete a review', 
	},
}

function register(app) {
	app.register({
		name : 'Reviews',
		routes,
		validators,
		controllers
	});
}

module.exports = register