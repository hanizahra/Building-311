const express = require('express');
const buildingRouter = express.Router();

const buildingController = require('../controllers/building-controller');
const viewController = require('../controllers/view-controller');

// show saved queries
buildingRouter.get('/queries', buildingController.index, viewController.showBuildings, viewController.show404, viewController.show406);

// buildingRouter.post('/', buildingController.create)

// show query
buildingRouter.get('/building', buildingController.oneBuilding, viewController.showOne, viewController.show404, viewController.show406);

// show building complaints
buildingRouter.post('/complaints', buildingController.allComplaints, viewController.showComplaints, viewController.show404, viewController.show406);

// show building violations
buildingRouter.post('/violations', buildingController.allViolations, viewController.showViolations)

buildingRouter.delete('/queries', buildingController.deleteQuery, viewController.destroyQuery)

module.exports = buildingRouter