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
async function getAirplanes(data){
try {
    console.log("inside airplane service");
    const airplanes=await airplaneRepository.getAll(data);
    return airplanes;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}

module.exports={
createAirplane,
getAirplanes
}