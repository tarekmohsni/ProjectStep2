const db = require("../../Config/database");
const vehicle = db.Vehicle;

class VehicleRepository {
    async create(fleetId, plateNumber) {
        try {
            const vehicleModel = vehicle.build({plateNumber, fleetId});
            const result = await vehicleModel.save();
            return result.dataValues;
        } catch (err) {
            console.log('error', err);
        }
    }

    async findByPlateNumberAndFleet(plateNumber, fleetId) {
        return await vehicle.findOne({
            where: { plateNumber: plateNumber, fleetId: fleetId }
        });
    }

}

module.exports = new VehicleRepository();
