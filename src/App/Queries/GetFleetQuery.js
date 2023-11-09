const FleetRepository = require('../../Infra/repositories/FleetRepository');

class GetFleetQuery {
    constructor(userId, fleetId) {
        this.userId = userId;
        this.fleetId = fleetId;
    }

    async execute() {
        const fleet = await FleetRepository.findByUserId(this.userId);
        if (fleet != null) {
            throw new Error('The user has already his own fleet.');
        }
    }
    async executeGetFleet() {
        const fleet = await FleetRepository.findById(this.fleetId);
        if (fleet == null) {
            throw new Error('The fleet does not exist.');
        }
    }
}

module.exports = GetFleetQuery;
