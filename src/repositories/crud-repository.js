const { where } = require('sequelize/lib/utils');
const AppError = require('../Utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
// const {logger}=require('../config')

class crudrepository{
    constructor(model){
        this.model=model
    }

    async create(data){
        const response=await this.model.create(data);
        return response;
    }
    async destroy(id){
        
            const response=await this.model.destroy({
                where:{
                    id:id
                }
            });
            if(!response){
                throw new AppError("Id is not Valid for Data to remove",StatusCodes.NOT_FOUND)
            }
            return response;
       
    }
    async get(id){
        
            const response=await this.model.findByPk(id);
            if(!response){
                throw new AppError("The aeroplane you were requesting to get is not found",StatusCodes.NOT_FOUND)
            }
            return response;
       
    }
    async getAll(){
       
            const response=await this.model.findAll()
            return response;
       
    }
    async update(id,data){  //data->{col:value...}
        console.log(data);
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            })
             if(!response[0]) {
                throw new AppError("The aeroplane you were requesting to update is not found",StatusCodes.NOT_FOUND)
             }
    }
}

module.exports=crudrepository