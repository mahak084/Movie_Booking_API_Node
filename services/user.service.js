const User=require('../models/user.model');
const {STATUS}=require('../utils/constants')

const createUser=async(data)=>{
    try{
        const response=await User.create(data);
        return response
    }
    catch(error){
        if(error.name=='ValidationError'){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            });
            throw {err,code:STATUS.UNPROCESSABLE_ENTITY}
        }
        console.log(error);
        throw error;
    }
}