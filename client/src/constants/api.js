const server_url = process.env.REACT_APP_API_SERVER
const base_url   = server_url + '/api/v1'

module.exports={
	AUTH  : base_url + '/auth',
	USER  : base_url + '/User',
	ROLES: base_url + '/roles',
	RESTURANTS: base_url + '/Resturant',
	RESERVATIONS : base_url + '/Reservation',
	REVIEWS      : base_url + '/Reviews',
}