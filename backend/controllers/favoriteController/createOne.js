const { Favorite } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "no data" });
        }

        const existingItem = await Favorite.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        });

        if (existingItem) {
            return res.json({ message: "Ты и так его любишь" });
        }

        const newItem = await Favorite.create({
            userId: userId,
            productId: productId,
        });

        return res.json({
            message: "Теперь ты его любишь",
            favoriteItem: newItem,
        });
    } catch (error) {
        next(error);
    }
};
