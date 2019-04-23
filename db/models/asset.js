'use strict';

module.exports = function(sequelize, DataTypes) {
  const Asset = sequelize.define('Asset', {
    'assetId': {
      'primaryKey': true,
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': 'compositeIndex'
    },
    'tenantId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'etag': {
      'type': DataTypes.INTEGER,
      'allowNull': false
    },
    'externalId': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    't2Tenant': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'subTenant': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'description': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'timezone': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'twinType': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'parentId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'typeId': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    '_links': {
      'type': DataTypes.TEXT
    },
    'fileAssignments' : {
      'type': DataTypes.TEXT
    },
    'variables': {
      'type': DataTypes.TEXT
    },
    'aspects': {
      'type': DataTypes.TEXT
    },
    'locks': {
      'type': DataTypes.TEXT
    },
    'location': {
      'type': DataTypes.TEXT
    }
  }, {
    'tableName': 'asset',
    'createdAt': false,
    'updatedAt': false
  });
  Asset.associate = function(models) {
    models.Asset.hasMany(models.AssetGroupItems, {
      'foreignKey': {
        'name': 'asset_id',
        'allowNull': false
      }
    });
  };

  return Asset;
};

