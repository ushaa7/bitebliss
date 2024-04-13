const { DataTypes }  = require('@sequelize/core');



const sequelize = require("../../db")

const RolesModel = require("./roles.models")

const Permissions = sequelize.define("Permissions", {
	permission: {

		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Permissions