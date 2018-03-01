const buildingModel = {};
const config = require('../config/dbConfig.js');
const pgp = require('pg-promise')();
const db = pgp(config);

buildingModel.create = function(json) {
	console.log('attempting to send to database...')
	console.log('json is: '+json)

	return db.one(`INSERT INTO buildingInfo (borough, zipcode, address, numViolations, numComplaints, complaints, propertyId, floodZone) 
					VALUES ($[borough], $[zipcode], $[address], $[numViolations], $[numComplaints], $[complaints], $[propertyId], $[floodZone])`, json);
};	

buildingModel.findAll = () => 
	db.query('SELECT * FROM buildingInfo');


// buildingModel.showAll = function() {
// 	return db.any('');
// };


module.exports = buildingModel