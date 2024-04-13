const Joi = require('joi')

module.exports = {
	add :{
		payload : Joi.object({
			email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			username : Joi.string(),
			password : Joi.string(),
			role     : Joi.string(),
		}).label('User')
	},
	login :{
		payload : Joi.object({
			email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			password : Joi.string(),
		}).label('User')
	},
	verify :{
		params : Joi.object({
			token : Joi.string()
		})
	},
	validate: {
		params: Joi.object({
			id: Joi.string()
		}),
	},
	changePassword: {
		payload : Joi.object({
			password : Joi.string(),
			cpassword : Joi.string(),
			token : Joi.string(),
		}).label('Password')
	},
	forgotPassword: {
		payload : Joi.object({
			email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		}).label('Password')
	},
	list :{
	}
}