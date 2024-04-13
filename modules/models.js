const User = require("./user/user.models")
const Roles = require("./user/roles.models")
const Permissions = require("./user/permissions.models")
const Resturant = require("./resturants/resturant.model")
//const Table     = require("./resturants/tables.model")
const Reservation = require("./reservations/reservation.model")
const Reviews     = require("./reviews/reviews.model")

//Notes : while adding model place the models according to the dependency the top most model gets synced the first
Permissions.associate = function(){
	Roles.hasMany(Permissions)
	Permissions.belongsTo(Roles)
}

Resturant.associate = function(){

	Resturant.hasMany(Reservation)
	Reservation.belongsTo(Resturant)
}

Reservation.associate = function(){
	User.hasMany(Reservation)
	Reservation.belongsTo(User)
}

Reviews.associate = function(){
	User.hasMany(Reviews)
	Reviews.belongsTo(User)
	Resturant.hasMany(Reviews)
	Reviews.belongsTo(Resturant)
}

module.exports = [
	Reviews,
	Roles,
	Reservation,
	Permissions,
	User,
	Resturant,
]