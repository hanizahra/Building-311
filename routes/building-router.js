const express = require('express');
const buildingRouter = express.Router();
const buildingController = require('../controllers/building-controller');
const viewController = require('../controllers/view-controller');



// show saved queries
buildingRouter.get('/queries/', buildingController.index, viewController.showBuildings, viewController.show404, viewController.show406);

// show query
buildingRouter.get('/building', buildingController.oneBuilding, viewController.showOne, viewController.show404, viewController.show406);

// show building complaints
buildingRouter.post('/complaints', buildingController.allComplaints, viewController.showComplaints, viewController.show404, viewController.show406);

// show building violations
buildingRouter.post('/violations', buildingController.allViolations, viewController.showViolations, viewController.show404, viewController.show406);

// deletes saved queries 
buildingRouter.delete('/queries', buildingController.deleteQuery, viewController.destroyQuery, viewController.show404, viewController.show406);

// add/updates user comments
buildingRouter.put('/queries', buildingController.addUserComment, viewController.updateUserComment, viewController.updateUserComment, viewController.show404, viewController.show406);



module.exports = buildingRouter