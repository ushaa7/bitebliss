const { DataTypes }  = require('@sequelize/core');


const { sql } = require('@sequelize/core');
const sequelize = require("../../db")

const PermissionsModel = require('./permissions.models')
const UsersModel = require('./user.models')

const Roles = sequelize.define("Roles", {
	id : {
		type : DataTypes.UUID.V4,
		defaultValue: sql.uuidV4.asJavaScript,
		primaryKey: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		unique : true,
	},
});

Roles.associate = function(){
	Roles.hasOne(UsersModel)
	UsersModel.belongsTo(Roles)

}


module.exports = Roles