'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AssetType', {
    'id': {
      'primaryKey': true,
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'parentTypeId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'instantiable': {
      'type': DataTypes.BOOLEAN
    },
    'tenantId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'description': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'scope': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'etag': {
      'type': DataTypes.INTEGER
    },
    'variables': {
      'type': DataTypes.STRING
    },
    'fileAssignments': {
      'type': DataTypes.STRING
    },
    'aspects': {
      'type': DataTypes.STRING
    },
    '_links': {
      'type': DataTypes.STRING
    }
  }, {
    'tableName': 'asset_type',
    'createdAt': false,
    'updatedAt': false
  });
};

