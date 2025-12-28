const { PaymentMethod } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const methods = await PaymentMethod.findAll({
            where: {
                isActive: true,
            },
        });
        return res.json({
            message: "Способо оплаты найдены успешно",
            paymentMethods: methods,
        });
    } catch (error) {
        next(error);
    }
};
