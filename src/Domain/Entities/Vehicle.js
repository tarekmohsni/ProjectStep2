const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Vehicle = sequelize.define('vehicles', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        plateNumber: {
            type: DataTypes.STRING,
        },
        // Define a foreign key to represent the Fleet each vehicle belongs to
        fleetId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Make it a primary key
            references: {
                model: 'fleets',
                key: 'id',
            },
        },
    });

    // Define the association between Fleet and Vehicle
    const Fleet = require('./Fleet')(sequelize, DataTypes);
    Fleet.hasMany(Vehicle, { foreignKey: 'fleetId' });
    Vehicle.belongsTo(Fleet, { foreignKey: 'fleetId' });

    return Vehicle;
};