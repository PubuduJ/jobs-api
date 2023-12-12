const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required:[true, "Please provide a email"],
        minLength: 3,
        maxLength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6
    }
})

// mongoose middleware to hash the password before saving the register user.
// use function keyword instead of arrow function, to always point `this` to the document.
UserSchema.pre("save", async function() {
    // salt is random bytes, 10 random bytes will get here.
    const salt = await bcrypt.genSalt(10);
    // this, is pointed to the document.
    this.password = await bcrypt.hash(this.password, salt);
})

// schema instance method to create JWT.
UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

module.exports = mongoose.model("User", UserSchema);