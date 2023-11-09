const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Fleet = sequelize.define('fleets', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
    });

    return Fleet;
}



