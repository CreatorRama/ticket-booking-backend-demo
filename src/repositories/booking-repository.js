const CrudRepository =require('./crud-repository')
const {Booking}=require('../models')
class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }

    async createBooking(data,transaction){
        const response=Booking.create(data,{transaction:transaction})
        return response
    }

    async get(id,transaction){
        
        const response=await this.model.findByPk(id,{transaction:transaction});
        if(!response){
            throw new AppError("The aeroplane you were requesting to get is not found",StatusCodes.NOT_FOUND)
        }
        return response;
   
}

async update(id,data,transaction){  //data->{col:value...}
        console.log(data);
            const response=await this.model.update(data,{
                where:{
                    id:id
                },
            }, {transaction:transaction})
             if(!response[0]) {
                throw new AppError("The aeroplane you were requesting to update is not found",StatusCodes.NOT_FOUND)
             }

            //  return response
    }

}

module.exports={BookingRepository}