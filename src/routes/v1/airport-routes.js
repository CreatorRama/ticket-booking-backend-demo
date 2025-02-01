const express=require('express')
const {Airportcontroller}=require('../../controllers')
const {Airportmiddlewarevalidator}=require('../../middlewares')
const router=express.Router()
console.log('inside airport routes');
router.post('/',
    Airportmiddlewarevalidator.validatecreaterequest,
    Airportcontroller.createAirport)
router.get('/',
    Airportcontroller.getAirports)
router.get('/:id',
    Airportcontroller.getAirport)
router.delete('/:id',
    Airportcontroller.destroyAirport)
router.patch('/:id',
    Airportcontroller.updateAirport)

module.exports=router