import userModal from '../modal/user.modal.js';
import ProductModal from './../modal/Product.modal.js'
import jwt from 'jsonwebtoken';

export const addProduct = async (req, res) => {
    try {
        const { name, size, price, category, image } = req.body.productData;
        const {token} = req.body;
        if (!name || !size || !price || !category || !image || !token) return res.status(404).json({ success:false, message: "All feilds are mandetory" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) {
            return res.status(404).json({ success:false, message: "Token not valid." })
        }
        const userId = decoder.userId
        const product = new ProductModal({
            name, size, price, category, image, userId: userId
        })
        await product.save();
        return res.status(201).json({ success:true, message: "Product added successfully" })
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const allProducts = async (req, res) => {
    try {
        const allProduct = await ProductModal.find({ isProductBlocked: false, isVerified: true })
        // console.log(allProduct.length, "27");
        if (allProduct.length) {
            return res.status(200).json({ success:true, product: allProduct,noOfProduct:allProduct.length })
        }
        return res.status(404).json({ success:false, message: "No products found" })
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const getYourProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success:false, message: "token not found" });
        const userId = decoder?.userId
        const yourProduct = await ProductModal.find({ userId: userId })
        if (yourProduct.length) {
            return res.status(200).json({ success:true, products: yourProduct })
        }
        return res.status(404).json({ success:false, message: "No product found" });
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { productId, name, size, price, category, image, token } = req.body;
        if (!token) return res.status(404).json({ success:false, message: "token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success:false, message: "token not found" });
        const userId = decoder.userId
        const updateproduct = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, size, price, category, image }, { new: true })
        if (updateproduct) {
            return res.status(200).json({ success:true, product: updateproduct })
        }

        return res.status(404).json({ success:false, message: "You are not a valid user to update Product" });
    }
    catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!productId) return res.status(404).json({ success:false, message: "Product id is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder) return res.status(404).json({ success:false, message: "token not found" });
        const userId = decoder?.userId
        const isDelete = await ProductModal.findOneAndDelete({ _id: productId, userId: userId })
        if (isDelete) {
            return res.status(200).json({ success: true, message: "Product Deleted Successfully" })
        }
        throw new Error("MongoDb Error");
    } catch (error) {
        return res.status(500).json({ success:false, error: error.message })
    }
}

export const addRatings = async (req, res) => {
    try {
        const { productId, rating } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { $push: { ratings: rating } }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Thanks for rating", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { productId, name, comment } = req.body;
        const product = await ProductModal.findByIdAndUpdate(productId, { $push: { comments: { "name": name, "comment": comment } } }, { new: true })
        if (product) {
            return res.status(200).json({ success: true, message: "Thanks for rating", product: product })
        }
        throw new Error("Something went Wrong")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getSingleProductData = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(404).json({ success: false, message: "Product id is mandtory.." })

        const product = await ProductModal.findById(productId);
        if (product) {
            return res.status(200).json({ success: true, product })
        }
        return res.status(404).json({ success: false, error: "Products details not found." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        console.log(userId,"139");
        if (!productId) return res.status(404).json({ success: false, message: "Product id is mandtory.." })
        if (!userId) return res.status(404).json({ success: false, message: " user Id is mandtory.." })

        const user = await userModal.findByIdAndUpdate(userId, { $push: { cart: productId } })
        console.log(user,"user");
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })

        return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const allCartProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(404).json({ success: false, message: "User id is mandtory.." })

        const user = await userModal.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })
        var finalData = [];
        var array = user?.cart;
        for (var i = 0; i < array?.length; i++) {
            const productData = await ProductModal.findById(array[i])
            if (productData) {
                finalData.push(productData)
            }
        }
        return res.status(200).json({ success: true, cartProducts: finalData })

    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ success: false, error: error.message })
    }
}