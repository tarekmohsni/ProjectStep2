const VehicleRepository = require('../../Infra/Repositories/VehicleRepository');

class RegisterVehicleCommand {
    constructor(fleetId, plateNumber) {
        this.fleetId = fleetId;
        this.plateNumber = plateNumber;
    }

    async execute() {
        // Create and register the vehicle
        return await VehicleRepository.create(this.fleetId, this.plateNumber);
    }
}

module.exports = RegisterVehicleCommand;
