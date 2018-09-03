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
			"head.title": "This is the title",
			"head.description": "This is the meta description",
			"body.title": "Hello Templated World",
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



//	For public assets:
handlers.public = function(data, callback) {

	//console.log("data from handlers: ", data);

	//	Reject any request that isn't a get:
	if (data.trimmedMethod === 'get') {

		//	Get the file name being requested:
		let trimmedAssetName = data.trimmedPath.replace('public', '').trim();

		if (trimmedAssetName.length > 0) {
			//	Read in the asset's data:
			helpers.getStaticAsset(trimmedAssetName, (err, data) => {

// console.log("data from handlers getStaticAsset: ", data);

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