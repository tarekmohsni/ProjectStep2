const VehicleRepository = require('../../Infra/repositories/VehicleRepository');

class GetVehicleQuery {
    constructor(fleetId, plateNumber) {
        this.fleetId = fleetId;
        this.plateNumber = plateNumber;
    }

    async execute() {
        const existingVehicle = await VehicleRepository.findByPlateNumberAndFleet(this.plateNumber, this.fleetId);
        if (existingVehicle) {
            throw new Error('Vehicle with the same plate number already exists.');
        }
    }
    async executeVehicle() {
        const vehicle = await VehicleRepository.findByPlateNumberAndFleet(this.plateNumber, this.fleetId);
        if (!vehicle) {
            throw new Error('Vehicle in the fleet not found.');
        }
        return vehicle;
    }
}

module.exports = GetVehicleQuery;
