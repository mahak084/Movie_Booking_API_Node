const Theatre=require('../models/theatre.model');
const {STATUS}=require('../utils/constants')

const createTheatre=async(data)=>{
    try{
    const response=Theatre.create(data);
    return response;}
    catch(error){
        if(error=='ValidationError'){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            throw {code:STATUS.UNPROCESSABLE_ENTITY,err}
        }
        throw error
    }
}

module.exports={
    createTheatre
}