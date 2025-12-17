const { ProductCategory, Price, Product } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            // Мы не пишем здесь 'where', потому что хотим ВСЕ записи из таблицы products.
            // (Кстати, удаленные не попадут сюда сами, потому что у тебя в модели стоит defaultScope с isDeleted: false)

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

                // 2. Приклеиваем КАТЕГОРИЮ
                {
                    model: ProductCategory,
                    as: "category", // Алиас из index.js (Product.belongsTo ProductCategory as 'category')
                    attributes: ["name"], // <--- ВАЖНО. Мы говорим: "Верни мне только поле 'name'". Остальное мне не нужно.
                    required: true, // INNER JOIN. Если у товара ВДРУГ нет категории (битая ссылка), мы такой товар не покажем. Но если ты уверена в данных, можно false.
                },
            ],
        });

        return res.json({
            message: "Продукты найдены успешно",
            products: products,
        });
    } catch (error) {
        next(error);
    }
};
