const {DataTypes, Model, sql} = require('@sequelize/core')
const sequelize = require('../../db')

const Reviews = sequelize.define("Reviews", {
	id:{
		type : DataTypes.UUID.V4,
		defaultValue: sql.uuidV4.asJavaScript,
		primaryKey: true,
	},
	review: {
		type: DataTypes.STRING,
	},
	rating: {
		type: DataTypes.INTEGER,
	},

})

module.exports = Reviews