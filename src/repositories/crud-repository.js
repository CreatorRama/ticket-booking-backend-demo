const { Where } = require('sequelize/lib/utils');
// const {logger}=require('../config')

class crudrepository{
    constructor(model){
        this.model=model
    }

    async create(data){
        const response=await this.model.create(data);
        return response;
    }
    async destroy(data){
        
            const response=await this.model.destroy({
                Where:{
                    id:data
                }
            });
            return response;
       
    }
    async get(data){
        
            const response=await this.model.findByPK(data);
            return response;
       
    }
    async getAll(data){
       
            const response=await this.model.findAll()
            return response;
       
    }
    async update(id,data){  //data->{col:value...}
        
            const response=await this.model.update(data,{
                Where:{
                    id:id
                }
            })
            return response;
    }
}

module.exports=crudrepository