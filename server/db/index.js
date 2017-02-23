const db = require('./db');

// Require models so they're registered into sequelize
require('./models');

// Sync all the models at once.
let syncedDbPromise = db.sync();

syncedDbPromise.then(() => console.log('Sequelize models synced to PostgreSQL'));

module.exports = syncedDbPromise;