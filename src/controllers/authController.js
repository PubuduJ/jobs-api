const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({ token });
}

const login = async (req, res) => {
    return res.send("Login user");
}

module.exports = {register, login};