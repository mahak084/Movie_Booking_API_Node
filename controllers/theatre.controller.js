const theatreService=require("../services/theatre.service");
const { STATUS } = require("../utils/constants");
const {successResponseBody,errorResponseBody}=require('../utils/responsebody')

const create=async(req,res)=>{
    try{
        const response=await theatreService.createTheatre(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the theatre"
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);      
    }
}