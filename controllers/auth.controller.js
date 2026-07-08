const jwt=require('jsonwebtoken');

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
        if(error.err){
            errorResponseBody.err=error.err;
            return response.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err=error;
        return response.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const signin=async(req,res)=>{
    try{
        const user=await userService.getUserByEmail(req.body.email);
        const isValidPassword=await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {err:'invalid password for given email',
                code:STATUS.FORBIDDEN
            }
        }
        const token=jwt.sign({id:user.id, email:user.email},
            process.env.AUTH_KEY,
            {expiresIn:'1h'}
        );
        successResponseBody.message='Successfully logged in';
        successResponseBody.data={
            email:user.email,
            role:user.userRole,
            status:user.userStatus,
            token:token
        }
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


module.exports={signup,signin}