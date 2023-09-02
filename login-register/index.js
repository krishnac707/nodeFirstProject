import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";
import routeIndex from './routes/index.js';

const app = express();
//dotenv is used to when we want to connect env to moongose
dotenv.config();
app.use(express.json());
//as per browser policy browser does not connet to server directly so give cor's error so we need to first install cor in node js and then import 
app.use(cors());
app.use(morgan("dev"));

//this is old way to send message from backend to frontend
app.get("/", (req, res) => {
    res.send("working");
})

app.use('/api/v1', routeIndex)

// const getFullToken = (req, res, next) => {
//     const fullToken = req.header.Authorization;
//     if (fullToken) {
//         const token = fullToken.split(" ")[1];
//         if (token) {
//             try {
//                 const decoededData = jwt.verify(token, process.env.JWT_SECRET,(err,res)=>{
//                     if(err){
//                         console.log(err,"erro");
//                         return "Token Expired"
//                     }
//                     return res
//                 });

//             }
//             catch (error) {
//                 return res.status(500).json({ success: false, error: error.message })
//             }
//         }
//         next()
//     }
// }

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to db..");
})

app.listen(8000, () => {
    console.log("server running on port 8000");
})