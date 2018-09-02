/*
*
*
*	HTML Handlers
*
*/

//	Dependencies:
const helpers = require('./helpers');


//	Container:
const handlers = {};

//	Index Handler:
handlers.index = function(data, callback) {
	console.log("from index: ", data.trimmedPath);
	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {
		//	Read in the index template as a string:
		helpers.getTemplate('index', (err, str) => {
			if (!err && str) {
				callback(200, str, 'html');
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};




//	Export the module:
module.exports = handlers;