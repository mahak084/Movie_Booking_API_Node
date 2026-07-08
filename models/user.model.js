const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
        lowercase:true,
        trim:true
    },
    password:{
        tye:String,
        required:true,
        minLength:6
    },
    userRole:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        tye:String,
        required:true,
        default:"APPROVED"
    }
},{timestamps:true})

//triggers pre before new user save
userSchema.pre('save',async function(next){
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    next();
})



const User=mongoose.model('User',userSchema);
module.exports=User;