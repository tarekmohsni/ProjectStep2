const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Location = sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8), // Précision pour la latitude (par exemple)
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8), // Précision pour la longitude (par exemple)
        },
        altitude: {
            type: DataTypes.DECIMAL(10, 2), // Précision pour l'altitude (par exemple)
        },
        // Define a foreign key to represent the Vehicle each location belongs to
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'vehicles',
                key: 'id',
            },
        },
    });

    // Define the association between Vehicle and Location
    const Vehicle = require('./Vehicle')(sequelize, DataTypes);
    Vehicle.hasMany(Location, { foreignKey: 'vehicleId' });
    Location.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

    return Location;
}