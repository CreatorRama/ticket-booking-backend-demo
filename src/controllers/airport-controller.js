const { StatusCodes } = require('http-status-codes')
const {AirportService}=require('../services');
// const { error } = require('winston');
const {errorresponse,successresponse}=require('../Utils/common')
async function createAirport(req,res){
try {
    console.log(req.body);
    console.log("inside Airport-controller");
    const Airport=await AirportService.createAirport({
        name:req.body.name,
        code:req.body.code,
        address:req.body.address,
        city_id:req.body.city_id
    })
    successresponse.data=Airport
    return res.status(StatusCodes.CREATED).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getAirports(req,res){
try {
    console.log(req.body);
    console.log("inside airport-controller");
    const airports=await AirportService.getAirports()
    successresponse.data=airports
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getAirport(req,res){
try {
    console.log(req.body);
    console.log("inside airport-controller");
    const airports=await AirportService.getAirport(req.params.id)
    successresponse.data=airports
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function destroyAirport(req,res){
try {
    console.log(req.body);
    console.log("inside airport-controller");
    const airports=await AirportService.removeAirport(req.params.id)
    successresponse.data=airports
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function updateAirport(req,res){
try {
    console.log(req.body);
    console.log("inside airport-controller");
   
    const airports=await AirportService.updateAirport(req.params.id,req.body)
    successresponse.data=airports
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}

module.exports={createAirport,getAirports,getAirport,destroyAirport,updateAirport}