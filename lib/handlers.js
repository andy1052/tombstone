/*
*
*
*	HTML Handlers
*
*/

//	Dependencies:
const helpers = require('./helpers');
const config = require('./config');


//	Container:
const handlers = {};

//	Index Handler:
handlers.index = function(data, callback) {
	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Prepare data for interpolation:
		let templateData = {
			"head.title": "Tombstone Kane",
			"head.description": "Welcome to Tombstonekane.com",
			"body.class": "index"
		};

		//	Read in the index template as a string:
		helpers.getTemplate('index', templateData, (err, str) => {
			if (!err && str) {
				//	Add the universal header and footer:
				helpers.addUniversalTemplates(str, templateData, (err, str) => {
					if (!err && str) {
						//	Return that page as html:
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};


//	Handler for About page:
handlers.about = function(data, callback) {
	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Prepare data for interpolation:
		let templateData = {
			"head.title": "About Tombstone Kane",
			"head.description": "About Tombstone Kane",
			"body.class": "about"
		};

		//	Read in the about template as a string:
		helpers.getTemplate('about', templateData, (err, str) => {
			if (!err && str) {
				//	Add the universal header and footer:
				helpers.addUniversalTemplates(str, templateData, (err, str) => {
					if (!err && str) {
						//	Return that page as html:
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};


//	Handler for Books page:
handlers.books = function(data, callback) {

	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Prepare data for interpolation:
		let templateData = {
			"head.title": "Tombstone Kane's Books",
			"head.description": "Available Books",
			"body.class": "books"
		};

		//	Read in the books template as a string:
		helpers.getTemplate('books', templateData, (err, str) => {
			if (!err && str) {
				//	Add in universal header and footer:
				helpers.addUniversalTemplates(str, templateData, (err, str) => {
					if (!err && str) {
						//	If it's all good, return that page as html
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};



//	Handler for Contact page:
handlers.contact = function(data, callback) {

	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Prepare data for interpolation:
		let templateData = {
			"head.title": "Contact Tombstone Kane",
			"head.description": "Contact for information",
			"body.class": "contact"
		};

		//	Read in the contact template as a string:
		helpers.getTemplate('contact', templateData, (err, str) => {
			if (!err && str) {
				// If there is no error, add in header and footer:
				helpers.addUniversalTemplates(str, templateData, (err, str) => {
					if (!err && str) {
						//	If it's all good, return the page as html:
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});

	} else {
		callback(405, undefined, 'html');
	}
};



//	For public assets:
handlers.public = function(data, callback) {

	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Get the file name being requested:
		let trimmedAssetName = data.trimmedPath.replace('public', '').trim();

		if (trimmedAssetName.length > 0) {
			//	Read in the asset's data:
			helpers.getStaticAsset(trimmedAssetName, (err, data) => {


				if (!err && data) {
					//	Determine the content type (default to plain text):
					let contentType = 'plain';

					if (trimmedAssetName.indexOf('.css') > -1) {
						contentType = 'css';
					}

					if (trimmedAssetName.indexOf('.png') > -1) {
						contentType = 'png';
					}

					if (trimmedAssetName.indexOf('.jpg') > -1) {
						contentType = 'jpg';
					}

					if (trimmedAssetName.indexOf('.ico') > -1) {
						contentType = 'favicon';
					}

					//	Callback the data:
					callback(200, data, contentType);
				} else {
					callback(404);
				}
			});
		} else {
			callback(404);
		}
	} else {
		callback(405);
	}
};




//	Export the module:
module.exports = handlers;