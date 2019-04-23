'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Variable', {
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'unit': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'searchable': {
      'type': DataTypes.BOOLEAN,
      'allowNull': false
    },
    'qualityCode': {
      'type': DataTypes.BOOLEAN,
      'allowNull': false
    },
    'defaultValue': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'dataType': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'length': {
      'type': DataTypes.INTEGER,
      'allowNull': true
    },
    'aspectId': {
      'type': DataTypes.STRING
    }

  }, {
    'tableName': 'variables',
    'createdAt': false,
    'updatedAt': false
  });
};

