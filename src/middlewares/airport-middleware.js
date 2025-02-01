const {StatusCodes}=require('http-status-codes')
// const { error } = require('winston')
const {errorresponse}=require('../Utils/common')
const AppError = require('../Utils/errors/app-error')
function validatecreaterequest(req,res,next){
    // console.log(errorresponse);
    if(!req.body.name){
        errorresponse.messsage='Something went wrong while creating airport'

        errorresponse.error=new AppError(['Kindly give the correct name of airport'],StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse)
    }
    if(!req.body.code){
        errorresponse.messsage='Something went wrong while creating airport'

        errorresponse.error=new AppError(['Kindly give the correct code of airport'],StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse)
    }
    if(!req.body.city_id){
        errorresponse.messsage='Something went wrong while creating airport'

        errorresponse.error=new AppError(['Kindly give the correct city_id of airport'],StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse)
    }
    next()
}

module.exports={validatecreaterequest}