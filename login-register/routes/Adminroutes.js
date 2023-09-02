import express from "express";
import { UnBlockProduct, blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, unBlockUser, unVerifiedProduct, verifiedProduct } from "../controllers/Admin.controllers.js";
import { isAdmin } from "../Middlewares/All.Middlewares.js";

const router = express.Router();

//admin
router.get("/get-all-buyers", isAdmin, getAllBuyers);
router.get("/get-all-sellers", isAdmin, getAllSellers);
router.get("/get-all-products", isAdmin, getAllProducts);
router.patch("/block-user", isAdmin, blockUser);
router.patch("/un-block-user", isAdmin, unBlockUser);
router.patch("/block-product", isAdmin, blockProduct);
router.patch("/un-block-product", isAdmin, UnBlockProduct);
router.patch("/verified-product", isAdmin, verifiedProduct);
router.patch("/un-verified-product", isAdmin, unVerifiedProduct);

export default router