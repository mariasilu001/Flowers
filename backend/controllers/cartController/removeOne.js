const { CartProduct } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no data" });
        }

        const cartItem = await CartProduct.findByPk(id);
        if (!cartItem) {
            return res
                .status(404)
                .json({ message: `cartItem with id = ${id} not found` });
        }

        if (cartItem.userId != req.user.userId) {
            //console.log("Бро, это не твой карт Итем, пиздуй давай");
            return res.status(409).json({ message: "forbidden" });
        }

        if (cartItem.quantity > 1) {
            await cartItem.update({
                quantity: cartItem.quantity - 1,
            });

            return res.json({
                message: "Количество товара уменьшено",
                cartItem: cartItem,
            });
        }

        await cartItem.destroy();

        return res.json({ message: "Товар успешно удален из корзины" });
    } catch (error) {
        next(error);
    }
};
