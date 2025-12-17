const { ProductCategory } = require("../../models");
module.exports = async (req, res, next) => {
    try {
        const allCategories = await ProductCategory.findAll();

        return res.json({
            message: "Категрии найдены успешно",
            allCategories: allCategories,
        });
    } catch (error) {
        next(error);
    }
};
