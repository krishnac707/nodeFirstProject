import express from "express";
import { addToCart, getCartProduct, getWishlistProduct, removeCartProduct, removeWishlistProduct, wishListProduct } from "../controllers/Buyer.controllers.js";

const router = express.Router()
//Buyer
router.post("/add-to-cart", addToCart);
router.get("/get-cart-product", getCartProduct);
router.post("/wishlist-product", wishListProduct);
router.get("/get-wishlist-product", getWishlistProduct);
router.delete("/delete-cart-product", removeCartProduct);
router.delete("/remove-wishlist-product", removeWishlistProduct)

export default router;