const { StatusCodes } = require('http-status-codes');
const {AirportRepository}=require('../repositories');
const  AppError = require('../Utils/errors/app-error');

const airportRepository=new AirportRepository()

async function createAirport(data){
try {
    console.log("inside Airport service");
    const response=await airportRepository.create(data);
    return response;
} catch (error) {
    console.log('inside services catch block',error);
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
    throw new AppError(
        'Database error occurred while creating an Airport object: ' + error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}
async function getAirports(){
try {
    console.log("inside Airport service");
    const Airports=await airportRepository.getAll();
    return Airports;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function getAirport(id){
try {
    console.log("inside Airport service");
    const Airport=await airportRepository.get(id);
    return Airport;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError(error.explanation,StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function removeAirport(id){
try {
    console.log("inside Airport service");
    const Airport=await airportRepository.destroy(id);
    return Airport;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The airport you were requesting to delete is not found",StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the airport',
            StatusCodes.BAD_REQUEST
        );

}
}
async function updateAirport(id,data){
try {
    console.log("inside Airport service");
    const Airport=await airportRepository.update(id,data);
    return Airport;
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
            'Cannot get Data of all the airport',
            StatusCodes.BAD_REQUEST
        );

}

}

module.exports={
createAirport,
getAirports,
getAirport,
removeAirport,
updateAirport
}