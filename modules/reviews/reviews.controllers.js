const ReviewsModel = require("./reviews.model")
const fs = require('fs')
const jwt       = require('jsonwebtoken')
const path = require('path')
const SIGN_KEY = "Hello world";

const saltRounds = 10;


const Reviews = {
	async addReview(data, token){
		console.log(token)
		const token_val = await jwt.verify(token, SIGN_KEY);
		data.userId = token_val.id;
		const resv = await ReviewsModel.create(data)
		return resv;
	},
	async getByRestId(id){
		const res = await ReviewsModel.findAll({where : { resturantId : id}});
		return res;
	},
	async list(){
		const res = await ReviewsModel.findAll();
		return res;
	},
	async delete(id, token){
		const resvs = await ReviewsModel.destroy({
			where :{
				id : id
			}
		})
		return {"message" : "Reservation deleted successfully"}
	},
}
module.exports = {
	Reviews,
	add  : req=>Reviews.addReview(req.payload, req.headers.access_token),
	getByRestId : req=>Reviews.getByRestId(req.params.id),
	list : req=>Reviews.list(),
	delet: req=>Reviews.delete(req.params.id, req.headers.access_token),
}