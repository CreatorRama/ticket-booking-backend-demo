const CrudRepository =require('./crud-repository')
const {Booking}=require('../models')
class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }

    async somerawquery(){

    }
}

module.exports={BookingRepository}