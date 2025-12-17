const { ProductCategory, Price, Product } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
    try {
        console.log("1. Запрос пришел в getProducts");

        console.log("2. Достаем ID");
        const { id } = req.params;
        if (!id) {
            console.log("Ошибка: ID нету");
            return res.status(400).json({ message: "no data" });
        }

        console.log("3. Ищем категорию");
        const category = await ProductCategory.findByPk(id);
        if (!category) {
            console.log("Ошибка: Категория не найдена");
            return res
                .status(404)
                .json({ message: `category with id = ${id} not found` });
        }

        console.log("4. Ищем продукты");
        const products = await Product.findAll({
            where: {
                categoryId: id, // Фильтруем по ID категории
                // isDeleted: false // Это уже есть в defaultScope модели, но я напоминаю
            },
            include: [
                {
                    model: Price, // Подключаем модель цен
                    as: "prices", // <--- ВАЖНО: используем алиас "prices", как в index.js
                    required: false, // LEFT JOIN: если цены нет, продукт все равно вернется
                    where: {
                        // Здесь магия: мы берем цену, которая действует СЕЙЧАС
                        startDate: {
                            [Op.lte]: new Date(), // Дата начала меньше или равна текущей
                        },
                        endDate: {
                            [Op.or]: [
                                { [Op.gte]: new Date() }, // Дата конца больше или равна текущей
                                { [Op.is]: null }, // ИЛИ дата конца вообще не указана (бессрочно)
                            ],
                        },
                    },
                    // Сортируем, чтобы если вдруг попало две цены (косяк базы), взялась последняя по дате начала
                    order: [["startDate", "DESC"]],
                    limit: 1, // Нам нужна только ОДНА актуальная цена, а не вся история
                },
            ],
        });

        console.log("5. Отправляем успешный ответ.");
        return res.json({
            message: "Продукты категории успешно найдены",
            category: category,
            products: products,
        });
    } catch (error) {
        next(error);
    }
};
