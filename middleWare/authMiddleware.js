const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            res.status(401)
            throw new Error("Not authorized, Please login")
        }

        // Verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(verifiedToken.id).select("-password")

        if (!user) {
            res.status(401)
            throw new Error("User not found")
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400)
        throw new Error("Internal Server Error")
    }
})

module.exports = protect