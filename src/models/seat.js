'use strict';
const {
  Model
} = require('sequelize');
const {Enums}=require('../Utils/common')
const {BUSINESS,PREMIUM_ECONOMY,ECONOMY,FIRST_CLASS}=Enums.SEAT_TYPE
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'AirplaneId',
      })
    }
  }
  Seat.init({
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    row:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    col: {
      type:DataTypes.STRING,
      allowNull:false
    },
    type: {
      type:DataTypes.ENUM,
      values:[BUSINESS,PREMIUM_ECONOMY,ECONOMY,FIRST_CLASS],
      defaultValue:ECONOMY,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};