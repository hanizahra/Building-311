const buildingDB = require('../models/buildingModel');
const viewController = require('./view-controller.js');
const buildingController = {};

buildingController.index = (req, res, next) => {
		console.log('getting all buildings basic info')
		buildingDB.findAll()
		.then((buildings) => {
			// res.render('buildings/building-info', {
			// 	message: "ok here it is",
			// 	data: buildings
			// })
			res.locals.buildings = buildings;
			next();
		}) 
		.catch((err) => {
			console.log(err)
			res.status(500).json(err)
		})
	};

buildingController.oneBuilding = (req, res, next) => {
	buildingDB.findOne()
	.then((building) => {
		res.locals.building = building;
		next();
	})
	.catch((err) => {
		console.log(err)
		res.status(500).json(err)
	})
};

buildingController.allComplaints = (req, res, next) => {
	// let propId = req.params.propId
	console.log('buildingController.allComplaints ran');
	console.log('what is propId', req.body.propId );
	propId = req.body.propId
	buildingDB.seeComplaints(propId)
	.then((complaints) => {
		res.locals.complaints = complaints;
		next();
		console.log('this is res.locals.complaints in buildingController---->', res.locals.complaints);
	})
	.catch((err) => {
		res.status(500).json(err)
	})
};

buildingController.allViolations = (req, res, next) => {
	console.log('buildingController.allViolations ran');
	console.log('what is propId for allViolations', req.body.propId);
	propId = req.body.propId
	buildingDB.seeViolations(propId)
	.then((violations) => {
		res.locals.violations = violations;
		next();
		console.log('this is res.locals.violations in buildingController---->', res.locals.violations);
	})
	.catch((err) => {
		res.status(500).json(err)
	})
};

buildingController.deleteQuery = (req, res, next) => {
	propId = req.body.propId
	buildingDB.destroy(propId)
	.then(() => {
		res.json ({
			message: 'Query has been deleted.'
		})
		next();
	})
	.catch(err => {
		res.status(500).json({
			message: 'error',
			error: err
		})
	})
	req.method = 'GET'
	res.redirect('/buildings/queries')
};

buildingController.addUserComment = (req, res, next) => {
	console.log('addUserComment inside buildingController running');
	userComment = req.body.userComment;
	propertyId = req.body.propertyId;
	console.log('userComment is now', userComment)
	console.log('propertyId is now', propertyId)
	console.log('req.body is ', req.body)
	buildingDB.update(req.body)
	.then((updates) => {
		
		res.locals.updates = updates
		next();
	})
	.catch((err) => {
		res.status(500).json(err)
	})
	// req.method = 'GET';
	res.redirect('/buildings/queries')

};

module.exports = buildingController;
