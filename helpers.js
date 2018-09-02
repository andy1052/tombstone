/*
*
*
*	Helpers for various tasks
*
*/

//	Dependencies:



//	Container:
const helpers = {};

//	Parse a JSON string to an object in all cases without throwing:
helpers.parseJsonToObject = function(str) {
	try {
		let obj = JSON.parse(str);
		return obj;
	} catch(e) {
		return {};
	}
};



//	Export module:
module.exports = helpers;