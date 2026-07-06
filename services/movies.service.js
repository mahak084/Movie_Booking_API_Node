const Movie=require('../models/movie.model');
const {STATUS}=require('../utils/constants')

const getMovieById=async(id)=>{
    const movie=await Movie.findById(id);
    if(!movie){
            throw{
            err:"No movie found for corressponding movie",
            code:404}
    }
    return movie;
}

const createMovie=async(data)=>{
    try{
        const movie=Movie.create(data);
        return movie;
    }catch(error){
       if(error.name=='ValidationError'){
        let err={};
        Object.keys(error.errors).forEach((key)=>{
            err[key]=error.errors[key].message;
        })
        throw{err:err,code:STATUS.UNPROCESSABLE_ENTITY};
       }else{
        throw error;
       }
    }
}

const deleteMovie=async(id)=>{
    try{
    const deletedMovie=await Movie.findByIdAndDelete(id)
    if(!deletedMovie){
        throw{
            err:"No movie found for corressponding movie",
            code:404}
        }
    return deletedMovie;
}catch(error){
    throw error;
}
}

const updateMovie=async(id,data)=>{
    try{const movie=await Movie.findByIdAndUpdate(id,data,{new:true,runValidators:true});
    return movie;
}
    catch(error){
        if(error.name=='ValidatorError'){
            let err={};
            Object.keys(errors.error).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            return {err:err,code:STATUS.UNPROCESSABLE_ENTITY};
        }else{
        throw error;
    }
    }
}

const fetchMovies=async(filter)=>{
    let query={};
    if(filter.name){
        query.name=filter.name;
    }
    let movies=await Movies.find(query);
    if(!movies){
        return {
            err:'Not able to find the queries movies',
            cade:STATUS.NOT_FOUND
        }
    }return movies
}

module.exports={getMovieById,createMovie,deleteMovie,fetchMovies}