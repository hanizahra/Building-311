const express = require('express');
const buildingRouter = express.Router();

const buildingController = require('../controllers/building-controller');
const viewController = require('../controllers/view-controller');

// show all buildings
buildingRouter.get('/', buildingController.index, viewController.showBuildings, viewController.show404, viewController.show406);

// buildingRouter.post('/', buildingController.create)

// show one building
buildingRouter.get('/building', buildingController.oneBuilding, viewController.showOne, viewController.show404, viewController.show406);

// show building complaints
buildingRouter.post('/complaints', buildingController.allComplaints, viewController.showComplaints);

module.exports = buildingRouter