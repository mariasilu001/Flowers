const { User } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        //console.log(req.user)
        const { userId } = req.user;
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ["passwordHash", "roleId", "isDeleted"],
            },
        });
        if (!user) {
            return res.status(404).json({ message: "not found" });
        }

        return res.json({ message: "Юзер найден успешно", user: user });
    } catch (error) {
        next(error);
    }
};
