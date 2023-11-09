const FleetRepository = require('../../Infra/Repositories/FleetRepository');

class CreateFleetCommand {
    constructor(userId) {
        this.userId = userId;
    }

    async execute() {
        return await FleetRepository.create(this.userId);
    }
}

module.exports = CreateFleetCommand;

