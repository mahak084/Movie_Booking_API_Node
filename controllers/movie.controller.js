const Movie=require('../models/movie.model')
const movieService=require('../services/movies.service')
const {successResponseBody,errorResponseBody}=require('../utils/responsebody')
const {STATUS}=require('../utils/constants');

/** 
 * @param {*} req {name,des ...}
 * @param {*} res 
 * @returns movie created
 */


const createMovie=async(req,res)=>{
     try{
        const movie=await movieService.createMovie(req.body);
        successResponseBody.data=movie;
        successResponseBody.message = "Successfully created the movie";
        return res.status(STATUS.CREATED).json(successResponseBody)
     }catch(error){
           if(error.err){
              errorResponseBody.err=error.err;
              return res.status(error.code).json(errorResponseBody);
           }
           errorResponseBody.err = error;
           console.log(err);
           return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
     }
}

const deleteMovie=async(req,res)=>{
    try{
        const movieId=req.params.id;
        const movie=await movieService.deleteMovie(movieId);
        successResponseBody.data=movie;
        successResponseBody.message = "Successfully deleted the movie";
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovie=async(req,res)=>{
    try{
        const response=await movieService.getMovieById(req.params.id);
        successresponseBody.data=response;
        return res.status(STATUS.OK).json(successresponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovie=async(req,res)=>{
    try{
        const response=await movieService.updateMovie(req.params.id,req.body);
        
        successResponseBody.data=movie;
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=response.err;
            errorResponseBody.message="Updates we are trying to apply doesn't validate the schema";
            return res.status(response.code).json(errorResponseBody);
        }
        errorResponseBody.err=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies=async(req,res)=>{
    try{
        const response=await movieService.fetchMovies(req.query);
        successResponseBody.data=response;
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



module.exports={createMovie,deleteMovie,getMovie,updateMovie,getMovies};