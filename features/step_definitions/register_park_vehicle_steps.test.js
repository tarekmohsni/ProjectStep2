const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../src/app');
const assert = require('assert');
const CreateFleetCommand = require("../../src/App/Commands/CreateFleetCommand");
const RegisterVehicleCommand = require("../../src/App/Commands/RegisterVehicleCommand");

let fleetId, fleet, plateNumber, location, userId = '123', response;

///// register vehicle

Given('my fleet', async () => {
    const createFleetCommand = new CreateFleetCommand(userId);
    fleet = await createFleetCommand.execute();
    // const fleet = await Fleet.create();
    fleetId = fleet.id;});

Given('a vehicle', () => {
    plateNumber = 'ABC123';
});

When('I register this vehicle into my fleet', async () => {
    response = await request(app)
        .post('/api/register-vehicle')
        .send({ fleetId: fleetId, plateNumber: plateNumber });
});

Then('this vehicle should be part of my vehicle fleet', () => {
    assert.strictEqual(response.status, 200);
    assert.equal(response.body.message, `Vehicle ${plateNumber} is registered in fleet ${fleetId}`);
});

////////// park vehicle

Given('I have registered this vehicle into my fleet', async function () {
    // Assume the registration of the vehicle into the fleet
    const registerVehicleCommand = new RegisterVehicleCommand(fleetId, plateNumber);
    await registerVehicleCommand.execute();
});

Given('a location', () => {
    location = {"latitude": 1.23, "longitude": 6.56, "altitude": 789};
});

When('I park my vehicle at this location', async () => {
    response = await request(app)
        .post('/api/localize-vehicle')
        .send({ fleetId: fleetId, plateNumber: plateNumber, location: location });
});

Then('the known location of my vehicle should verify this location', () => {
    assert.strictEqual(response.status, 200);
    assert.equal(response.body.message, `Vehicle ${plateNumber} localized in fleet ${fleetId} at ${location.latitude}, ${location.longitude}, ${location.altitude}` );
});
