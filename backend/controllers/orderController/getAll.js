const {
    sequelize,
    OrderStatus,
    Order,
    OrderPosition,
    Price,
} = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.user.userId, // Находим только заказы этого пользователя
            },
            attributes: {
                include: [
                    // Добавляем вычисляемые поля к основным атрибутам заказа
                    [
                        // Подзапрос: считаем количество позиций (записей) в OrderPosition
                        sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM order_positions AS op
                    WHERE op.order_id = "Order"."order_id"
                )`),
                        "positionsCount", // Название поля в результате
                    ],
                    [
                        // Подзапрос: считаем общее количество товаров (сумма всех quantity)
                        sequelize.literal(`(
                    SELECT COALESCE(SUM(op.quantity), 0)
                    FROM order_positions AS op
                    WHERE op.order_id = "Order"."order_id"
                )`),
                        "totalItems", // Название поля в результате
                    ],
                    [
                        // Подзапрос: считаем общую стоимость заказа
                        sequelize.literal(`(
                    SELECT COALESCE(SUM(op.quantity * p.price), 0)
                    FROM order_positions AS op
                    JOIN prices AS p ON op.price_id = p.price_id
                    WHERE op.order_id = "Order"."order_id"
                )`),
                        "totalPrice", // Название поля в результате
                    ],
                ],
            },
            include: [
                {
                    model: OrderStatus, // Подтягиваем связанную модель статуса
                    as: "status", // Используем алиас из файла associations.js
                    attributes: ["statusId", "name", "description"], // Только нужные поля
                },
            ],
            raw: false, // Возвращаем объекты Sequelize (не plain objects)
        });

        return res.json({
            message: "Заказы успешно найдены",
            orders: orders,
        });
    } catch (error) {
        next(error);
    }
};
