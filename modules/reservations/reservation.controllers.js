const jwt       = require('jsonwebtoken')
const ResvModel = require('./reservation.model')

const SIGN_KEY = "Hello world";

const saltRounds = 10;


const Resv = {
	async addResv(data, token) {
		console.log(token)
		const token_val = await jwt.verify(token, SIGN_KEY);
		data.userId = token_val.id;
		const resv = await ResvModel.create(data)
		return resv;
	},

	//on the case of user only show his/her reservation
	async listResv(token){
		const resvs = await ResvModel.findAll({include: ['resturant', 'user']})
		return resvs;
	},

	//no need to change userId
	async updateResv(data){
		const ret = await ResvModel.update(data, {
			where :{
				id : data.id
			}
		})
		return ret
	},


	//check if the user has the permission
	async deleteResv(id, token){
		const resvs = await ResvModel.destroy({
			where :{
				id : id
			}
		})
		return {"message" : "Reservation deleted successfully"}
	},

}

module.exports = {
	Resv,
	add  : req=>Resv.addResv(req.payload, req.headers.access_token),
	list : req=>Resv.listResv(req.params.token),
	update: req=>Resv.updateResv(req.payload),
	delete: req=>Resv.deleteResv(req.params.id, req.headers.access_token),
}