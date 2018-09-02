/*
*
*
*	The Server
*
*/

//	Dependencies:
const http = require('http');
const URL = require('url');

//	Local Dependencies:
const database = require('./db');
const config = require('./config');



//	Create the server:
const server = http.createServer((request, response) => {


	const { method, url, headers } = request;

	//	Parse the URL:
	let parsedUrl  = URL.parse(url, true);

	//	Get the path:
	let path = parsedUrl.pathname;
	let trimmedPath = path.replace(/^\/+|\/+$/g, "");

	//	Get the query string object:
	let queryStringObject = parsedUrl.query;

	//	Pass the method in lower case:
	let trimmedMethod = method.toLowerCase();


	let body = [];

	request.on('error', (err) => {
		console.error(err);

	}).on('data', (chunk) => {
		body.push(chunk);

	}).on('end', () => {

		body = Buffer.concat(body).toString();

		const data = {
			trimmedPath,
			trimmedMethod,
			headers,
			queryStringObject,
			"payload": body
		};


		//	Choose the handler this request should go to, specify a default for not found:
		let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;


		chosenHandler(data, (statusCode, payload) => {

			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			payload = typeof(payload) === 'object' ? payload : {};

			//	Return response:
			response.setHeaders('Content-type', 'application/json');
			response.writeHead(statusCode);
			response.end(JSON.stringify(payload));
	});

		response.on('error', (err) => {
			console.error(err);
		});
	});

});


//	Initiate both the server and database:
(async function() {
	try {

	let con = await database.connect();
	let serve = await server.listen(config.port, () => {
		console.log(`Server is running on port ${config.port}, in environment: ${config.envName}`);
	});

} catch(e) {
	console.log(e);
	return e;
}
}());


//	Container for handlers
const handlers = {};

handlers.sample = function(data, callback) {
	callback(200, {"Yes!": "I work!"});
};

handlers.notFound = function(data, callback) {
	console.log('trimmedPath not found motherfucker!');
	callback(404);
};


const router = {
	"yikes": handlers.sample
}