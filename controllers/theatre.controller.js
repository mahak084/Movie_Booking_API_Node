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

const destroy=async(req,res)=>{
    try{
    const response=await theatreService.deleteTheatre(req.params.id);
    successResponseBody.data=response;
    successResponseBody.message="Successfully deleted the theatre";
    return res.status(STATUS.OK).json(successResponseBody); 
    }
    catch(error){
        if(error.err){
           errorResponseBody.err=error.err;
           return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).josn(errorResponseBody);
    }
}

const getTheatre=async(req,res)=>{
    try{
        const response=await theatreService.getTheatre(req.params.id);
        successResponseBody.data=response;
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres=async(req,res)=>{
    try{
        const response=await theatreService.getAllTheatres(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the theatres";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovies=async(req,res)=>{
    try{
        const response=await theatreService.updateMoviesInTheatres(
            req.params.id,
            req,bosy.moviesIds,
            req.body.insert
        )
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated movies in the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies for the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

 module.exports={create,destroy,update,getTheatre,getTheatres,updateMovies,getMovies};