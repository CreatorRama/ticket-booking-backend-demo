const express=require('express')
// const {infocontroller}=require('../../controllers')
const {infocontroller}=require('../../controllers')
const {BookingController}=require('../../controllers')
const router=express.Router()

router.get('/info',infocontroller.info)
router.get('/booking',BookingController.getBookings)
router.post('/booking',BookingController.createBooking)
router.get('/booking/:id',BookingController.getBooking)
router.patch('/booking',BookingController.updateBooking)
router.delete('/booking',BookingController.destroyBooking)

module.exports=router