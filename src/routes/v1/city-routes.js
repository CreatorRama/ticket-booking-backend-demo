const express=require('express')
const {Citycontroller}=require('../../controllers')
const {airplanemiddlewarevalidator,citymiddlewarevalidator}=require('../../middlewares')
const router=express.Router()
console.log('inside airplane routes');
router.post('/',
    citymiddlewarevalidator.validatecreaterequest,
    Citycontroller.createCity)
router.get('/',
    Citycontroller.getCities)
router.get('/:id',
    Citycontroller.getCity)
router.delete('/:id',
    Citycontroller.destroyCity)
router.patch('/:id',
    Citycontroller.updateCity)

module.exports=router