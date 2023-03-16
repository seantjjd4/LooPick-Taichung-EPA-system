'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class returnCup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      returnCup.belongsTo(models.Store);
    }
  }
  returnCup.init({
    storeId: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'returnCup',
  });
  return returnCup;
};