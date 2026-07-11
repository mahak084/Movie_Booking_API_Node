const express = require('express');
const env=require("dotenv");
const bodyParser=require('body-parser')
const mongoose=require("mongoose")

const MovieRoutes=require('./routes/movie.routes');
const TheatreRoutes=require('./routes/theatre.route');
const AuthRoutes=require('./routes/auth.routes');
const UserRoutes=require('./routes/user.routes');
const BookingRoutes=require('./routes/booking.routes');
const ShowRoutes=require('./routes/show.routes');
env.config();


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

MovieRoutes(app);
TheatreRoutes(app);
AuthRoutes(app);
UserRoutes(app);
BookingRoutes(app);
ShowRoutes(app);


const PORT=process.env.PORT;


app.listen(PORT,async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to mongo")
})