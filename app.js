const Secure = require('./helpers/secure')
class App{
	constructor(){
		this.features = {}
		this.apiPath  = "/api/v1"
	}

	connectServer(server){
		this.server = server
	}

	/**
	 * @param {string} featName name of the feature
	 */

	getFeature(featName){
		if(!this.features[featName]){
			this.features[featName] = {}
		}
		return this.features[featName]
	}

	//This is not just get but also adds if not exist
	getOperation(featName, operationName) {
		const feat = this.getFeature(featName);

		if(!feat[operationName]) {
			feat[operationName] = {
				controller : undefined,
				validator  : undefined,
				route      : undefined
			};
		}
		return feat[operationName];
	}

	/**
	 * Default api handler
	 * @param {object} request Request instance
	 * @param {object} h response instance
	 * */

	defaultHandle(request, h){
		return h
		.response({status : 401, error : 'Not Implemented', message : 'This feature has not been implemented'})
		.code(501)
	}

	/**
	 * Gets the operation validator or default
	 * @param {object} operation Operation instance
	 */ 
	validate(operation){
		return operation.validator  || {}
	}

	/**
	* Handlers for an operation
	* @param {object} operation Operation instance
	* @param {object} request Request instance
	* @param {object} h Response instance
	 * */

	async handle(operation, request, res){
		const fn = operation.controller || this.defaultHandle

		try{
			if (operation.permissions){
				const isAllowed = await Secure(operation.permissions, request)
				if(!isAllowed)
				{
					return res
					.response({
						statusCode : 401,
						error : 'Unauthorized',
						message : 'You are not authorized to do this operation'
					})
					.code(401)
				}
			}

			const result = await fn(request, res);

			if(result instanceof Error){
				return res 
				.response({statusCode : result.code || 500, error : 'Server Error', message : request.message})
				.code(result.code || 500)
			}
			return result;
		} catch (error) {
			console.log(`main error captured : ${error}`);
			return res.response({statusCode : 500, error : 'Server Error', message : error.message}).code(500)
		}
	}


	/**
	* Register a route in hapi
	* @param {string} featName Name of the feature
	* @param {string} operationName of the feature

    * @param {route} contains methodName path and description
	* @param {string} methodName of the feature
	* @param {string} path Name of the feature
	* @param {string} description Name of the feature
	 */ 

	registerRoute(featName, operationName, route){
		const operation = this.getOperation(featName, operationName)

		let permissions = route.permissions || [];

		if(typeof permissions === 'string') permissions = permissions.split(',');

		operation.permissions = permissions

		let tags = ['api'] //to register in the swagger
		tags.push(featName)


		if (route.tags) tags = [...new Set([...tags, ...route.tags])];

		const {method, path, description, notes, uploadPayload} = route;

		const config = {
			description,
			notes,
			tags,
			validate : this.validate(operation),
			handler : route.handler ? route.handler : this.handle.bind(this, operation)
		};

		if (uploadPayload) {
			config.payload = config.payload || {}
			config.payload = Object.assign(config.payload, uploadPayload);

			config.plugins = {
				'hapi-swagger' :{
					payloadType : 'form',
					consumes : ['multipart/form-data']
				}
			};
		}

		operation.route = {
			method,
			path : `${this.apiPath}/${featName}${path}`,
			config
		};
		return operation.route;
	}

	/** Register the controller for a operation
	* @param {string} featName name of the feature
	* @param {string} operationName name of the operation
	* @param {object} controller Contrller for the operation
	*/

	registerController(featName, operationName, controller){
		const operation = this.getOperation(featName, operationName);
		operation.controller = controller
	}

	/**
	 * Register the validator for an operation
	 * @param {string} featName Name of the feat
	 * @param {string} operationName name of the operation
	 * @param {object} validator Validator of the operation
	 * */

	registerValidator(featName, operationName, validator){
		const operation = this.getOperation(featName, operationName);
		operation.validator = validator
	}


	/**
	 * Register all feat operations.
	 * @param {string} featName Name of the feat.
	 * @param {object} routes Routes of the feat.
	 * @param {object} validators Validators of the feat
	 * @param {object} controllers Controllers of the feat
	 **/

	register({name, routes, tags, validators, controllers}) {
		const approutes = [];
		const operationNames = Object.keys(routes);

		operationNames.forEach(operationName => {

			let route = routes[operationName];
			if (validators) this.registerValidator(name, operationName, validators[operationName]);

			this.registerController(name, operationName, controllers[operationName]);

			if(Array.isArray(route)){
				route = {
					method       : route[0],
					path         : route[1],
					description  : route[2],
					permissions  : route[3]
				};
			}

			approutes.push(this.registerRoute(name, operationName, route, tags))
		});
		this.server.route(approutes);
	}

	requestOptions(req, h){
		let res = null;
		if (h) res = h.response;
		const request   = req;
		const response  = res;
		return {
			req,
			res,
			request,
			response,
			currentUser : req.CurrentUser
		};
	}

	/**
	* Creates an error instance
	* @param {string} code Error code
	* @param {string} mesage Error message
	**/
	error(message, code) {
		const result = new Error(message);
		result.code = code || 500;
		return result;
	}
}

const instance = new App();
module.exports = instance;





























