import jwt from "jsonwebtoken";
import userModal from "../modal/user.modal.js";

export const checkSeller = async (req, res, next) => {
    try {

        const { token } = req.body;
        if (!token) return res.status(404).json({ success:false, message: "Token is mandetory" });
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) return res.status(404).json({ success:false, message: "Not a valid Token" });
        const userid = decoder?.userId;
        const user = await userModal.findById(userid)
        if (!user || user?.role != "Seller") return res.status(404).json({ success:false, message: "Not a valid user to add Product" })
        next()

    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) return res.status(404).json({ success: false, message: "Not a valid Token" });
        const userId = decoder?.userId
        const user = await userModal.findById(userId)
        if (!user || user?.role != "Admin") return res.status(404).json({ success: false, message: "Only admin have access to see all users" });
        next();
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const isUserPresent = async (req,res,next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) return res.status(404).json({ success: false, message: "Not a valid Token" });
        const userId = decoder?.userId
        const user = await userModal.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User is not present" });
        next();
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}