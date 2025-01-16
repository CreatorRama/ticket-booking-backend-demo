const CrudRepository =require('./crud-repository')
const {Airplane}=require('../models')
class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane)
    }

    async somerawquery(){

    }
}

module.exports={AirplaneRepository}