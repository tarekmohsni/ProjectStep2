const FleetRepository = require('../../Infra/repositories/FleetRepository');
const LocationRepository = require("../../Infra/Repositories/LocationRepository");

class GetVehicleLocationQuery {
    constructor(vehicleId, latitude, longitude, altitude) {
        this.vehicleId = vehicleId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }

    async execute() {
        const location = await LocationRepository.findByVehicleIdAndLocation(this.vehicleId, this.latitude, this.longitude, this.altitude);
        if (location) {
            throw new Error('The vehicle is already parked at this location.');
        }
    }
}

module.exports = GetVehicleLocationQuery;
