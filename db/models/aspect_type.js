'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AspectType', {
    'id': {
      'primaryKey': true,
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'tenantId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'category': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'scope': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'description': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'variables': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'etag': {
      'type': DataTypes.INTEGER
    },
    '_links': {
      'type': DataTypes.STRING
    }

  }, {
    'tableName': 'aspect_type',
    'createdAt': false,
    'updatedAt': false
  });
};

