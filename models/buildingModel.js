const buildingModel = {};
const config = require('../config/dbConfig.js');
const pgp = require('pg-promise')();
const db = pgp(config);

buildingModel.insertBuildInfo = function(json) {
	console.log('attempting to send to database...')
	console.log('json is: '+json)

	return db.one(`INSERT INTO buildingInfo (borough, zipcode, address, numViolations, numComplaints, complaints, propertyId, floodZone) 
					VALUES ($[borough], $[zipcode], $[address], $[numViolations], $[numComplaints], $[complaints], $[propertyId], $[floodZone])`, json);
};	

buildingModel.insertComplaintInfo = function(json2) {
	console.log('attempting to send to database as well...')
	console.log('json2 is: '+json2)

	return db.one(`INSERT INTO complaintInfo (address, propertyId, complaintId, complaint, comment, timeDate, status, categoryCode, priority) 
					VALUES ($[address], $[propertyId], $[complaintId], $[complaint], $[comment], $[timeDate], $[status], $[categoryCode], $[priority])`, json2);
};

buildingModel.findAll = () => 
	db.query('SELECT * FROM buildingInfo');

// buildingModel.findAll = () => 
// 	db.query('SELECT * FROM complaintInfo');


// buildingModel.showAll = function() {
// 	return db.any('');
// };


module.exports = buildingModel