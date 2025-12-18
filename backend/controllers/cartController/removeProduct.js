const { CartProduct } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        console.log("1. Пришли в ремув");

        const { id } = req.params;
        if (!id) {
            console.log("Ошибка: айди спиздили");

            return res.status(400).json({ message: "no data" });
        }

        console.log("2. айди есть, все норм");

        console.log("3. ищем карт Итем");

        const cartItem = await CartProduct.findByPk(id);
        if (!cartItem) {
            console.log("Бля, не нашли");
            return res
                .status(404)
                .json({ message: `cartItem with id = ${id} not found` });
        }

        console.log("4. ВАУ нашли!");

        if (cartItem.userId != req.user.userId) {
            console.log("Бро, это не твой карт Итем, пиздуй давай");
            return res.status(409).json({ message: "forbidden" });
        }

        console.log("5. сносим карт Итем");

        await cartItem.destroy();

        return res.json({ message: "Товар успешно удален из корзины" });
    } catch (error) {
        next(error);
    }
};
