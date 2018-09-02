/*
*
*
*	Routes
*
*/

//	Dependencies:
const db = require('./db');


//	Container
const handlers = {};


//	Blanket function to route methods 
handlers.users = function(data, callback) {
	let acceptableMethods = 'post';
	if (acceptableMethods.indexOf(data.trimmedMethod) > -1) {
		handlers._users[data.trimmedMethod] (data, callback);
	} else {
		callback(404);
	}
};

// Container for sub-methods. I.E. define 'post':
handlers._users = {};


//	Users - post:
//Required data: email address:
handlers._users.post = function(data, callback) {

	//	Remember, data here must be parseJsonToObject(body) in server.js

	//	Check that the required field is filled out:
	let email = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 && data.payload.email.trim().includes('@') ? data.payload.email : false;

	//	First check to see if user already exists:
	const user = {"email": email};

	db.read(user, 'user-email', (read) => {
		console.log("Read from routes", read);
	});

	
		//	If no user exists, create them:
		// db.create(user, 'user-email').then((user) => {
		// 	if ({"n": 1, "ok": 1}) {
		// 		callback(200);
		// 	} 
		// });
			//	If the user does exist, reject the request to be created.
		//callback(404, {"Error": "Sorry, but this email address has already been added."});
		
};


//	Export module:
module.exports = handlers;
