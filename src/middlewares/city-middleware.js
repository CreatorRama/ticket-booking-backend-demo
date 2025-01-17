const {StatusCodes}=require('http-status-codes')
// const { error } = require('winston')
const {errorresponse}=require('../Utils/common')
const AppError = require('../Utils/errors/app-error')
function validatecreaterequest(req,res,next){
    // console.log(errorresponse);
    if(!req.body.name){
        errorresponse.messsage='Something went wrong while creating city'

        errorresponse.error=new AppError(['Kindly give the name of city'],StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(errorresponse)
    }
    next()
}

module.exports={validatecreaterequest}