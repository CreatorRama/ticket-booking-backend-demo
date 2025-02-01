'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FlightNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      AirplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Airplanes',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      departureAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:'CASCADE'
      },
      arrivalAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:'CASCADE'
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      bordingGate: {
        type: Sequelize.STRING
      },
      toatalseats: {
        type: Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.dropmodel('Flights');
  }
};