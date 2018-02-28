\c buildings_db;
DROP TABLE IF EXISTS buildingInfo;

CREATE TABLE buildingInfo (
	id SERIAL PRIMARY KEY,
	address TEXT,
	violations TEXT, 
	numComplaints TEXT,
	complaints TEXT,
	propertyId TEXT,
	floodZone TEXT,
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