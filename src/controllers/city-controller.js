const { StatusCodes } = require('http-status-codes')
const {CityService}=require('../services');
// const { error } = require('winston');
const {errorresponse,successresponse}=require('../Utils/common')
async function createCity(req,res){
try {
    console.log(req.body);
    console.log("inside city-controller");
    const city=await CityService.createCity({
        name:req.body.name
    })
    successresponse.data=city
    return res.status(StatusCodes.CREATED).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getCities(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await CityService.getCities()
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getCity(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await CityService.getCity(req.params.id)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function destroyCity(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await CityService.removeCity(req.params.id)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function updateCity(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
   
    const airplanes=await CityService.updateCity(req.params.id,req.body)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}

module.exports={createCity,getCities,getCity,destroyCity,updateCity}