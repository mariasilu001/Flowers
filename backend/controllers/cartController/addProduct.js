const { CartProduct, Product } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "no data" });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res
                .status(404)
                .json({ message: `product with id = ${productId} not found` });
        }

        const existingCartItem = await CartProduct.findOne({
            where: {
                userId: req.user.userId,
                productId: productId,
            },
        });

        if (existingCartItem) {
            await existingCartItem.update({
                quantity: existingCartItem.quantity + 1,
            });

            return res.json({
                message: "Количество товара увеличено",
                cartItem: existingCartItem,
            });
        }

        const newCartItem = await CartProduct.create({
            userId: req.user.userId,
            productId: productId,
            quantity: 1,
        });

        return res.json({
            message: "Товар успешно добавлен в корзину",
            cartItem: newCartItem,
        });
    } catch (error) {
        console.error("=== ПОЛНАЯ ОШИБКА ===");
        console.error(error); // Выведет весь объект ошибки
        console.error("=== ОРИГИНАЛ ===");
        console.error(error.original); // Выведет оригинальную ошибку PostgreSQL
        console.error("=== ИДЕМ В ОБРАБОТЧИК ОШИБОК ===");
        next(error);
    }
};
