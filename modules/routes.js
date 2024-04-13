const user = require('./user/user.routes')
const roles = require('./user/roles.routes')
const resturants = require('./resturants/resturant.routes')
const reservations = require('./reservations/reservation.routes')
const reviews      = require('./reviews/reviews.routes')

module.exports = {
	user,
	roles,
	resturants,
	reservations,
	reviews,
};