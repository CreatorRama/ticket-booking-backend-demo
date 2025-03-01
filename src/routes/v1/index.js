const express=require('express')
const Bookingroutes=require('./booking-routes')
const router=express.Router()

router.use('/bookings',Bookingroutes)
module.exports=router