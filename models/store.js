'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      store.hasMany(models.loanableCup);
      store.hasMany(models.returnCup);
      store.hasMany(models.historyCup);
    }
  }
  store.init({
    storeName: DataTypes.STRING,
    storeAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return store;
};