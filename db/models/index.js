'use strict';

const config = require('config');
const fs = require('fs');
const Sequelize = require('sequelize');
const log = require('log4js').getLogger();
const path = require('path');

const dbConfig = config.get('dbConfig');
const basename = path.basename(module.filename);
const db = {};

const sequelize = new Sequelize(dbConfig.databaseName, dbConfig.userName, dbConfig.password, {
  'host': dbConfig.host,
  'dialect': 'postgres',
  'pool': {
    'max': 5,
    'min': 0,
    'acquire': 30000,
    'idle': 10000
  },
  'logging': false
});

// Import all model define in this folder
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

/* Mapping on relationship between each tables */

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    log.info('Connection to the database has been established successfully.');
  })
  .catch(err => {
    log.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

