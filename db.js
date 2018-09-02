/*
*
*
*	Database configuration
*
*/

//	Dependencies:
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//	Connection URL:
const url = 'mongodb://localhost:27017/data';

//	Database Name:
const dbName = 'Tombstone';

//	Container:
const database = {};

//	Use connect method to connect to the server:
database.connect = function() {
	MongoClient.connect(url, {useNewUrlParser: true},(err, client) => {
	assert.equal(null, err);
	console.log("Connected successfully to database server");

	const db = client.db(dbName);

	client.close();
});
};



//	Export module:
module.exports = database;