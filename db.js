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
	assert.strictEqual(null, err);
	console.log("Connected successfully to database server");

	const db = client.db(dbName);

	client.close();
});
};


database.create = function(data, callback) {
	MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
		assert.strictEqual(null, err);

		const db = client.db(dbName);

		let f = database.insert(db, data, () => {
			client.close();
		});
		console.log("F", f);
	});
};

database.read = function(data, callback) {
		MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
		assert.strictEqual(null, err);

		const db = client.db(dbName);

		database.find(db, data, (result) => {
			console.log("From read", result);
			client.close();
		});
	
	});
	callback(200);
};


database.insert = function(db, data, callback) {
	//	Get the documents collection:
	const collection = db.collection('user-email');
	//	Insert some documents:
	collection.insertOne(data, (err, result) => {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log(`Inserted new user into collection`);
		callback(result);
	});
};


database.find = function(db, data, callback) {
	const collection = db.collection('user-email');
	collection.findOne(data, (err, result) => {
		assert.strictEqual(err, null);
		callback(result);
	});

};


//	Export module:
module.exports = database;