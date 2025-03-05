const {Sequelize}=require('sequelize')
const CrudRepository =require('./crud-repository')
const {Flight,Airplane,Airport,City}=require('../models')
const db=require('../models')
const {addRowLockOnFlights}=require('./queries')
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter,sort){
        console.log(filter,"\n");
        const response=await Flight.findAll({
            where:filter,
            order:sort,
            include:[{
                model:Airplane,
                required:true,
                as:'AirplaneDetail'               
            },{
                model:Airport,
                required:true,
               as:'departureAirport',
                on:{
                    col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code"))
                },
                include:{
                    model:City,
                    required:true
                }
            },
            {
                model:Airport,
                required:true,
               as:'arrivalAirport',
                on:{
                    col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code"))
                },
                include:{
                    model:City,
                    required:true
                }
            }
        ]
        })
        return response
    }

    async updateRemainingSeats(flightId, seats, dec = true) {

        const Transaction =await db.sequelize.transaction()
       try {
        await db.sequelize.query(addRowLockOnFlights(flightId));
        
        const flight = await Flight.findByPk(flightId);
    
        if (+dec) {
            await flight.decrement("totalseats", { by: seats },{transaction:Transaction});
        } else {
            await flight.increment("totalseats", { by: seats },{transaction:Transaction});
        }
    
        // Reload the flight instance to get updated values
        await flight.reload();
        await Transaction.commit()
        return flight;
       } catch (error) {
           await Transaction.rollback()
           throw error
       }
    
    }
}   

module.exports={FlightRepository}