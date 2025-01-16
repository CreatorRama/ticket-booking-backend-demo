const express=require('express')
const {infocontroller}=require('../../controllers')
const router=express.Router()
const airplaneroutes=require('./airplane-routes')
console.log('inside v1 routes');
router.use('/airplanes',airplaneroutes)

router.get('/info',infocontroller.info)

module.exports=router