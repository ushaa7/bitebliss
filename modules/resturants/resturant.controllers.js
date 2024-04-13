const ResturantModel = require("./resturant.model")
const fs = require('fs')
const path = require('path')


const Resturant = {

	//Take file upload from form data
	//Recursively save it to a asset folder
	//also take out the user from token

	async addResturant(data, token){



		images = data.image
		delete data.image
		const resturant = await ResturantModel.create(data)


		//create a folder inside /static with resturant.id as name
		//recursively add the images and check the extition
		//only accept .img .png .jpeg

		if(resturant) {
			const dirname = path.join(__dirname, "..", "..", "static", resturant.id)

			fs.mkdirSync(dirname)

			images.forEach((img)=>{
				if(img.hapi){
					const name = img.hapi.filename

					if(['png', 'jpg', 'jpeg'].includes(name.split('.').at(-1).toLowerCase())){
						const file_path = path.join(dirname, name)
						fs.writeFileSync(file_path, img._data)
					}else{
						console.log(`${name} is not image`)
					}
				}
			})
		}
		return resturant;
	},

	async getById(id){
		const res = (await ResturantModel.findByPk(id, {include: ['reservations']})).toJSON()
		if(res){
			let files = []
			const dirname = path.join(__dirname, "..", "..", "static", res.id)

			if(fs.existsSync(dirname)){
				const files = fs.readdirSync(dirname).map(file=>{
					return file
				})
				res.files = files
			}else{
				res.files = []
			}
			return res;
			//go to the static directory and get the path of all the files

		}else{
			throw new Error(`Could't find resturant with ${id} id`)
		}
	},

	async deleteResturant(id, token){
		const resturant = await ResturantModel.destroy({
			where :{
				id : id
			}
		})
		return {"message" : "Resturant delete successfully"}
	},

	async updateResturant(data){
		const ret = await ResturantModel.update(data, {
			where :{
				id : data.id
			}
		})
		return ret
	},

	async list(token){
		const resturant = await ResturantModel.findAll({raw: true})

		const data = []
		for (r of resturant){
			console.log(r)
			const d = await this.getById(r.id)
			data.push(d)
		} 
		return data;
	}
}

module.exports = {
	Resturant,
	add : req=>Resturant.addResturant(req.payload, req.params.token),
	list: req=>Resturant.list(req.params.token),
	update: req=>Resturant.updateResturant(req.payload),
	delete: req=>Resturant.deleteResturant(req.params.id),
	getById: req=>Resturant.getById(req.params.id),
}