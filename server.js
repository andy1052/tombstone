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
const db = require('./lib/db');
const config = require('./lib/config');
const route = require('./lib/route');
const helpers = require('./lib/helpers');
const handlers = require('./lib/handlers');


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
			"payload": helpers.parseJsonToObject(body)
		};

		//	Choose the handler this request should go to, specify a default for not found:
		let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : route._users.notFound;

		//	If request is in the public directory, use the public handler instead:
		chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

		//	Route the request to the handler specified in the router:
		chosenHandler(data, (statusCode, payload, contentType) => {

			//	Determine the type of response (fallback to json):
			contentType = typeof(contentType) === 'string' ? contentType : 'json';

			//	Use the statusCode called back by the handler or default to 200:
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			//	Return response parts that are content specific:
			let payloadString = '';

			if (contentType === 'json') {
				response.setHeader('Content-Type', 'application/json');
			
			//	Use the payload called back by the handler, or default to empty object:
			payload = typeof(payload) === 'object' ? payload : {};
			//	Convert the payload to a string:
			payloadString = JSON.stringify(payload);
			}

			if (contentType === 'html') {
				response.setHeader('Content-Type', 'text/html');
				payloadString = typeof(payload) === 'string' ? payload : '';
			}

			//	Return response:
			response.writeHead(statusCode);
			response.end(payloadString);

			//	Log the request path:
			console.log("Returning this response: ", statusCode, payloadString);
	});

		response.on('error', (err) => {
			console.error(err);
		});
	});

});


//	Initiate both the server and database:
(async function() {
	try {

	let con = await db.Get();
	let serve = await server.listen(config.port, () => {
		console.log(`Server is running on port ${config.port}, in environment: ${config.envName}`);
	});

} catch(e) {
	console.log(e);
	return e;
}
}());


const router = {
	"": handlers.index,
	"public": handlers.public,
	"users": route._users.post
}