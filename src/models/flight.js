'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'AirplaneId',
        as:'AirplaneDetail'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportId',
         as:'departureAirport'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'arrivalAirportId',
         as:'arrivalAirport'
      })
    }
  }
  Flight.init({
    FlightNumber: { type: DataTypes.STRING,allowNull:false },
    AirplaneId: { type: DataTypes.INTEGER,allowNull:false },
    departureAirportId: { type: DataTypes.STRING,allowNull:false },
    arrivalAirportId: { type: DataTypes.STRING,allowNull:false },
    arrivalTime: { type: DataTypes.DATE,allowNull:false },
    departureTime: { type: DataTypes.DATE ,allowNull:false},
    price: { type: DataTypes.INTEGER,allowNull:false },
    bordingGate: { type: DataTypes.STRING },
    totalseats: { type: DataTypes.INTEGER,allowNull:false }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};