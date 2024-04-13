const {DataTypes, Model, sql} = require('@sequelize/core')

const sequelize = require('../../db')

const Reservation = sequelize.define("Reservation", {
	id:{
		type : DataTypes.UUID.V4,
		defaultValue: sql.uuidV4.asJavaScript,
		primaryKey: true,
	},
	numOfPeople : {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	tableNo: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},

	reservationDate: {
		type: DataTypes.DATE,
	},

})

module.exports = Reservation