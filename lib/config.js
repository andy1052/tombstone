/*
*
*
*	Create and export configuration variables
*
*/

//	Container for all the environments:
const environments = {};

//	Create staging (default) environment:
environments.staging = {
	"port": 3000,
	"envName": "staging",
	"templateGlobals": {
		"appName": "Tombstone Kane",
		"companyName": "Roasted Roach Inc",
		"yearCreated": "2018",
		"baseUrl": "http://localhost:3000/"
	}
};


environments.production = {
	"port": 5000,
	"envName": "production",
		"templateGlobals": {
		"appName": "Tombstone Kane",
		"companyName": "Roasted Roach Inc",
		"yearCreated": "2018",
		"baseUrl": "http://localhost:5000/"
	}
};


//	Determine which environment was passed as a command-line argument:
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : {};


//	Check that the actual environment is one of the object's defined at the top of this file.
//	If not, default to staging:
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;


//	Export the module:
module.exports = environmentToExport;