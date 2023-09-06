import { json } from "express"
import jwt from 'jsonwebtoken'
import ProductModal from "../modal/Product.modal.js";
import userModal from "../modal/user.modal.js";

export const addToCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;
        const user = await userModal.findById({ _id: userId })
        user?.cart.push(productId)
        await user.save();
        return res.status(200).json({ success: true, user: user })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getCartProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;

        const user = await userModal.findById({ _id: userId })
        if (user) {
            var finalData = []
            for (var i = 0; i < user?.cart.length; i++) {
                console.log(user.cart[i]);
                const product = await ProductModal.findById(user.cart[i])
                console.log(product);
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, message: finalData })
        }
        throw new Error("Please login first")
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }

}

export const wishListProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;
        const user = await userModal.findById({ _id: userId })
        user?.wishlist.push(productId)
        await user.save();
        return res.status(200).json({ success: true, user: user })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getWishlistProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;

        const user = await userModal.findById({ _id: userId })
        if (user) {
            var finalData = []
            for (var i = 0; i < user?.wishlist.length; i++) {
                console.log(user.wishlist[i]);
                const product = await ProductModal.findById(user.wishlist[i])
                console.log(product);
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, message: finalData })
        }
        throw new Error("Please login first")
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }

}

export const removeCartProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;
        const user = await userModal.findById({ _id: userId });
        const cartProduct = user.cart;
        const removeProduct = cartProduct.indexOf(productId);
        cartProduct.splice(removeProduct, 1)
        await user.save();
        return res.status(204).json({ success: true, message: "product delete successfully" })
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export const removeWishlistProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) return res.status(404).json({ status: "error", message: "token and productid is compulsory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoder?.userId;
        const user = await userModal.findById({ _id: userId });
        const wishlistProduct = user.wishlist;
        console.log(productId, "116");
        const remainingProduct = wishlistProduct.filter((item) => item !== productId);
        // cartProduct.splice(removeProduct,1)
        user.wishlist.push(remainingProduct);
        await user.save();
        return res.status(204).json({ success: true, message: "product removed successfully" })
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }

}

export const placeOrder = async (req, res) => {
    try {
        const {userId} =  req.body;
        if (!userId) return res.json({ success: false, message: "userId is mandetory..." })
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

