import express from 'express';

const app = express();

app.get("/",function(req,res){
    res.send("welcome to backend")
})

app.get("/login",function(req,res){
    res.send("Login Backend")
})

app.get("/register",function(req,res){
    res.send("Register Backend")
})

app.listen(8000,()=>{
    console.log("server starting at 8000 port");
})