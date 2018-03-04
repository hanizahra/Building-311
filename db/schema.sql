\c buildings_db;
DROP TABLE IF EXISTS buildingInfo;
DROP TABLE IF EXISTS complaintInfo;
DROP TABLE IF EXISTS violationInfo;

CREATE TABLE buildingInfo (
	id SERIAL PRIMARY KEY,
	borough TEXT,
	zipcode TEXT,
	address TEXT,
	numViolations TEXT, 
	numComplaints TEXT,
	complaints TEXT,
	violations TEXT,
	propertyId TEXT,
	floodZone TEXT,
	userComment TEXT,
	date_created TIMESTAMP NOT NULL DEFAULT NOW()
);



CREATE TABLE complaintInfo (
	id SERIAL PRIMARY KEY,
	address TEXT,
	propertyId TEXT,
	complaintId TEXT,
	complaint TEXT, 
	comment TEXT,
	timeDate TEXT,
	status TEXT,
	categoryCode TEXT,
	priority TEXT,
	date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE violationInfo (
	id SERIAL PRIMARY KEY,
	address TEXT,
	propertyId TEXT,
	violationId TEXT,
	violation TEXT, 
	comment TEXT,
	timeD TEXT,
	status TEXT,
	categoryCode TEXT,
	priority TEXT,
	date_created TIMESTAMP NOT NULL DEFAULT NOW()
);



CREATE INDEX ON buildingInfo (complaints);
