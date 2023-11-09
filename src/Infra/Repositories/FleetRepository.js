const db = require("../../Config/database");
const fleet = db.Fleet;

class FleetRepository {

    async create(userId) {
        try {
            const newFleet = fleet.build({ userId });
            const result = await newFleet.save();
            return result.dataValues;
        } catch (err) {
            console.log('error', err);
        }
    }

    async findById(fleetId) {
        return fleet.findOne({where: { id: fleetId }});
    }

    async findByUserId(userId) {
        return fleet.findOne({where: { userId: userId }});
    }

}

module.exports = new FleetRepository();
