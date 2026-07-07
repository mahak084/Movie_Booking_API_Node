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
        let pagination={};
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
        if(data && data.limit){
            pagination.limit=data.limit;
        }
        if(data && data.skip){
            let perpage=(data.limit)?data.limit:3;
            pagination.skip=data.skip*perpage;
        }
        const response=await Theatre.find(query,{},pagination);
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
          let theatre;
        if(insert){
            //we need to add movies
            theatre=await Theatre.findByIdAndUpdate({
                _id:theatreId}
            ,{$addToSet:{movies:{$each:movieIds}}},
            {new:true}
        )
            
        }else{
            //remove movie
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}},
                {new: true}
            );

        }
        
        return theatre.populate('movies');
    }
    catch(error){
        if(error.name == 'TypeError') {
            throw {
                code: STATUS.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}

const getMoviesInATheatre=async(id)=>{
    try{
        const theatre=await Theatre.findById(id).populate('movies');
        if(!theatre){
            throw {
                err:'No theatre found with given id',
                code:STATUS.NOT_FOUND
            }
        }
        return theatre
    }
    catch(error){
         console.log(error);
         throw error;
    }

}

module.exports={
    createTheatre,deleteTheatre,getTheatre,updateTheatre,getAllTheatres,updateMoviesInTheatres,
    getMoviesInATheatre
}