'use strict';

module.exports = function(sequelize, DataTypes) {
  const AssetGroup = sequelize.define('AssetGroup', {
    'id': {
      'primaryKey': true,
      'type': DataTypes.INTEGER,
      'autoIncrement': false,
      'allowNull': false
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    }
  }, {
    'tableName': 'asset_group',
    'createdAt': false,
    'updatedAt': false
  });
  AssetGroup.associate = function(models) {
    models.AssetGroup.hasMany(models.AssetGroupItems, {
      'foreignKey': {
        'name': 'group_id',
        'allowNull': false
      }
    });
  };

  return AssetGroup;
};

