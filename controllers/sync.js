'use strict';

const assetService = require('../services/asset');

const syncData = (req, res) => {
  assetService.insertAssetData()
    .then((data) => {
      res.sendSuccess(data);
    })
    .catch((err) => {
      res.sendError(err);
    });
};

module.exports = {
  'syncData': syncData
};
