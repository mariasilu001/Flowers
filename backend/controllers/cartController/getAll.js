const { CartProduct, Product, Price } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const cartItems = await CartProduct.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Product,
                    as: "product",
                    required: true,
                    include: [
                        // 1. Приклеиваем ЦЕНЫ (как мы уже учили)
                        {
                            model: Price,
                            as: "prices", // Алиас из index.js (Product.hasMany Price as 'prices')
                            required: false, // LEFT JOIN. Если цены нет — продукт все равно покажем. Не смей ставить true, иначе товары без цены исчезнут.
                            where: {
                                // Условие актуальности цены
                                startDate: { [Op.lte]: new Date() }, // Началась раньше или сейчас
                                endDate: {
                                    [Op.or]: [
                                        { [Op.gte]: new Date() }, // Закончится в будущем
                                        { [Op.is]: null }, // Или никогда не закончится
                                    ],
                                },
                            },
                            limit: 1, // Нам нужна только ОДНА цена
                            order: [["startDate", "DESC"]], // Самая свежая из актуальных
                        },
                    ],
                },
            ],
        });

        return res.json({
            message: "товары в корзине найдены успешно",
            cartItems: cartItems,
        });
    } catch (error) {
        next(error);
    }
};
