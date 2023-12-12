const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
    // check the header.
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];

    try {
        const paylaod = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes.
        req.user = {userId:paylaod.userId, name:paylaod.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
}

module.exports = authenticationMiddleware;