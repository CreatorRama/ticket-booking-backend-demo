const express=require('express')
const app=express()
const {PORT}=require('./config')
const apiRoutes=require('./routes')
// console.log(PORT);
// console.log(Aboutcontroller);

app.use('/api',apiRoutes)
app.listen(PORT,()=>{
    console.log(`successfully started the server on port ${PORT}`);
})