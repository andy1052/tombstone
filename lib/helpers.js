/*
*
*
*	Helpers for various tasks
*
*/

//	Dependencies:
const path = require('path');
const fs = require('fs');
const config = require('./config');


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
helpers.getTemplate = function(templateName, data, callback) {
	templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName : false;
	data = typeof(data) === 'object' && data !== null ? data : {};

	if (templateName) {
		let templatesDir = path.join(__dirname, '/../templates/');
		fs.readFile(templatesDir + templateName + '.html', 'utf-8', function(err, str) {
			if (!err && str && str.length > 0) {
				//	Do interpolation on the string:
				let finalString = helpers.interpolate(str, data);

				callback(false, finalString);
			} else {
				callback('No Template Could Be Found.');
			}
		});
	} else {
		callback('A valid template name was not specified');
	}
};


//	Add the universal header and footer to a string and pass the provided data object to the header and footer for interpolation:
helpers.addUniversalTemplates = function(str, data, callback) {
	str = typeof(str) === 'string' && str.length > 0 ? str : '';
	data = typeof(data) === 'object' && data !== null ? data : {};

	//	Get the header:
	helpers.getTemplate('header', data, (err, headerString) => {
		if (!err && headerString) {
			//	Get the footer:
			helpers.getTemplate('footer', data, (err, footerString) => {
				if (!err && footerString) {
					//	Add these 3 strings together:
					let fullString = headerString + str + footerString;
					callback(false, fullString);
				} else {
					callback('Could not find the footer template');
				}
			});
		} else {
			callback('Could not find the footer template');
		}
	});
};


//	Take a given string and a data object and find/replace all the keys within it:
helpers.interpolate = function(str, data) {
	str = typeof(str) === 'string' && str.length > 0 ? str : '';
	data = typeof(data) === 'object' && data !== null ? data : {};

	//	Add the template globals to the data object perpending their key name with "global"
	for (var keyName in config.templateGlobals) {
		if (config.templateGlobals.hasOwnProperty(keyName)) {
			data['global.' + keyName] = config.templateGlobals[keyName];
		}
	}
	//	For each key in the data object, insert its value into the string at the corresponding placeholder:
	for (var key in data) {
		if (data.hasOwnProperty(key) && typeof(data[key]) === 'string') {
			let replace = data[key];
			let find = '{'+key+'}';
			str = str.replace(find, replace);
		}
	}
	return str;
};


helpers.getStaticAsset = function(filename, callback) {
	filename = typeof(filename) === 'string' && filename.length > 0 ? filename : false;

	if (filename) {
		let publicDir = path.join(__dirname, '/../public/');

		fs.readFile(publicDir + filename, (err, data) => {

			if (!err && data) {
				callback(false, data);
			} else {
				callback('No file could be found');
			}
		});
	} else {
		callback('A valid filename was not specified');
	}
};


//	Export module:
module.exports = helpers;