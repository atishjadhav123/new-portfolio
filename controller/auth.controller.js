const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const { checkEmpty } = require("../utils/cheackEmpty")

// delte this function

exports.registerUser = asyncHandler(async (req, res) => {
    const hashpass = await bcrypt.hash(req.body.password, 10)
    await User.create({ ...req.body, password: hashpass })
    res.json({ message: "Register Success" })
})

exports.loginUser = asyncHandler(async (req, res) => {

    // check empty
    const { email, password } = req.body
    const { error, isError } = checkEmpty({ email, password })

    if (isError) {
        return res.status(401).json({ message: "All Feilds Required", error })
    }
    //verify email
    const result = await User.findOne({ email })
    console.log(result);

    if (!result) {
        return res.status(400).json({ message: "Invaild Email" })
    }

    //verify password
    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "Invaild Password" })
    }
    // create token
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    // send cookie
    res.cookie(token, "user", { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    // send response
    res.json({
        message: "user Login success", result: {
            _id: result._id,
            email: result.email,
            name: result.name
        }
    })
})


exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "Logout Success" })
})