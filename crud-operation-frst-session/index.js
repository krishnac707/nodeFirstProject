import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import User from './modals/User.modal.js';

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", function (req, res) {
    res.send("working");
})

app.post("/register", async function (req, res) {
    const { name, email, number, password, confirmPassword } = req.body;
    // console.log(req.body);
    if (!name) return res.send("Name is required");
    if (!email) return res.send("Email is required");
    if (!number) return res.send("Number is required");
    if (!password) return res.send("Password is required");
    if (!confirmPassword) return res.send("confirm Password is required");
    if (password !== confirmPassword) return res.send("Password is not matched..");

    const user = new User({
        name: name,
        email,
        number: parseInt(number),
        password
    })
    await user.save();
    res.send("Registration Done");
})

app.get("/find", async (req, res) => {
    const { number } = req.body;
    if (!number) return res.send("number is required");
    const finduser = await User.find({ number: number }).select("-password")
    if (finduser.length) {
        return res.send(finduser[0])
    }
    return res.send("User not found")

    // const user = await User.find({ email: email })
    // return [{}]
    // const user = await User.findById(swaraj)
    // return {}
    // const user = await User.findOne({name : "Swaraj"})
    // return {}
})

app.patch("/update/:id", async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    if (!email) return res.send("Email is required");
    if (!id) return res.send("id is required");
    const updateUser = await User.findByIdAndUpdate(id, { email }, { new: true }).select("-password");
    return res.json({ message: "data upated", data: updateUser })
})

app.put('/put/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) return res.send("name is required");
    if (!id) return res.send("id is required");
    const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true }).select("-password")
    return res.json({ message: "data updated", data: updatedUser })

})

app.delete("/delete", async (req, res) => {
    const { id } = req.query;
    if (!id) return res.send("id is required");
    const deleteUser = await User.findByIdAndDelete(id);
    return res.json({ message: "Data Deleted", data: deleteUser })
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to db...");
})

app.listen(8000, () => {
    console.log("server running at port 8000")
})

// const {state} = useContext(AuthContext);


// const response = await axios.post("/register", { name, surname, age })
// const { name, surname, age } = req.body

// const response = await axios.post('/regiter/${state.user._id}') - frontend

// app.post('/regiter/:id')
// const { id } = req.params

// req.query
// const url = `/regiter/?name=${name}&surname=jadhav`
// const response = await axios.post(url)\

// const { name,surname } = req.params