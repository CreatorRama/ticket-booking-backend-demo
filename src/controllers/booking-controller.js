const { StatusCodes } = require('http-status-codes')
const {BookingService}=require('../services');
// const { error } = require('winston');
const {errorresponse,successresponse}=require('../Utils/common')
async function createBooking(req,res){
try {
    console.log(req.body.noOfSeats);
    console.log("inside Booking-controller");
    const Booking=await BookingService.createBooking({
        flightId:req.body.flightId,
        userId:req.body.userId,
        noOfSeats:req.body.noOfSeats
    })
    successresponse.data=Booking
    return res.status(StatusCodes.CREATED).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getBookings(req,res){
try {
    console.log(req.body);
    console.log("inside Booking-controller");
    const Bookings=await BookingService.getBookings()
    successresponse.data=Bookings
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function getBooking(req,res){
try {
    console.log(req.body);
    console.log("inside Booking-controller");
    const Bookings=await BookingService.getBooking(req.params.id)
    successresponse.data=Bookings
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function destroyBooking(req,res){
try {
    console.log(req.body);
    console.log("inside Booking-controller");
    const Bookings=await BookingService.removeBooking(req.params.id)
    successresponse.data=Bookings
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}
async function updateBooking(req,res){
try {
    console.log(req.body);
    console.log("inside Booking-controller");
   
    const Bookings=await BookingService.updateBooking(req.params.id,req.body)
    successresponse.data=Bookings
    return res.status(StatusCodes.OK).json(successresponse)
} catch (error) {
    console.log('inside controller catch block',error);
    errorresponse.error=error
    return res.status(error.statusCode).json(errorresponse)
}
}

module.exports={createBooking,getBookings,getBooking,destroyBooking,updateBooking}