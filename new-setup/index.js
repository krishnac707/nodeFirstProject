import express from 'express';
import mongoose from 'mongoose';
import { Login, Register } from './controllers/User.controller.js';

const app = express();

app.get('/login',Login)

app.get('/register',Register)

// app.get('/login',function(req,res){
//     res.send("login success")
// })

mongoose.connect("mongodb+srv://krishna:krishna123@cluster0.dyuvw6k.mongodb.net/AWDIZ").then(()=>{
    console.log("Connected to DB");
}).catch((error)=>{
    console.log("something went wrong",error);
})

app.listen(8000,()=>{
    console.log("server running on 8000 port")
})