const {StatusCodes}=require('http-status-codes')

const info=(req,res)=>{
    res.status(StatusCodes.OK).send({
        success:true,
        msg:'ok',
        error:{},
        data:{}
    })
}

module.exports={
    info
}