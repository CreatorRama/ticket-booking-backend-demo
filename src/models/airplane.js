'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //for js level constraints for foreign key,etc
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
       foreignKey:'AirplaneId',
       onDelete:'CASCADE'
      })
      this.hasMany(models.Seat,{
        foreignKey:'AirplaneId',
       onDelete:'CASCADE'
      })
    }
  }
  Airplane.init({
    modelNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'',
      validate:{
        isAlphanumeric:true
      }
    },
    capacity: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0,
      validate:{
        max:1000
      }
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};