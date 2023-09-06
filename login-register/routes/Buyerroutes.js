import express from "express";
import { addToCart, getCartProduct, getWishlistProduct, removeCartProduct, removeWishlistProduct, wishListProduct } from "../controllers/Buyer.controllers.js";
import { addCart, allCartProducts, getSingleProductData } from "../controllers/Product.controllers.js";

const router = express.Router()
//Buyer
router.post("/add-to-cart", addToCart);
router.get("/get-cart-product", getCartProduct);
router.post("/wishlist-product", wishListProduct);
router.get("/get-wishlist-product", getWishlistProduct);
router.delete("/delete-cart-product", removeCartProduct);
router.delete("/remove-wishlist-product", removeWishlistProduct)
router.post("/get-single-product-data",getSingleProductData)
router.post('/add-cart', addCart)
router.post('/all-cart-products', allCartProducts)

export default router;