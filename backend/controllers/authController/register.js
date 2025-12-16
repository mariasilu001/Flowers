const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "no data" });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "no data" });
        }

        const isValideEmail = await validateEmail(email);
        if (!isValideEmail) {
            return res.status(409).json({ message: "invalid email" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "password less than 8 symbols" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await createUser(email, passwordHash);

        const token = jwt.sign(
            {
                userId: user.userId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        return res.status(201).json({
            message: "Регистрация прошла успешно",
            token: token,
            user: {
                userId: user.userId,
            },
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (email, password) => {
    const newUser = await User.create({
        email: email,
        passwordHash: password,
        roleId: 2,
    });

    return newUser;
};

const validateEmail = async (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    const isMatchRegex = emailRegex.test(email);
    if (!isMatchRegex) {
        return false;
    }

    const existingUser = await User.findOne({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        return false;
    }

    return true;
};
