'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historyCup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historyCup.belongsTo(models.Store);
    }
  }
  historyCup.init({
    storeId: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'historyCup',
  });
  return historyCup;
};