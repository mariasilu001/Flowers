const { Favorite } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const favorite = await Favorite.findAll({
            where: {
                userId: req.user.userId,
            },
        });

        return res.json({
            message: "Избранное найдено успешно",
            favoriteItems: favorite,
        });
    } catch (error) {
        next(error);
    }
};
