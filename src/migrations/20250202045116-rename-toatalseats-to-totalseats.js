'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Flights', 'toatalseats', 'totalseats');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Flights', 'totalseats', 'toatalseats');
  }
};
