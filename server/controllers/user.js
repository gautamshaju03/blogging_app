const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Token = require("../models/token");

dotenv.config();

const signupUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { username: req.body.username, name: req.body.name, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).send({ msg: 'Signup successful' });
    } catch (error) {
        return res.status(500).send({ msg: 'Error while signing up user' });
    }
};

const loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send({ message: "Username or password does not match" });
    }
    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username
            });
        } else {
            return res.status(400).send({ message: "Username or password does not match" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error while logging in!" });
    }
}

module.exports = { signupUser, loginUser };
