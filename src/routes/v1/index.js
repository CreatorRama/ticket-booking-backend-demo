const express=require('express')
const {infocontroller}=require('../../controllers')
const router=express.Router()
const airplaneroutes=require('./airplane-routes')
const airportroutes=require('./airport-routes')
const cityroutes=require('./city-routes')
console.log('inside v1 routes');
router.use('/airplanes',airplaneroutes)
router.use('/airports',airportroutes)
router.use('/cities',cityroutes)

// router.get('/info',infocontroller.info)

module.exports=router