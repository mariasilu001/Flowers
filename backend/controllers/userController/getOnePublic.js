const { User } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "no data" });
        }

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["passwordHash", "email", "phoneNumber", "roleId", "isDeleted"],
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
