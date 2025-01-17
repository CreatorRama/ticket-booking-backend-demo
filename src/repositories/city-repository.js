const CrudRepository =require('./crud-repository')
const {City}=require('../models')
class Cityrepository extends CrudRepository{
    constructor(){
        super(City)
    }

    async somerawquery(){

    }
}

module.exports={Cityrepository}