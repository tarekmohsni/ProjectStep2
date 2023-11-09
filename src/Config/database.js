const env = require('./env.js');
const Fleet = require("../Domain/Entities/Fleet");
const Vehicle = require("../Domain/Entities/Vehicle");
const Location = require("../Domain/Entities/Location");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'postgres', // specify your database dialect
    host: env.host,
    port: 5432, // replace with your database port
    username: env.username,
    password: env.password,
    database: env.database,
});

const db = {};
db.Fleet = Fleet(sequelize, DataTypes);
db.Vehicle = Vehicle(sequelize, DataTypes);
db.Location = Location(sequelize, DataTypes);

// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
