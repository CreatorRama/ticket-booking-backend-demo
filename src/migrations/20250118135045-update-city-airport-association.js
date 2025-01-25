'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('Airports','city_id',{
    type:'foreign key',
    references:{
      model:'Cities',
      key:'id'
    },
    onUpdate:'CASCADE',
    OnDELETE:'CASCADE'
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
