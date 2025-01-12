const express=require('express')
const {infocontroller}=require('../../controllers')
const router=express.Router()

router.get('/info',infocontroller.info)

module.exports=router