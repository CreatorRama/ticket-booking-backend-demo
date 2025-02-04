const { StatusCodes } = require('http-status-codes');
const { errorresponse } = require('../Utils/common');
const AppError = require('../Utils/errors/app-error');
const { comparetime } = require('../Utils/helpers/datetime-helpers'); // Import comparetime function

function validatecreaterequest(req, res, next) {
    const requiredFields = [
        'FlightNumber',
        'AirplaneId',
        'departureAirportId',
        'arrivalAirportId',
        'arrivalTime',
        'departureTime',
        'price',
        'totalseats',
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    console.log("inside flight-middleware ");
    if (missingFields.length > 0) {
        errorresponse.messsage = 'Something went wrong while creating flights';
        errorresponse.error = new AppError(
            [`Missing required fields: ${missingFields.join(', ')}`],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse);
    }

    
    const { arrivalTime, departureTime } = req.body;

    if (!comparetime(arrivalTime, departureTime)) {
        errorresponse.messsage = 'Arrival time must be later than departure time';
        errorresponse.error = new AppError(
            'Arrival time must be later than departure time',
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse);
    }

    
    next();
}

module.exports = { validatecreaterequest };
