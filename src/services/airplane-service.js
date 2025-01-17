const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository}=require('../repositories');
const  AppError = require('../Utils/errors/app-error');

const airplaneRepository=new AirplaneRepository()

async function createAirplane(data){
try {
    console.log("inside airplane service");
    const response=await airplaneRepository.create(data);
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
        'Database error occurred while creating an Airplane object: ' + error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}
async function getAirplanes(){
try {
    console.log("inside airplane service");
    const airplanes=await airplaneRepository.getAll();
    return airplanes;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function getAirplane(id){
try {
    console.log("inside airplane service");
    const airplanes=await airplaneRepository.get(id);
    return airplanes;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The aeroplane you were requesting is not found",StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function removeAirplane(id){
try {
    console.log("inside airplane service");
    const airplanes=await airplaneRepository.destroy(id);
    return airplanes;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The aeroplane you were requesting to delete is not found",StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}

module.exports={
createAirplane,
getAirplanes,
getAirplane,
removeAirplane
}