import express  from "express"
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp } from "../controllers/user.controllers.js";
import { allProducts } from "../controllers/Product.controllers.js";

const router = express.Router()


//All
router.post("/register", Register)
router.post("/login", Login)
router.post("/get-current-user", getCurrentUser);
router.get("/all-products", allProducts);
router.post("/get-number", getNumber);
router.post("/get-otp", sendOtp)
router.post("/verify-otp", verifyOtp)

export default router;
