import express from "express";
import { checkSeller, isUserPresent } from "../Middlewares/All.Middlewares.js";
import { addComment, addProduct, addRatings, deleteProduct, getYourProduct, updateProduct } from "../controllers/Product.controllers.js";

const router = express.Router();

//seller
router.post("/add-products", checkSeller, addProduct);
router.post("/your-product", checkSeller, getYourProduct);
router.patch("/udpate-your-products", checkSeller, updateProduct);
router.delete("/delete-product", checkSeller, deleteProduct);
router.patch("/add-rating", isUserPresent, addRatings);
router.patch("/add-comment", isUserPresent, addComment);

export default router