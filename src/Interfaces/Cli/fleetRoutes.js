const express = require('express');
const controller = require('../Web/Controller');
const router = express.Router();
const { createFleetValidationRules, registerVehicleValidationRules, localizeVehicleValidationRules, validate } = require('../../Exceptions/validation');

// to create fleet
router.post('/create', createFleetValidationRules(), validate, controller.createFleet);

// to register vehicle in fleet
router.post('/register-vehicle', registerVehicleValidationRules(), validate, controller.registerVehicle);
// to localize vehicle
router.post('/localize-vehicle', localizeVehicleValidationRules(), validate, controller.localizeVehicle);

module.exports = router;
