const { Order, OrderPosition, Price, OrderStatus, PaymentMethod, Product } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no data" });
        }

        const order = await Order.findOne({
            where: { orderId: id }, // Указываем ID нужного заказа
            include: [
                {
                    model: OrderStatus,
                    as: "status", // Используем алиас из associations.js
                },
                {
                    model: PaymentMethod,
                    as: "paymentMethod", // Метод оплаты
                },
                {
                    model: OrderPosition,
                    as: "positions", // Массив позиций заказа
                    include: [
                        {
                            model: Product,
                            as: "product", // Информация о продукте
                        },
                        {
                            model: Price,
                            as: "price", // Информация о цене
                        },
                    ],
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: "нет такого иди дальше" });
        }

        return res.json({
            message: "Инфо о заказе найдена успешно",
            order: order,
        });
    } catch (error) {
        next(error);
    }
};
