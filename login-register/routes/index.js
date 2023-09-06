import express from "express"
import allRoutes from "./Allroutes.js";
import buyerRoutes from "./Buyerroutes.js"
import adminRoutes from "./Adminroutes.js"
import sellerRoutes from "./Sellerroutes.js"

const router = express.Router()

router.use("/all",allRoutes);
router.use("/buyer",buyerRoutes)
router.use("/admin",adminRoutes)
router.use("/seller",sellerRoutes)

export default router;