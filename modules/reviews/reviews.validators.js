const Joi = require('joi')

module.exports = {
	add :{
		payload : Joi.object({
			rating: Joi.number(),
			review: Joi.string(),
			resturantId: Joi.string(),
		}).label('Reviews')
	},
	delete :{
		params: Joi.object({
			id: Joi.string(),
		}).label('Reviews')
	},
	getByRestId:{
		params: Joi.object({
			id: Joi.string(),
		}).label('Reviews')
	},
	list :{
	}
}