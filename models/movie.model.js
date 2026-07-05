const mongoose=require("mongoose");

//define the schema of movie resourse to be stored in db

const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        typr:String,
        required:true
    },
    casts:{
        type:[String],
        required:true
    },
    trailerUrl:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        default:"English"
    },
    releasedDate:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    releasedStatus:{
        type:String,
        required:true,
        default:"RELEASED"
    },
    
},{timestamps:true})

const Movie=mongoose.model('Movie',movieSchema)

module.exports=Movie;