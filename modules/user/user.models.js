const { DataTypes, Model }  = require('@sequelize/core');


const { sql } = require('@sequelize/core');
const sequelize = require("../../db")

const User = sequelize.define("User", {
	id : {
		type : DataTypes.UUID.V4,
		defaultValue: sql.uuidV4.asJavaScript,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique : true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isValidated : {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: DataTypes.TRUE,
	},
	/*
	role_id : {
		type : DataTypes.UUID.V4,
		references : 'Roles',
		referencesKey: 'id',
	},
	*/
});

User.associate = function(){
}

module.exports = User