const express = require('express');
const buildingRouter = express.Router();

const buildingController = require('../controllers/building-controller');
const viewController = require('../controllers/view-controller');


buildingRouter.get('/', buildingController.index, viewController.showBuildings, viewController.show404, viewController.show406);



module.exports = buildingRouter