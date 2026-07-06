const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};


const STATUS=require('../utils/constants')

const validateMovieCreateRequest=async(req,res,next)=>{

    // validate the movie name
    if(!req.body.name){
        badRequestResponse.err='the name of movie is not present in request';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie description
    if(!req.body.description){
        badRequestResponse.err='The description of the movie is not present in the request';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    
    // validate the cast of the movie
    if(!req.body.cast || !(req.body.casts instanceof Array) || req.body.casts.length<=0){
       badRequestResponse.err='The description of the movie is not present in the request';
       return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie trailer url
    if(!req.body.trailerUrl) {
        badRequestResponse.err = "The trailerUrl of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the release date of the movie
    if(!req.body.releaseDate) {
        badRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate director of the movie
    if(!req.body.director) {
        badRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    next();

}



module.exports={
validateMovieCreateRequest

}