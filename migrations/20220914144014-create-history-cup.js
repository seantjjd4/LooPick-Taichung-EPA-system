'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('historyCups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stores',
          key: 'id',
        }
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('historyCups');
  }
};