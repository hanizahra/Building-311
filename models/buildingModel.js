const buildingModel = {};
const config = require('../config/dbConfig.js');
const pgp = require('pg-promise')();
const db = pgp(config);

buildingModel.insertBuildInfo = function(json) {
	console.log('attempting to send building info to database...')
	console.log('json is: '+json)

	return db.one(`INSERT INTO buildingInfo (borough, zipcode, buildingAddress, numViolations, numComplaints, complaints, propertyId, floodZone, userComment) 
					VALUES ($[borough], $[zipcode], $[buildingAddress], $[numViolations], $[numComplaints], $[complaints], $[propertyId], $[floodZone], $[userComment])`, json);
};	

buildingModel.insertComplaintInfo = function(complaintJson) {
	console.log('attempting to send complaint stuff to database as well...')
	console.log('complaintJson is: '+complaintJson)

	return db.one(`INSERT INTO complaintInfo (address, propertyId, complaintId, complaint, comment, timeDate, status, categoryCode, priority) 
					VALUES ($[address], $[propertyId], $[complaintId], $[complaint], $[comment], $[timeDate], $[status], $[categoryCode], $[priority])`, complaintJson);
};

buildingModel.insertViolationInfo = function(violationJson) {
	console.log('attempting to send violation stuff to database ...')
	console.log('violationJson is: '+violationJson)

	return db.one(`INSERT INTO violationInfo (address, propertyId, violationId, violation, comment, timeDate, status, violationCategory)
		VALUES ($[address], $[propertyId], $[violationId], $[violation], $[comment], $[timeDate], $[status], $[violationCategory])`, violationJson);
};

buildingModel.findAll = () => 
	db.query('SELECT DISTINCT buildingAddress, borough, zipcode , propertyId , userComment FROM buildingInfo');

buildingModel.findOne = () => 
	db.query('SELECT buildingAddress, borough, zipcode, numViolations, numComplaints, propertyId FROM buildingInfo ORDER BY ID DESC LIMIT 1');

buildingModel.seeComplaints = (id) => 
	db.query(`SELECT DISTINCT address, timeDate, complaint , comment, complaintInfo.propertyId, status, categoryCode, priority, userComment FROM complaintInfo JOIN buildingInfo ON complaintInfo.propertyId = buildingInfo.propertyId WHERE complaintInfo.propertyId=$1`, id);

buildingModel.seeViolations = (id) =>
	db.query(`SELECT DISTINCT address, violationInfo.propertyId, violationId, violation, comment, timeDate, status, violationCategory, userComment FROM violationInfo JOIN buildingInfo ON violationInfo.propertyId = buildingInfo.propertyId WHERE violationInfo.propertyId=$1`, id);

buildingModel.destroy = (id) =>
	db.none(`BEGIN;
			DELETE FROM buildingInfo WHERE propertyId = $1;
  			DELETE FROM complaintInfo WHERE propertyId = $1;
  			DELETE FROM violationInfo WHERE propertyId = $1;
			COMMIT`, id)

buildingModel.update = (comment) =>
	db.one(`UPDATE buildingInfo SET userComment = $/userComment/ WHERE propertyId = $/propertyId/ RETURNING *`, comment);

module.exports = buildingModel