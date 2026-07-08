const mongoose=require('mongoose');
const Movie=require('../models/movie.model');

const theatreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5
    },
    description: String,
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:String,
    movies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Movie'
    }
},{timeseries:true})

const Theatre=mongoose.model('Theatre',theatreSchema);

module.exports=Theatre;