const express=require('express')
const {Airplanecontroller}=require('../../controllers')
const {airplanemiddlewarevalidator}=require('../../middlewares')
const router=express.Router()
console.log('inside airplane routes');
router.post('/',
    airplanemiddlewarevalidator.validatecreaterequest,
    Airplanecontroller.createAirplane)
router.get('/',
    Airplanecontroller.getAirplanes)

module.exports=router