const RolesModel = require('./roles.models')
const PermissionsModel = require('./permissions.models')


const Roles =  {
	async addRole(data){
		console.log(data)
		const ret = await RolesModel.create(data)
		return ret
	},
	async list(){
		const ret = await RolesModel.findAll({attributes: ['role'], raw: true})
		console.log(ret)
		roles = []
		ret.forEach(i=>{
			roles.push(i.role)
		})
		return roles
	},

	async addPermissions (id, permissions){
		const role = await RolesModel.findAll({
			where: {
				role : id
			}
		});
		if(role.length == 0){
			return {"message" : "No role found"}
		}else{
			let new_data  =  []

			permissions.forEach(p => {
				new_data.push({permission: p, rolesId : role[0].id})
			})


			const ret = await PermissionsModel.bulkCreate(new_data)

			console.log(new_data)
			return role[0]
		}
	}
}

module.exports = {
	Roles,
	add  : req => Roles.addRole(req.payload),
	list : req => Roles.list(),
	addPermissions : req => Roles.addPermissions(req.params.id, req.payload.permissions )
};