'use strict';

const models = require('../db/models/index');

const insertAssetData = () => {
  // For testing
  return models.Asset.findAll()
    .then((assets) => {
      return assets;
    });
};

module.exports = {
  'insertAssetData': insertAssetData
};
