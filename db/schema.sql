\c buildings_db;
DROP TABLE IF EXISTS buildingInfo;
DROP TABLE IF EXISTS complaintInfo;

CREATE TABLE buildingInfo (
	id SERIAL PRIMARY KEY,
	borough TEXT,
	zipcode TEXT,
	address TEXT,
	numViolations TEXT, 
	numComplaints TEXT,
	complaints TEXT,
	propertyId TEXT,
	floodZone TEXT,
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



CREATE INDEX ON buildingInfo (complaints);





-- addresses table 
-- -address
-- -bin number (common element to join on)
-- -number of violations
-- -number of complaints


-- complaints table
-- -bin number (common element to join on)
-- -complaint text
-- -complaint date