'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chat_app');

// const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  require(path.join(__dirname, file));
});
//
// Object.keys(db).forEach(function (modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = mongoose;
