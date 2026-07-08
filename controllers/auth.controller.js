const { STATUS } = require('../utils/constants');
const {successResponseBody,errorResponseBody}=require('../utils/responsebody');
const userService=require('../services/user.service');


const signup=async(req,res)=>{
    try{
        const response=await userService.createUser(req.body);
        successResponseBody.data=response;
        successResponseBody.message='Successfully registered user';
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        errorResponseBody.err=error;
        return resizeBy.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


module.exports={signup}