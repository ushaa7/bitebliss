const UserModel  = require("./user.models")
const RolesModel = require("./roles.models")
const PermissionsModel = require("./permissions.models")
const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcrypt')

const nodemailer = require('nodemailer')

const SIGN_KEY = "Hello world";

const saltRounds = 10;


//make this same transporter available for other modules too
const transporter = nodemailer.createTransport({

	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	enable_starttls_auto: true,
    auth: {
    	user: "ushakutu14@gmail.com",
    	pass: "vnlh ywpq cvpn knpb",
    }, 
    tls: {
    	rejectUnauthorized: false
    }
});

const mailOptions = {
  from: "ushakutu14@gmail.com",
  to: "ushakutu14@gmail.com",
  subject: "Verify your account",
};

const User =  {
	/**
	* Email shouldn't be dublicate
	* When creating user
	* Create user in databse with is_validated = False and the hashed password
	* Using nodemailer send a email to the user's gmail
	* email should have link when the user clicks it goes to /verify?token=token
	* which should validate the user
	**/

	async addUser(data){
		data.isValidated = false;

		password = data.password

		const salt            = bcrypt.genSaltSync(saltRounds)
		const hashed_password = bcrypt.hashSync(password, salt)

		data.password = hashed_password

		const role_data       = await RolesModel.findOne({where : {role : data.role }})
		if(!role_data){
			throw new Error("Invalid role given, Please provide valid role")
		}

		data.rolesId = role_data.id




		var token = jwt.sign(data, SIGN_KEY);


		const message  = `http://localhost:5000/api/v1/User/verify/${token}`
		mailOptions.text = message
		console.log(data)
		mailOptions.to = data.email
		mailOptions.subject= "Verify your account"

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email: ", error);
			} else {
				console.log("Email sent: ", info.response);
			}
		});


		const user = await UserModel.create(data)

		//Send mail

		return user;
	},

	async verify(token){
		const data = await jwt.verify(token, SIGN_KEY);

		if(data){
			await UserModel.update({ isValidated : true }, {
				where :{
					email : data.email
				}
			})
		}else{
			throw new Error('invalid token');
		}
		return data
	},

	//This should be admin only
	async validateUser(id){

		let user =await UserModel.findOne({where : { id: id}} )

		if(user){

			const valid = user.dataValues.isValidated
			await UserModel.update({ isValidated : !valid }, {
				where :{
					id: id
				}
			})
			user = await UserModel.findOne({where : { id: id}} )

			return user
		}else{
			throw new Error('invalid id')
		}
		return data
	},

	async list(token){
		const users_ret = await UserModel.findAll({raw : true})

		if(users_ret){
			let users = []
			for (const user of users_ret){
				const role        = await RolesModel.findOne({where : {"id": user.rolesId}})
				user.role = role.role 
				users.push(user)
			}
			return users
		}
		throw new Error("no user found")
	},

	async forgotPasswordRequest(data){
		const users_ret = await UserModel.findOne({where : {email : data.email}, raw : true})

		if(users_ret){
			var token = jwt.sign(data, SIGN_KEY);
			console.log(token)
			const message  = `http://localhost:3000/auth/forgot/${token}`
			mailOptions.text = message
			mailOptions.to = data.email
			mailOptions.subject= "Reset your password"

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error("Error sending email: ", error);
				} else {
					console.log("Email sent: ", info.response);
				}
			});

			return {"token": token};
		}
		throw new Error("no user found")

	},



	//data should have new password and confirmation
	async changePasswordFromForgetPassword(data){

		const token_val = await jwt.verify(data.token, SIGN_KEY);


		//Set the password
		if (data.password !== data.cpassword){
			throw new Error("Passwords do not match")
		}
		if(data){

			if (token_val.email){
				const salt            = bcrypt.genSaltSync(saltRounds)
				const hashed_password = bcrypt.hashSync(data.password, salt)
				const ret = await UserModel.update({ "password" : hashed_password}, {where : { "email" : token_val.email}});
				return {"message": "Password updated successfully"};
			}
			throw new Error("Invalid token")
		}
		else{
			throw new Error("Invalid token")
		}
	},
	async login(data){

		const user = await UserModel.findOne({where : { "email" : data.email}})


		if(user){

			const role        = await RolesModel.findOne({where : {"id": user.rolesId}})


			const permissions_data = await PermissionsModel.findAll({where : {"rolesId": user.rolesId}})


				let permissions = []
			if(permissions_data){

				permissions_data.forEach(p=>{
					permissions.push(p.permission)
				})

				user.dataValues.role        = role.role
			}

			if(bcrypt.compareSync(data.password, user.password)){

				delete user.dataValues.password
				delete user.dataValues.rolesId

				if(user.isValidated){

					delete user.dataValues.isValidated
					var token = jwt.sign(user.dataValues, SIGN_KEY);

					return {"token": token, "user": user.toJSON(), "permissions": permissions}
				}else{
					throw new Error("User isn't validated ")
				}
			}else{
				throw new Error('Invalid password')
			}

		}else{
			throw new Error("User not found")
		}
	}
}

module.exports = {
	User,
	add : req => User.addUser(req.payload),
	login : req => User.login(req.payload),
	verify : req => User.verify(req.params.token),
	list : req => User.list(req.params.token),
	validate : req => User.validateUser(req.params.id),
	changePassword : req => User.changePasswordFromForgetPassword(req.payload),
	forgotPassword : req => User.forgotPasswordRequest(req.payload),
};




