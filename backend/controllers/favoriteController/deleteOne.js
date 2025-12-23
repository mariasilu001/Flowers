const { Favorite } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no data" });
        }

        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            return res.status(404).json({ message: "not found" });
        }

        if (favorite.userId != req.user.userId) {
            return res.status(409).json({ message: "forbidden" });
        }

        await favorite.destroy();

        return res.json({ message: "Запись успешо удалена" });
    } catch (error) {
        next(error);
    }
};
