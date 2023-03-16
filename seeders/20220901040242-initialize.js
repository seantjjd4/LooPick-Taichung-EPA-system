'use strict';
const { GetJson } = require('../libs/csvRead')
module.exports = {
  async up(queryInterface, Sequelize) {
    var stores = await GetJson('libs/111-stores.json')
    await queryInterface.bulkInsert('Stores', stores);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  }
};