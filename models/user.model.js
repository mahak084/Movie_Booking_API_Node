const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {USER_ROLE,USER_STATUS}=require('../utils/constants')

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
        enum:{value:[USER_ROLE.customer,USER_ROLE.client,USER_ROLE.admin],
            message:'Invalid user role is given'},
        default:USER_ROLE.customer
    },
    userStatus:{
        tye:String,
        required:true,
        enum:{
            values:[USER_STATUS.pending,USER_STATUS.approved,USER_STATUS.rejected],
        message:"Invalid user status given"},
        default:USER_STATUS.approved
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