const User=require('../models/user.model');
const {STATUS,USER_ROLE,USER_STATUS}=require('../utils/constants')

const createUser=async(data)=>{
    try{
        if(!data.userRole || data.userRole==USER_ROLE.coustomer){
             if(data.USER_STATUS && USER_STATUS!=USER_STATUS.approved){
                throw {
                    err: "We cannot set any other status for customer", 
                    code: 400
                };
             }
        }
        if(data.userRole && data.userRole != USER_ROLE.customer) {
            data.userStatus = USER_STATUS.pending;
        }
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

const getUserByEmail=async(email)=>{
    try{
        const response=await User.findOne({email:email});
        if(!user){
            throw {
                err:'No user found for corresponding email',
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if(!user) {
            throw {err: "No user found for the given id", code: 404};
        }
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={getUserByEmail,createUser,getUserById}