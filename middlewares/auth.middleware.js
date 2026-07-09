const jwt=require('jsonwebtoken');

const {STATUS}=require('../utils/constants');
const {errorResponseBody}=require('../utils/responsebody');
const userService=require('../services/user.service')

const validateSignupRequest = async (req, res, next) => {
    // validate name of the user
    if(!req.body.name) {
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate email of the user
    if(!req.body.email) {
        errorResponseBody.err = "Email of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate password present of the user
    if(!req.body.password) {
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // request is valid
    next();
}

const validateSigninRequest=async(req,res,next)=>{
    if(!req.body.email){
        errorResponseBody.err = "Email of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

const isAuthenticated=async(req,res,next)=>{
    try{
    const token=req.headers["x-access-token"];
    if(!token){
        errorResponseBody.err='no token provided'
        return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
    }
    const response=jwt.verify(token,process.env.AUTH_KEY);
    if(!response){
        errorResponseBody.err='Token not verify';
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    const user=await userService.getUserById(response.id);
    req.user = user.id;
    next();
    }
    catch(error){
        if(error.name == "JsonWebTokenError") {
            errorResponseBody.err = error.message;
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
        }
        
        if(error.code == STATUS.NOT_FOUND) {
            errorResponseBody.err = "User doesn't exist"
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
   
    }   
}

module.exports={validateSignupRequest,validateSigninRequest,isAuthenticated};