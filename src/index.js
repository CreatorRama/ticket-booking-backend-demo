const express=require('express')
const app=express()
const {serverconfig,logger}=require('./config')
const apiRoutes=require('./routes')
// console.log(PORT);
// console.log(Aboutcontroller);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',apiRoutes)
app.listen(serverconfig.PORT,async ()=>{
    console.log(`successfully started the server on port ${serverconfig.PORT}`);
    // logger.info('successfully started the server')
    // const {City,Airport}=require('./models')
    // const noida=await City.findByPk(1);
    // const airport=await Airport.create({name:'lal bahadur shatri international airport',code:'LBS',city_id:1})
    // const newairport=await noida.createAirport({name:'Noida international airport',code:'NOA',city_id:2})
    // console.log(newairport);
    // const data=await Airport.findByPk(1)
    // const lal=await Airport.destroy({where:{code:'LBS'}});
    // const dn=await City.destroy({where:{
    //     id:1
    // }})
    // console.log(lal);

})
//to generate migration file 
//npx sequelize migration:generate --name update-city-airport-association