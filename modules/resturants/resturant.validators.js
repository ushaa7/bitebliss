const Joi = require('joi')

module.exports = {
	add :{
		payload : Joi.object({
			name: Joi.string(),
			description: Joi.string(),
			image : Joi.array().items(Joi.any().meta({ swaggerType: 'file' }).description('Issuer Documents')),
			totalTables : Joi.number(),
		}).label('Resturant')
	},
	delete :{
		params: Joi.object({
			id: Joi.string(),
		}).label('Resturant')
	},
	getById:{
		params: Joi.object({
			id: Joi.string(),
		}).label('Resturant')
	},
	update:{
		payload : Joi.object({
			id: Joi.string(),
			name: Joi.string().optional(),
			description: Joi.string().optional(),
			image : Joi.any().optional(),
			totalTables : Joi.number().optional(),
		}).label('Resturant')
	},
	list :{
	}
}