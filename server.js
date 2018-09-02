/*
*
*
*	The Server
*
*/

//	Dependencies:
const http = require('http');
const URL = require('url');

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

		//console.log(data);


		//	Choose the handler this request should go to, specify a default for not found:
		let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
		console.log(chosenHandler);


		chosenHandler(data, (statusCode, payload) => {

			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			payload = typeof(payload) === 'object' ? payload : {};

			response.writeHead(statusCode);
			response.end(JSON.stringify(payload));



		response.on('error', (err) => {
			console.error(err);
		});

		// response.writeHead(200, {'Content-Type': 'application/json'});

		// const responseBody = { headers, method, url, body };

		// response.end(JSON.stringify(responseBody));
	});

	});

}).listen(8000, () => {
	console.log('Server is running on port 8000');
});


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