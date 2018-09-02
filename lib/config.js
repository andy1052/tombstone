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
	"envName": "staging"
};


environments.production = {
	"port": 5000,
	"envName": "production"
};


//	Determine which environment was passed as a command-line argument:
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : {};


//	Check that the actual environment is one of the object's defined at the top of this file.
//	If not, default to staging:
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;


//	Export the module:
module.exports = environmentToExport;