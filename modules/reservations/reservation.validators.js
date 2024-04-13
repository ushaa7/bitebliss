const Joi = require('joi');

module.exports = {
	add : {
		payload : Joi.object({
			numOfPeople: Joi.number(),
			tableNo:     Joi.number(),
			reservationDate : Joi.date(),
			resturantId     : Joi.string(),
		}).label('Reservation')
	},
	update:{
		payload : Joi.object({
			id: Joi.string(),
			numOfPeople: Joi.number(),
			tableNo:     Joi.number(),
			reservationDate : Joi.date(),
			resturantId     : Joi.string(),
		}).label('Resturant')
	},
	delete :{
		params: Joi.object({
			id: Joi.string(),
		}).label('Reservation')
	},
	list : {

	}
}