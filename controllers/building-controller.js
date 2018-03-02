const buildingDB = require('../models/buildingModel');
const buildingController = {};

buildingController.index = (req, res, next) => {
		console.log('getting all basic buildings info')
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
	console.log('what is propId', req.body.propId );
	buildingDB.seeComplaints(req.body.propId)
	.then((complaints) => {
		res.locals.complaints = complaints;
		next();
	})
	.catch((err) => {
		res.status(500).json(err)
	})
}

module.exports = buildingController;
