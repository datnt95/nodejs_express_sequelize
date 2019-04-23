'use strict';
module.exports = function(sequelize, DataTypes) {
  const AssetGroupItems = sequelize.define('AssetGroupItems', {
    'group_id': {
      'type': DataTypes.INTEGER,
      'allowNull': false,
      'unique': 'compositeIndex'
    },
    'asset_id': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': 'compositeIndex'
    }
  }, {
    'tableName': 'asset_group_item',
    'createdAt': false,
    'updatedAt': false
  });
  AssetGroupItems.associate = function (models) {
    models.AssetGroupItems.belongsTo(models.AssetGroup, {
      'foreignKey': 'group_id'
    });
  };

  AssetGroupItems.associate = function (models) {
    models.AssetGroupItems.belongsTo(models.Asset, {
      'foreignKey': 'asset_id'
    });
  };

  return AssetGroupItems;
};

