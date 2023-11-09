const LocationRepository = require('../../Infra/Repositories/LocationRepository');
const VehicleRepository = require('../../Infra/Repositories/VehicleRepository');

class LocalizeVehicleCommand {
    constructor(fleetId, vehicleId, latitude, longitude, altitude = null) {
        this.fleetId = fleetId;
        this.vehicleId = vehicleId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }

    async execute() {
        // Create and register the location
        return await LocationRepository.create(this.vehicleId, this.latitude, this.longitude, this.altitude);
    }
}

module.exports = LocalizeVehicleCommand;
