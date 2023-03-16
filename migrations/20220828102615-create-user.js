'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrowTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shouldReturnTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      countOfContainer: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      borrowStoreId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};