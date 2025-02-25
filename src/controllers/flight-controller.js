const { StatusCodes } = require('http-status-codes')
const {FlightService}=require('../services');
// const { error } = require('winston');
const {errorresponse,successresponse}=require('../Utils/common')
async function createFlight(req,res){
try {
    console.log(req.body);
    console.log("inside Flight-controller");
    const Flight=await FlightService.createFlight({
        FlightNumber:req.body.FlightNumber,
        AirplaneId:req.body.AirplaneId,
        departureAirportId:req.body.departureAirportId,
        arrivalAirportId:req.body.arrivalAirportId,
        arrivalTime:req.body.arrivalTime,
        departureTime:req.body.departureTime,
        price:req.body.price,
        totalseats:req.body.totalseats,
        bordingGate:req.body.bordingGate
    })
    successresponse.data=Flight
    return res.status(StatusCodes.CREATED).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getFlights(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const flights=await FlightService.getFlights()
    successresponse.data=flights
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getFlight(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const flights=await FlightService.getFlight(req.params.id)
    successresponse.data=flights
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function destroyFlight(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
    const flights=await FlightService.removeFlight(req.params.id)
    successresponse.data=flights
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function updateFlight(req,res){
try {
    console.log(req.body);
    console.log("inside airplane-controller");
   
    const flights=await FlightService.updateFlight(req.params.id,req.body)
    successresponse.data=flights
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getAllFlights(req,res){
    try {
    const flights=await FlightService.getAllFlights(req.query)
        successresponse.data=flights
        return res.status(StatusCodes.OK).json(successresponse)
    } catch (error) {
        console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
    }
}
async function updateSeats(req,res){
    try {
    const flights=await FlightService.updateSeats({
        flightId:req.params.id,
        seats:req.body.seats,
        dec:req.body.dec
    })
        successresponse.data=flights
        return res.status(StatusCodes.OK).json(successresponse)
    } catch (error) {
        console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
    }
}

module.exports={createFlight,getFlights,getFlight,destroyFlight,updateFlight,getAllFlights,updateSeats}