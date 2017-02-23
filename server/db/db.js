const path = require('path');
const Sequelize = require('sequelize');
const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

console.log('Opening connection to PostgreSQL');

// Create the database instance
module.exports = new Sequelize(DATABASE_URI, {
	logging: false
})