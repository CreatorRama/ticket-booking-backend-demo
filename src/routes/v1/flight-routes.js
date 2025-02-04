const express=require('express')
const {Flightcontroller}=require('../../controllers')
const {flightmiddlewarevalidator}=require('../../middlewares')
const router=express.Router()
console.log('inside flights routes');
router.post('/',
    flightmiddlewarevalidator.validatecreaterequest,
    Flightcontroller.createFlight)
router.get('/',
    Flightcontroller.getAllFlights)
// router.get('/',
//     Flightcontroller.getFlights)
router.get('/:id',
    Flightcontroller.getFlight)
router.delete('/:id',
    Flightcontroller.destroyFlight)
router.patch('/:id',
    Flightcontroller.updateFlight)

module.exports=router