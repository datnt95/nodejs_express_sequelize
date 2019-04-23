'use strict';

const assetService = require('../services/asset');
const sequelize = require('../db/models/index');
const syncData = async (req, res) => {
  assetService.insertAssetData()
    .then((data) => {
      res.sendSuccess(data);
    })
    .catch((err) => {
      res.sendError(err);
    });
};


const transactionsController = async (req, res) => {

  // Get transaction
  let transaction = await sequelize.transaction();
  try {
    // Step 1
    await Model.create({}, {transaction});
    // Step 2
    await Model.create({}, {transaction});
    // Commit
    await transaction.commit();

    return res.status(200).json({'data': true});
  } catch (err) {
    // Rollback transaction if any errors were encountered
    await transaction.rollback();
  }
};
module.exports = {
  'syncData': syncData,
  transactionsController
};
