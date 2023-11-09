const CreateFleetCommand = require('../../App/Commands/CreateFleetCommand');
const RegisterVehicleCommand = require('../../App/Commands/RegisterVehicleCommand');
const LocalizeVehicleCommand = require('../../App/Commands/LocalizeVehicleCommand');
const GetFleetQuery = require("../../App/Queries/GetFleetQuery");
const GetVehicleQuery = require("../../App/Queries/GetVehicleQuery");
const GetVehicleLocationQuery = require("../../App/Queries/GetVehicleLocationQuery");
const { validationResult } = require('express-validator');

class Controller {
    async createFleet(req, res) {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // try to add fleet
        try {
            const { userId } = req.body;
            // check the user has not another fleet
            const getFleetQuery = new GetFleetQuery(userId, null);
            await getFleetQuery.execute();
            // create the fleet
            const createFleetCommand = new CreateFleetCommand(userId);
            const fleet = await createFleetCommand.execute();
            // return message that fleet is created with status 200
            res.json({ message: `Fleet is registered with id ${fleet.id}` } );
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async registerVehicle(req, res) {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // try register vehicle
        try {
            const { fleetId, plateNumber } = req.body;
            // check the fleet exist
            const getFleetQuery = new GetFleetQuery(null, fleetId);
            await getFleetQuery.executeGetFleet();
            // Check if the vehicle with the same plate number already exists in the same fleet
            const getVehicleQuery = new GetVehicleQuery(fleetId, plateNumber);
            await getVehicleQuery.execute();
            // register the vehicle
            const registerVehicleCommand = new RegisterVehicleCommand(fleetId, plateNumber);
            await registerVehicleCommand.execute();
            // return message that vehicle is registered with status 200
            res.json({ message: `Vehicle ${plateNumber} is registered in fleet ${fleetId}` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async localizeVehicle(req, res) {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // try localize vehicle
        try {
            const {fleetId, plateNumber, location} = req.body;
            const latitude = location.latitude;
            const longitude = location.longitude;
            const altitude = location.altitude;
            // Check if the vehicle with the plate number already exists in the fleet
            const getVehicleQuery = new GetVehicleQuery(fleetId, plateNumber);
            const vehicle = await getVehicleQuery.executeVehicle();
            // Check if the vehicle is already parked at this location
            const getVehicleLocationQuery = new GetVehicleLocationQuery(vehicle.id, latitude, longitude, altitude);
            await getVehicleLocationQuery.execute();
            // create the location
            const localizeVehicleCommand = new LocalizeVehicleCommand(fleetId, vehicle.id, latitude, longitude, altitude);
            await localizeVehicleCommand.execute();
            // return message that vehicle is localized with status 200
            res.json({ message: `Vehicle ${plateNumber} localized in fleet ${fleetId} at ${latitude}, ${longitude}, ${altitude}` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new Controller();
