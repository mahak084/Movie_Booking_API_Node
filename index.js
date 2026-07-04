const express = require('express');
const env=require("dotenv");
const bodyParser=require('body-parser')
const mongoose=require("mongoose")
env.config();

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT=process.env.PORT;

app.get('/home',(req,res)=>{
    return res.json({
        sucess:true
    })
})

app.listen(PORT,async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to mongo")
})