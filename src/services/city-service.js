
const { StatusCodes } = require('http-status-codes');
const {Cityrepository}=require('../repositories');
const  AppError = require('../Utils/errors/app-error');

const CityRepository=new Cityrepository()

async function createCity(data){
try {
    console.log("inside city service");
    const city=await CityRepository.create(data);
    return city;
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
        'Database error occurred while creating an City object: ' + error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}
async function getCities(){
try {
    console.log("inside airplane service");
    const airplanes=await CityRepository.getAll();
    return airplanes;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function getCity(id){
try {
    console.log("inside airplane service");
    const airplanes=await CityRepository.get(id);
    return airplanes;
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
async function removeCity(id){
try {
    console.log("inside airplane service");
    const airplanes=await CityRepository.destroy(id);
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
async function updateCity(id,data){
try {
    console.log("inside airplane service");
    const airplanes=await CityRepository.update(id,data);
    return airplanes;
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
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}

module.exports={
createCity,
getCity,
getCities,
removeCity,
updateCity
}