const { StatusCodes } = require('http-status-codes')
const AirplaneService=require('../services');
// const { error } = require('winston');
const {errorresponse,successresponse}=require('../Utils/common')
async function createAirplane(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplane=await AirplaneService.createAirplane({
        modelNumber:req.body.modelNumber,
        capacity:req.body.capacity
    })
    successresponse.data=airplane
    return res.status(StatusCodes.CREATED).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getAirplanes(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await AirplaneService.getAirplanes()
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getAirplane(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await AirplaneService.getAirplane(req.params.id)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function destroyAirplane(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const airplanes=await AirplaneService.updateAirplane(req.params.id)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function updateAirplane(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
   
    const airplanes=await AirplaneService.updateAirplane(req.params.id,req.body)
    successresponse.data=airplanes
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}

module.exports={createAirplane,getAirplanes,getAirplane,destroyAirplane,updateAirplane}