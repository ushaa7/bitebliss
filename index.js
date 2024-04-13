const Hapi  = require("@hapi/hapi")
const inert = require("@hapi/inert")
const Vision = require("@hapi/vision")
const HapiSwagger = require("hapi-swagger")
const ws = require('./helpers/socket');
const app = require('./app')


const modules = require('./modules/routes')
const models  = require('./modules/models')
const sequelize = require("./db")

async function registerModules(){
	Object.keys(modules).forEach(mdl => {
		modules[mdl](app)
	});

	for (const model of models){
		await model.sync()
	}

	for (const model of models){
		if(model.associate){
			model.associate()
		}
	}
	sequelize.sync()

}


const server = new Hapi.Server({
	port : "5000",
	router :{
		stripTrailingSlash : true
	},
	routes :{
		cors :{
			origin : ["*"],
			additionalHeaders: ['cache-control', 'x-requested-with', 'access_token']
		},
	}
})

ws.create(server.listener)
app.connectServer(server)

const swaggerOptions = {
	info :{
		title : "Resturant",
		version : process.env.npm_package_version,
		description : process.env.npm_package_description
	},
	securityDefinitions: {
		jwt: {
			type: 'apiKey',
			name: 'access_token',
			in: 'header',
		},
	},
	security: [{ jwt: [] }],
	grouping: 'tags',
};

async function startServer(){
	registerModules();
	await server.register([
		inert,
		Vision,
		{
			plugin : HapiSwagger,
			options : swaggerOptions
		}
	]);
	server.ext('onPreHandler', (request, h)=>{
		const host = request.info.hostname;
		return h.continue;
	})

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: (request, h) => {
			const { param } = request.params;
			if (param.includes('.')) {
				return h.file(param);
			}
			return h.file('index.html');
		}
	});

	await server.start();
	console.log(`Server running at: ${server.info.uri}`)
}

let isStopping = false;
async function shutDown(){
	if(!isStopping){
		//logger.info("shutDown...")
		isStopping = true;

		const lapse = 5;
		await server.stop({
			timeout : lapse * 1000
		});
	}
}

process.on("SIGTERM", shutDown)
process.on("SIGINT",  shutDown)

async function start(){
	await startServer();
}
start()

























