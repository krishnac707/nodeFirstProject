import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp } from './controllers/user.controllers.js';
import { addComment, addProduct, addRatings, allProducts, deleteProduct, getYourProduct, updateProduct } from "./controllers/Product.controllers.js";
import { checkSeller, isAdmin, isUserPresent } from "./Middlewares/All.Middlewares.js";
import { addToCart, getCartProduct, getWishlistProduct, removeCartProduct, removeWishlistProduct, wishListProduct } from "./controllers/Buyer.controllers.js";
import { UnBlockProduct, blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, unBlockUser, unVerifiedProduct, verifiedProduct } from "./controllers/Admin.controllers.js";

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

//All
app.post("/register", Register)
app.post("/login", Login)
app.post("/get-current-user", getCurrentUser);
app.get("/all-products", allProducts);
app.post("/get-number", getNumber);
app.post("/get-otp", sendOtp)
app.post("/verify-otp", verifyOtp)

//Buyer
app.post("/add-to-cart", addToCart);
app.get("/get-cart-product", getCartProduct);
app.post("/wishlist-product", wishListProduct);
app.get("/get-wishlist-product", getWishlistProduct);
app.delete("/delete-cart-product", removeCartProduct);
app.delete("/remove-wishlist-product", removeWishlistProduct)

//seller
app.post("/add-products", checkSeller, addProduct);
app.post("/your-product", checkSeller, getYourProduct);
app.patch("/udpate-your-products", checkSeller, updateProduct);
app.delete("/delete-product", checkSeller, deleteProduct);
app.patch("/add-rating", isUserPresent, addRatings);
app.patch("/add-comment", isUserPresent, addComment);

//admin
app.get("/get-all-buyers", isAdmin, getAllBuyers);
app.get("/get-all-sellers", isAdmin, getAllSellers);
app.get("/get-all-products", isAdmin, getAllProducts);
app.patch("/block-user", isAdmin, blockUser);
app.patch("/un-block-user", isAdmin, unBlockUser);
app.patch("/block-product", isAdmin, blockProduct);
app.patch("/un-block-product", isAdmin, UnBlockProduct);
app.patch("/verified-product", isAdmin, verifiedProduct);
app.patch("/un-verified-product", isAdmin, unVerifiedProduct);


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to db..");
})

app.listen(8000, () => {
    console.log("server running on port 8000");
})