const { Op } = require("sequelize");
const {
    Order,
    CartProduct,
    sequelize,
    OrderPosition,
    Product,
    Price,
} = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { user } = req;
        const { paymentMethodId } = req.body;

        const result = await sequelize.transaction(async (t) => {
            const cartItems = await CartProduct.findAll(
                {
                    where: {
                        userId: user.userId,
                    },
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: ["productId"],
                            include: [
                                {
                                    model: Price,
                                    as: "prices", // Алиас из index.js (Product.hasMany Price as 'prices')
                                    separate: true,
                                    required: false,
                                    attributes: ["priceId"], // LEFT JOIN. Если цены нет — продукт все равно покажем. Не смей ставить true, иначе товары без цены исчезнут.
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
                },
                { transaction: t }
            );

            if (cartItems.length <= 0) {
                throw new Error("В корзине нет товаров");
            }

            const newOrder = await Order.create(
                {
                    userId: user.userId,
                    statusId: 1,
                    paymentMethodId: paymentMethodId,
                    createdAt: new Date(),
                },
                { transaction: t }
            );

            const orderPositionsArr = cartItems.map((cartItem) => {
                // ДОБАВЛЕНА проверка на наличие цены
                const actualPrice = cartItem.product.prices[0];

                if (!actualPrice) {
                    throw new Error(
                        `Нет актуальной цены для товара ${cartItem.product.productId}`
                    );
                }

                return {
                    productId: cartItem.productId,
                    orderId: newOrder.orderId,
                    quantity: cartItem.quantity,
                    priceId: actualPrice.priceId,
                };
            });

            const newOrderPositions = await OrderPosition.bulkCreate(
                orderPositionsArr,
                { transaction: t }
            );

            await CartProduct.destroy(
                {
                    where: {
                        userId: user.userId,
                    },
                },
                { transaction: t }
            );

            return { order: newOrder, positions: newOrderPositions };
        });

        return res.json({
            message: "Заказ успешно оформлен, корзина очищена",
            order: result.order,
            orderPositions: result.positions,
        });
    } catch (error) {
        next(error);
    }
};
