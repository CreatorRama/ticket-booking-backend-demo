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
    async get(data){
        
            const response=await this.model.findByPk(data);
            if(!response){
                throw new AppError("Id is not Valid for Data",StatusCodes.NOT_FOUND)
            }
            return response;
       
    }
    async getAll(data){
       
            const response=await this.model.findAll()
            return response;
       
    }
    async update(id,data){  //data->{col:value...}
        
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            })
            return response;
    }
}

module.exports=crudrepository