import express from "express";
import { checkSeller, isUserPresent } from "../Middlewares/All.Middlewares.js";
import { addComment, addProduct, addRatings, deleteProduct, getYourProduct, updateProduct } from "../controllers/Product.controllers.js";

const router = express.Router();

//seller
app.post("/add-products", checkSeller, addProduct);
app.post("/your-product", checkSeller, getYourProduct);
app.patch("/udpate-your-products", checkSeller, updateProduct);
app.delete("/delete-product", checkSeller, deleteProduct);
app.patch("/add-rating", isUserPresent, addRatings);
app.patch("/add-comment", isUserPresent, addComment);

export default router