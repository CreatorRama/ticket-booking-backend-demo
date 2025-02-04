

const { StatusCodes } = require('http-status-codes');
const {FlightRepository}=require('../repositories');
const  AppError = require('../Utils/errors/app-error');
const {Op}=require('sequelize')
const flightRepository=new FlightRepository()

async function createFlight(data){
try {
    console.log("inside Flight service");
    const Flight=await flightRepository.create(data);
    return Flight;
} catch (error) {
    console.log('inside services catch block',error);
    if (error.name === 'SequelizeUniqueConstraintError') {
        let explanation=[]
        error.errors.forEach((err)=>{
            explanation.push(err.message)
        })
        console.log(explanation);
        throw new AppError(
            explanation,
            StatusCodes.CONFLICT
        );
    }
    throw new AppError(
        'Database error occurred while creating an Flight object: ' + error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}
async function getFlights(){
try {
    console.log("inside airplane service");
    const flights=await flightRepository.getAll();
    return flights;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the flights',
            StatusCodes.BAD_REQUEST
        );

}

}
async function getFlight(id){
try {
    console.log("inside airplane service");
    const flights=await flightRepository.get(id);
    return flights;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError(error.explanation,StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the flights',
            StatusCodes.BAD_REQUEST
        );

}

}
async function removeFlight(id){
try {
    console.log("inside airplane service");
    const flights=await flightRepository.destroy(id);
    return flights;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The aeroplane you were requesting to delete is not found",StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the flights',
            StatusCodes.BAD_REQUEST
        );

}
}
async function updateFlight(id,data){
try {
    console.log("inside airplane service");
    const flights=await flightRepository.update(id,data);
    return flights;
} catch (error) {
    if (error.name === 'SequelizeValidationError') {
        let explanation=[]
        error.errors.forEach((err)=>{
            explanation.push(err.message)
        })
        console.log(explanation);
        throw new AppError(
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError(error.explanation,StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the flights',
            StatusCodes.BAD_REQUEST
        );

}

}

async function getAllFlights(query){
    // console.log(query,"\n")
let customfilters={}
let sortfilter=[]
if(query.trips){
    const [departureAirportId,arrivalAirportId]=query.trips.split("-")
    // console.log(departureAirportId," ",arrivalAirportId,"\n");
    customfilters.departureAirportId=departureAirportId
    customfilters.arrivalAirportId=arrivalAirportId
}
if(query.price){
    const [start,end]=query.price.split("-")
    customfilters.price={
        [Op.between]:[start,((end==undefined)?20000:end)]
    }
}
if(query.travellers){
    customfilters.totalseats={
        [Op.gte]:query.travellers
    }
}
if(query.sort){
    const params=query.sort.split(',')
    const sortfilters=params.map((param)=>param.split('_'))
    console.log(sortfilters);
    sortfilter=sortfilters
}
const endingtrimetime=" 23:59:00"
if(query.tripdate){
    console.log(query.tripdate)
    customfilters.departureTime={
        [Op.between]:[query.tripdate,query.tripdate+endingtrimetime]
    }
}
try {
    const flights=await flightRepository.getAllFlights(customfilters,sortfilter)
    return flights
} catch (error) {
    throw new AppError(
        'Cannot get Data of all the flights',
        StatusCodes.BAD_REQUEST
    );
}
}

module.exports={
createFlight,
getFlight,
getFlights,
removeFlight,
updateFlight,
getAllFlights
}