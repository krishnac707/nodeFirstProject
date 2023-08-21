import jwt from 'jsonwebtoken';
import userModal from '../modal/user.modal.js';
import ProductModal from '../modal/Product.modal.js';

export const getAllBuyers = async (req, res) => {
    try {
        const user = await userModal.find({ role: "Buyer" })
        if (user) {
            return res.status(200).json({ success: true, message: "All Buyers", noOfBuyers: user.length, user: user })
        }
        throw new Error("No Buyer Found")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllSellers = async (req, res) => {
    try {
        const user = await userModal.find({ role: "Seller" })
        if (user) {
            return res.status(200).json({ success: true, message: "All Sellers", noOfSellers: user.length, user: user })
        }
        throw new Error("No Seller Found")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const product = await ProductModal.find({})
        if (product.length) return res.status(200).json({ success: true, noOfProducts: product.length, product: product })
        throw new Error("No Seller Found")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModal.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
        if (user) {
            return res.status(200).json({ success: true, message: "User Blocked Successfully", user: user })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const unBlockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModal.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
        if (user) {
            return res.status(200).json({ success: true, message: "User unBlocked Successfully", user: user })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const blockProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { isProductBlocked: true }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Product Blocked Successfully", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const UnBlockProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { isProductBlocked: false }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Product unBlocked Successfully", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const verifiedProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { isVerified: true }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Product Verified Successfully", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const unVerifiedProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { isVerified: false }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Product unVerified", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}