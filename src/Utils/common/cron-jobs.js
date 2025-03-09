const cron=require('node-cron')
const  {BookingService}  = require('../../services')

 function schedulecrons(){
    cron.schedule('0 */2 * * * *',async ()=>{
        const response=await BookingService.canceloldbookings()
    console.log(response);
 })
}

module.exports={
    schedulecrons
}