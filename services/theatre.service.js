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
        let query={};
        if(data && data.pin){
            query.pin=data.pin;
        }
        if(data && data.name){
            query.name=data.name;
        }
        if(data && data.city){
            query.city=data.city;
        }
        if(data && data.movieId){
            query.movies={$all:data.movieId};
        }
        const response=await Theatre.find(query);
        return response;
    }
    catch(err){
         throw error
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

const updateMoviesInTheatres=async(theatreId, movieIds ,insert)=>{
    try{
          const theatre=await theatre.findById(theatreId);
            if(!theatre){
                return {
                    err:'No such theatre found for provided id',
                    code:404
                }
            }
        if(insert){
            //we need to add movies
            moviesIds.forEach(movieId=>{
                theatre.movies.push(movieId);
            })
            
        }else{
            //remove movie
            let savedMovieIds=theatre.movies;
            movieIds.forEach(movieId=>{
                savedMovieIds=savedMovieIds.filter(smi=>smi==movieId);
            });
            theatre.movies=savedMovieIds;

        }
        await theatre.save();
        return theatre.populate('movies');
    }
    catch(error){
        throw error
    }
}

module.exports={
    createTheatre,deleteTheatre,getTheatre,updateTheatre,getAllTheatres,updateMoviesInTheatres
}