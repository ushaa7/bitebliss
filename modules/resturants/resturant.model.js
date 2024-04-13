const {DataTypes, Model, sql} = require('@sequelize/core')

const sequelize = require('../../db')

const Resturant = sequelize.define("Resturant", {
	id:{
		type : DataTypes.UUID.V4,
		defaultValue: sql.uuidV4.asJavaScript,
		primaryKey: true,
	},
	name : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	totalTables: {
		type: DataTypes.INTEGER,
	},
	//Path of the image
	image: {
		type: DataTypes.STRING,
	},

})

module.exports = Resturant