const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) {
            // Если токена нет в принципе — не авторизован.
            return res.sendStatus(401);
        }

        // Мы ПЫТАЕМСЯ проверить токен. await заставит нас дождаться результата.
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Если мы дошли сюда, значит, verify не выбросил ошибку. Токен валиден.
        const user = await findAndValidateUserById(payload.userId);

        // Если мы дошли сюда, значит, findAndValidateUserById не выбросил ошибку. Пользователь существует.
        req.user = user;
        next(); // Пропускаем дальше.
    } catch (error) {
        next(error);
    }
};

const findAndValidateUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        const error = new Error("Пользователь не найден");
        error.status = 404;
        throw error;
    }
    return user;
};
