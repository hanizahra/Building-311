const buildingDB = require('../models/buildingModel');
const buildingController = {};

buildingController.index = (req, res, next) => {
		console.log('getting all buildings info')
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
	}

module.exports = buildingController;
