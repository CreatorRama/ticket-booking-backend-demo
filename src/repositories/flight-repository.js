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

    async updateRemainingSeats(flightId,seats,dec=true){
        await db.sequelize.query(addRowLockOnFlights(flightId))
        const flight = await Flight.findByPk(flightId);
       if(parseInt(dec)){
        await flight.decrement("totalseats",{by:seats})
       }
       else{
        await flight.increment("totalseats",{by:seats})
       }
       return flight
    }
}

module.exports={FlightRepository}