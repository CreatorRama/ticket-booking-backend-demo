const express=require('express')
const app=express()
const {serverconfig,logger}=require('./config')
const apiRoutes=require('./routes')
// console.log(PORT);
// console.log(Aboutcontroller);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',apiRoutes)
app.listen(serverconfig.PORT,()=>{
    console.log(`successfully started the server on port ${serverconfig.PORT}`);
    // logger.info('successfully started the server')
})