import userModal from "../modal/user.modal.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendTwilioMessage } from "../helpers/Sms.js";

export const Register = async (req, res) => {
    try {
        // const { userData } = req.body;
        // console.log(userData, "userdata");
        const { name, email, password, role, number } = req.body.userData;
        if (!name || !email || !password || !role || !number) return res.json({ success: false, message: "All fields are mandetory..." })

        const isEmailExist = await userModal.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ success: false, message: "Email already Exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModal({ name, email, password: hashPassword, role, number });
        await user.save();

        return res.json({ success: true, message: "Registration Successful" })
    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const Login = async (req, res) => {
    try {
        // const {userData} = req.body;
        // console.log(userData,"32");
        const { email, password } = req.body.userData;
        if (!email || !password) return res.json({ success: false, message: "please fill all details" })
        const user = await userModal.findOne({ email:email });
        // console.log(user,"38");
        if (!user) return res.json({ success: false, message: "User not found" })
        if (user.isBlocked) return res.status(404).json({ success: false, message: "Your account is  blocked by admin please contact with us to login" })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            const userobj = {
                name: user.name,
                email: user.email,
                userId: user._id,
                role: user.role
            }

            // const expireTime = user?.role == "Seller" ? "1D" : "7D";

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, message: "Login Successful", user: userobj, token: token })
        }
        return res.json({ success: false, message: "please check email or password" })

    }
    catch (error) {

    }
}

export const getCurrentUser = async (req, res) => {
    try {

        const {token} = req.body.token;
        console.log(token,"66");
        if (!token) return res.status(404).json({ success: false, message: "token is required" })
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoder) return res.status(404).json({ success: false, message: "Not a valid token" })

        const userid = decoder?.userId
        const user = await userModal.findById(userid)
        if (!user) return res.status(404).json({ success: false, message: "User not found" })
        const userObj = {
            name: user?.name,
            email: user?.email,
            _id: user?._id,
            role: user?.role
        }
        return res.status(200).json({ success: true, user: userObj })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getNumber = async (req, res) => {

    try {
        const { userId } = req.body.userId;
        if (!userId) return res.json({ success: false, message: "userId is mandetory..." })
        const userNumber = await userModal.findById(userId).select("number isNumberVerified");
        if (userNumber) {
            return res.json({ success: true, number: userNumber.number, isVerified: userNumber.isNumberVerified })
        }
        return res.json({ success: false, message: "internal server error please try again...." })

    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.json({ success: false, message: "userId is mandetory..." })
        const userNumber = await userModal.findById(userId);
        const otp = "789456";
        const message = `Hi, Your verification code from fake shopping store is ${otp}`
        if (userNumber) {
            const responseFromTwilio = sendTwilioMessage(userNumber.number, message)
            if (responseFromTwilio) {
                userNumber.otpVerificationCode = otp;
                await userNumber.save();
                return res.json({ success: true, message: "Otp sent successfully to register mobile number" });
            }
        }
        return res.json({ success: false, message: "internal server error please try again...." })

    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const { otpFromFrontend } = req.body;
        console.log(otpFromFrontend, "128");
        console.log(userId, "129");
        if (!userId) return res.json({ success: false, message: "userId is mandetory..." })
        if (!otpFromFrontend) return res.json({ success: false, message: "Otp is mandetory..." })

        const currentUser = await userModal.findById(userId)
        if (currentUser) {
            if (currentUser.otpVerificationCode == otpFromFrontend) {
                const user = await userModal.findByIdAndUpdate(userId, { isNumberVerified: true }, { new: true });
                await user.save();
                return res.json({ success: true, message: "Otp verification successfull" });
            }
        }

        return res.json({ success: false, message: "internal server error please try again...." })

    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}