const express=require('express')


const {BookingController}=require('../../controllers')
const router=express.Router()

router.get('/',BookingController.getBookings)
router.post('/',BookingController.createBooking)
router.get('/booking/:id',BookingController.getBooking)
router.patch('/booking',BookingController.updateBooking)
router.delete('/booking',BookingController.destroyBooking)

module.exports=router