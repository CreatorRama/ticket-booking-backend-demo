const express=require('express')
const app=express()
const {serverconfig,logger}=require('./config')
const apiRoutes=require('./routes')

const {schedulecrons:CRONS}=require('./Utils/common/cron-jobs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// console.log(PORT);
// console.log(Aboutcontroller);

app.use('/api',apiRoutes)
app.listen(serverconfig.PORT,()=>{
    console.log(`successfully started the server on port ${serverconfig.PORT}`);
    CRONS()
    // logger.info('successfully started the server')
})