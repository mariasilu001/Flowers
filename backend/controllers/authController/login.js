const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        console.log("1. Запрос пришел в логин.");

        if (!req.body) {
            console.log("2. Ошибка: нет тела запроса.");
            return res.status(400).json({ message: "no data" });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            console.log("3. Ошибка: нет почты и пароля.");
            return res.status(400).json({ message: "no data" });
        }

        console.log("4. Ищем почту в БД.");
        const user = await validateEmail(email);
        if (!user) {
            console.log("5. Почта не найдена.");
            return res.status(404).json({ message: "email not found" });
        }

        console.log("6. Проверяем пароль.");
        const isMatchPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (!isMatchPassword) {
            console.log("7. Ошибка: пароль неверный.");
            return res.status(400).json({ message: "incorrect password" });
        }

        console.log("8. Генерируем токен.");
        const token = jwt.sign(
            {
                userId: user.userId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        console.log("1. Отправляем успешный ответ.");
        return res.json({
            message: "Авторизация прошла успешно",
            token: token,
            user: {
                userId: user.userId,
            },
        });
    } catch (error) {
        next(error);
    }
};

const validateEmail = async (email) => {
    const existingUser = await User.findOne({
        where: {
            email: email,
        },
    });
    return existingUser;
};
