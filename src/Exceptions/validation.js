const { body, validationResult } = require('express-validator');

const createFleetValidationRules = () => {
    return [
        body('userId').isInt().withMessage('The userId must be an integer'),
    ];
};
const registerVehicleValidationRules = () => {
    return [
        body('fleetId').isInt().withMessage('The fleetId must be an integer'),
        body('plateNumber').isString().withMessage('The plateNumber must be a string'),
    ];
};

const localizeVehicleValidationRules = () => {
    return [
        body('fleetId').isInt().withMessage('The fleetId must be an integer'),
        body('plateNumber').isString().withMessage('The plateNumber must be a string'),
        body('location.latitude').isDecimal().withMessage('The latitude must be a decimal'),
        body('location.longitude').isDecimal().withMessage('The longitude must be a decimal'),
        body('location.altitude').isDecimal().withMessage('The altitude must be a decimal'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    createFleetValidationRules,
    registerVehicleValidationRules,
    localizeVehicleValidationRules,
    validate,
};
