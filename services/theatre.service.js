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

const deleteTheatre=async(id)=>{
    try{
    const response=await Theatre.findByIdAndDelete(id);
    if(!response){
        throw {
            err: "No record of a theatre found for the given id",
            code: STATUS.NOT_FOUND
        }
    }}
    catch(error){
        throw error;
    }
}

const getTheatre=async(id)=>{
    try{
        const response=Theatre.findById(id);
        if(!response){
            throw {
                err: "Cannot find theatre with corresponding id",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        throw error;
    }
}

const getAllTheatres=async(data)=>{
    try{

    }
    catch(err){

    }

}

const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true, runValidators: true
        });
        if(!response) {
            // no record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw error;
    }
}


module.exports={
    createTheatre,deleteTheatre,getTheatre,updateTheatre,getAllTheatres
}