/*
*
*
*	Helpers for various tasks
*
*/

//	Dependencies:
const path = require('path');
const fs = require('fs');


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


//	HTML Helpers:

//	Get the string content of a template:
helpers.getTemplate = function(templateName, callback) {
	templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName : false;
	if (templateName) {
		let templatesDir = path.join(__dirname, '/../templates/');
		fs.readFile(templatesDir + templateName + '.html', 'utf-8', function(err, str) {
			if (!err && str && str.length > 0) {
				callback(false, str);
			} else {
				callback('No Template Could Be Found.');
			}
		});
	} else {
		callback('A valid template name was not specified');
	}
};



//	Export module:
module.exports = helpers;