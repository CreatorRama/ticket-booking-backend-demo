const { StatusCodes } = require('http-status-codes');
const {BookingRepository}=require('../repositories');
const  AppError = require('../Utils/errors/app-error');
const axios=require('axios')

const {Enums}=require('../Utils/common')
const{BOOKED,INITIATED,PENDING,CANCELED}=Enums.BOOKING_STATUS

const bookingRepository=new BookingRepository()

const db=require('../models')

const {serverconfig}=require('../config')


async function createBooking(data){
    const transaction =await db.sequelize.transaction()
    try {
            const flight=await axios.get(`${serverconfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`)
            // console.log(flight);
            const Flight=flight.data.data
            
            if(data.noOfSeats>Flight.totalseats){
                console.log("ram");
                throw new AppError(
                    "The demanded seats are greater than totalseats",
                    StatusCodes.BAD_REQUEST)
                }
                const totalbookingprice=Flight.price*data.noOfSeats
                const bookingpayload={...data,totalCost:totalbookingprice}
                const booking=await bookingRepository.createBooking(bookingpayload,transaction)

            await axios.patch(`${serverconfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{seats:data.noOfSeats})

    await transaction.commit()
    return booking 
}  
    catch (error) {
        await transaction.rollback();
        throw error
    }
}



async function makePayment(data){
    const transaction =await db.sequelize.transaction()
try {
    console.log("inside Booking service");
    const Bookings=await bookingRepository.get(data.bookingId,transaction);
    if(Bookings.status==CANCELED){
        throw new AppError("The booking has expired",StatusCodes.BAD_REQUEST)
    }
    const bookingtime=new Date(Bookings.createdAt)
    const currenttime=new Date();
    if(currenttime-bookingtime>5*60*1000){
        await bookingRepository.update(data.bookingId,{status:CANCELED},transaction)
        throw new AppError("The booking has expired",StatusCodes.BAD_REQUEST)
    }
    if(Bookings.totalCost!=data.totalCost){
        throw new AppError("Amount is less than or greater than total booking cost", StatusCodes.BAD_REQUEST)
    }
    if(Bookings.userId!=data.userId){
        throw new AppError("The User corresponding to the booking does not match", StatusCodes.BAD_REQUEST)
    }
    //we assume here payment is successfull
    const response=await bookingRepository.update(data.bookingId,{status:BOOKED},transaction)
    await transaction.commit()
    return response;
} catch (error) {
    console.log('inside services catch block',error);
        // if(error instanceof AppError) throw error
        await transaction.rollback();
        throw error
        // throw new AppError("something went wrong while making payment", StatusCodes.INTERNAL_SERVER_ERROR)
}

}
async function getBookings(){
try {
    console.log("inside Booking service");
    const Bookings=await bookingRepository.getAll();
    return Bookings;
} catch (error) {
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the aeroplanes',
            StatusCodes.BAD_REQUEST
        );

}

}
async function getBooking(id){
try {
    console.log("inside Booking service");
    const Booking=await bookingRepository.get(id);
    return Booking;
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
async function removeBooking(id){
try {
    console.log("inside Booking service");
    const Booking=await bookingRepository.destroy(id);
    return Booking;
} catch (error) {
    // if(error instanceof AppError) throw error;
    //or
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The Booking you were requesting to delete is not found",StatusCodes.NOT_FOUND)
    }
    console.log('inside services catch block',error);
        throw new AppError(
            'Cannot get Data of all the Booking',
            StatusCodes.BAD_REQUEST
        );

}
}
async function updateBooking(id,data){
try {
    console.log("inside Booking service");
    const Booking=await bookingRepository.update(id,data);
    return Booking;
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
            'Cannot get Data of all the Booking',
            StatusCodes.BAD_REQUEST
        );

}

}

module.exports={
createBooking,
getBookings,
getBooking,
removeBooking,
updateBooking,
makePayment
}