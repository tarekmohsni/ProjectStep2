const db = require("../../Config/database");
const location = db.Location;

class LocationRepository {
    async create(vehicleId, latitude, longitude, altitude) {
        try {
            const locationModel = location.build({latitude, longitude, altitude, vehicleId});
            console.log('model location', locationModel)
            const result = await locationModel.save();
            return result.dataValues;
        } catch (err) {
            console.log('error', err);
        }
    }

    async findByVehicleIdAndLocation(vehicleId, latitude, longitude, altitude) {
        console.log('vehicleId', vehicleId)
        return await location.findOne({
            where: { vehicleId: vehicleId, latitude: latitude, longitude: longitude, altitude: altitude }
        });
    }

}

module.exports = new LocationRepository();
