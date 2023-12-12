const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, UnauthenticatedError} = require("../errors");

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({ token });
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email});
    // check user email match,
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    // check password match,
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({ token });
}

module.exports = {register, login};